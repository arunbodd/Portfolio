// Fetches the latest citation metrics from a Google Scholar profile — total
// citations, h-index, AND per-paper citation counts — and updates
// public/data/scholar.json. Zero npm dependencies (Node 18+ global fetch).
//
// Run locally:   SCHOLAR_ID=ni4A6KgAAAAJ node scripts/update-citations.mjs
// In CI:         scheduled monthly by .github/workflows/update-citations.yml
//
// Google Scholar has no official API and may serve a consent/CAPTCHA page to
// bots. This script is intentionally best-effort: if it can't parse sane values
// it leaves the cached file untouched and exits 0, so the site never breaks.

import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT = join(__dirname, '..', 'public', 'data', 'scholar.json');
const SCHOLAR_ID = process.env.SCHOLAR_ID || 'ni4A6KgAAAAJ';
// pagesize=100 returns the full publication list in one request.
const URL = `https://scholar.google.com/citations?user=${SCHOLAR_ID}&hl=en&cstart=0&pagesize=100`;

const current = JSON.parse(readFileSync(OUT, 'utf8'));

const fail = (msg) => {
  console.log(`[update-citations] ${msg} — keeping cached values (${current.citations} citations).`);
  process.exit(0);
};

const decode = (s) =>
  s
    .replace(/&amp;/g, '&')
    .replace(/&#39;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&nbsp;/g, ' ')
    .trim();

try {
  const res = await fetch(URL, {
    headers: {
      'User-Agent':
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36',
      'Accept-Language': 'en-US,en;q=0.9',
    },
  });
  if (!res.ok) fail(`HTTP ${res.status}`);
  const html = await res.text();

  // Totals: <td class="gsc_rsb_std"> in order
  // [citations(all), citations(since), h-index(all), h-index(since), i10(all), i10(since)].
  const nums = [...html.matchAll(/gsc_rsb_std">(\d[\d,]*)<\/td>/g)].map((m) => Number(m[1].replace(/,/g, '')));
  if (nums.length < 3) fail('could not locate the stats table (likely a consent/CAPTCHA page)');

  const citations = nums[0];
  const hIndex = nums[2];

  // Sanity check: never let a parse glitch shrink the count drastically.
  if (!Number.isFinite(citations) || citations < current.citations * 0.6) {
    fail(`parsed citations (${citations}) failed sanity check`);
  }

  // Per-paper rows: each <tr class="gsc_a_tr"> holds the title link
  // (gsc_a_at), the cited-by link (gsc_a_ac — empty text means 0), and the year.
  const papers = [];
  for (const row of html.split('gsc_a_tr').slice(1)) {
    const titleM = row.match(/class="gsc_a_at"[^>]*>([^<]+)<\/a>/);
    if (!titleM) continue;
    const citeM = row.match(/class="gsc_a_ac[^"]*"[^>]*>(\d*)<\/a>/);
    const yearM = row.match(/class="gsc_a_h[^"]*"[^>]*>(\d{4})</);
    papers.push({
      title: decode(titleM[1]),
      citations: citeM && citeM[1] ? Number(citeM[1]) : 0,
      year: yearM ? Number(yearM[1]) : null,
    });
  }

  const next = {
    ...current,
    citations,
    hIndex: Number.isFinite(hIndex) ? hIndex : current.hIndex,
    // `documents` stays a manual baseline — Scholar's list can be shorter than
    // the curated publications list, so we don't let the scrape lower it.
    // Only overwrite the per-paper list if we parsed a believable number.
    papers: papers.length >= 5 ? papers : current.papers || [],
    updated: new Date().toISOString().slice(0, 10),
    source: 'google-scholar',
  };

  const unchanged =
    next.citations === current.citations &&
    next.hIndex === current.hIndex &&
    JSON.stringify(next.papers) === JSON.stringify(current.papers || []);

  if (unchanged) {
    console.log('[update-citations] No change.');
    process.exit(0);
  }

  writeFileSync(OUT, `${JSON.stringify(next, null, 2)}\n`);
  console.log(
    `[update-citations] Updated: ${current.citations} → ${citations} citations, h-index ${next.hIndex}, ${papers.length} papers.`,
  );
} catch (err) {
  fail(`fetch error: ${err.message}`);
}

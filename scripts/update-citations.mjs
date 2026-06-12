// Fetches the latest citation count + h-index from a Google Scholar profile and
// updates public/data/scholar.json. Zero npm dependencies (Node 18+ global fetch).
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
const URL = `https://scholar.google.com/citations?user=${SCHOLAR_ID}&hl=en`;

const current = JSON.parse(readFileSync(OUT, 'utf8'));

const fail = (msg) => {
  console.log(`[update-citations] ${msg} — keeping cached value (${current.citations}).`);
  process.exit(0);
};

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

  // The stats table renders values in <td class="gsc_rsb_std">: order is
  // [citations(all), citations(since), h-index(all), h-index(since), i10(all), i10(since)].
  const nums = [...html.matchAll(/gsc_rsb_std">(\d[\d,]*)<\/td>/g)].map((m) => Number(m[1].replace(/,/g, '')));
  if (nums.length < 3) fail('could not locate the stats table (likely a consent/CAPTCHA page)');

  const citations = nums[0];
  const hIndex = nums[2];

  // Sanity check: never let a parse glitch shrink the count drastically.
  if (!Number.isFinite(citations) || citations < current.citations * 0.6) {
    fail(`parsed citations (${citations}) failed sanity check`);
  }

  const next = {
    ...current,
    citations,
    hIndex: Number.isFinite(hIndex) ? hIndex : current.hIndex,
    updated: new Date().toISOString().slice(0, 10),
    source: 'google-scholar',
  };

  if (next.citations === current.citations && next.hIndex === current.hIndex) {
    console.log('[update-citations] No change.');
    process.exit(0);
  }

  writeFileSync(OUT, `${JSON.stringify(next, null, 2)}\n`);
  console.log(`[update-citations] Updated: ${current.citations} → ${citations} citations, h-index ${next.hIndex}.`);
} catch (err) {
  fail(`fetch error: ${err.message}`);
}

// Single source of truth for everything on /writing. Article bodies live as
// Markdown under public/content/writing/<slug>.md and are fetched at runtime;
// this file carries the metadata the index and article header render from.

export const SERIES = {
  name: 'DECODED',
  tagline: 'AI, Biology and the Future of Our Profession',
  blurb:
    'Five months tracking how federal funding, energy constraints, bond markets and clinical genomics collided — written for practitioners deciding where to stand.',
};

// The series. Every entry has a Markdown body at public/content/writing/<slug>.md.
export const posts = [
  {
    slug: 'decoded-1-the-ground-is-shifting',
    n: '01',
    title: 'The Ground Is Shifting',
    dateLabel: 'May 2026',
    dateISO: '2026-05-01',
    readingMinutes: 11,
    tags: ['tariffs', 'H-1B', 'AI capex', 'NIH'],
    summary:
      'Five forces converging on bioinformatics careers at once: a tariff regime reshaping compute and reagent supply, a hiring recession that shed 22,000+ biopharma roles, aggressive offshoring to Indian GCCs, a $100K H-1B fee choking the talent pipeline, and a $600B+ AI capex buildout justified by AlphaFold 3 clearing a real performance threshold.',
  },
  {
    slug: 'decoded-2-the-energy-problem',
    n: '02',
    title: 'The Energy Problem',
    dateLabel: 'May 2026',
    dateISO: '2026-05-15',
    readingMinutes: 14,
    tags: ['data centers', 'grid', 'compute'],
    summary:
      'The binding constraint on biological AI is no longer algorithms or data — it is electricity. Data centers are on track to double 415 TWh by 2030, transformer lead times have stretched to 3–5 years, and GPUs draw only 40% of facility power. Why compute sovereignty is becoming a premium skillset.',
  },
  {
    slug: 'decoded-3-the-pharma-playbook',
    n: '03',
    title: 'The Pharma Playbook',
    dateLabel: 'May 2026',
    dateISO: '2026-05-29',
    readingMinutes: 10,
    tags: ['pharma', 'biotech', 'M&A'],
    summary:
      'How computational biology is being restructured inside pharma: centralization around NVIDIA-backed stacks, layoffs that strategically spare clinical validation while cutting general analysts, and AI-native biotechs built as capital-efficient acquisition targets. Career durability belongs to the translators.',
  },
  {
    slug: 'decoded-4-the-other-half',
    n: '04',
    title: 'The Other Half',
    dateLabel: 'July 2026',
    dateISO: '2026-07-10',
    readingMinutes: 23,
    tags: ['diagnostics', 'CRO', 'federal', 'academia'],
    summary:
      'The sectors that get less press but employ most of the profession — clinical diagnostics, CROs, federal contracting, academia, and foundation-funded research. Held a month for the courts to strike down the $100K H-1B fee, so it reports finalized policy rather than proposals.',
  },
  {
    slug: 'decoded-5-which-arm-of-the-k',
    n: '05',
    title: 'Which Arm of the K',
    dateLabel: 'August 2026',
    dateISO: '2026-08-20',
    readingMinutes: 10,
    tags: ['K-curve', 'bond markets', 'the pivot'],
    note: 'figures forthcoming',
    summary:
      'The final issue. Rentosertib carries an entirely AI-designed molecule into Phase III; the labour market bifurcates as entry-level execution contracts 3.0% YoY against acute senior scarcity; hyperscaler debt issuance pushes Treasury yields against early-stage biotech. Closes with a staged pivot framework by career stage.',
  },
];

// Standalone pieces published here, outside the series.
export const briefs = [
  {
    slug: 'jobs-report-august-2026',
    kind: 'Data brief',
    title: 'The Jobs Report: reading the bioinformatics market',
    dateLabel: 'September 2026',
    dateISO: '2026-09-05',
    readingMinutes: 4,
    tags: ['BLS', 'biopharma', 'postings'],
    summary:
      'Four pages on where the market actually is. August payrolls jumped +162,000 against a 12-month average of +31,000, biopharma cuts fell 59% in Q2, and 631 computational-biology postings show a market skewed hard to senior. Includes five checks for whether a posting is real.',
  },
];

// Published elsewhere; linked out.
export const external = [
  {
    kind: 'Essay · Medium',
    title: 'The Bioinformatician, Before and After AI',
    summary:
      'What actually changed in the day-to-day work once the tools got good — which parts of the job compressed, which became more valuable, and why domain judgment ended up mattering more rather than less.',
    href: 'https://medium.com/@arunbodd/the-bioinformatician-before-and-after-ai-01fa91bdcda2',
    cta: 'Read on Medium',
  },
];

export const bySlug = (slug) =>
  posts.find((p) => p.slug === slug) || briefs.find((b) => b.slug === slug) || null;

export const isSeries = (post) => posts.some((p) => p.slug === post.slug);

// Prev/next within the series.
export const neighbours = (slug) => {
  const i = posts.findIndex((p) => p.slug === slug);
  return {
    prev: i > 0 ? posts[i - 1] : null,
    next: i >= 0 && i < posts.length - 1 ? posts[i + 1] : null,
  };
};

import React from 'react';
import styled from 'styled-components';
import { FaFilePdf, FaExternalLinkAlt, FaLock } from 'react-icons/fa';
import Reveal from '../components/anim/Reveal';
import { Container, PageHeader } from '../components/ui';

const Section = styled.section`
  padding: 130px 0 100px;
  @media (max-width: 768px) { padding: 110px 0 70px; }
`;

/* The series is the spine of this page, so it gets a framed rail with its own
   header rather than sitting in the same flat list as the standalone pieces. */
const SeriesHead = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  gap: 14px;
  padding-bottom: 16px;
  border-bottom: 1px solid var(--border);
  margin-bottom: 4px;

  h3 {
    font-family: ${(p) => p.theme.fontDisplay};
    font-size: 1.35rem;
    font-weight: 700;
    color: ${(p) => p.theme.textWhite};
    margin: 0;
    letter-spacing: -0.02em;
  }
  .count {
    font-family: ${(p) => p.theme.fontMono};
    font-size: 0.72rem;
    color: ${(p) => p.theme.highlight};
    background: ${(p) => p.theme.highlightTint};
    border-radius: 999px;
    padding: 4px 11px;
  }
  p {
    flex-basis: 100%;
    margin: 6px 0 0;
    color: ${(p) => p.theme.textSlate};
    font-size: 0.94rem;
    max-width: 68ch;
  }
`;

const Issue = styled.a`
  display: grid;
  grid-template-columns: 62px 1fr auto;
  gap: 24px;
  align-items: start;
  padding: 26px 0;
  border-bottom: 1px solid var(--border);
  transition: opacity 0.3s var(--ease);

  &[data-pending='true'] { cursor: default; opacity: 0.62; }
  &:not([data-pending='true']):hover .t { color: ${(p) => p.theme.highlight}; }

  .num {
    font-family: ${(p) => p.theme.fontDisplay};
    font-size: 1.9rem;
    font-weight: 700;
    line-height: 1;
    color: transparent;
    -webkit-text-stroke: 1px var(--border-strong);
    font-variant-numeric: tabular-nums;
  }
  .t {
    font-family: ${(p) => p.theme.fontDisplay};
    font-size: 1.24rem;
    font-weight: 600;
    color: ${(p) => p.theme.textWhite};
    margin: 0 0 4px;
    line-height: 1.3;
    transition: color 0.3s var(--ease);
  }
  .when {
    font-family: ${(p) => p.theme.fontMono};
    font-size: 0.71rem;
    color: ${(p) => p.theme.textMuted};
    margin: 0 0 10px;
  }
  .sum {
    color: ${(p) => p.theme.textSlate};
    font-size: 0.92rem;
    margin: 0 0 12px;
    max-width: 66ch;
    line-height: 1.65;
  }
  .go {
    display: inline-flex;
    align-items: center;
    gap: 7px;
    font-family: ${(p) => p.theme.fontMono};
    font-size: 0.72rem;
    color: ${(p) => p.theme.textMuted};
    white-space: nowrap;
    padding-top: 5px;
  }
  &:not([data-pending='true']):hover .go { color: ${(p) => p.theme.highlight}; }

  @media (max-width: 700px) {
    grid-template-columns: 1fr;
    gap: 8px;
    .num { font-size: 1.4rem; }
    .go { padding-top: 0; }
  }
`;

const Tags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 7px;
  span {
    font-family: ${(p) => p.theme.fontMono};
    font-size: 0.66rem;
    color: ${(p) => p.theme.accent2};
    background: ${(p) => p.theme.accent2Tint};
    border-radius: 999px;
    padding: 3px 10px;
  }
`;

const Standalone = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 18px;
  margin-top: 22px;
  @media (max-width: 820px) { grid-template-columns: 1fr; }
`;

const Piece = styled.a`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 26px;
  border: 1px solid var(--border);
  border-radius: ${(p) => p.theme.borderRadius};
  background: ${(p) => p.theme.cardBackground};
  transition: border-color 0.3s var(--ease), transform 0.3s var(--ease);

  &:hover {
    border-color: ${(p) => p.theme.highlight};
    transform: translateY(-3px);
  }
  &:hover h4 { color: ${(p) => p.theme.highlight}; }

  .kind {
    font-family: ${(p) => p.theme.fontMono};
    font-size: 0.66rem;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: ${(p) => p.theme.highlight};
  }
  h4 {
    font-family: ${(p) => p.theme.fontDisplay};
    font-size: 1.14rem;
    font-weight: 600;
    color: ${(p) => p.theme.textWhite};
    margin: 0;
    line-height: 1.3;
    transition: color 0.3s var(--ease);
  }
  p {
    color: ${(p) => p.theme.textSlate};
    font-size: 0.9rem;
    margin: 0;
    line-height: 1.65;
    flex: 1;
  }
  .go {
    display: inline-flex;
    align-items: center;
    gap: 7px;
    font-family: ${(p) => p.theme.fontMono};
    font-size: 0.72rem;
    color: ${(p) => p.theme.textMuted};
  }
  &:hover .go { color: ${(p) => p.theme.highlight}; }
`;

const SubHead = styled.h3`
  font-family: ${(p) => p.theme.fontDisplay};
  font-size: 1.35rem;
  font-weight: 700;
  color: ${(p) => p.theme.textWhite};
  letter-spacing: -0.02em;
  margin: 74px 0 0;
  padding-bottom: 16px;
  border-bottom: 1px solid var(--border);
`;

// PDFs live under /pdfs, not /writing: a static directory that shares a name
// with a client-side route makes GitHub Pages 301 the route to a trailing
// slash before the SPA fallback ever runs.
const P = `${process.env.PUBLIC_URL || ''}/pdfs`;

// DECODED: a five-part series on the forces reshaping computational biology.
// Issue 5 is written but its three figures aren't rendered yet, so it is
// listed as forthcoming rather than shipped half-finished.
const issues = [
  {
    n: '01',
    title: 'The Ground Is Shifting',
    when: 'May 2026',
    file: `${P}/decoded-1-the-ground-is-shifting.pdf`,
    tags: ['tariffs', 'H-1B', 'AI capex', 'NIH'],
    summary:
      'Five forces converging on bioinformatics careers at once: a tariff regime reshaping compute and reagent supply, a hiring recession that shed 22,000+ biopharma roles, aggressive offshoring to Indian GCCs, a $100K H-1B fee choking the talent pipeline, and a $600B+ AI capex buildout justified by AlphaFold 3 clearing a real performance threshold.',
  },
  {
    n: '02',
    title: 'The Energy Problem',
    when: 'May 2026',
    file: `${P}/decoded-2-the-energy-problem.pdf`,
    tags: ['data centers', 'grid', 'compute'],
    summary:
      'The binding constraint on biological AI is no longer algorithms or data — it is electricity. Data centers are on track to double 415 TWh by 2030, transformer lead times have stretched to 3–5 years, and GPUs draw only 40% of facility power. Why compute sovereignty is becoming a premium skillset.',
  },
  {
    n: '03',
    title: 'The Pharma Playbook',
    when: 'May 2026',
    file: `${P}/decoded-3-the-pharma-playbook.pdf`,
    tags: ['pharma', 'biotech', 'M&A'],
    summary:
      'How computational biology is being restructured inside pharma: centralization around NVIDIA-backed stacks, layoffs that strategically spare clinical validation while cutting general analysts, and AI-native biotechs built as capital-efficient acquisition targets. Career durability belongs to the translators.',
  },
  {
    n: '04',
    title: 'The Other Half',
    when: 'July 2026',
    file: `${P}/decoded-4-the-other-half.pdf`,
    tags: ['diagnostics', 'CRO', 'federal', 'academia'],
    summary:
      'The sectors that get less press but employ most of the profession — clinical diagnostics, CROs, federal contracting, academia, and foundation-funded research. Held a month for the courts to strike down the $100K H-1B fee, so it reports finalized policy rather than proposals.',
  },
  {
    n: '05',
    title: 'Which Arm of the K',
    when: 'August 2026',
    pending: true,
    tags: ['K-curve', 'bond markets', 'the pivot'],
    summary:
      'The final issue. Rentosertib carries an entirely AI-designed molecule into Phase III; the labour market bifurcates as entry-level execution contracts 3.0% YoY against acute senior scarcity; hyperscaler debt issuance pushes Treasury yields against early-stage biotech. Closes with a staged pivot framework by career stage.',
  },
];

const Writing = () => (
  <Section id="writing">
    <Container>
      <PageHeader
        index="05"
        eyebrow="Notes"
        title="Writing"
        lead="Long-form analysis of the forces reshaping computational biology — funding, compute, policy, and what they do to the work. Published here in full, free, no login."
      />

      <Reveal>
        <SeriesHead>
          <h3>DECODED</h3>
          <span className="count">5-part series</span>
          <p>AI, Biology and the Future of Our Profession. Five months tracking how federal funding, energy constraints, bond markets and clinical genomics collided — written for practitioners deciding where to stand.</p>
        </SeriesHead>
      </Reveal>

      {issues.map((it) => {
        const live = !it.pending;
        const props = live
          ? { href: it.file, target: '_blank', rel: 'noopener noreferrer' }
          : { as: 'div', 'data-pending': 'true' };
        return (
          <Reveal key={it.n}>
            <Issue {...props}>
              <span className="num">{it.n}</span>
              <div>
                <h4 className="t">{it.title}</h4>
                <p className="when">{it.when}{it.pending ? ' · figures in progress' : ''}</p>
                <p className="sum">{it.summary}</p>
                <Tags>{it.tags.map((t) => <span key={t}>{t}</span>)}</Tags>
              </div>
              <span className="go">
                {live ? <><FaFilePdf /> Read</> : <><FaLock /> Soon</>}
              </span>
            </Issue>
          </Reveal>
        );
      })}

      <Reveal><SubHead>Also published</SubHead></Reveal>
      <Standalone>
        <Reveal>
          <Piece href={`${P}/jobs-report-august-2026.pdf`} target="_blank" rel="noopener noreferrer">
            <span className="kind">Data brief · Sep 2026</span>
            <h4>The Jobs Report: reading the bioinformatics market</h4>
            <p>Four pages on where the market actually is. August payrolls jumped +162,000 against a 12-month average of +31,000, biopharma cuts fell 59% in Q2, and 631 computational-biology postings show a market skewed hard to senior. Includes five checks for whether a posting is real.</p>
            <span className="go"><FaFilePdf /> Read the brief</span>
          </Piece>
        </Reveal>
        <Reveal delay={0.08}>
          <Piece href="https://medium.com/@arunbodd/the-bioinformatician-before-and-after-ai-01fa91bdcda2" target="_blank" rel="noopener noreferrer">
            <span className="kind">Essay · Medium</span>
            <h4>The Bioinformatician, Before and After AI</h4>
            <p>What actually changed in the day-to-day work once the tools got good — which parts of the job compressed, which became more valuable, and why domain judgment ended up mattering more rather than less.</p>
            <span className="go"><FaExternalLinkAlt /> Read on Medium</span>
          </Piece>
        </Reveal>
      </Standalone>
    </Container>
  </Section>
);

export default Writing;

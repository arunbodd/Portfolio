import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { FaMapMarkerAlt, FaExternalLinkAlt, FaGraduationCap, FaCertificate } from 'react-icons/fa';
import Reveal from '../components/anim/Reveal';
import { scrollToSection } from '../components/SmoothScroll';
import { Section, Container, PageHeader, Eyebrow } from '../components/ui';

/* ─────────────────── Scrollytelling journey ─────────────────── */
const Journey = styled.div`
  display: grid;
  grid-template-columns: 280px 1fr;
  gap: 64px;
  margin-top: 20px;
  align-items: start;

  @media (max-width: 920px) {
    grid-template-columns: 1fr;
    gap: 0;
  }
`;

const Rail = styled.div`
  position: sticky;
  top: 110px;
  @media (max-width: 920px) { display: none; }
`;

const RailHead = styled.div`
  font-family: ${(p) => p.theme.fontDisplay};
  font-weight: 700;
  font-size: 2.4rem;
  margin-bottom: 26px;
  line-height: 1;
  .cur {
    background: ${(p) => p.theme.gradient};
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  .tot { color: ${(p) => p.theme.textMuted}; font-size: 1.3rem; }
`;

const RailList = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 4px;
  &::before {
    content: '';
    position: absolute;
    left: 5px;
    top: 8px;
    bottom: 8px;
    width: 2px;
    background: var(--border-strong);
  }
`;

const RailItem = styled.button`
  position: relative;
  display: grid;
  grid-template-columns: 26px 1fr;
  align-items: center;
  gap: 12px;
  padding: 9px 0;
  text-align: left;
  opacity: 0.5;
  background: transparent;
  border: none;
  /* Belt-and-suspenders alongside the global button reset: some browser/OS
     dark-mode form-control auto-theming can otherwise paint native button
     chrome (light gray bg, black text) over this, which is illegible
     combined with the opacity dimming below. */
  appearance: none;
  -webkit-appearance: none;
  color: inherit;
  transition: opacity 0.4s var(--ease), transform 0.4s var(--ease);

  .dot {
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background: ${(p) => p.theme.background};
    border: 2px solid var(--border-strong);
    transition: all 0.4s var(--ease);
  }
  .yr { font-family: ${(p) => p.theme.fontMono}; font-size: 0.74rem; color: ${(p) => p.theme.textSlate}; }
  .co { font-size: 0.92rem; font-weight: 600; color: ${(p) => p.theme.textLightSlate}; line-height: 1.25; }

  &.active {
    opacity: 1;
    transform: translateX(4px);
    .dot {
      border-color: ${(p) => p.theme.highlight};
      background: ${(p) => p.theme.highlight};
      box-shadow: 0 0 0 5px ${(p) => p.theme.highlightTint};
    }
    .co {
      background: ${(p) => p.theme.gradient};
      -webkit-background-clip: text;
      background-clip: text;
      -webkit-text-fill-color: transparent;
    }
  }
  &:hover { opacity: 0.9; }
`;

const Roles = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
`;

const Panel = styled.article`
  position: relative;
  background: ${(p) => p.theme.lightNavy};
  border: 1px solid var(--border);
  border-radius: ${(p) => p.theme.borderRadius};
  padding: 36px;
  overflow: hidden;
  transition: border-color 0.5s var(--ease), transform 0.5s var(--ease);

  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 3px;
    background: ${(p) => p.theme.gradient};
    transform: scaleY(0);
    transform-origin: top;
    transition: transform 0.6s var(--ease);
  }
  &.active::before { transform: scaleY(1); }
  &.active { border-color: var(--border-strong); }

  @media (max-width: 600px) { padding: 26px 22px; }

  .yr {
    font-family: ${(p) => p.theme.fontMono};
    font-size: 0.8rem;
    letter-spacing: 0.05em;
    color: ${(p) => p.theme.highlight};
    margin-bottom: 12px;
  }
  h3 { font-size: clamp(1.35rem, 2.6vw, 1.75rem); color: ${(p) => p.theme.textLightSlate}; margin-bottom: 6px; }
  .co { color: ${(p) => p.theme.accent2}; font-weight: 600; font-size: 1.02rem; }
  .tagline { color: ${(p) => p.theme.textMuted}; font-size: 0.88rem; font-style: italic; margin-top: 8px; }
`;

/* Grouped entry (Independent Consulting & Advisory) */
const GroupHead = styled.div`
  margin-bottom: 8px;
  .label {
    font-family: ${(p) => p.theme.fontMono};
    font-size: 0.75rem;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: ${(p) => p.theme.highlight};
    margin-bottom: 10px;
  }
  h3 { font-size: clamp(1.5rem, 3vw, 2rem); color: ${(p) => p.theme.textLightSlate}; margin-bottom: 8px; }
  p { color: ${(p) => p.theme.textSlate}; font-size: 0.92rem; margin: 0; max-width: 640px; }
`;

const SubRole = styled.div`
  position: relative;
  margin-top: 30px;
  padding: 24px 0 0 24px;
  border-top: 1px solid var(--border);

  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 28px;
    bottom: 6px;
    width: 2px;
    border-radius: 2px;
    background: ${(p) => p.theme.gradientSoft};
  }

  @media (max-width: 600px) { padding-left: 16px; }

  .ryr { font-family: ${(p) => p.theme.fontMono}; font-size: 0.76rem; color: ${(p) => p.theme.highlight}; margin-bottom: 8px; }
  h4 { font-size: 1.2rem; color: ${(p) => p.theme.textLightSlate}; margin-bottom: 4px; }
  .rco { color: ${(p) => p.theme.accent2}; font-weight: 600; font-size: 0.96rem; }
  .tagline { color: ${(p) => p.theme.textMuted}; font-size: 0.85rem; font-style: italic; margin-top: 6px; }
`;

const MetaRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 12px;
  font-size: 0.84rem;
  color: ${(p) => p.theme.textSlate};
  svg { color: ${(p) => p.theme.highlight}; font-size: 0.8rem; }
`;

const Metrics = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin: 22px 0 4px;
`;

const Metric = styled.span`
  display: inline-flex;
  align-items: center;
  padding: 7px 14px;
  border-radius: 999px;
  font-family: ${(p) => p.theme.fontMono};
  font-size: 0.78rem;
  font-weight: 500;
  color: ${(p) => p.theme.textLightSlate};
  background: ${(p) => p.theme.gradientSoft};
  border: 1px solid var(--border-strong);
`;

const Bullets = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-top: 24px;
  list-style: none;
  li {
    list-style: none;
    position: relative;
    padding-left: 22px;
    line-height: 1.65;
    font-size: 0.94rem;
    color: ${(p) => p.theme.textSlate};
    &::before { content: '▹'; position: absolute; left: 0; color: ${(p) => p.theme.highlight}; }
    b { color: ${(p) => p.theme.textLightSlate}; font-weight: 600; }
  }
`;

const Links = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 24px;
  a {
    display: inline-flex;
    align-items: center;
    gap: 7px;
    padding: 8px 15px;
    font-size: 0.82rem;
    border-radius: 999px;
    color: ${(p) => p.theme.highlight};
    border: 1px solid var(--border-strong);
    transition: background 0.3s var(--ease), border-color 0.3s var(--ease);
    &:hover { background: ${(p) => p.theme.highlightTint}; border-color: ${(p) => p.theme.highlight}; }
  }
`;

/* ───────────────────── Education & certs ───────────────────── */
const SubHead = styled.div`
  margin: 110px 0 14px;
  h2 { font-size: clamp(1.7rem, 4vw, 2.3rem); color: ${(p) => p.theme.textLightSlate}; }
`;

const EduGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  margin-top: 40px;
  @media (max-width: 760px) { grid-template-columns: 1fr; }
`;

const CertGrid = styled(EduGrid)`
  grid-template-columns: repeat(3, 1fr);
  @media (max-width: 880px) { grid-template-columns: repeat(2, 1fr); }
  @media (max-width: 560px) { grid-template-columns: 1fr; }
`;

const EduCard = styled.div`
  display: flex;
  gap: 18px;
  align-items: flex-start;
  background: ${(p) => p.theme.lightNavy};
  border: 1px solid var(--border);
  border-radius: ${(p) => p.theme.borderRadius};
  padding: 26px;
  transition: transform 0.4s var(--ease), border-color 0.4s var(--ease);
  &:hover { transform: translateY(-5px); border-color: var(--border-strong); }
  .icon {
    flex-shrink: 0;
    width: 46px; height: 46px;
    display: flex; align-items: center; justify-content: center;
    border-radius: 12px;
    background: ${(p) => p.theme.highlightTint};
    color: ${(p) => p.theme.highlight};
    font-size: 1.2rem;
  }
  .deg { color: ${(p) => p.theme.textLightSlate}; font-size: 1.08rem; font-weight: 600; margin-bottom: 4px; }
  .inst { color: ${(p) => p.theme.highlight}; font-size: 0.92rem; margin-bottom: 8px; }
  .meta { color: ${(p) => p.theme.textSlate}; font-size: 0.84rem; }
  p { color: ${(p) => p.theme.textSlate}; font-size: 0.92rem; margin: 8px 0 0; line-height: 1.55; }
`;

// The first three roles are concurrent and grouped under one heading; the rest
// are single roles. Every entry exposes { railLabel, org, year } for the rail.
const entries = [
  {
    group: true,
    railLabel: 'Independent Consulting & Advisory',
    org: 'Independent Consulting',
    year: '2026',
    range: '2026 – Present',
    heading: 'Independent Consulting & Advisory',
    blurb: 'Concurrent founding, advisory, and academic roles, building agentic AI tooling, advising a clinical-AI startup, and leading proteomics research.',
    roles: [
      {
        title: 'Independent AI Strategy Consultant & Systems Architect',
        company: 'Independent',
        period: '2026 – Present',
        location: 'Atlanta, GA · Remote',
        tagline: 'Product development and executive AI advisory across clinical-AI and translational research.',
        metrics: ['Multi-agent orchestrator', 'Decoupled LLM core', 'Live Nextflow trace parser'],
        description: [
          '<b>CodArIs, Agentic Pipeline Compliance & Orchestration:</b> Built a deterministic, multi-agent orchestrator for Nextflow bioinformatics pipelines with interactive CLI and web interfaces.',
          'Architected a decoupled LLM system isolating the intelligence layer from a pure-Python execution engine, using strict Pydantic models to eliminate token bloat and prevent silent failures.',
          'Engineered a FastAPI weblog receiver that parses live Nextflow traces, delivering real-time job status and deterministic failure classification independent of the Seqera Platform.',
        ],
        links: [{ name: 'CodArIs', url: 'https://arunbodd.github.io/codaris/' }],
      },
      {
        title: 'Strategy Advisor & Bioinformatics Consultant',
        company: 'Mamidi Health LLC',
        period: 'Jan 2026 – Present',
        location: 'Remote',
        tagline: 'Early-stage clinical-AI startup.',
        metrics: ['94% case-solve rate', '80.5% F1', '4-month commercial launch'],
        description: [
          '<b>GTM Strategy & Commercial Readiness:</b> Led the 4-month commercial launch of the AIVA clinical variant-interpretation platform, converting a year of foundational R&D into a market-ready product.',
          '<b>Analytical Performance Characterization:</b> Led stress-testing and competitive benchmarking against Exomiser, LIRICAL, BIAS-2015, and InterVar; validated a 94% case-solve rate and 80.5% F1 on phenotype-driven prioritization.',
          'Designed and maintained executive dashboards and evaluation metrics tracking product readiness, analytical performance, and AI model drift across clinical workflows.',
          '<b>Strategic Team Scaling:</b> Recruited a Product Strategist and a Clinical Geneticist, accelerating product-market fit and lead generation at PMWC ’26.',
        ],
        links: [{ name: 'AIVA Portal', url: 'https://chat.aivaportal.com/' }],
      },
      {
        title: 'Academic Consultant',
        company: 'Dr. Pant Lab, Emory University',
        period: 'Advisory',
        location: 'Atlanta, GA',
        tagline: 'Volunteer bioinformatics consultant for grant-funded neurodegeneration research.',
        metrics: ['HGG Advances (Cell Press)', 'ALS + VCP proteomics'],
        description: [
          'Led NULISA-Seq targeted proteomics analyses for an ALS cohort, culminating in a peer-reviewed publication in HGG Advances (Cell Press).',
          'Leading end-to-end proteomics analysis for a VCP-related neurodegeneration study spanning data processing, biological interpretation, and manuscript writing.',
        ],
        links: [],
      },
    ],
  },
  {
    group: true,
    railLabel: 'CDC',
    org: 'CDC',
    year: '2022 – 2026',
    range: 'Jun 2022 – Jan 2026',
    heading: 'Centers for Disease Control & Prevention',
    blurb: 'Nearly four continuous years of bioinformatics leadership for CDC’s Advanced Molecular Detection programs (national pathogen surveillance and outbreak response), sustained across two contractors as I grew from analyst to lead scientist.',
    roles: [
      {
        title: 'Lead Health Scientist at NCEZID (OAMD & DMAC)',
        company: 'via Booz Allen Hamilton',
        period: 'Mar 2025 – Jan 2026',
        location: 'Atlanta, GA',
        tagline: '',
        metrics: ['85% ↓ onboarding', '40% ↓ turnaround', '6 Nextflow modules'],
        description: [
          '<b>Led prompt-engineering strategies and AI model experimentation</b> to optimize context retrieval, implementing token tracking and cost-mitigation protocols for scalable AI deployment.',
          '<b>Engineered Lintelligence,</b> an enterprise LLM-RAG framework to process unstructured compliance and scientific data; automated validation workflows, established reproducibility standards, and reduced onboarding cycles by 85%.',
          'Deployed 6 production-grade Nextflow modules for national outbreak surveillance (Cyclone), cutting analysis turnaround by 40% through parallelization and cloud optimization.',
        ],
        links: [{ name: 'CDC AMD Platform', url: 'https://www.cdc.gov/amd/index.html' }],
      },
      {
        title: 'Bioinformatics Scientist at OAMD, NIOSH & NWSS',
        company: 'via Leidos',
        period: 'Jun 2022 – Jan 2025',
        location: 'Atlanta, GA',
        tagline: '',
        metrics: ['Aquascope v1–v3.1', '81% classifier', '75% ↓ dev cycles'],
        description: [
          '<b>Real-World Evidence Architecture:</b> Principal architect of Aquascope (v1.0–v3.1), the national SARS-CoV-2 wastewater genomic surveillance pipeline; results directly informed federal pandemic-response policy and national health reporting.',
          '<b>AI/ML for Target & Biomarker Discovery:</b> Developed a probabilistic classifier (81% accuracy) accelerating target identification and biomarker discovery in lung-remodeling pathways.',
          '<b>Translational Leadership:</b> Led cross-disciplinary teams delivering cloud-native infrastructure for high-visibility programs (FoodNet, Legionella), achieving a 75% reduction in new-workflow development cycles.',
          '<b>Training & Mentorship:</b> Trained CDC researchers and epidemiologists on Nextflow development, containerization, HPC, Linux, and transcriptomic analysis.',
        ],
        links: [
          { name: 'Aquascope', url: 'https://github.com/CDCgov/aquascope' },
          { name: 'Tau-typing', url: 'https://github.com/arunbodd/tautyping-nf' },
        ],
      },
    ],
  },
  {
    railLabel: 'Emory NPRC',
    org: 'Emory NPRC',
    year: '2020',
    roles: [{
      title: 'Senior Bioinformatics Analyst',
      company: 'Emory National Primate Research Center (NIH-Funded)',
      period: 'Jul 2020 – Jun 2022',
      location: 'Atlanta, GA',
      tagline: '',
      metrics: ['Published in Cell', '5,000 patients · 15 centers', '60% ↓ processing'],
      description: [
        '<b>Single-Cell Immune Profiling:</b> Co-first-authored a scRNA-seq / CITE-seq baricitinib study published in Cell, resolving airway macrophage inflammation; analyses complemented the FDA Emergency Use Authorization of baricitinib as frontline COVID-19 therapy.',
        '<b>Clinical-Scale Engineering:</b> Lead bioinformatician for IMPACC (5,000 patients, 15 centers); built a blood immune-transcriptomics QC/variant pipeline on AWS (EC2/S3) with Snakemake, achieving a 60% reduction in processing time.',
        '<b>Wastewater Surveillance:</b> Led Atlanta COVID-19 wastewater surveillance (Snakemake, R, Python) informing public-health interventions.',
      ],
      links: [{ name: 'COVID-19 Analysis', url: 'https://github.com/BosingerLab/RM_Baricitinib_manuscript' }],
    }],
  },
  {
    railLabel: 'NIH · Leidos',
    org: 'NIH · Leidos',
    year: '2018',
    roles: [{
      title: 'Bioinformatics Analyst II at NIH / NIAID',
      company: 'via Leidos Biomedical Research',
      period: 'Apr 2018 – Jul 2020',
      location: 'Bethesda, MD',
      tagline: '',
      metrics: ['28+ projects', '1,200-patient WES', '100+ hrs/mo saved'],
      description: [
        '<b>High-Throughput Science:</b> Sole or lead analyst on 28+ independent projects spanning scRNA-seq, WGS/WES, CNV, microarray, and RNA-seq, yielding publications in Science Advances, Science Immunology, and JID.',
        '<b>Clinical Pipeline Engineering:</b> Architected a WES variant-calling pipeline for 1,200 clinical patients (Clinical Sequencing Initiative), saving 100+ analyst-hours/month via automated QC and memory-optimized processing.',
        '<b>Time-Series Analysis:</b> Conducted differential expression and hierarchical clustering on longitudinal whole-blood RNA-seq (6 timepoints) in a Babesia rossi canine model (published in BMC Genomics).',
        '<b>Drug Repurposing:</b> Primary analyst for a Phase 3 clinical trial of dexpramipexole in hypereosinophilic syndrome; built R Markdown interactive visualizations.',
      ],
      links: [{ name: 'WES Pipeline', url: 'https://github.com/arunbodd/NIAID/tree/master/WES_QC' }],
    }],
  },
];

const certifications = [
  { name: 'Hands-on Generative AI', issuer: 'Educosys', date: 'Nov 2025' },
  { name: 'AI Aware', issuer: 'Udemy', date: 'Oct 2025' },
  { name: 'Lean Six Sigma White Belt', issuer: 'AIGPE', date: 'Sep 2025' },
];

const education = [
  { degree: 'M.S. in Bioinformatics', institution: 'Indiana University', period: '2016–2017', location: 'Indianapolis, USA', description: 'Focus on RNA biology, RNA-binding proteins, and epitranscriptomics.' },
  { degree: 'M.S. in Biomedical Sciences', institution: 'Symbiosis International University', period: '2012–2014', location: 'Pune, India', description: 'Focus on cell biology and molecular biology.' },
  { degree: 'B.Tech in Biotechnology', institution: 'Jawaharlal Nehru Technological University', period: '2007–2011', location: 'Hyderabad, India', description: 'Major in biotechnology with a minor in bioinformatics.' },
];

const RoleBody = ({ role }) => (
  <>
    <Metrics>{role.metrics.map((m) => <Metric key={m}>{m}</Metric>)}</Metrics>
    <Bullets>
      {role.description.map((d, j) => <li key={j} dangerouslySetInnerHTML={{ __html: d }} />)}
    </Bullets>
    {role.links.length > 0 && (
      <Links>
        {role.links.map((l) => (
          <a key={l.name} href={l.url} target="_blank" rel="noopener noreferrer">{l.name} <FaExternalLinkAlt /></a>
        ))}
      </Links>
    )}
  </>
);

const Career = () => {
  const [active, setActive] = useState(0);
  const panelRefs = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entriesList) => {
        entriesList.forEach((e) => {
          if (e.isIntersecting) {
            const i = Number(e.target.dataset.index);
            if (!Number.isNaN(i)) setActive(i);
          }
        });
      },
      { rootMargin: '-35% 0px -55% 0px', threshold: 0 },
    );
    panelRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <Section id="career">
      <Container>
        <PageHeader index="01" eyebrow="Journey" title="Career" lead="A decade turning biological questions into production-grade AI, across national public-health programs, academic cores, and clinical-AI startups." />

        <Journey>
          <Rail>
            <RailHead>
              <span className="cur">{String(active + 1).padStart(2, '0')}</span>
              <span className="tot"> / {String(entries.length).padStart(2, '0')}</span>
            </RailHead>
            <RailList>
              {entries.map((entry, i) => (
                <RailItem
                  key={i}
                  className={active === i ? 'active' : ''}
                  onClick={() => scrollToSection(`role-${i}`)}
                >
                  <span className="dot" />
                  <span>
                    <span className="yr">{entry.year}</span>
                    <span className="co" style={{ display: 'block' }}>{entry.railLabel}</span>
                  </span>
                </RailItem>
              ))}
            </RailList>
          </Rail>

          <Roles>
            {entries.map((entry, i) => (
              <Panel
                key={i}
                id={`role-${i}`}
                data-index={i}
                className={active === i ? 'active' : ''}
                ref={(el) => { panelRefs.current[i] = el; }}
              >
                <Reveal>
                  {entry.group ? (
                    <>
                      <GroupHead>
                        <div className="label">{entry.range}</div>
                        <h3>{entry.heading}</h3>
                        <p>{entry.blurb}</p>
                      </GroupHead>
                      {entry.roles.map((role) => (
                        <SubRole key={role.title}>
                          <div className="ryr">{role.period}</div>
                          <h4>{role.title}</h4>
                          <div className="rco">{role.company}</div>
                          {role.tagline && <div className="tagline">{role.tagline}</div>}
                          <MetaRow><FaMapMarkerAlt /> {role.location}</MetaRow>
                          <RoleBody role={role} />
                        </SubRole>
                      ))}
                    </>
                  ) : (
                    <>
                      <div className="yr">{entry.roles[0].period}</div>
                      <h3>{entry.roles[0].title}</h3>
                      <div className="co">{entry.roles[0].company}</div>
                      {entry.roles[0].tagline && <div className="tagline">{entry.roles[0].tagline}</div>}
                      <MetaRow><FaMapMarkerAlt /> {entry.roles[0].location}</MetaRow>
                      <RoleBody role={entry.roles[0]} />
                    </>
                  )}
                </Reveal>
              </Panel>
            ))}
          </Roles>
        </Journey>

        <Reveal><SubHead><Eyebrow>Credentials</Eyebrow><h2>Certifications</h2></SubHead></Reveal>
        <Reveal stagger>
          <CertGrid>
            {certifications.map((c) => (
              <EduCard key={c.name}>
                <div className="icon"><FaCertificate /></div>
                <div>
                  <div className="deg">{c.name}</div>
                  <div className="inst">{c.issuer}</div>
                  <div className="meta">{c.date}</div>
                </div>
              </EduCard>
            ))}
          </CertGrid>
        </Reveal>

        <Reveal><SubHead><Eyebrow>Education</Eyebrow><h2>Education</h2></SubHead></Reveal>
        <Reveal stagger>
          <EduGrid>
            {education.map((edu) => (
              <EduCard key={edu.degree}>
                <div className="icon"><FaGraduationCap /></div>
                <div>
                  <div className="deg">{edu.degree}</div>
                  <div className="inst">{edu.institution}</div>
                  <div className="meta">{edu.period} · {edu.location}</div>
                  <p>{edu.description}</p>
                </div>
              </EduCard>
            ))}
          </EduGrid>
        </Reveal>
      </Container>
    </Section>
  );
};

export default Career;

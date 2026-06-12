import React from 'react';
import styled from 'styled-components';
import {
  FaBrain, FaDna, FaStream, FaCode, FaTools, FaUsers,
  FaLightbulb, FaRocket, FaPuzzlePiece, FaTasks, FaExchangeAlt, FaClock, FaChalkboardTeacher, FaHandshake,
} from 'react-icons/fa';
import Reveal from '../components/anim/Reveal';
import { Section, Container, PageHeader, Eyebrow } from '../components/ui';

const Bento = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  @media (max-width: 760px) { grid-template-columns: 1fr; }
`;

const Tile = styled.div`
  position: relative;
  background: ${(p) => p.theme.lightNavy};
  border: 1px solid var(--border);
  border-radius: ${(p) => p.theme.borderRadius};
  padding: 30px;
  overflow: hidden;
  transition: transform 0.5s var(--ease), border-color 0.5s var(--ease);
  &:hover { transform: translateY(-6px); border-color: var(--border-strong); }

  &.wide { grid-column: 1 / -1; }
  &.featured {
    background: ${(p) => p.theme.gradientSoft};
    border-color: var(--border-strong);
  }

  .head { display: flex; align-items: center; gap: 16px; margin-bottom: 16px; }
  .icon {
    flex-shrink: 0;
    width: 50px; height: 50px;
    display: flex; align-items: center; justify-content: center;
    border-radius: 14px;
    background: ${(p) => p.theme.highlightTint};
    color: ${(p) => p.theme.highlight};
    font-size: 1.4rem;
  }
  h3 { font-size: 1.2rem; color: ${(p) => p.theme.textLightSlate}; margin: 0; }
  &.featured h3 { font-size: 1.5rem; }
  p { font-size: 0.92rem; line-height: 1.6; color: ${(p) => p.theme.textSlate}; margin: 0 0 18px; }
`;

const Chips = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  span {
    font-family: ${(p) => p.theme.fontMono};
    font-size: 0.76rem;
    padding: 5px 12px;
    border-radius: 8px;
    color: ${(p) => p.theme.textLightSlate};
    background: rgba(127, 127, 127, 0.08);
    border: 1px solid var(--border);
  }
`;

const StripHead = styled.div`
  margin: 96px 0 24px;
  h2 { font-size: clamp(1.7rem, 4vw, 2.3rem); color: ${(p) => p.theme.textLightSlate}; }
`;

const Traits = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
`;

const Trait = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 12px 18px;
  border-radius: 999px;
  background: ${(p) => p.theme.lightNavy};
  border: 1px solid var(--border);
  color: ${(p) => p.theme.textLightSlate};
  font-size: 0.92rem;
  font-weight: 500;
  transition: transform 0.3s var(--ease), border-color 0.3s var(--ease);
  svg { color: ${(p) => p.theme.highlight}; font-size: 1rem; }
  &:hover { transform: translateY(-3px); border-color: ${(p) => p.theme.highlight}; }
`;

const featured = {
  title: 'Machine Learning & AI',
  icon: <FaBrain />,
  description: 'LLMs, RAG architecture, and agentic systems applied to life-sciences research — building decoupled, deterministic AI that holds strict reproducibility and validation standards.',
  tools: ['LLMs', 'RAG', 'Agentic tooling', 'MCP servers', 'Prompt Engineering', 'LangGraph', 'PyTorch', 'TensorFlow', 'scikit-learn', 'NLP', 'Knowledge Graphs'],
};

const domains = [
  { title: 'Bioinformatics & Genomics', icon: <FaDna />, description: 'NGS analysis across infectious disease, immunology, and surveillance.', tools: ['scRNA-seq', 'CITE-seq', 'Metagenomics', 'Proteomics', 'Variant Calling', 'Spatial'] },
  { title: 'Pipelines & Infrastructure', icon: <FaStream />, description: 'Scalable, reproducible workflows on HPC and cloud.', tools: ['Nextflow', 'nf-core', 'Snakemake', 'WDL', 'Docker', 'Singularity', 'AWS', 'Azure', 'Slurm', 'CI/CD'] },
  { title: 'Programming & Development', icon: <FaCode />, description: 'From analysis to production apps and dashboards.', tools: ['Python', 'R', 'RShiny', 'Quarto', 'FastAPI', 'Pydantic', 'SQL', 'Bash'] },
  { title: 'Technical Excellence', icon: <FaTools />, description: 'The fundamentals behind dependable, well-communicated science.', tools: ['Git', 'Linux / HPC', 'Data Viz', 'Statistics', 'Reproducibility', 'Sci Comm'] },
];

const leadership = {
  title: 'Leadership & Mentorship',
  icon: <FaUsers />,
  description: 'Building and growing high-performing teams — from mentoring junior scientists and CDC trainees to product strategy and cross-functional delivery.',
  tools: ['Team Building', '1:1 Coaching', 'Project Management', 'Scrum', 'Jira', 'Talent Development', 'Stakeholder Mgmt'],
};

const traits = [
  { label: 'Curiosity', icon: <FaLightbulb /> },
  { label: 'Initiative', icon: <FaRocket /> },
  { label: 'Problem Solving', icon: <FaPuzzlePiece /> },
  { label: 'Project Management', icon: <FaTasks /> },
  { label: 'Teamwork', icon: <FaUsers /> },
  { label: 'Adaptability', icon: <FaExchangeAlt /> },
  { label: 'Time & Resource Management', icon: <FaClock /> },
  { label: 'Mentoring', icon: <FaChalkboardTeacher /> },
  { label: 'Client Relations', icon: <FaHandshake /> },
];

const Skills = () => (
  <Section id="skills">
    <Container>
      <PageHeader index="04" eyebrow="Toolbox" title="Skills" lead="A capability map spanning AI/ML, bioinformatics, pipelines, and leadership — built to ship solutions for complex biological and computational challenges." />

      <Bento>
        <Reveal style={{ gridColumn: '1 / -1' }}>
          <Tile className="wide featured">
            <div className="head"><span className="icon">{featured.icon}</span><h3>{featured.title}</h3></div>
            <p>{featured.description}</p>
            <Chips>{featured.tools.map((t) => <span key={t}>{t}</span>)}</Chips>
          </Tile>
        </Reveal>

        {domains.map((d) => (
          <Reveal key={d.title}>
            <Tile>
              <div className="head"><span className="icon">{d.icon}</span><h3>{d.title}</h3></div>
              <p>{d.description}</p>
              <Chips>{d.tools.map((t) => <span key={t}>{t}</span>)}</Chips>
            </Tile>
          </Reveal>
        ))}

        <Reveal style={{ gridColumn: '1 / -1' }}>
          <Tile className="wide">
            <div className="head"><span className="icon">{leadership.icon}</span><h3>{leadership.title}</h3></div>
            <p>{leadership.description}</p>
            <Chips>{leadership.tools.map((t) => <span key={t}>{t}</span>)}</Chips>
          </Tile>
        </Reveal>
      </Bento>

      <Reveal><StripHead><Eyebrow>How I work</Eyebrow><h2>The way I operate.</h2></StripHead></Reveal>
      <Reveal>
        <Traits>
          {traits.map((t) => (
            <Trait key={t.label}>{t.icon} {t.label}</Trait>
          ))}
        </Traits>
      </Reveal>
    </Container>
  </Section>
);

export default Skills;

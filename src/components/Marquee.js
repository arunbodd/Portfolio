import React from 'react';
import styled, { keyframes } from 'styled-components';

const scroll = keyframes`
  from { transform: translateX(0); }
  to   { transform: translateX(-50%); }
`;

const Band = styled.div`
  position: relative;
  overflow: hidden;
  padding: 26px 0;
  border-top: 1px solid var(--border);
  border-bottom: 1px solid var(--border);
  background: ${(p) => p.theme.gradientSoft};
  -webkit-mask-image: linear-gradient(90deg, transparent, #000 12%, #000 88%, transparent);
  mask-image: linear-gradient(90deg, transparent, #000 12%, #000 88%, transparent);
`;

const Track = styled.div`
  display: flex;
  width: max-content;
  animation: ${scroll} ${(p) => p.$duration || 38}s linear infinite;
  animation-direction: ${(p) => (p.$reverse ? 'reverse' : 'normal')};
  will-change: transform;

  ${Band}:hover & { animation-play-state: paused; }

  @media (prefers-reduced-motion: reduce) { animation: none; }
`;

const Item = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 28px;
  padding: 0 28px;
  font-family: ${(p) => p.theme.fontDisplay};
  font-size: clamp(1.1rem, 2.4vw, 1.7rem);
  font-weight: 600;
  letter-spacing: -0.01em;
  color: ${(p) => p.theme.textLightSlate};
  white-space: nowrap;

  &::after {
    content: '✦';
    font-size: 0.7em;
    color: ${(p) => p.theme.highlight};
  }
`;

const defaults = [
  'Nextflow', 'LLM-RAG', 'PyTorch', 'Agentic AI', 'scRNA-seq', 'CITE-seq',
  'Snakemake', 'AWS', 'Docker', 'Metagenomics', 'Proteomics', 'Variant Calling',
  'nf-core', 'Prompt Engineering', 'HPC',
];

// Infinite horizontal marquee of capabilities — kinetic energy between sections.
const Marquee = ({ items = defaults, reverse = false, duration = 38 }) => {
  const loop = [...items, ...items];
  return (
    <Band aria-hidden="true">
      <Track $reverse={reverse} $duration={duration}>
        {loop.map((t, i) => (
          <Item key={i}>{t}</Item>
        ))}
      </Track>
    </Band>
  );
};

export default Marquee;

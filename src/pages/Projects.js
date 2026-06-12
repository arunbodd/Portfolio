import React, { useState } from 'react';
import styled from 'styled-components';
import { FaGithub, FaLock, FaArrowRight } from 'react-icons/fa';
import Reveal from '../components/anim/Reveal';
import { Section, Container, PageHeader, Card } from '../components/ui';

const Filters = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 44px;
`;

const Chip = styled.button`
  padding: 8px 18px;
  border-radius: 999px;
  font-size: 0.85rem;
  font-weight: 500;
  color: ${(p) => (p.$active ? '#05060b' : p.theme.textSlate)};
  background: ${(p) => (p.$active ? p.theme.gradient : 'transparent')};
  border: 1px solid ${(p) => (p.$active ? 'transparent' : 'var(--border-strong)')};
  transition: all 0.3s var(--ease);
  &:hover { color: ${(p) => (p.$active ? '#05060b' : p.theme.textLightSlate)}; border-color: ${(p) => p.theme.highlight}; }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(330px, 1fr));
  gap: 24px;
  @media (max-width: 700px) { grid-template-columns: 1fr; }
`;

const PCard = styled(Card)`
  display: flex;
  flex-direction: column;
  min-height: 270px;

  .cat {
    align-self: flex-start;
    font-family: ${(p) => p.theme.fontMono};
    font-size: 0.7rem;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: ${(p) => p.theme.accent2};
    margin-bottom: 16px;
  }
  h3 { font-size: 1.3rem; color: ${(p) => p.theme.textLightSlate}; margin-bottom: 10px; }
  .desc { color: ${(p) => p.theme.textSlate}; font-size: 0.92rem; line-height: 1.6; flex: 1; }
`;

const Tags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin: 18px 0;
  span {
    font-size: 0.74rem;
    padding: 4px 10px;
    border-radius: 6px;
    color: ${(p) => p.theme.highlight};
    background: ${(p) => p.theme.highlightTint};
  }
`;

const Foot = styled.div`
  display: flex;
  align-items: center;
  gap: 18px;
  padding-top: 16px;
  border-top: 1px solid var(--border);
  a, span.priv {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    font-size: 0.88rem;
    color: ${(p) => p.theme.textSlate};
    transition: color 0.3s var(--ease);
  }
  a:hover { color: ${(p) => p.theme.highlight}; }
  a:hover svg { transform: translateX(3px); }
  a svg { transition: transform 0.3s var(--ease); }
`;

const projects = [
  { id: 1, title: 'NexAI', description: 'A RAG-based AI agent that analyzes Nextflow pipelines for compliance with nf-core guidelines, producing detailed compliance reports and recommendations.', tech: ['Nextflow', 'AI', 'RAG'], github: 'https://github.com/arunbodd/nf-core_guidelines_validator/tree/dev', category: 'AI' },
  { id: 2, title: 'VCP NULISA-Seq RShiny App', description: 'An RShiny web application for analyzing NULISA-Seq data related to Valosin-containing protein (VCP).', tech: ['R', 'RShiny', 'Bioinformatics'], github: 'https://github.com/arunbodd/VCP_NULISA-Seq_Rshiny', category: 'Web App', isPrivate: true },
  { id: 3, title: 'NexAws-AI', description: 'A framework for integrating AI pipelines with Nextflow and AWS infrastructure for scalable, efficient data processing.', tech: ['Nextflow', 'AWS', 'AI', 'ML'], github: 'https://github.com/arunbodd/NexAws-AI', category: 'Nextflow', isPrivate: true },
  { id: 4, title: 'Serum-Proteomics', description: 'A pipeline for analyzing serum proteomics data to identify biomarkers and protein signatures across disease states.', tech: ['Proteomics', 'Mass Spec', 'R'], github: 'https://github.com/arunbodd/Serum-Proteomics', category: 'Proteomics' },
  { id: 5, title: 'mycosnp-nf', description: 'A Nextflow pipeline analyzing mycological SNPs to track fungal outbreaks and evolution.', tech: ['Nextflow', 'Genomics', 'SNP', 'Docker'], github: 'https://github.com/arunbodd/mycosnp-nf', category: 'Nextflow' },
  { id: 6, title: 'Ebola_Hackathon', description: 'A hackathon project analyzing Ebola virus genomic data to track outbreak transmission and evolution.', tech: ['Nextflow', 'Viral Genomics', 'Phylogenetics'], github: 'https://github.com/arunbodd/Ebola_Hackthon', category: 'Nextflow' },
  { id: 7, title: 'aquascope', description: "CDC's wastewater surveillance analysis pipeline for detecting and monitoring pathogens including SARS-CoV-2 variants.", tech: ['Nextflow', 'Metagenomics', 'Wastewater', 'COVID-19'], github: 'https://github.com/CDCgov/aquascope', category: 'Nextflow' },
  { id: 8, title: 'tautyping-nf', description: 'A Nextflow pipeline for finding optimal phylogenetic markers in microbial genomes using Kendall-Tau correlation.', tech: ['Nextflow', 'Phylogenetics', 'Python'], github: 'https://github.com/arunbodd/tautyping-nf', category: 'Nextflow' },
  { id: 9, title: 'RM_Baricitinib_manuscript', description: 'Analysis code for scRNA-seq investigating Baricitinib treatment in SARS-CoV-2 infected rhesus macaques.', tech: ['scRNA-seq', 'R', 'COVID-19'], github: 'https://github.com/BosingerLab/RM_Baricitinib_manuscript', category: 'scRNA' },
  { id: 10, title: 'CRISPR_Cas9_gRNA', description: 'A toolkit for designing and analyzing CRISPR-Cas9 guide RNAs for precise genome-editing experiments.', tech: ['CRISPR', 'Genome Editing', 'Python'], github: 'https://github.com/arunbodd/CRISPR_Cas9_gRNA', category: 'CRISPR' },
  { id: 11, title: 'WES_QC', description: 'A Snakemake-based QC pipeline for Whole Exome Sequencing data in the NIAID repository.', tech: ['Snakemake', 'WES', 'QC'], github: 'https://github.com/CCBR/NIAID/tree/master/WES_QC', category: 'Snakemake' },
  { id: 12, title: 'Cyclone', description: 'A scalable Nextflow pipeline for genotyping and haplotype assignment of Cyclospora spp. from amplicon paired-end sequencing data.', tech: ['Nextflow', 'Surveillance', 'Bioinformatics'], github: 'https://github.com/cdcent/oamd-bio-cyclone', category: 'Nextflow', isPrivate: true },
];

const Projects = () => {
  const [filter, setFilter] = useState('all');
  const categories = [...new Set(projects.map((p) => p.category))];
  const list = filter === 'all' ? projects : projects.filter((p) => p.category === filter);

  return (
    <Section id="projects">
      <Container>
        <PageHeader index="02" eyebrow="Selected Work" title="Projects" lead="Pipelines, AI agents, and research code — most open-source, spanning genomics, surveillance, and machine learning." />

        <Reveal>
          <Filters>
            <Chip $active={filter === 'all'} onClick={() => setFilter('all')}>All</Chip>
            {categories.map((c) => (
              <Chip key={c} $active={filter === c} onClick={() => setFilter(c)}>{c}</Chip>
            ))}
          </Filters>
        </Reveal>

        <Reveal stagger key={filter}>
          <Grid>
            {list.map((p) => (
              <PCard key={p.id}>
                <span className="cat">{p.category}</span>
                <h3>{p.title}</h3>
                <p className="desc">{p.description}</p>
                <Tags>{p.tech.map((t) => <span key={t}>{t}</span>)}</Tags>
                <Foot>
                  {p.isPrivate ? (
                    <span className="priv"><FaLock /> Private repo</span>
                  ) : (
                    <a href={p.github} target="_blank" rel="noopener noreferrer"><FaGithub /> View on GitHub <FaArrowRight /></a>
                  )}
                </Foot>
              </PCard>
            ))}
          </Grid>
        </Reveal>
      </Container>
    </Section>
  );
};

export default Projects;

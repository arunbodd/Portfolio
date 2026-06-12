import React, { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import styled from 'styled-components';
import { FaExternalLinkAlt, FaStar } from 'react-icons/fa';
import Reveal from '../components/anim/Reveal';
import { scrollToSection } from '../components/SmoothScroll';
import useScholar from '../hooks/useScholar';
import { Section, Container, PageHeader } from '../components/ui';

const Filters = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 9px;
  margin-bottom: 44px;
`;

const Chip = styled.button`
  padding: 7px 16px;
  border-radius: 999px;
  font-size: 0.82rem;
  font-weight: 500;
  color: ${(p) => (p.$active ? '#05060b' : p.theme.textSlate)};
  background: ${(p) => (p.$active ? p.theme.gradient : 'transparent')};
  border: 1px solid ${(p) => (p.$active ? 'transparent' : 'var(--border-strong)')};
  transition: all 0.3s var(--ease);
  &:hover { border-color: ${(p) => p.theme.highlight}; color: ${(p) => (p.$active ? '#05060b' : p.theme.textLightSlate)}; }
`;

/* ── Two-column scrollytelling layout ── */
const Split = styled.div`
  display: grid;
  grid-template-columns: 250px 1fr;
  gap: 64px;
  align-items: start;
  @media (max-width: 920px) { grid-template-columns: 1fr; gap: 0; }
`;

const Rail = styled.div`
  position: sticky;
  top: 110px;
  @media (max-width: 920px) { display: none; }
`;

const Summary = styled.div`
  display: flex;
  flex-direction: column;
  gap: 18px;
  padding-bottom: 28px;
  margin-bottom: 26px;
  border-bottom: 1px solid var(--border);
  .stat .n {
    font-family: ${(p) => p.theme.fontDisplay};
    font-size: 2rem;
    font-weight: 700;
    line-height: 1;
    background: ${(p) => p.theme.gradient};
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  .stat .l { font-size: 0.8rem; color: ${(p) => p.theme.textSlate}; margin-top: 4px; }
`;

const YearNav = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

const YearNavItem = styled.button`
  display: flex;
  align-items: baseline;
  gap: 10px;
  padding: 7px 0;
  text-align: left;
  opacity: 0.5;
  transition: opacity 0.3s var(--ease), transform 0.3s var(--ease);
  .y { font-family: ${(p) => p.theme.fontDisplay}; font-weight: 700; font-size: 1.05rem; color: ${(p) => p.theme.textLightSlate}; }
  .c { font-family: ${(p) => p.theme.fontMono}; font-size: 0.72rem; color: ${(p) => p.theme.textMuted}; }
  &.active {
    opacity: 1;
    transform: translateX(4px);
    .y { background: ${(p) => p.theme.gradient}; -webkit-background-clip: text; background-clip: text; -webkit-text-fill-color: transparent; }
    .c { color: ${(p) => p.theme.highlight}; }
  }
  &:hover { opacity: 0.9; }
`;

const YearGroup = styled.div`
  margin-bottom: 64px;
  scroll-margin-top: 100px;
  &:last-child { margin-bottom: 0; }
`;

const YearHead = styled.div`
  position: relative;
  margin-bottom: 8px;
  .big {
    font-family: ${(p) => p.theme.fontDisplay};
    font-size: clamp(3rem, 8vw, 5rem);
    font-weight: 700;
    line-height: 1;
    color: transparent;
    -webkit-text-stroke: 1.2px var(--border-strong);
    letter-spacing: -0.02em;
  }
  .count { font-family: ${(p) => p.theme.fontMono}; font-size: 0.8rem; color: ${(p) => p.theme.highlight}; }
`;

/* ── Publication row — emphasises the citation count ── */
const PubRow = styled.div`
  position: relative;
  display: grid;
  grid-template-columns: 1fr 96px;
  gap: 24px;
  padding: 24px 0;
  border-top: 1px solid var(--border);
  transition: padding 0.4s var(--ease);

  &:hover { padding-left: 8px; }
  &:hover .title { color: ${(p) => p.theme.highlight}; }

  @media (max-width: 560px) { grid-template-columns: 1fr; gap: 12px; }

  .journal {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    font-family: ${(p) => p.theme.fontMono};
    font-size: 0.72rem;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: ${(p) => p.theme.accent2};
    margin-bottom: 10px;
  }
  .cofirst {
    display: inline-flex;
    align-items: center;
    gap: 5px;
    padding: 2px 9px;
    border-radius: 999px;
    font-family: ${(p) => p.theme.fontMono};
    font-size: 0.64rem;
    letter-spacing: 0.04em;
    color: ${(p) => p.theme.highlight};
    background: ${(p) => p.theme.highlightTint};
    svg { font-size: 0.6rem; }
  }
  .title { font-size: 1.08rem; line-height: 1.4; color: ${(p) => p.theme.textLightSlate}; font-weight: 600; margin-bottom: 10px; transition: color 0.3s var(--ease); }
  .authors { font-size: 0.84rem; color: ${(p) => p.theme.textSlate}; line-height: 1.5; }
  .authors b { color: ${(p) => p.theme.highlight}; }
`;

const Cite = styled.div`
  text-align: right;
  @media (max-width: 560px) { text-align: left; }
  .n {
    font-family: ${(p) => p.theme.fontDisplay};
    font-size: 2rem;
    font-weight: 700;
    line-height: 1;
    color: ${(p) => (p.$hot ? 'transparent' : p.theme.textLightSlate)};
    background: ${(p) => (p.$hot ? p.theme.gradient : 'none')};
    -webkit-background-clip: ${(p) => (p.$hot ? 'text' : 'border-box')};
    background-clip: ${(p) => (p.$hot ? 'text' : 'border-box')};
    -webkit-text-fill-color: ${(p) => (p.$hot ? 'transparent' : 'inherit')};
  }
  .l { font-size: 0.66rem; text-transform: uppercase; letter-spacing: 0.1em; color: ${(p) => p.theme.textMuted}; margin-top: 2px; }
`;

const Tools = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 14px;
  margin-top: 14px;
  a, button {
    font-size: 0.8rem;
    color: ${(p) => p.theme.textSlate};
    display: inline-flex;
    align-items: center;
    gap: 6px;
    transition: color 0.3s var(--ease);
  }
  a:hover, button:hover { color: ${(p) => p.theme.highlight}; }
`;

const Abstract = styled.p`
  grid-column: 1 / -1;
  margin: 4px 0 0;
  padding: 16px;
  background: ${(p) => p.theme.navy};
  border-radius: 10px;
  font-size: 0.85rem;
  line-height: 1.65;
  color: ${(p) => p.theme.textSlate};
`;

const publications = [
  { id: 1, title: 'Tau-typing: a Nextflow pipeline for finding the best phylogenetic markers in the genome for molecular typing of microbial species', authors: 'Matthew H. Seabolt, AK Boddapati, Joshua J. Forstedt, Konstantinos T. Konstantinidis', journal: 'Bioinformatics', year: 2023, citations: 1, link: 'https://academic.oup.com/bioinformatics/article/39/7/btad425/7221034', abstract: 'Tau-typing is an integrated analysis pipeline for identifying genes or genomic segments whose phylogenetic resolving power most closely resembles the genome-wide resolving power of an input collection of genomes using the Kendall Tau rank correlation statistic. Implemented in Nextflow, it enables on-demand, high-resolution molecular typing for pathogen genomics.', category: ['Bioinformatics', 'Metagenomics', 'Nextflow'] },
  { id: 2, title: 'Experimental Babesia rossi infection induces hemolytic, metabolic, and viral response pathways in the canine host', authors: 'Rachel L. Smith, Amelia Goddard, AK Boddapati, Steven Brooks, Johan P. Schoeman, Justin Lack, Andrew Leisewitz, Hans Ackerman', journal: 'BMC Genomics', year: 2021, citations: 10, link: 'https://bmcgenomics.biomedcentral.com/articles/10.1186/s12864-021-07889-4', abstract: 'Babesia rossi is a leading cause of morbidity and mortality among the canine population of sub-Saharan Africa. This study examined the transcriptional response of the canine host to experimental B. rossi infection, identifying pathways involved in hemolysis, metabolic changes, and viral response.', category: ['Bioinformatics', 'Immunology'] },
  { id: 3, title: 'Baricitinib treatment resolves lower-airway macrophage inflammation and neutrophil recruitment in SARS-CoV-2-infected rhesus macaques', authors: 'Hoang TN, Pino M, AK Boddapati, et al.', journal: 'Cell', year: 2021, category: ['Bioinformatics', 'Covid'], citations: 213, cofirst: true, link: 'https://scholar.google.com/citations?view_op=view_citation&hl=en&user=ni4A6KgAAAAJ&citation_for_view=ni4A6KgAAAAJ:2osOgNQ5qMEC', abstract: 'SARS-CoV-2-induced hypercytokinemia and inflammation are critically associated with COVID-19 severity. We investigated baricitinib, a JAK1/JAK2 inhibitor, in a rhesus macaque model. Treated animals showed reduced inflammation, decreased lung infiltration, reduced NETosis, and potent suppression of lung macrophage cytokine production responsible for neutrophil recruitment — supporting baricitinib as a frontline treatment for SARS-CoV-2-induced inflammation.' },
  { id: 4, title: 'Shared transcriptional profiles of atypical B cells suggest common drivers of expansion and function in malaria, HIV, and autoimmunity', authors: 'Prasida Holla, Brian Dizon, Abhijit A. Ambegaonkar, Noga Rogel, Ella Goldschmidt, AK Boddapati, et al.', journal: 'Science Advances', year: 2021, category: ['Bioinformatics', 'Immunology'], citations: 123, link: 'https://scholar.google.com/citations?view_op=view_citation&hl=en&user=ni4A6KgAAAAJ&citation_for_view=ni4A6KgAAAAJ:zYLM7Y9cAGgC', abstract: 'Using unbiased single-cell RNA sequencing, we characterized heterogeneity in naïve, classical memory, and atypical B cells (ABCs). We showed remarkably similar transcriptional profiles for ABC clusters in malaria, HIV, and autoimmune diseases, suggesting ABCs represent a separate B cell lineage with a common inducer that diversifies into disease-specific functions.' },
  { id: 5, title: 'A modified vaccinia Ankara vector-based vaccine protects macaques from SARS-CoV-2 infection, immune pathology, and dysfunction in the lungs', authors: 'Routhu NK, Cheedarla N, AK Boddapati, et al.', journal: 'Immunity', year: 2021, category: ['Bioinformatics', 'Covid', 'Vaccine Research', 'Immunology'], citations: 91, link: 'https://scholar.google.com/citations?view_op=view_citation&hl=en&user=ni4A6KgAAAAJ&citation_for_view=ni4A6KgAAAAJ:qjMakFHDy7sC', abstract: 'MVA vectors expressing membrane-anchored pre-fusion stabilized spike (MVA/S) induced strong neutralizing antibodies and CD8+ T cell responses in macaques and conferred protection from SARS-CoV-2 as early as day 2 post-challenge. scRNA-seq showed MVA/S also protected against infection-induced inflammation and B cell abnormalities.' },
  { id: 6, title: 'Human plasma-like medium improves T lymphocyte activation', authors: 'Michael A Leney-Greene, AK Boddapati, et al.', journal: 'iScience', year: 2020, category: ['Bioinformatics', 'Immunology', 'Immunological methods'], citations: 53, link: 'https://scholar.google.com/citations?view_op=view_citation&hl=en&user=ni4A6KgAAAAJ&citation_for_view=ni4A6KgAAAAJ:u-x6o8ySG0sC', abstract: 'Relative to RPMI, a physiologic medium (human plasma-like medium; HPLM) induced markedly different transcriptional responses in human primary T cells and improved their activation upon antigen stimulation — an effect linked to the six-fold higher Ca2+ in HPLM. Medium composition can profoundly affect experimental results.' },
  { id: 7, title: 'Features of acute COVID-19 associated with post-acute sequelae of SARS-CoV-2 phenotypes: results from the IMPACC study', authors: 'Al Ozonoff, Naresh Doni Jayavelu, S Liu, E Melamed, CE Milliren, J Qi, LN Geng, AK Boddapati, IMPACC Network, et al.', journal: 'Nature Communications', year: 2024, category: ['Bioinformatics', 'Covid'], citations: 41, link: 'https://scholar.google.com/citations?view_op=view_citation&hl=en&user=ni4A6KgAAAAJ&citation_for_view=ni4A6KgAAAAJ:ULOm3_A8WrAC', abstract: 'We describe patient-reported outcomes on 590 participants from hospital admission through one year after discharge. Modeling identified 4 PRO clusters (minimal, physical, mental/cognitive, multidomain) supporting heterogeneous PASC presentations, with acute-phase viral burden and antibody titers associated with the more severe clusters.' },
  { id: 8, title: 'Multi-omic longitudinal study reveals immune correlates of clinical course among hospitalized COVID-19 patients', authors: 'Joann Diray-Arce, Slim Fourati, Naresh Doni Jayavelu, R Patel, C Maguire, AC Chang, AK Boddapati, IMPACC Network, et al.', journal: 'Cell Reports Medicine', year: 2023, category: ['Bioinformatics', 'Covid'], citations: 37, link: 'https://scholar.google.com/citations?view_op=view_citation&hl=en&user=ni4A6KgAAAAJ&citation_for_view=ni4A6KgAAAAJ:MXK_kJrjxJIC', abstract: 'Profiling >15,000 longitudinal blood and nasal samples from 540 IMPACC participants using 14 assays, we identified cellular and molecular signatures present within 72h of admission that distinguish moderate from severe and fatal COVID-19, and that further distinguish recovery from fatal outcomes.' },
  { id: 9, title: 'TREM2+ and interstitial-like macrophages orchestrate airway inflammation in SARS-CoV-2 infection in rhesus macaques', authors: 'Amit A Upadhyay, Elise G Viox, Timothy N Hoang, AK Boddapati, et al.', journal: 'Nature Immunology', year: 2022, category: ['Bioinformatics', 'Covid'], citations: 26, link: 'https://scholar.google.com/citations?view_op=view_citation&hl=en&user=ni4A6KgAAAAJ&citation_for_view=ni4A6KgAAAAJ:8k81kl-MbHgC', abstract: 'Single-cell analysis of the SARS-CoV-2 infected rhesus macaque airway identified TREM2+ and interstitial-like macrophage populations that orchestrate airway inflammation, providing insight into the cellular drivers of severe respiratory disease.' },
  { id: 10, title: 'Correlation Between TIGIT Expression on CD8+ T Cells and Higher Cytotoxic Capacity', authors: 'Jana Blazkova, Erin D Huiting, AK Boddapati, et al.', journal: 'Journal of Immunology', year: 2022, category: ['Bioinformatics', 'HIV Research', 'Immunology'], citations: 23, link: 'https://scholar.google.com/citations?view_op=view_citation&hl=en&user=ni4A6KgAAAAJ&citation_for_view=ni4A6KgAAAAJ:IjCSPb-OGe4C', abstract: 'Frequencies of TIGIT but not PD-1 were positively correlated with CD8+ T-lymphocyte cytotoxic activity in HIV-aviremic and healthy individuals. Transcriptome analyses showed up-regulation of antiviral genes in TIGIT+ CD8+ T cells, suggesting TIGIT+ cells maintain intrinsic cytotoxicity rather than representing exhaustion.' },
  { id: 11, title: 'Modulation of type I interferon responses potently inhibits SARS-CoV-2 replication and inflammation in rhesus macaques', authors: 'Elise G Viox, Timothy N Hoang, Amit A Upadhyay, R Nchioua, M Hirschenberger, Z Strongin, GK Tharp, M Pino, AK Boddapati, et al.', journal: 'Science Immunology', year: 2023, category: ['Bioinformatics', 'Covid'], citations: 21, link: 'https://scholar.google.com/citations?view_op=view_citation&hl=en&user=ni4A6KgAAAAJ&citation_for_view=ni4A6KgAAAAJ:kNdYIx-mwKoC', abstract: 'Using a mutated IFN-α2 (IFNmod) to modulate type I IFN signaling, we found IFNmod potently reduced SARS-CoV-2 viral loads in vitro and in vivo and reduced inflammatory cytokines and macrophages — showing that while early IFN-I restrains replication, uncontrolled IFN-I signaling drives pathogenesis.' },
  { id: 12, title: 'Early B cell factor 4 modulates FAS-mediated apoptosis and promotes cytotoxic function in human immune cells', authors: 'Satoshi Kubo, Rhea Kataria, Yikun Yao, Justin Q Gabrielski, Lixin Zheng, Tovah E Markowitz, Waipan Chan, Jian Song, AK Boddapati, et al.', journal: 'PNAS', year: 2022, category: ['Bioinformatics', 'Immunology'], citations: 12, link: 'https://scholar.google.com/citations?view_op=view_citation&hl=en&user=ni4A6KgAAAAJ&citation_for_view=ni4A6KgAAAAJ:Se3iqnhoufwC', abstract: 'We identified EBF4 in a whole-genome CRISPR screen for regulators of Fas-mediated T cell death. EBF4 regulates molecules important for NK and CD8+ T cell function, and ATAC-seq showed increased chromatin accessibility upstream of granzyme and perforin — revealing a previously unknown regulator of human cytotoxic immune function.' },
  { id: 13, title: 'Differential expression of Triggering Receptor Expressed on Myeloid cells 2 (Trem2) in tissue eosinophils', authors: 'AC Sek, CM Percopo, AK Boddapati, M Ma, WE Geslewitz, JO Krumholz, et al.', journal: 'Journal of Leukocyte Biology', year: 2021, category: ['Bioinformatics', 'Immunology'], citations: 5, link: 'https://scholar.google.com/citations?view_op=view_citation&hl=en&user=ni4A6KgAAAAJ&citation_for_view=ni4A6KgAAAAJ:9yKSN-GCB0IC', abstract: 'TREM2 is a transmembrane glycoprotein with crucial roles in phagocytosis, survival, and activation of myeloid cells. We investigated TREM2 expression in tissue eosinophils and its potential functional significance in eosinophil biology.' },
  { id: 14, title: 'Relationship of Heterologous Virus Responses and Outcomes in Hospitalized COVID-19 Patients', authors: 'Y Rosenberg-Hasson, TH Holmes, J Diray-Arce, J Chen, R Kellogg, AK Boddapati, et al.', journal: 'The Journal of Immunology', year: 2023, category: ['Bioinformatics', 'Covid'], citations: 2, link: 'https://scholar.google.com/citations?view_op=view_citation&hl=en&user=ni4A6KgAAAAJ&citation_for_view=ni4A6KgAAAAJ:Zph67rFs4hoC', abstract: 'We investigated the relationship between heterologous (cross-reactive) virus responses and clinical outcomes in hospitalized COVID-19 patients from the IMPACC study, exploring how prior immunity may influence disease course.' },
  { id: 15, title: 'Host-Microbe Multiomic Profiling Reveals Age-Dependent COVID-19 Immunopathology', authors: 'H Van Phan, A Tsitsiklis, CP Maguire, EK Haddad, PM Becker, AK Boddapati, et al.', journal: 'medRxiv', year: 2024, category: ['Bioinformatics', 'Covid'], citations: 0, link: 'https://scholar.google.com/citations?view_op=view_citation&hl=en&user=ni4A6KgAAAAJ&citation_for_view=ni4A6KgAAAAJ:_kc_bZDykSQC', abstract: 'We performed comprehensive multiomic profiling — host transcriptomics, proteomics, metabolomics, and microbiome — on hospitalized COVID-19 patients across age groups to identify age-dependent immunopathological mechanisms underlying severe disease.' },
  { id: 16, title: 'Detection and Tracking of SARS-CoV-2 Lineages through National Wastewater Surveillance System Pathogen Genomics', authors: 'DJ Feistel, R Welsh, J Mercante, M Mark-Carew, J Caravas, AK Boddapati, et al.', journal: 'Emerging Infectious Diseases', year: 2025, category: ['Bioinformatics', 'Covid', 'Surveillance', 'Nextflow', 'Metagenomics'], citations: 0, link: 'https://scholar.google.com/citations?view_op=view_citation&hl=en&user=ni4A6KgAAAAJ&citation_for_view=ni4A6KgAAAAJ:aqlVkmm33-oC', abstract: 'We developed and implemented pathogen genomics approaches within the National Wastewater Surveillance System to detect and track SARS-CoV-2 lineages across the United States, providing insight into viral evolution and transmission patterns.' },
  { id: 18, title: 'Targeted plasma proteomics uncover novel proteins associated with KIF5A-linked SPG10 and ALS spectrum disorders', authors: 'J Dulski, AK Boddapati, B Risi, P Iruzubieta, A Orlacchio, et al.', journal: 'HGG Advances', year: 2026, category: ['Bioinformatics', 'Proteomics', 'Neurology'], citations: 0, cofirst: true, link: 'https://www.cell.com/hgg-advances/fulltext/S2666-2477(25)00101-0', abstract: 'Mutations in KIF5A cause hereditary spastic paraplegia type 10 (SPG10) and are associated with ALS. We performed targeted plasma proteomics to identify novel protein biomarkers and pathways associated with KIF5A-linked neurological disorders, providing insight into disease mechanisms and potential therapeutic targets.' },
];

const filters = ['all', 'Covid', 'Immunology', 'HIV Research', 'Vaccine Research', 'Bioinformatics', 'Metagenomics', 'Nextflow', 'Surveillance', 'Proteomics', 'Neurology'];
const labelMap = { all: 'All', Covid: 'COVID-19' };

// Normalised title key, used to match curated papers to live Scholar data.
const norm = (s) => String(s).toLowerCase().replace(/[^a-z0-9]+/g, '');

const Publications = () => {
  const [filter, setFilter] = useState('all');
  const [open, setOpen] = useState({});
  const [activeYear, setActiveYear] = useState(null);
  const groupRefs = useRef({});
  const scholar = useScholar();

  // Live per-paper citation counts from Google Scholar, keyed by title. Falls
  // back to the curated baseline for any paper not found on the profile.
  const citeMap = useMemo(() => {
    const m = new Map();
    (scholar.papers || []).forEach((p) => {
      if (p && p.title && typeof p.citations === 'number') m.set(norm(p.title), p.citations);
    });
    return m;
  }, [scholar.papers]);

  const citesOf = useCallback(
    (p) => {
      const key = norm(p.title);
      if (citeMap.has(key)) return citeMap.get(key);
      // Tolerate small title differences (e.g. Scholar dropping a word) by
      // matching on the longest shared title prefix; ignore weak (<24 char)
      // matches so papers absent from the profile keep their curated count.
      let best = null;
      let bestLen = 0;
      citeMap.forEach((cites, k) => {
        let i = 0;
        const max = Math.min(k.length, key.length);
        while (i < max && k[i] === key[i]) i += 1;
        if (i > bestLen) { bestLen = i; best = cites; }
      });
      return bestLen >= 24 ? best : p.citations;
    },
    [citeMap],
  );

  const filtered = filter === 'all' ? publications : publications.filter((p) => p.category?.includes(filter));

  const byYear = useMemo(() => {
    const g = {};
    filtered.forEach((p) => { (g[p.year] = g[p.year] || []).push(p); });
    return Object.keys(g)
      .sort((a, b) => b - a)
      .map((y) => ({ year: y, pubs: g[y].sort((a, b) => citesOf(b) - citesOf(a)) }));
  }, [filtered, citesOf]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => { if (e.isIntersecting) setActiveYear(e.target.dataset.year); });
      },
      { rootMargin: '-20% 0px -70% 0px', threshold: 0 },
    );
    Object.values(groupRefs.current).forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, [byYear]);

  const renderAuthors = (a) => ({ __html: a.replace('AK Boddapati', '<b>AK Boddapati</b>') });

  return (
    <Section id="publications">
      <Container>
        <PageHeader index="03" eyebrow="Research" title="Publications" lead="18+ peer-reviewed papers across Cell, Immunity, Nature Immunology, Science Advances, and more — totaling 800+ citations (h-index 11)." />

        <Reveal>
          <Filters>
            {filters.map((f) => (
              <Chip key={f} $active={filter === f} onClick={() => setFilter(f)}>{labelMap[f] || f}</Chip>
            ))}
          </Filters>
        </Reveal>

        <Split>
          <Rail>
            <Summary>
              <div className="stat"><div className="n">{scholar.documents}+</div><div className="l">Peer-reviewed papers</div></div>
              <div className="stat"><div className="n">{scholar.citations.toLocaleString()}</div><div className="l">Total citations</div></div>
              <div className="stat"><div className="n">{scholar.hIndex}</div><div className="l">h-index</div></div>
            </Summary>
            <YearNav>
              {byYear.map(({ year, pubs }) => (
                <YearNavItem
                  key={year}
                  className={activeYear === year ? 'active' : ''}
                  onClick={() => scrollToSection(`pubyear-${year}`)}
                >
                  <span className="y">{year}</span>
                  <span className="c">{pubs.length}</span>
                </YearNavItem>
              ))}
            </YearNav>
          </Rail>

          <div>
            {byYear.map(({ year, pubs }) => (
              <YearGroup
                key={year}
                id={`pubyear-${year}`}
                data-year={year}
                ref={(el) => { groupRefs.current[year] = el; }}
              >
                <Reveal>
                  <YearHead>
                    <div className="big">{year}</div>
                    <span className="count">{pubs.length} paper{pubs.length > 1 ? 's' : ''}</span>
                  </YearHead>
                </Reveal>
                {pubs.map((p) => (
                  <Reveal key={p.id}>
                    <PubRow>
                      <div>
                        <span className="journal">{p.journal}{p.cofirst && <span className="cofirst"><FaStar /> Co-first author</span>}</span>
                        <div className="title">{p.title}</div>
                        <p className="authors" dangerouslySetInnerHTML={renderAuthors(p.authors)} />
                        <Tools>
                          <button onClick={() => setOpen((o) => ({ ...o, [p.id]: !o[p.id] }))}>
                            {open[p.id] ? 'Hide abstract' : 'Abstract'}
                          </button>
                          <a href={p.link} target="_blank" rel="noopener noreferrer">Source <FaExternalLinkAlt style={{ fontSize: '0.7rem' }} /></a>
                        </Tools>
                      </div>
                      <Cite $hot={citesOf(p) >= 50}>
                        <div className="n">{citesOf(p)}</div>
                        <div className="l">citation{citesOf(p) === 1 ? '' : 's'}</div>
                      </Cite>
                      {open[p.id] && <Abstract>{p.abstract}</Abstract>}
                    </PubRow>
                  </Reveal>
                ))}
              </YearGroup>
            ))}
          </div>
        </Split>
      </Container>
    </Section>
  );
};

export default Publications;

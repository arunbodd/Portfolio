import React, { useState, useContext, useMemo } from 'react';
import styled from 'styled-components';
import { ThemeContext } from '../context/ThemeContext';

const PageContainer = styled.div`
  background: ${props => props.theme.background};
  min-height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const PublicationsContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  color: ${props => props.theme.textSlate};
  width: 100%;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 1.5rem;
  color: ${props => props.theme.textLightSlate};
  position: relative;
  
  &:after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 0;
    width: 80px;
    height: 4px;
    background: ${props => props.theme.highlight};
  }
`;

const FilterContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin: 2rem 0;
`;

const FilterButton = styled.button`
  background: ${props => props.active ? props.theme.highlight : 'transparent'};
  color: ${props => props.active ? props.theme.navy : props.theme.textLightSlate};
  border: 1px solid ${props => props.theme.highlight};
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: ${props => props.active ? props.theme.highlight : props.theme.highlightTint};
    color: ${props => props.active ? props.theme.navy : props.theme.textLightSlate};
  }
`;

const TimelineList = styled.div`
  margin-top: 3rem;
  position: relative;
  &:before {
    content: '';
    position: absolute;
    left: 50%;
    top: 0;
    bottom: 0;
    width: 2px;
    background: ${props => props.theme.highlight};
    transform: translateX(-50%);
  }
`;

const TimelineItem = styled.div`
  position: relative;
  width: 50%;
  padding: 20px;
  box-sizing: border-box;
  margin-bottom: 30px;
  &:nth-child(odd) {
    left: 0;
  }
  &:nth-child(even) {
    left: 50%;
  }
  &:before {
    content: attr(data-year);
    position: absolute;
    top: 20px;
    width: 40px;
    height: 40px;
    background: ${props => props.theme.highlight};
    border-radius: 50%;
    transform: translateY(-50%);
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-size: 0.8rem;
  }
  &:nth-child(odd):before {
    right: -20px;
  }
  &:nth-child(even):before {
    left: -20px;
  }
`;

const Content = styled.div`
  background: ${props => props.theme.cardBackground};
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  }
`;

const YearPublications = styled.div`
  margin-top: 15px;
`;

const YearHeader = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  margin-bottom: 1rem;
  font-size: 1.5rem;
  font-weight: 600;
  color: ${props => props.theme.textLightSlate};
  
  &:hover {
    color: ${props => props.theme.highlight};
  }
`;

const PublicationItem = styled.div`
  margin-bottom: 2rem;
  padding: 1.5rem;
  border-radius: 8px;
  background-color: ${props => props.theme.lightNavy};
  transition: transform 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  }
`;

const PublicationTitle = styled.h3`
  font-size: 1.3rem;
  margin-bottom: 0.5rem;
  color: ${props => props.theme.textLightSlate};
`;

const PublicationAuthors = styled.p`
  font-size: 1rem;
  margin-bottom: 0.5rem;
  color: ${props => props.theme.textSlate};
`;

const PublicationJournal = styled.p`
  font-style: italic;
  margin-bottom: 0.5rem;
  color: ${props => props.theme.textLightSlate};
`;

const PublicationCitations = styled.span`
  display: inline-block;
  margin-left: 1rem;
  padding: 0.2rem 0.5rem;
  background-color: ${props => props.theme.highlight};
  color: ${props => props.theme.navy};
  border-radius: 4px;
  font-size: 0.9rem;
`;

const PublicationLink = styled.a`
  color: ${props => props.theme.highlight};
  text-decoration: none;
  margin-right: 1rem;
  
  &:hover {
    text-decoration: underline;
  }
`;

const AbstractToggle = styled.button`
  background: transparent;
  color: ${props => props.theme.highlight};
  border: none;
  cursor: pointer;
  font-size: 0.9rem;
  padding: 0;
  text-decoration: underline;
  
  &:hover {
    color: ${props => props.theme.highlightTint};
  }
`;

const Abstract = styled.div`
  margin-top: 1rem;
  padding: 1rem;
  background-color: ${props => props.theme.navy};
  border-radius: 4px;
  font-size: 0.95rem;
  line-height: 1.6;
`;

const NoResults = styled.p`
  text-align: center;
  font-size: 1.2rem;
  margin-top: 2rem;
  color: ${props => props.theme.textSlate};
`;

const Publications = () => {
  const [filter, setFilter] = useState('all');
  const [expandedAbstracts, setExpandedAbstracts] = useState({});
  const [expandedYears, setExpandedYears] = useState({});
  const theme = useContext(ThemeContext).theme;
  
  const toggleAbstract = (id) => {
    setExpandedAbstracts({
      ...expandedAbstracts,
      [id]: !expandedAbstracts[id]
    });
  };

  const toggleYear = (year) => {
    setExpandedYears({
      ...expandedYears,
      [year]: !expandedYears[year]
    });
  };
  
  const publications = [
    {
      id: 1,
      title: "Tau-typing: a Nextflow pipeline for finding the best phylogenetic markers in the genome for molecular typing of microbial species",
      authors: "Matthew H. Seabolt, AK Boddapati, Joshua J. Forstedt, Konstantinos T. Konstantinidis",
      journal: "Bioinformatics",
      year: 2023,
      citations: 0,
      link: "https://academic.oup.com/bioinformatics/article/39/7/btad425/7221034",
      abstract: "Tau-typing is an integrated analysis pipeline for identifying genes or genomic segments whose phylogenetic resolving power most closely resembles the genome-wide resolving power of an input collection of genomes using the Kendall Tau rank correlation statistic. The pipeline is implemented in Nextflow and enables on-demand, high-resolution molecular typing for pathogen genomics.",
      category: ["Immunological methods", "Immunology"]
    },
    {
      id: 2,
      title: "Experimental Babesia rossi infection induces hemolytic, metabolic, and viral response pathways in the canine host",
      authors: "Rachel L. Smith, Amelia Goddard, AK Boddapati, Steven Brooks, Johan P. Schoeman, Justin Lack, Andrew Leisewitz, Hans Ackerman",
      journal: "BMC Genomics",
      year: 2021,
      citations: 9,
      link: "https://bmcgenomics.biomedcentral.com/articles/10.1186/s12864-021-07889-4",
      abstract: "Babesia rossi is a leading cause of morbidity and mortality among the canine population of sub-Saharan Africa. This study examined the transcriptional response of the canine host to experimental B. rossi infection, identifying genes and pathways involved in response to hemolysis, metabolic changes, and viral response pathways in the canine host.",
      category: ["Immunology"]
    },
    {
      id: 3,
      title: 'Baricitinib treatment resolves lower-airway macrophage inflammation and neutrophil recruitment in SARS-CoV-2-infected rhesus macaques',
      authors: 'Hoang TN, Pino M, AK Boddapati, et al.',
      journal: 'Cell',
      year: 2021,
      category: 'Covid',
      citations: 210,
      link: 'https://scholar.google.com/citations?view_op=view_citation&hl=en&oe=ASCII&user=ni4A6KgAAAAJ&citation_for_view=ni4A6KgAAAAJ:2osOgNQ5qMEC',
      abstract: 'SARS-CoV-2-induced hypercytokinemia and inflammation are critically associated with COVID-19 severity. Baricitinib, a clinically approved JAK1/JAK2 inhibitor, is currently being investigated in COVID-19 clinical trials. Here, we investigated the immunologic and virologic efficacy of baricitinib in a rhesus macaque model of SARS-CoV-2 infection. Viral shedding measured from nasal and throat swabs, bronchoalveolar lavages, and tissues was not reduced with baricitinib. Type I interferon (IFN) antiviral responses and SARS-CoV-2-specific T cell responses remained similar between the two groups. Animals treated with baricitinib showed reduced inflammation, decreased lung infiltration of inflammatory cells, reduced NETosis activity, and more limited lung pathology. Importantly, baricitinib-treated animals had a rapid and remarkably potent suppression of lung macrophage production of cytokines and chemokines responsible for inflammation and neutrophil recruitment. These data support a beneficial role for, and elucidate the immunological mechanisms underlying, the use of baricitinib as a frontline treatment for inflammation induced by SARS-CoV-2 infection.'
    },
    {
      id: 4,
      title: 'Shared transcriptional profiles of atypical B cells suggest common drivers of expansion and function in malaria, HIV, and autoimmunity',
      authors: 'Prasida Holla, Brian Dizon, Abhijit A. Ambegaonkar, Noga Rogel, Ella Goldschmidt, AK Boddapati, et al.',
      journal: 'Science Advances',
      year: 2021,
      category: 'immunology',
      citations: 111,
      link: 'https://scholar.google.com/citations?view_op=view_citation&hl=en&oe=ASCII&user=ni4A6KgAAAAJ&citation_for_view=ni4A6KgAAAAJ:zYLM7Y9cAGgC',
      abstract: 'Chronic infectious diseases have a substantial impact on the human B cell compartment including a notable expansion of B cells here termed atypical B cells (ABCs). Using unbiased single-cell RNA sequencing (scRNA-seq), we uncovered and characterized heterogeneities in naïve B cell, classical memory B cells, and ABC subsets. We showed remarkably similar transcriptional profiles for ABC clusters in malaria, HIV, and autoimmune diseases and demonstrated that interferon-γ drove the expansion of ABCs in malaria. These observations suggest that ABCs represent a separate B cell lineage with a common inducer that further diversifies and acquires disease-specific characteristics and functions. In malaria, we identified ABC subsets based on isotype expression that differed in expansion in African children and in B cell receptor repertoire characteristics. Of particular interest, IgD+IgMlo and IgD−IgG+ ABCs acquired a high antigen affinity threshold for activation, suggesting that ABCs may limit autoimmune responses to low-affinity self-antigens in chronic malaria.'
    },
    {
      id: 5,
      title: 'A modified vaccinia Ankara vector-based vaccine protects macaques from SARS-CoV-2 infection, immune pathology, and dysfunction in the lungs',
      authors: 'Routhu NK, Cheedarla N, AK Boddapati, et al.',
      journal: 'Immunity',
      year: 2021,
      category: ['covid', 'Vaccine Research', 'Immunology'],
      citations: 90,
      link: 'https://scholar.google.com/citations?view_op=view_citation&hl=en&oe=ASCII&user=ni4A6KgAAAAJ&citation_for_view=ni4A6KgAAAAJ:qjMakFHDy7sC',
      abstract: 'A combination of vaccination approaches will likely be necessary to fully control the severe acute respiratory syndrome coronavirus 2 (SARS-CoV-2) pandemic. Here, we show that modified vaccinia Ankara (MVA) vectors expressing membrane-anchored pre-fusion stabilized spike (MVA/S) but not secreted S1 induced strong neutralizing antibody responses against SARS-CoV-2 in mice. In macaques, the MVA/S vaccination induced strong neutralizing antibodies and CD8+ T cell responses, and conferred protection from SARS-CoV-2 infection and virus replication in the lungs as early as day 2 following intranasal and intratracheal challenge. Single-cell RNA sequencing analysis of lung cells on day 4 after infection revealed that MVA/S vaccination also protected macaques from infection-induced inflammation and B cell abnormalities and lowered induction of interferon-stimulated genes. These results demonstrate that MVA/S vaccination induces neutralizing antibodies and CD8+ T cells in the blood and lungs and is a potential vaccine candidate for SARS-CoV-2.'
    },
    {
      id: 6,
      title: 'Human plasma-like medium improves T lymphocyte activation',
      authors: 'Michael A Leney-Greene, AK Boddapati, et al.',
      journal: 'iScience',
      year: 2020,
      category: ['Immunology', 'Immunological methods'],
      citations: 51,
      link: 'https://scholar.google.com/citations?view_op=view_citation&hl=en&oe=ASCII&user=ni4A6KgAAAAJ&citation_for_view=ni4A6KgAAAAJ:u-x6o8ySG0sC',
      abstract: 'T lymphocytes are critical for effective immunity, and the ability to study their behavior in vitro can facilitate major insights into their development, function, and fate. However, the composition of human plasma differs from conventional media, and we hypothesized that such differences could impact immune cell physiology. Here, we showed that relative to the medium typically used to culture lymphocytes (RPMI), a physiologic medium (human plasma-like medium; HPLM) induced markedly different transcriptional responses in human primary T cells and in addition, improved their activation upon antigen stimulation. We found that this medium-dependent effect on T cell activation is linked to Ca2+, which is six-fold higher in HPLM than in RPMI. Thus, a medium that more closely resembles human plasma has striking effects on T cell biology, further demonstrates that medium composition can profoundly affect experimental results, and broadly suggests that physiologic media may offer a valuable way to study cultured immune cells.'
    },
    {
      id: 7,
      title: 'Features of acute COVID-19 associated with post-acute sequelae of SARS-CoV-2 phenotypes: results from the IMPACC study',
      authors: 'Al Ozonoff, Naresh Doni Jayavelu, IMPACC Network,et al.',
      journal: 'Nature Medicine',
      year: 2023,
      category: 'Covid',
      citations: 34,
      link: 'https://scholar.google.com/citations?view_op=view_citation&hl=en&oe=ASCII&user=ni4A6KgAAAAJ&citation_for_view=ni4A6KgAAAAJ:ULOm3_A8WrAC',
      abstract: 'Post-acute sequelae of SARS-CoV-2 (PASC) is a significant public health concern. We describe Patient Reported Outcomes (PROs) on 590 participants prospectively assessed from hospital admission for COVID-19 through one year after discharge. Modeling identified 4 PRO clusters based on reported deficits (minimal, physical, mental/cognitive, and multidomain), supporting heterogenous clinical presentations in PASC, with sub-phenotypes associated with female sex and distinctive comorbidities. During the acute phase of disease, a higher respiratory SARS-CoV-2 viral burden and lower Receptor Binding Domain and Spike antibody titers were associated with both the physical predominant and the multidomain deficit clusters. A lower frequency of circulating B lymphocytes by mass cytometry (CyTOF) was observed in the multidomain deficit cluster. Circulating fibroblast growth factor 21 (FGF21) was significantly elevated in the mental/cognitive predominant and the multidomain clusters. Future efforts to link PASC to acute anti-viral host responses may help to better target treatment and prevention of PASC.'
    },
    {
      id: 8,
      title: 'Multi-omic longitudinal study reveals immune correlates of clinical course among hospitalized COVID-19 patients',
      authors: 'Joann Diray-Arce, Slim Fourati, Naresh Doni Jayavelu, IMPACC Network, et al.',
      journal: 'Cell',
      year: 2022,
      category: 'Covid',
      citations: 28,
      link: 'https://scholar.google.com/citations?view_op=view_citation&hl=en&oe=ASCII&user=ni4A6KgAAAAJ&citation_for_view=ni4A6KgAAAAJ:MXK_kJrjxJIC',
      abstract: 'The IMPACC cohort, composed of >1,000 hospitalized COVID-19 participants, contains five illness trajectory groups (TGs) during acute infection (first 28 days), ranging from milder (TG1–3) to more severe disease course (TG4) and death (TG5). Here, we report deep immunophenotyping, profiling of >15,000 longitudinal blood and nasal samples from 540 participants of the IMPACC cohort, using 14 distinct assays. These unbiased analyses identify cellular and molecular signatures present within 72 h of hospital admission that distinguish moderate from severe and fatal COVID-19 disease. Importantly, cellular and molecular states also distinguish participants with more severe disease that recover or stabilize within 28 days from those that progress to fatal outcomes (TG4 vs. TG5). Furthermore, our longitudinal design reveals that these biologic states display distinct temporal patterns associated with clinical outcomes. Characterizing host immune responses in relation to heterogeneity in disease course may inform clinical prognosis and opportunities for intervention.'
    },
    {
      id: 9,
      title: 'TREM2+ and interstitial-like macrophages orchestrate airway inflammation in SARS-CoV-2 infection in rhesus macaques',
      authors: 'Amit A Upadhyay, Elise G Viox, Timothy N Hoang, AK Boddapati, et al.',
      journal: 'Nature Immunology',
      year: 2022,
      category: 'Covid',
      citations: 26,
      link: 'https://scholar.google.com/citations?view_op=view_citation&hl=en&oe=ASCII&user=ni4A6KgAAAAJ&citation_for_view=ni4A6KgAAAAJ:8k81kl-MbHgC',
      abstract: 'The IMPACC cohort, composed of >1,000 hospitalized COVID-19 participants, contains five illness trajectory groups (TGs) during acute infection (first 28 days), ranging from milder (TG1–3) to more severe disease course (TG4) and death (TG5). Here, we report deep immunophenotyping, profiling of >15,000 longitudinal blood and nasal samples from 540 participants of the IMPACC cohort, using 14 distinct assays. These unbiased analyses identify cellular and molecular signatures present within 72 h of hospital admission that distinguish moderate from severe and fatal COVID-19 disease. Importantly, cellular and molecular states also distinguish participants with more severe disease that recover or stabilize within 28 days from those that progress to fatal outcomes (TG4 vs. TG5). Furthermore, our longitudinal design reveals that these biologic states display distinct temporal patterns associated with clinical outcomes. Characterizing host immune responses in relation to heterogeneity in disease course may inform clinical prognosis and opportunities for intervention.'
    },
    {
      id: 10,
      title: 'Correlation Between TIGIT Expression on CD8+ T Cells and Higher Cytotoxic Capacity',
      authors: 'Jana Blazkova, Erin D Huiting, AK Boddapati, et al.',
      journal: 'Journal of Immunology',
      year: 2022,
      category: ['HIV Research', 'Immunology'],
      citations: 23,
      link: 'https://scholar.google.com/citations?view_op=view_citation&hl=en&oe=ASCII&user=ni4A6KgAAAAJ&citation_for_view=ni4A6KgAAAAJ:IjCSPb-OGe4C',
      abstract: 'Persistent exposure to antigen leads to T-cell exhaustion and immunologic dysfunction. We examined the immune exhaustion markers T cell immunoglobulin and ITIM domain (TIGIT) and programmed cell death protein 1 (PD-1) in human immunodeficiency virus (HIV)–infected and healthy individuals and the relationship with cytotoxic CD8+ T-lymphocyte activity. Frequencies of TIGIT but not PD-1 were positively correlated with CD8+ T-lymphocyte activity in HIV-aviremic and healthy individuals; however, there was no correlation in HIV-viremic individuals. Transcriptome analyses revealed up-regulation of genes associated with antiviral immunity in TIGIT+CD8+ versus TIGIT−CD8+ T cells. Our data suggest that TIGIT+CD8+ T cells do not necessarily represent a state of immune exhaustion and maintain an intrinsic cytotoxicity in HIV-infected individuals.'
    },
    {
      id: 11,
      title: 'Modulation of type I interferon responses potently inhibits SARS-CoV-2 replication and inflammation in rhesus macaques',
      authors: 'Elise G Viox, Timothy N Hoang, Amit A Upadhyay, Rayhane Nchioua, Maximilian Hirschenberger, Zachary Strongin, Gregory K Tharp, Maria Pino, Kevin Nguyen, Justin L Harper, Matthew Gagne, Shir Marciano, AK Boddapati,et al.',
      journal: 'Nature Communications',
      year: 2022,
      category: 'Covid',
      citations: 21,
      link: 'https://scholar.google.com/citations?view_op=view_citation&hl=en&oe=ASCII&user=ni4A6KgAAAAJ&citation_for_view=ni4A6KgAAAAJ:kNdYIx-mwKoC',
      abstract: 'Type I interferons (IFN-I) are critical mediators of innate control of viral infections but also drive the recruitment of inflammatory cells to sites of infection, a key feature of severe coronavirus disease 2019. Here, IFN-I signaling was modulated in rhesus macaques (RMs) before and during acute SARS-CoV-2 (severe acute respiratory syndrome coronavirus 2) infection using a mutated IFN-α2 (IFN-modulator; IFNmod), which has previously been shown to reduce the binding and signaling of endogenous IFN-I. IFNmod treatment in uninfected RMs was observed to induce a modest up-regulation of only antiviral IFN-stimulated genes (ISGs); however, in SARS-CoV-2–infected RMs, IFNmod reduced both antiviral and inflammatory ISGs. IFNmod treatment resulted in a potent reduction in SARS-CoV-2 viral loads both in vitro in Calu-3 cells and in vivo in bronchoalveolar lavage (BAL), upper airways, lung, and hilar lymph nodes of RMs. Furthermore, in SARS-CoV-2–infected RMs, IFNmod treatment potently reduced inflammatory cytokines, chemokines, and CD163+ MRC1− inflammatory macrophages in BAL and expression of Siglec-1 on circulating monocytes. In the lung, IFNmod also reduced pathogenesis and attenuated pathways of inflammasome activation and stress response during acute SARS-CoV-2 infection. Using an intervention targeting both IFN-α and IFN-β pathways, this study shows that, whereas early IFN-I restrains SARS-CoV-2 replication, uncontrolled IFN-I signaling critically contributes to SARS-CoV-2 inflammation and pathogenesis in the moderate disease model of RMs.'
    },
    {
      id: 12,
      title: 'Early B cell factor 4 modulates FAS-mediated apoptosis and promotes cytotoxic function in human immune cells',
      authors: 'Satoshi Kubo, Rhea Kataria, Yikun Yao, Justin Q Gabrielski, Lixin Zheng, Tovah E Markowitz, Waipan Chan, Jian Song, AK Boddapati, et al.',
      journal: 'Journal of Immunology',
      year: 2023,
      category: 'Immunology',
      citations: 9,
      link: 'https://scholar.google.com/citations?view_op=view_citation&hl=en&oe=ASCII&user=ni4A6KgAAAAJ&citation_for_view=ni4A6KgAAAAJ:Se3iqnhoufwC',
      abstract: 'Apoptosis is a genetically regulated program of cell death that plays a key role in immune disease processes. We identified EBF4, a little-studied member of the early B cell factor (EBF) family of transcription factors, in a whole-genome CRISPR screen for regulators of Fas/APO-1/CD95-mediated T cell death. Loss of EBF4 increases the half-life of the c-FLIP protein, and its presence in the Fas signaling complex impairs caspase-8 cleavage and apoptosis. Transcriptome analysis revealed that EBF4 regulates molecules such as TBX21, EOMES, granzyme, and perforin that are important for human natural killer (NK) and CD8+ T cell functions. Proximity-dependent biotin identification (Bio-ID) mass spectrometry analyses showed EBF4 binding to STAT3, STAT5, and MAP kinase 3 and a strong pathway relationship to interleukin-2 regulated genes, which are known to govern cytotoxicity pathways. Chromatin immunoprecipitation and DNA sequencing analysis defined a canonical EBF4 binding motif, 5′-CCCNNGG/AG-3′, closely related to the EBF1 binding site; using a luciferase-based reporter, we found a dose-dependent transcriptional response of this motif to EBF4. We also conducted assay for transposase-accessible chromatin sequencing in EBF4-overexpressing cells and found increased chromatin accessibility upstream of granzyme and perforin and in topologically associated domains in human lymphocytes. Finally, we discovered that the EBF4 has basal expression in human but not mouse NK cells and CD8+ T cells and vanishes following activating stimulation. Together, our data reveal key features of a previously unknown transcriptional regulator of human cytotoxic immune function.'
    }
  ];
  
  const filteredPublications = filter === 'all' 
    ? publications 
    : publications.filter(pub => pub.category === filter || (Array.isArray(pub.category) && pub.category.includes(filter)));
  
  // Group publications by year
  const publicationsByYear = useMemo(() => {
    const grouped = {};
    
    filteredPublications.forEach(pub => {
      if (!grouped[pub.year]) {
        grouped[pub.year] = [];
      }
      grouped[pub.year].push(pub);
    });
    
    // Sort years in descending order
    return Object.keys(grouped)
      .sort((a, b) => b - a)
      .map(year => ({
        year,
        publications: grouped[year]
      }));
  }, [filteredPublications]);
  
  return (
    <PageContainer>
      <PublicationsContainer>
        <Title>Publications</Title>
        
        <FilterContainer>
          <FilterButton 
            active={filter === 'all'} 
            onClick={() => setFilter('all')}
          >
            All
          </FilterButton>
          <FilterButton 
            active={filter === 'Covid'} 
            onClick={() => setFilter('Covid')}
          >
            COVID-19
          </FilterButton>
          <FilterButton 
            active={filter === 'Immunology'} 
            onClick={() => setFilter('Immunology')}
          >
            Immunology
          </FilterButton>
          <FilterButton 
            active={filter === 'HIV Research'} 
            onClick={() => setFilter('HIV Research')}
          >
            HIV Research
          </FilterButton>
          <FilterButton 
            active={filter === 'Vaccine Research'} 
            onClick={() => setFilter('Vaccine Research')}
          >
            Vaccine Research
          </FilterButton>
          <FilterButton 
            active={filter === 'Immunological methods'} 
            onClick={() => setFilter('Immunological methods')}
          >
            Immunological Methods
          </FilterButton>
        </FilterContainer>
        
        {filteredPublications.length > 0 ? (
          <TimelineList>
            {publicationsByYear.map(({ year, publications }) => (
              <TimelineItem key={year} data-year={year}>
                <Content>
                  <YearHeader onClick={() => toggleYear(year)}>
                    {year} ({publications.length})
                  </YearHeader>
                  
                  {expandedYears[year] !== false && (
                    <YearPublications>
                      {publications.map(pub => (
                        <PublicationItem key={pub.id}>
                          <PublicationTitle>{pub.title}</PublicationTitle>
                          <PublicationAuthors dangerouslySetInnerHTML={{ __html: pub.authors.replace('AK Boddapati', `<span style="font-weight: bold; color: ${theme.highlight}">AK Boddapati</span>`) }} />
                          <PublicationJournal>
                            {pub.journal}
                            <PublicationCitations>{pub.citations} citations</PublicationCitations>
                          </PublicationJournal>
                          <div>
                            <PublicationLink href={pub.link} target="_blank" rel="noopener noreferrer">
                              View on Google Scholar
                            </PublicationLink>
                            <AbstractToggle onClick={() => toggleAbstract(pub.id)}>
                              {expandedAbstracts[pub.id] ? 'Hide Abstract' : 'Show Abstract'}
                            </AbstractToggle>
                          </div>
                          {expandedAbstracts[pub.id] && (
                            <Abstract>{pub.abstract}</Abstract>
                          )}
                        </PublicationItem>
                      ))}
                    </YearPublications>
                  )}
                </Content>
              </TimelineItem>
            ))}
          </TimelineList>
        ) : (
          <NoResults>No publications found for the selected filter.</NoResults>
        )}
      </PublicationsContainer>
    </PageContainer>
  );
};

export default Publications;

import React, { useState } from 'react';
import styled from 'styled-components';
import { FaFilePdf, FaExternalLinkAlt } from 'react-icons/fa';

const PublicationsContainer = styled.div`
  background: #0a192f;
  color: #8892b0;
  padding: 100px calc((100vw - 1200px) / 2);
  
  @media screen and (max-width: 768px) {
    padding: 80px 24px;
  }
`;

const PublicationsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
`;

const SectionTitle = styled.h2`
  color: #ccd6f6;
  font-size: 32px;
  margin-bottom: 16px;
  position: relative;
  
  &:before {
    content: '';
    position: absolute;
    bottom: -8px;
    left: 0;
    width: 70px;
    height: 3px;
    background: #64ffda;
  }
`;

const SectionDescription = styled.p`
  margin-top: 20px;
  margin-bottom: 40px;
  font-size: 18px;
  line-height: 1.6;
  max-width: 800px;
`;

const FilterContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  margin: 20px 0 40px;
  flex-wrap: wrap;
`;

const FilterButton = styled.button`
  background: ${({ active }) => (active ? 'rgba(100, 255, 218, 0.1)' : 'transparent')};
  color: ${({ active }) => (active ? '#64ffda' : '#ccd6f6')};
  border: 1px solid ${({ active }) => (active ? '#64ffda' : '#8892b0')};
  border-radius: 4px;
  padding: 8px 16px;
  margin: 0 8px 8px 0;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(100, 255, 218, 0.1);
    color: #64ffda;
    border-color: #64ffda;
  }
`;

const PublicationsList = styled.div`
  display: flex;
  flex-direction: column;
`;

const PublicationItem = styled.div`
  background: #112240;
  border-radius: 5px;
  padding: 30px;
  margin-bottom: 30px;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  }
`;

const PublicationTitle = styled.h3`
  color: #e6f1ff;
  font-size: 22px;
  margin-bottom: 10px;
`;

const PublicationAuthors = styled.p`
  font-size: 16px;
  margin-bottom: 10px;
  
  span {
    color: #64ffda;
  }
`;

const PublicationJournal = styled.p`
  font-style: italic;
  margin-bottom: 15px;
`;

const PublicationYear = styled.span`
  background: rgba(100, 255, 218, 0.1);
  color: #64ffda;
  padding: 4px 10px;
  border-radius: 3px;
  font-size: 14px;
  margin-left: 10px;
`;

const PublicationAbstract = styled.p`
  font-size: 16px;
  line-height: 1.6;
  margin: 20px 0;
`;

const PublicationLinks = styled.div`
  display: flex;
  margin-top: 15px;
`;

const PublicationLink = styled.a`
  display: flex;
  align-items: center;
  color: #ccd6f6;
  margin-right: 20px;
  text-decoration: none;
  transition: color 0.3s ease;
  
  svg {
    margin-right: 8px;
  }
  
  &:hover {
    color: #64ffda;
  }
`;

const ExpandButton = styled.button`
  background: transparent;
  border: none;
  color: #64ffda;
  cursor: pointer;
  margin-top: 10px;
  padding: 0;
  font-size: 14px;
  display: flex;
  align-items: center;
  
  &:hover {
    text-decoration: underline;
  }
`;

const Publications = () => {
  const [filter, setFilter] = useState('all');
  const [expandedIds, setExpandedIds] = useState([]);
  
  const toggleExpand = (id) => {
    if (expandedIds.includes(id)) {
      setExpandedIds(expandedIds.filter(expandedId => expandedId !== id));
    } else {
      setExpandedIds([...expandedIds, id]);
    }
  };
  
  const publications = [
    {
      id: 1,
      title: 'Genomic Analysis of Ebola Virus Mutations During the 2021-2022 Outbreak',
      authors: 'Smith J, Johnson A, <span>Boddapati A</span>, Williams R',
      journal: 'Journal of Virology',
      year: '2023',
      abstract: 'This study presents a comprehensive genomic analysis of Ebola virus mutations observed during the 2021-2022 outbreak in Central Africa. Using next-generation sequencing and advanced bioinformatics approaches, we identified several novel mutations that may be associated with increased viral fitness and transmission. Our findings provide valuable insights into the evolutionary dynamics of Ebola virus and may inform the development of more effective diagnostic tools and therapeutic interventions.',
      doi: 'https://doi.org/10.1234/jv.2023.001',
      pdf: 'https://example.com/publications/ebola-mutations.pdf',
      category: 'genomics'
    },
    {
      id: 2,
      title: 'Machine Learning Approaches for Predicting Gene Expression from Regulatory Elements',
      authors: '<span>Boddapati A</span>, Chen L, Garcia M, Davis P',
      journal: 'Bioinformatics',
      year: '2022',
      abstract: 'In this paper, we present a novel machine learning framework for predicting gene expression levels based on regulatory elements and genomic features. Our approach integrates convolutional neural networks with attention mechanisms to capture complex relationships between regulatory elements and gene expression. We demonstrate that our model outperforms existing methods on multiple datasets and provides interpretable insights into the regulatory mechanisms governing gene expression.',
      doi: 'https://doi.org/10.1093/bioinformatics/btx123',
      pdf: 'https://example.com/publications/gene-expression-ml.pdf',
      category: 'machine-learning'
    },
    {
      id: 3,
      title: 'Single-cell Transcriptomics Reveals Cellular Heterogeneity in Pancreatic Cancer',
      authors: 'Brown R, <span>Boddapati A</span>, Taylor S, Martinez E',
      journal: 'Nature Communications',
      year: '2021',
      abstract: 'Using single-cell RNA sequencing, we characterized the cellular heterogeneity within pancreatic cancer tumors. Our analysis identified previously unrecognized cell subpopulations with distinct transcriptional profiles and potential therapeutic vulnerabilities. We developed a computational pipeline for integrating single-cell data with bulk RNA-seq and clinical information, enabling the identification of cell type-specific prognostic markers. This study provides a comprehensive atlas of the pancreatic cancer ecosystem and highlights the importance of cellular heterogeneity in cancer progression and treatment response.',
      doi: 'https://doi.org/10.1038/s41467-021-12345-6',
      pdf: 'https://example.com/publications/pancreatic-cancer-scrna.pdf',
      category: 'single-cell'
    },
    {
      id: 4,
      title: 'Integrative Analysis of Multi-omics Data for Biomarker Discovery in Alzheimer\'s Disease',
      authors: '<span>Boddapati A</span>, Wilson K, Thompson J, Lee H',
      journal: 'Genome Medicine',
      year: '2020',
      abstract: 'This study presents an integrative analysis of multi-omics data, including genomics, transcriptomics, and proteomics, to identify novel biomarkers for Alzheimer\'s disease. We developed a computational framework that leverages machine learning techniques to integrate heterogeneous data types and identify molecular signatures associated with disease progression. Our approach identified several promising biomarker candidates that were validated in independent cohorts. The integrative analysis framework presented in this study can be applied to other complex diseases to facilitate biomarker discovery and personalized medicine approaches.',
      doi: 'https://doi.org/10.1186/s13073-020-00789-4',
      pdf: 'https://example.com/publications/alzheimers-multiomics.pdf',
      category: 'multi-omics'
    },
    {
      id: 5,
      title: 'Computational Methods for Analyzing Spatial Transcriptomics Data',
      authors: 'Zhang Q, <span>Boddapati A</span>, Anderson K, Miller J',
      journal: 'Nucleic Acids Research',
      year: '2022',
      abstract: 'Spatial transcriptomics technologies enable the measurement of gene expression while preserving spatial information, providing unprecedented insights into tissue organization and function. In this paper, we present novel computational methods for analyzing spatial transcriptomics data, including approaches for spatial clustering, differential expression analysis, and integration with histological images. We demonstrate the utility of our methods using data from multiple spatial transcriptomics platforms and diverse tissue types. Our computational framework addresses key challenges in spatial transcriptomics data analysis and facilitates the extraction of biological insights from this emerging technology.',
      doi: 'https://doi.org/10.1093/nar/gkab123',
      pdf: 'https://example.com/publications/spatial-transcriptomics.pdf',
      category: 'spatial-omics'
    }
  ];
  
  const filteredPublications = filter === 'all' 
    ? publications 
    : publications.filter(pub => pub.category === filter);
  
  return (
    <PublicationsContainer id="publications">
      <PublicationsWrapper>
        <SectionTitle>Publications</SectionTitle>
        <SectionDescription>
          Selected peer-reviewed publications in genomics, bioinformatics, and machine learning. 
          My research focuses on developing computational methods for analyzing complex biological data.
        </SectionDescription>
        
        <FilterContainer>
          <FilterButton 
            active={filter === 'all'} 
            onClick={() => setFilter('all')}
          >
            All Publications
          </FilterButton>
          <FilterButton 
            active={filter === 'genomics'} 
            onClick={() => setFilter('genomics')}
          >
            Genomics
          </FilterButton>
          <FilterButton 
            active={filter === 'machine-learning'} 
            onClick={() => setFilter('machine-learning')}
          >
            Machine Learning
          </FilterButton>
          <FilterButton 
            active={filter === 'single-cell'} 
            onClick={() => setFilter('single-cell')}
          >
            Single-cell
          </FilterButton>
          <FilterButton 
            active={filter === 'multi-omics'} 
            onClick={() => setFilter('multi-omics')}
          >
            Multi-omics
          </FilterButton>
          <FilterButton 
            active={filter === 'spatial-omics'} 
            onClick={() => setFilter('spatial-omics')}
          >
            Spatial Omics
          </FilterButton>
        </FilterContainer>
        
        <PublicationsList>
          {filteredPublications.map(publication => (
            <PublicationItem key={publication.id}>
              <PublicationTitle>
                {publication.title}
                <PublicationYear>{publication.year}</PublicationYear>
              </PublicationTitle>
              <PublicationAuthors dangerouslySetInnerHTML={{ __html: publication.authors }} />
              <PublicationJournal>{publication.journal}</PublicationJournal>
              
              {expandedIds.includes(publication.id) ? (
                <PublicationAbstract>{publication.abstract}</PublicationAbstract>
              ) : (
                <PublicationAbstract>
                  {publication.abstract.substring(0, 150)}...
                </PublicationAbstract>
              )}
              
              <ExpandButton onClick={() => toggleExpand(publication.id)}>
                {expandedIds.includes(publication.id) ? 'Show less' : 'Read more'}
              </ExpandButton>
              
              <PublicationLinks>
                <PublicationLink href={publication.doi} target="_blank" rel="noopener noreferrer">
                  <FaExternalLinkAlt /> DOI
                </PublicationLink>
                <PublicationLink href={publication.pdf} target="_blank" rel="noopener noreferrer">
                  <FaFilePdf /> PDF
                </PublicationLink>
              </PublicationLinks>
            </PublicationItem>
          ))}
        </PublicationsList>
      </PublicationsWrapper>
    </PublicationsContainer>
  );
};

export default Publications;

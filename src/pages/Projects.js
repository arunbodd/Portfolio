import React, { useState } from 'react';
import styled from 'styled-components';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';

const ProjectsContainer = styled.div`
  background: #0a192f;
  color: #8892b0;
  padding: 100px calc((100vw - 1200px) / 2);
  
  @media screen and (max-width: 768px) {
    padding: 80px 24px;
  }
`;

const ProjectsWrapper = styled.div`
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

const FilterContainer = styled.div`
  display: flex;
  justify-content: center;
  margin: 40px 0;
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

const ProjectsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  grid-gap: 30px;
  margin-top: 20px;
  
  @media screen and (max-width: 400px) {
    grid-template-columns: 1fr;
  }
`;

const ProjectCard = styled.div`
  background: #112240;
  border-radius: 5px;
  overflow: hidden;
  transition: all 0.3s ease;
  height: 100%;
  display: flex;
  flex-direction: column;
  
  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  }
`;

const ProjectImage = styled.div`
  width: 100%;
  height: 200px;
  overflow: hidden;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.5s ease;
  }
  
  ${ProjectCard}:hover & img {
    transform: scale(1.05);
  }
`;

const ProjectContent = styled.div`
  padding: 24px;
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const ProjectTitle = styled.h3`
  color: #e6f1ff;
  font-size: 22px;
  margin-bottom: 12px;
`;

const ProjectDescription = styled.p`
  font-size: 16px;
  line-height: 1.6;
  margin-bottom: 20px;
  flex: 1;
`;

const TechStack = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 20px;
`;

const TechTag = styled.span`
  background: rgba(100, 255, 218, 0.1);
  color: #64ffda;
  padding: 4px 10px;
  border-radius: 3px;
  font-size: 12px;
  margin: 0 8px 8px 0;
`;

const ProjectLinks = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const ProjectLink = styled.a`
  color: #ccd6f6;
  font-size: 20px;
  margin-left: 16px;
  transition: color 0.3s ease;
  
  &:hover {
    color: #64ffda;
  }
`;

const Projects = () => {
  const [filter, setFilter] = useState('all');
  
  const projects = [
    {
      id: 1,
      title: 'Ebola Virus Genomic Analysis',
      description: 'A comprehensive genomic analysis pipeline for Ebola virus sequences, enabling rapid identification of variants and phylogenetic relationships.',
      image: '/projects/ebola-project.jpg',
      technologies: ['Python', 'Nextflow', 'Bioinformatics', 'Phylogenetics'],
      github: 'https://github.com/arunbodd/Nf-workflow-Ebola',
      live: null,
      category: 'bioinformatics'
    },
    {
      id: 2,
      title: 'Single-cell RNA-Seq Analysis Pipeline',
      description: 'A pipeline for processing and analyzing single-cell RNA sequencing data, including quality control, normalization, clustering, and differential expression analysis.',
      image: '/projects/scrna-project.jpg',
      technologies: ['R', 'Bioconductor', 'Machine Learning', 'Data Visualization'],
      github: 'https://github.com/arunbodd/scRNASeq',
      live: null,
      category: 'bioinformatics'
    },
    {
      id: 3,
      title: 'Gene Expression Predictor',
      description: 'A machine learning model that predicts gene expression levels based on genomic features and regulatory elements.',
      image: '/projects/gene-expression-project.jpg',
      technologies: ['Python', 'TensorFlow', 'Deep Learning', 'Genomics'],
      github: 'https://github.com/arunbodd',
      live: null,
      category: 'machine-learning'
    },
    {
      id: 4,
      title: 'Biomedical Literature Mining Tool',
      description: 'A natural language processing tool for extracting relevant information from biomedical literature, helping researchers stay updated with the latest findings.',
      image: '/projects/literature-mining-project.jpg',
      technologies: ['Python', 'NLP', 'BERT', 'Web Scraping'],
      github: 'https://github.com/arunbodd',
      live: 'https://example.com',
      category: 'machine-learning'
    },
    {
      id: 5,
      title: 'Interactive Genomic Data Visualizer',
      description: 'A web-based tool for interactive visualization of genomic data, allowing researchers to explore and analyze complex datasets.',
      image: '/projects/genomic-viz-project.jpg',
      technologies: ['JavaScript', 'D3.js', 'React', 'Genomics'],
      github: 'https://github.com/arunbodd',
      live: 'https://example.com',
      category: 'web-development'
    },
    {
      id: 6,
      title: 'Protein Structure Prediction Dashboard',
      description: 'A dashboard for monitoring and analyzing protein structure predictions, integrating multiple prediction algorithms and visualization tools.',
      image: '/projects/protein-structure-project.jpg',
      technologies: ['Python', 'React', 'PyMOL', 'Molecular Modeling'],
      github: 'https://github.com/arunbodd',
      live: null,
      category: 'web-development'
    }
  ];
  
  const filteredProjects = filter === 'all' 
    ? projects 
    : projects.filter(project => project.category === filter);
  
  return (
    <ProjectsContainer id="projects">
      <ProjectsWrapper>
        <SectionTitle>Projects</SectionTitle>
        
        <FilterContainer>
          <FilterButton 
            active={filter === 'all'} 
            onClick={() => setFilter('all')}
          >
            All
          </FilterButton>
          <FilterButton 
            active={filter === 'bioinformatics'} 
            onClick={() => setFilter('bioinformatics')}
          >
            Bioinformatics
          </FilterButton>
          <FilterButton 
            active={filter === 'machine-learning'} 
            onClick={() => setFilter('machine-learning')}
          >
            Machine Learning
          </FilterButton>
          <FilterButton 
            active={filter === 'web-development'} 
            onClick={() => setFilter('web-development')}
          >
            Web Development
          </FilterButton>
        </FilterContainer>
        
        <ProjectsGrid>
          {filteredProjects.map(project => (
            <ProjectCard key={project.id}>
              <ProjectImage>
                <img src={project.image} alt={project.title} />
              </ProjectImage>
              <ProjectContent>
                <ProjectTitle>{project.title}</ProjectTitle>
                <ProjectDescription>{project.description}</ProjectDescription>
                <TechStack>
                  {project.technologies.map((tech, index) => (
                    <TechTag key={index}>{tech}</TechTag>
                  ))}
                </TechStack>
                <ProjectLinks>
                  {project.github && (
                    <ProjectLink href={project.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub Repository">
                      <FaGithub />
                    </ProjectLink>
                  )}
                  {project.live && (
                    <ProjectLink href={project.live} target="_blank" rel="noopener noreferrer" aria-label="Live Demo">
                      <FaExternalLinkAlt />
                    </ProjectLink>
                  )}
                </ProjectLinks>
              </ProjectContent>
            </ProjectCard>
          ))}
        </ProjectsGrid>
      </ProjectsWrapper>
    </ProjectsContainer>
  );
};

export default Projects;

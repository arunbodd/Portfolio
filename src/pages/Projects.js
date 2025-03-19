import React, { useState } from 'react';
import styled from 'styled-components';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';

const PageContainer = styled.div`
  background: ${props => props.theme.background};
  min-height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ProjectsContainer = styled.div`
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
    background: ${props => props.active ? props.theme.highlight : props.theme.highlightTint || 'rgba(100, 255, 218, 0.1)'};
    color: ${props => props.active ? props.theme.navy : props.theme.textLightSlate};
  }
`;

const ProjectGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const ProjectCard = styled.div`
  background-color: ${props => props.theme.lightNavy};
  border-radius: 8px;
  overflow: hidden;
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  height: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
  box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
  
  &:hover {
    transform: translateY(-12px);
    box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);
  }
  
  &:after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 4px;
    background: ${props => props.theme.highlight};
    transform: scaleX(0);
    transform-origin: right;
    transition: transform 0.3s ease;
  }
  
  &:hover:after {
    transform: scaleX(1);
    transform-origin: left;
  }
`;

const ProjectContent = styled.div`
  padding: 1.5rem;
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const ProjectTitle = styled.h3`
  font-size: 1.3rem;
  margin-bottom: 0.5rem;
  color: ${props => props.theme.textLightSlate};
`;

const ProjectDescription = styled.p`
  font-size: 0.95rem;
  margin-bottom: 1rem;
  color: ${props => props.theme.textSlate};
  flex: 1;
`;

const TechStack = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 1rem;
  gap: 0.5rem;
`;

const TechTag = styled.span`
  background-color: rgba(100, 255, 218, 0.1);
  color: ${props => props.theme.highlight};
  padding: 0.25rem 0.5rem;
  border-radius: 3px;
  font-size: 0.8rem;
`;

const ProjectLinks = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: auto;
`;

const ProjectLink = styled.a`
  color: ${props => props.theme.textLightSlate};
  display: flex;
  align-items: center;
  gap: 0.5rem;
  text-decoration: none;
  transition: color 0.3s ease;
  
  &:hover {
    color: ${props => props.theme.highlight};
  }
`;

const NoResults = styled.p`
  text-align: center;
  font-size: 1.2rem;
  margin-top: 2rem;
  color: ${props => props.theme.textSlate};
`;

const CategoryBadge = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 0.75rem;
  font-weight: 600;
  background-color: ${props => props.theme.highlight};
  color: ${props => props.theme.navy};
  opacity: 0.9;
`;

const Projects = () => {
  const [filter, setFilter] = useState('all');
  
  const projects = [
    {
      id: 1,
      title: "NexAws-AI",
      description: "A framework for integrating AI pipelines with Nextflow and AWS infrastructure for scalable and efficient data processing.",
      tech: ["Nextflow", "AWS", "AI", "Machine Learning"],
      github: "https://github.com/arunbodd/NexAws-AI",
      demo: null,
      category: "Nextflow and AWS"
    },
    {
      id: 2,
      title: "Serum-Proteomics",
      description: "A pipeline for analyzing serum proteomics data to identify biomarkers and protein signatures in various disease states.",
      tech: ["Proteomics", "Mass Spectrometry", "R", "Data Analysis"],
      github: "https://github.com/arunbodd/Serum-Proteomics",
      demo: null,
      category: "Proteomics"
    },
    {
      id: 3,
      title: "arunbodd.github.io",
      description: "Personal portfolio website showcasing projects, publications, and professional experience built with modern web technologies.",
      tech: ["React", "JavaScript", "HTML/CSS", "Styled Components"],
      github: "https://github.com/arunbodd/arunbodd.github.io",
      demo: "https://arunbodd.github.io",
      category: "Website Development"
    },
    {
      id: 4,
      title: "mycosnp-nf",
      description: "A Nextflow-based pipeline for analyzing mycological single nucleotide polymorphisms to track fungal outbreaks and evolution.",
      tech: ["Nextflow", "Genomics", "SNP Analysis", "Docker"],
      github: "https://github.com/arunbodd/mycosnp-nf",
      demo: null,
      category: "Nextflow"
    },
    {
      id: 5,
      title: "Ebola_Hackthon",
      description: "A project developed during a hackathon for analyzing Ebola virus genomic data to track outbreak transmission and evolution.",
      tech: ["Nextflow", "Viral Genomics", "Phylogenetics", "Bioinformatics"],
      github: "https://github.com/arunbodd/Ebola_Hackthon",
      demo: null,
      category: "Nextflow"
    },
    {
      id: 6,
      title: "aquascope",
      description: "CDC's wastewater surveillance analysis pipeline for detecting and monitoring pathogens including SARS-CoV-2 variants.",
      tech: ["Nextflow", "Metagenomics", "Wastewater Analysis", "COVID-19"],
      github: "https://github.com/CDCgov/aquascope",
      demo: null,
      category: "Nextflow"
    },
    {
      id: 7,
      title: "tautyping-nf",
      description: "A Nextflow pipeline for finding optimal phylogenetic markers in microbial genomes using Kendall Tau correlation statistics.",
      tech: ["Nextflow", "Phylogenetics", "Microbial Genomics", "Python"],
      github: "https://github.com/arunbodd/tautyping-nf",
      demo: null,
      category: "Nextflow"
    },
    {
      id: 8,
      title: "RM_Baricitinib_manuscript",
      description: "Analysis code for single-cell RNA sequencing data investigating the effects of Baricitinib treatment in SARS-CoV-2 infected rhesus macaques.",
      tech: ["scRNA-seq", "R", "Bioinformatics", "COVID-19"],
      github: "https://github.com/BosingerLab/RM_Baricitinib_manuscript",
      demo: null,
      category: "scRNA Analysis"
    },
    {
      id: 9,
      title: "CRISPR_Cas9_gRNA",
      description: "A toolkit for designing and analyzing CRISPR-Cas9 guide RNAs for precise genome editing experiments.",
      tech: ["CRISPR", "Genome Editing", "Python", "Bioinformatics"],
      github: "https://github.com/arunbodd/CRISPR_Cas9_gRNA",
      demo: null,
      category: "CRISPR"
    },
    {
      id: 10,
      title: "WES_QC",
      description: "A Snakemake-based quality control pipeline for Whole Exome Sequencing data in the NIAID repository.",
      tech: ["Snakemake", "WES", "Quality Control", "Bioinformatics"],
      github: "https://github.com/CCBR/NIAID/tree/master/WES_QC",
      demo: null,
      category: "Snakemake"
    }
  ];
  
  // Extract unique categories for filter buttons
  const categories = [...new Set(projects.map(project => project.category))];
  
  const filteredProjects = filter === 'all' 
    ? projects 
    : projects.filter(project => project.category === filter);
  
  return (
    <PageContainer>
      <ProjectsContainer>
        <Title>Projects</Title>
        
        <FilterContainer>
          <FilterButton 
            active={filter === 'all'} 
            onClick={() => setFilter('all')}
          >
            All
          </FilterButton>
          {categories.map(category => (
            <FilterButton 
              key={category}
              active={filter === category} 
              onClick={() => setFilter(category)}
            >
              {category}
            </FilterButton>
          ))}
        </FilterContainer>
        
        {filteredProjects.length > 0 ? (
          <ProjectGrid>
            {filteredProjects.map(project => (
              <ProjectCard key={project.id}>
                <CategoryBadge>{project.category}</CategoryBadge>
                <ProjectContent>
                  <ProjectTitle>{project.title}</ProjectTitle>
                  <ProjectDescription>{project.description}</ProjectDescription>
                  <TechStack>
                    {project.tech.map((tech, index) => (
                      <TechTag key={index}>{tech}</TechTag>
                    ))}
                  </TechStack>
                  <ProjectLinks>
                    {project.github && (
                      <ProjectLink href={project.github} target="_blank" rel="noopener noreferrer">
                        <FaGithub /> GitHub
                      </ProjectLink>
                    )}
                    {project.demo && (
                      <ProjectLink href={project.demo} target="_blank" rel="noopener noreferrer">
                        <FaExternalLinkAlt /> Demo
                      </ProjectLink>
                    )}
                  </ProjectLinks>
                </ProjectContent>
              </ProjectCard>
            ))}
          </ProjectGrid>
        ) : (
          <NoResults>No projects found for the selected filter.</NoResults>
        )}
      </ProjectsContainer>
    </PageContainer>
  );
};

export default Projects;

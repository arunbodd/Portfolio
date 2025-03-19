import React from 'react';
import styled from 'styled-components';
import { FaExternalLinkAlt, FaBriefcase, FaCalendarAlt, FaMapMarkerAlt } from 'react-icons/fa';

const ExperienceContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  color: ${props => props.theme.textSlate};
`;

const Title = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 2.5rem;
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

const ExperienceList = styled.div`
  margin-top: 3rem;
`;

const ExperienceItem = styled.div`
  position: relative;
  padding-left: 3rem;
  padding-bottom: 3rem;
  border-left: 2px solid ${props => props.theme.highlight};
  
  &:last-child {
    border-left: 2px solid transparent;
  }
  
  &:before {
    content: '';
    position: absolute;
    left: -10px;
    top: 0;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: ${props => props.theme.navy};
    border: 2px solid ${props => props.theme.highlight};
    z-index: 1;
  }
`;

const ExperienceContent = styled.div`
  background-color: ${props => props.theme.lightNavy};
  border-radius: 8px;
  padding: 1.8rem;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  }
`;

const JobTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
  color: ${props => props.theme.textLightSlate};
`;

const Company = styled.h4`
  font-size: 1.2rem;
  margin-bottom: 1rem;
  color: ${props => props.theme.highlight};
  display: flex;
  align-items: center;
`;

const MetaContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
  margin-bottom: 1.5rem;
  font-size: 0.95rem;
`;

const MetaItem = styled.div`
  display: flex;
  align-items: center;
  color: ${props => props.theme.textSlate};
  
  svg {
    margin-right: 0.5rem;
    color: ${props => props.theme.highlight};
  }
`;

const ResponsibilitiesList = styled.ul`
  margin: 1.5rem 0;
  padding-left: 1.2rem;
`;

const ResponsibilityItem = styled.li`
  margin-bottom: 0.8rem;
  line-height: 1.6;
  position: relative;
  
  &:before {
    content: '▹';
    position: absolute;
    left: -1.2rem;
    color: ${props => props.theme.highlight};
  }
`;

const ProjectLinks = styled.div`
  margin-top: 1.5rem;
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
`;

const ProjectLink = styled.a`
  display: inline-flex;
  align-items: center;
  color: ${props => props.theme.highlight};
  text-decoration: none;
  padding: 0.5rem 1rem;
  border: 1px solid ${props => props.theme.highlight};
  border-radius: 4px;
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(100, 255, 218, 0.1);
  }
  
  svg {
    margin-left: 0.5rem;
  }
`;

const Experience = () => {
  const experiences = [
    {
      title: "Lead Scientist",
      company: "Booz Allen Hamilton",
      period: "03/2025 - Present",
      location: "Atlanta, Georgia",
      responsibilities: [
        "Develop and implement bioinformatics pipelines for pathogen surveillance and public health at CDC.",
        "Collaborate across cross-functional teams on AMD-P project to ensure efficient deployment of pathogen-related pipelines."
      ],
      links: []
    },
    {
      title: "Bioinformatics Scientist",
      company: "Leidos",
      period: "07/2022 - 01/2025",
      location: "Atlanta, Georgia",
      responsibilities: [
        "Lead workflow developer for Aquascope – a NextFlow pipeline for early detection of National wastewater sequencing (NWSS) of SARS-CoV-2 variants of concern via targeted amplicon sequencing. Helped reduce turnaround time for CDC in reporting the results to The White House.",
        "Led sequencing data analysis projects (RNA, Single Cell, Metagenomics and Genome assembly) using analytical workflows (NextFlow and Snakemake), programming languages (R, Python, Linux, and Bash) with Version control (Github) and contributed to impactful publications.",
        "Contributed to modules (Snpeff and Gatk) for MycoSNP and inhouse-hackathon Ebola workflow.",
        "Mentored a Jr. Bioinformatics developer on RNA seq analysis for National Institute of Occupational Safety and Health (NIOSH) and a summer intern on a Machine learning project('Early warning signatures of Silicosis revealed by Machine learning and Gene expression profiles').",
        "Led Quality management services like SOPs and Best practices on HPC and containerization.",
        "Trained CDC Epidemiologists and Bioinformaticians on NextFlow pipeline development, Advanced computing on cluster, Singularity containers and Transcriptomics data analysis.",
        "Collaborated with cross-functional teams to deliver high-quality bioinformatics services on time and aligning with business objectives.",
        "Drove innovation and collaboration on projects with internal stakeholders, subcontractors and government managers and represented the team at various talks and conferences."
      ],
      links: [
        {
          name: "Aquascope",
          url: "https://github.com/CDCgov/aquascope"
        }
      ]
    },
    {
      title: "Sr. Bioinformatics Analyst",
      company: "Emory Primate Research Center",
      period: "07/2020 - 07/2022",
      location: "Atlanta, Georgia",
      responsibilities: [
        "Lead analyst for Wastewater assessment of COVID-19 from wastewater plants in Atlanta, GA using workflow management tools (Snakemake) and programming tools (R and Python).",
        "Lead Bioinformatics analyst for IMMuno Phenotyping Assessment in a COVID-19 Cohort (IMPACC) study from EPRC, featuring 5000 COVID-19 patients and developed blood transcriptomics data analysis and quality control pipeline using Snakemake and deployed in AWS (E2, Spot, on-demand instances & S3 buckets).",
        "Led Single cell data analysis from antibody tagged and infected/vaccine challenged Rhesus macaques using analysis tools (Cell Ranger, T- & B- Cell Repertoire, Seurat, Snakemake, SingleR, Demultiplex, Doublet Finder and Docker, R).",
        "Developed RNA and Single cell analysis pipelines and contributed to reduced turnaround time for the Genomics core."
      ],
      links: []
    },
    {
      title: "Bioinformatics Analyst II",
      company: "Leidos Biomedical Research",
      period: "04/2018 - 06/2020",
      location: "Bethesda, Maryland",
      responsibilities: [
        "Performed comprehensive preliminary and exploratory data analysis for gene expression studies across various NIAID projects, leveraging Microarray, RNA-Seq, and Single Cell RNA sequencing data to uncover new leads and insights.",
        "Developed interactive visualizations using R markdown reports, facilitating easy understanding of results and contributing to informed decision-making processes.",
        "Led development of quality control pipeline for Variant calling as part of Clinical Scientific Investigations (CSI) which resulted in hundreds of hours saved and memory footprint being reduced.",
        "Provided Bioinformatics support to scientists by discussing future direction of projects which resulted in thousands of dollars saved in direct sequencing costs."
      ],
      links: []
    }
  ];

  return (
    <ExperienceContainer>
      <Title>Experience</Title>
      
      <ExperienceList>
        {experiences.map((exp, index) => (
          <ExperienceItem key={index}>
            <ExperienceContent>
              <JobTitle>{exp.title}</JobTitle>
              <Company>{exp.company}</Company>
              
              <MetaContainer>
                <MetaItem>
                  <FaCalendarAlt />
                  <span>{exp.period}</span>
                </MetaItem>
                <MetaItem>
                  <FaMapMarkerAlt />
                  <span>{exp.location}</span>
                </MetaItem>
              </MetaContainer>
              
              <ResponsibilitiesList>
                {exp.responsibilities.map((resp, respIndex) => (
                  <ResponsibilityItem key={respIndex}>
                    {resp}
                  </ResponsibilityItem>
                ))}
              </ResponsibilitiesList>
              
              {exp.links.length > 0 && (
                <ProjectLinks>
                  {exp.links.map((link, linkIndex) => (
                    <ProjectLink 
                      key={linkIndex} 
                      href={link.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                    >
                      {link.name} <FaExternalLinkAlt />
                    </ProjectLink>
                  ))}
                </ProjectLinks>
              )}
            </ExperienceContent>
          </ExperienceItem>
        ))}
      </ExperienceList>
    </ExperienceContainer>
  );
};

export default Experience;

import React from 'react';
import styled from 'styled-components';
import { FaCalendarAlt, FaMapMarkerAlt, FaBuilding, FaCheckCircle } from 'react-icons/fa';
import { EmoryLogo, CompanyLogo } from '../components/CompanyLogos';

const PageContainer = styled.div`
  background: ${props => props.theme.background};
  min-height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const CareerContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  color: ${props => props.theme.textSlate};
  width: 100%;
`;

const Title = styled.h1`
  font-size: 2.8rem;
  margin-bottom: 3rem;
  color: ${props => props.theme.textLightSlate};
  position: relative;
  text-align: center;
  
  &:after {
    content: '';
    position: absolute;
    bottom: -15px;
    left: 50%;
    transform: translateX(-50%);
    width: 100px;
    height: 4px;
    background: ${props => props.theme.highlight};
  }
`;

const SectionTitle = styled.h2`
  font-size: 2rem;
  margin-bottom: 2rem;
  color: ${props => props.theme.textLightSlate};
  display: flex;
  align-items: center;
  
  svg {
    font-size: 0.7rem;
    margin-right: 0.6rem;
    color: ${props => props.theme.highlight};
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
  
  @media screen and (max-width: 768px) {
    &:before {
      left: 25px;
      transform: none;
    }
  }
`;

const TimelineItem = styled.div`
  position: relative;
  width: 50%;
  padding: 20px;
  box-sizing: border-box;
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
    width: 50px;
    height: 50px;
    background: ${props => props.theme.background};
    border: 3px solid ${props => props.theme.highlight};
    border-radius: 50%;
    transform: translateY(-50%);
    display: flex;
    align-items: center;
    justify-content: center;
    color: ${props => props.theme.highlight};
    font-size: 0.9rem;
    font-weight: bold;
    box-shadow: 0 0 10px rgba(0, 255, 65, 0.3);
  }
  &:nth-child(odd):before {
    right: -25px;
  }
  &:nth-child(even):before {
    left: -25px;
  }
  
  @media screen and (max-width: 768px) {
    width: 100%;
    left: 0 !important;
    padding-left: 60px;
    padding-right: 10px;
    
    &:before {
      left: 0 !important;
      right: auto !important;
    }
  }
`;

const Content = styled.div`
  background-color: ${props => props.theme.cardBackground};
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const MetaContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`;

const MetaItem = styled.div`
  display: flex;
  align-items: center;
  color: ${props => props.theme.textSlate};
  font-size: 0.9rem;

  svg {
    margin-right: 5px;
    width: 1em;
    height: 1em;
  }
`;

const Description = styled.div`
  margin-top: 1rem;
  color: ${props => props.theme.textSlate};
`;

const Achievement = styled.div`
  display: flex;
  align-items: flex-start;
  margin-bottom: 0.75rem;
  
  svg {
    color: ${props => props.theme.highlight};
    margin-right: 0.75rem;
    margin-top: 0.3rem;
    flex-shrink: 0;
    font-size: 0.75rem;
    width: 0.75rem;
    height: 0.75rem;
  }
  
  span {
    line-height: 1.5;
    flex: 1;
  }
`;

const ExperienceLinks = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-top: 1rem;
`;

const ExperienceLink = styled.a`
  color: ${props => props.theme.highlight};
  text-decoration: none;
  font-size: 0.8rem;
  border: 1px solid ${props => props.theme.highlight};
  padding: 0.25rem 0.5rem;
  border-radius: 3px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${props => props.theme.highlightTint || 'rgba(100, 255, 218, 0.1)'};
  }
`;

const Company = styled.div`
  font-size: 1.2rem;
  color: ${props => props.theme.textLightSlate};
  margin-bottom: 0.5rem;
`;

const Period = styled.div`
  font-size: 0.9rem;
  color: ${props => props.theme.textSlate};
  margin-bottom: 0.5rem;
`;

const Location = styled.div`
  font-size: 0.9rem;
  color: ${props => props.theme.textSlate};
  margin-bottom: 0.5rem;
`;

const Career = () => {
  const experiences = [
    {
      title: "Founding Bioinformatics Engineer",
      company: "Mamidi Health",
      logoComponent: CompanyLogo,
      period: "01/2026 - Present (Volunteer)",
      location: "Remote",
      description: [
        "Lead bioinformatics development for health technology startup focused on personalized medicine and chronic disease management.",
        "Design and implement computational pipelines for genomic data analysis, biomarker discovery, and health data integration.",
        "Develop AI-driven tools for personalized health recommendations and risk assessment.",
        "Collaborate with medical professionals to translate research findings into actionable health insights."
      ],
      links: [
        {
          name: "AIVA Portal",
          url: "https://chat.aivaportal.com/",
        }
      ]
    },
    {
      title: "Lead Scientist",
      company: "Booz Allen Hamilton",
      logoComponent: CompanyLogo,
      period: "03/2025 to 01/2026",
      location: "Atlanta, Georgia",
      description: [
        "Developer for bioinformatics pipeline Cyclone (not public yet), enhancing CDC's public health response capabilities to Cyclospora outbreaks.",
        "Implemented scalable solutions using NextFlow and AWS, optimizing data processing for epidemiology studies.",
        "Fostering collaboration across cross-functional teams to deploy pathogen-related pipelines on the Advanced Molecular Detection Platform."      ],
      links: [
        {
          name: "CDC AMD Platform",
          url: "https://www.cdc.gov/amd/index.html",
        },
        {
          name: "NexAI",
          url: "https://github.com/arunbodd/nf-core_guidelines_validator/tree/dev",
        },
        {
          name: "NexAI Documentation",
          url: "https://github.com/arunbodd/nf-core_guidelines_validator/blob/dev/README.md",
        }
      ]
    },
    {
      title: "Bioinformatics Scientist",
      company: "Leidos",
      logoComponent: CompanyLogo,
      period: "06/2022 - 01/2025",
      location: "Atlanta, Georgia",
      description: [
        "Lead workflow developer for Aquascope – a NextFlow pipeline for early detection of National wastewater sequencing (NWSS) of SARS-CoV-2 variants of concern via targeted amplicon sequencing.",
        "Led sequencing data analysis projects using analytical workflows, programming languages with Version control and contributed to impactful publications.",
        "Mentored junior developers and interns on RNA-seq analysis and machine learning projects.",
        "Trained CDC Epidemiologists and Bioinformaticians on NextFlow pipeline development and advanced computing techniques.",
        "Collaborated with cross-functional teams to deliver high-quality bioinformatics services and drove innovation on projects with various stakeholders."
      ],
      links: [
        {
          name: "Aquascope",
          url: "https://github.com/CDCgov/aquascope",
        },
        {
          name: "Tau-typing",
          url: "https://github.com/arunbodd/tautyping-nf",
        },
        {
          name: "Ebola",
          url: "https://github.com/arunbodd/Ebola_Hackthon",
        }
      ]
    },
    {
      title: "Sr. Bioinformatics Analyst",
      company: "Emory Primate Research Center",
      logoComponent: EmoryLogo,
      period: "09/2020 - 06/2022",
      location: "Atlanta, Georgia",
      description: [
        "Lead analyst for Wastewater assessment of COVID-19 from wastewater plants in Atlanta, GA using workflow management tools and programming tools.",
        "Lead Bioinformatics analyst for IMMuno Phenotyping Assessment in a COVID-19 Cohort study featuring 5000 COVID-19 patients.",
        "Developed blood transcriptomics data analysis and quality control pipeline using Snakemake and deployed in AWS.",
        "Led Single cell data analysis from antibody tagged and infected/vaccine challenged Rhesus macaques using various analysis tools.",
        "Developed RNA and Single cell analysis pipelines and contributed to reduced turnaround time for the Genomics core."
      ],
      links: [
        {
          name: "Covid-19-Analysis",
          url: "https://github.com/arunbodd/RM_Baricitinib_manuscript",
        }
      ]
    },
    {
      title: "Bioinformatics Analyst II",
      company: "Leidos Biomedical Research",
      logoComponent: CompanyLogo,
      period: "04/2018 - 09/2020",
      location: "Bethesda, Maryland",
      description: [
        "Performed comprehensive preliminary and exploratory data analysis for gene expression studies across various NIAID projects, leveraging Microarray, RNA-Seq, and Single Cell RNA sequencing data.",
        "Developed interactive visualizations using R markdown reports, facilitating easy understanding of results.",
        "Led development of quality control pipeline for Variant calling as part of Clinical Scientific Investigations (CSI) which resulted in hundreds of hours saved.",
        "Provided Bioinformatics support to scientists by discussing future direction of projects which resulted in thousands of dollars saved in direct sequencing costs."
      ],
      links: [
        {
          name: "Whole Exome Pipeline",
          url: "https://github.com/arunbodd/NIAID/tree/master/WES_QC",
        }
      ]
    }
  ];

  const education = [
    {
      degree: "Master of Science (MS)",
      institution: "Indiana University",
      period: "2016 - 2017",
      location: "Indianapolis, Indiana",
      description: "Specialized in Bioinformatics with a focus on RNA biology, RNA-binding proteins and Epitranscriptomics"
    },
    {
      degree: "Master of Science (MS)",
      institution: "Symbiosis International University",
      period: "2012 - 2014",
      location: "Pune, India",
      description: "Specialized in Biomedical Sciences with a focus on Cell Biology and Molecular Biology."
    },
    {
      degree: "Bachelor of Technology (B.Tech)",
      institution: "JNTU Hyderabad",
      period: "2007 - 2011",
      location: "Hyderabad, India",
      description: "Majored in Biotechnology with minor in Bioinformatics"
    }
  ];

  return (
    <PageContainer>
      <CareerContainer>
        <Title>Career</Title>
        <SectionTitle>Professional Experience</SectionTitle>
        <TimelineList>
          {experiences.map((exp, index) => {
            const year = exp.period.split(' ')[0].split('/')[1];
            return (
              <TimelineItem key={index} data-year={year}>
                <Content>
                  <SectionTitle>{exp.title}</SectionTitle>
                  <Company>{exp.company}</Company>
                  <Period>{exp.period}</Period>
                  <Location>{exp.location}</Location>
                  <Description>
                    {exp.description.map((item, i) => (
                      <Achievement key={i}>
                        <FaCheckCircle />
                        <span>{item}</span>
                      </Achievement>
                    ))}
                  </Description>
                  <ExperienceLinks>
                    {exp.links.map((link, i) => (
                      <ExperienceLink key={i} href={link.url} target="_blank" rel="noopener noreferrer">
                        {link.name}
                      </ExperienceLink>
                    ))}
                  </ExperienceLinks>
                </Content>
              </TimelineItem>
            );
          })}
        </TimelineList>

        <SectionTitle>Education</SectionTitle>
        <TimelineList>
          {education.map((edu, index) => {
            const year = edu.period.split(' - ')[0];
            return (
              <TimelineItem key={index} data-year={year}>
                <Content>
                  <SectionTitle>{edu.degree}</SectionTitle>
                  <MetaContainer>
                    <MetaItem>
                      <FaBuilding /> {edu.institution}
                    </MetaItem>
                    <MetaItem>
                      <FaCalendarAlt /> {edu.period}
                    </MetaItem>
                    <MetaItem>
                      <FaMapMarkerAlt /> {edu.location}
                    </MetaItem>
                  </MetaContainer>
                  <Description>
                    <span>{edu.description}</span>
                  </Description>
                </Content>
              </TimelineItem>
            );
          })}
        </TimelineList>
      </CareerContainer>
    </PageContainer>
  );
};

export default Career;

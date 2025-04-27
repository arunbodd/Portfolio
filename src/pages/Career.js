import React from 'react';
import styled from 'styled-components';
import { FaCalendarAlt, FaMapMarkerAlt, FaBuilding } from 'react-icons/fa';
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
`;

const TimelineItemDot = styled.div`
  position: absolute;
  left: -10px;
  top: 0;
  width: 20px;
  height: 20px;
  background-color: ${props => props.theme.highlight};
  border-radius: 50%;
  z-index: 2;
  
  &::before {
    content: '';
    position: absolute;
    top: 20px;
    left: 50%;
    transform: translateX(-50%);
    width: 2px;
    height: calc(100% + 40px);
    background-color: ${props => props.theme.highlight};
    left: -20px;
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

const Description = styled.ul`
  margin-top: 1rem;
  list-style-type: disc;
  list-style-position: inside;
  color: ${props => props.theme.textSlate};
  
  li {
    margin: 0;
    padding-left: 0;
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
      title: "Lead Scientist",
      company: "Booz Allen Hamilton",
      logoComponent: CompanyLogo,
      period: "03/2025 - Present",
      location: "Atlanta, Georgia",
      description: [
        "Develop and implement bioinformatics pipelines for pathogen surveillance and public health at CDC.",
        "Collaborate across cross-functional teams on AMD-P project to ensure efficient deployment of pathogen-related pipelines."
      ],
      links: []
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
                      <li key={i}>{item}</li>
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
                    <li>{edu.description}</li>
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

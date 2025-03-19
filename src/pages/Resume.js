import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import { FaDownload, FaFileAlt, FaEye } from 'react-icons/fa';
import { ThemeContext } from '../context/ThemeContext';
import { Link } from 'react-router-dom';

const ResumeContainer = styled.div`
  background: ${props => props.theme.background};
  color: ${props => props.theme.textSlate};
  padding: 60px calc((100vw - 1000px) / 2);
  min-height: 100vh;
  
  @media screen and (max-width: 1000px) {
    padding: 60px 24px;
  }
`;

const ResumeWrapper = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  background-color: ${props => props.theme.lightNavy};
  border-radius: 8px;
  padding: 40px;
  box-shadow: 0 10px 30px -15px rgba(2, 12, 27, 0.7);
  position: relative;
  
  @media screen and (max-width: 768px) {
    padding: 30px 20px;
  }
`;

const ResumeHeader = styled.div`
  margin-bottom: 30px;
  padding-right: 150px;
  
  @media screen and (max-width: 768px) {
    padding-right: 0;
  }
`;

const NameHeading = styled.h1`
  color: ${props => props.theme.textLightSlate};
  font-size: 2.5rem;
  margin: 0 0 10px 0;
`;

const TitleHeading = styled.h2`
  color: ${props => props.theme.highlight};
  font-size: 1.5rem;
  margin: 0 0 20px 0;
  font-weight: 400;
`;

const ContactInfo = styled.div`
  display: flex;
  gap: 20px;
  margin-top: 10px;
  
  @media screen and (max-width: 768px) {
    flex-direction: column;
    gap: 5px;
  }
`;

const ContactItem = styled.div`
  a {
    color: ${props => props.theme.textSlate};
    text-decoration: none;
    
    &:hover {
      color: ${props => props.theme.highlight};
    }
  }
`;

const Section = styled.div`
  margin-bottom: 30px;
`;

const SectionTitle = styled.h3`
  color: ${props => props.theme.textLightSlate};
  font-size: 1.3rem;
  margin-bottom: 15px;
  position: relative;
  padding-bottom: 10px;
  
  &:after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 50px;
    height: 2px;
    background-color: ${props => props.theme.highlight};
  }
`;

const Summary = styled.p`
  line-height: 1.6;
  margin-bottom: 20px;
`;

const SkillsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 15px;
  margin-top: 15px;
`;

const SkillItem = styled.div`
  background-color: ${props => props.theme.navy};
  padding: 10px 15px;
  border-radius: 4px;
  font-size: 0.9rem;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-3px);
    background-color: ${props => props.theme.highlight};
    color: ${props => props.theme.navy};
  }
`;

const CareerItem = styled.div`
  margin-bottom: 20px;
  padding-left: 20px;
  position: relative;
  
  &:before {
    content: '';
    position: absolute;
    left: 0;
    top: 8px;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background-color: ${props => props.theme.highlight};
  }
`;

const JobTitle = styled.h4`
  color: ${props => props.theme.textLightSlate};
  font-size: 1.1rem;
  margin: 0 0 5px 0;
`;

const Company = styled.div`
  color: ${props => props.theme.highlight};
  font-size: 1rem;
  margin-bottom: 5px;
`;

const Period = styled.div`
  font-size: 0.9rem;
  color: ${props => props.theme.textSlate};
  margin-bottom: 10px;
`;

const Description = styled.p`
  font-size: 0.95rem;
  line-height: 1.6;
`;

const ButtonsContainer = styled.div`
  position: ${props => props.showPDF ? 'fixed' : 'absolute'};
  top: ${props => props.showPDF ? '100px' : '40px'};
  right: ${props => props.showPDF ? '40px' : '40px'};
  display: flex;
  gap: 10px;
  z-index: 9; /* Lower than navbar's z-index of 10 */
  
  @media screen and (max-width: 768px) {
    position: ${props => props.showPDF ? 'fixed' : 'static'};
    top: ${props => props.showPDF ? '80px' : 'auto'};
    right: ${props => props.showPDF ? '20px' : 'auto'};
    margin-top: ${props => props.showPDF ? '0' : '20px'};
    margin-bottom: ${props => props.showPDF ? '0' : '20px'};
    justify-content: center;
  }
`;

const ActionButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  background-color: ${props => props.theme.highlight};
  color: ${props => props.theme.navy};
  padding: 6px 12px;
  border-radius: 25px;
  text-decoration: none;
  font-weight: 500;
  font-size: 0.8rem;
  transition: all 0.3s ease;
  border: none;
  cursor: pointer;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  
  svg {
    font-size: 0.8rem;
  }
  
  &:hover {
    background-color: ${props => props.theme.highlightTint};
    transform: translateY(-2px);
    box-shadow: 0 3px 5px rgba(0, 0, 0, 0.15);
  }
  
  &:active {
    transform: translateY(0);
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  }
`;

const DownloadButton = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  background-color: ${props => props.theme.highlight};
  color: ${props => props.theme.navy};
  padding: 6px 12px;
  border-radius: 25px;
  text-decoration: none;
  font-weight: 500;
  font-size: 0.8rem;
  transition: all 0.3s ease;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  
  svg {
    font-size: 0.8rem;
  }
  
  &:hover {
    background-color: ${props => props.theme.highlightTint};
    transform: translateY(-2px);
    box-shadow: 0 3px 5px rgba(0, 0, 0, 0.15);
  }
  
  &:active {
    transform: translateY(0);
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  }
`;

const PDFContainer = styled.div`
  margin-top: 30px;
  display: ${props => props.show ? 'block' : 'none'};
  width: 100%;
  height: 800px;
  overflow: hidden;
  
  iframe {
    width: 100%;
    height: 100%;
    border: none;
    border-radius: 4px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  }
`;

const Resume = () => {
  const [showPDF, setShowPDF] = useState(false);
  const { theme } = useContext(ThemeContext);
  const resumePDF = process.env.PUBLIC_URL + "/resume.pdf";
  
  const togglePDFView = () => {
    setShowPDF(!showPDF);
  };

  return (
    <ResumeContainer>
      <ResumeWrapper>
        <ButtonsContainer showPDF={showPDF}>
          <ActionButton onClick={togglePDFView}>
            {showPDF ? <FaFileAlt /> : <FaEye />} {showPDF ? 'Hide PDF' : 'View PDF'}
          </ActionButton>
          <DownloadButton href={resumePDF} download="Arun_Boddapati_Resume.pdf">
            <FaDownload /> Download
          </DownloadButton>
        </ButtonsContainer>
        
        <PDFContainer show={showPDF}>
          <iframe 
            src={`${process.env.PUBLIC_URL}/resume.pdf#view=FitH`} 
            title="Resume PDF"
            aria-label="Resume PDF"
          />
        </PDFContainer>
        
        {!showPDF && (
          <>
            <ResumeHeader>
              <NameHeading>Arun Kumar Boddapati</NameHeading>
              <TitleHeading>Lead Scientist</TitleHeading>
              <ContactInfo>
                <ContactItem>
                  <a href="mailto:arunbodd@outlook.com">arunbodd@outlook.com</a>
                </ContactItem>
                <ContactItem>
                  <span>Atlanta, GA</span>
                </ContactItem>
                <ContactItem>
                  <a href="https://www.linkedin.com/in/arunbodd/" target="_blank" rel="noopener noreferrer">linkedin.com/in/arunbodd</a>
                </ContactItem>
              </ContactInfo>
            </ResumeHeader>
            
            <Section>
              <SectionTitle>Summary</SectionTitle>
              <Summary>
                Bioinformatics scientist with expertise in genomics, metagenomics, and immunology. Experienced in developing computational pipelines for analyzing large-scale biological datasets. Skilled in machine learning, statistical analysis, and visualization of complex biological data.
              </Summary>
            </Section>
            
            <Section>
              <SectionTitle>Skills</SectionTitle>
              <SkillsGrid>
                <SkillItem>Python</SkillItem>
                <SkillItem>R</SkillItem>
                <SkillItem>Bash/Shell</SkillItem>
                <SkillItem>Machine Learning</SkillItem>
                <SkillItem>Genomics</SkillItem>
                <SkillItem>Metagenomics</SkillItem>
                <SkillItem>Transcriptomics</SkillItem>
                <SkillItem>Immunoinformatics</SkillItem>
                <SkillItem>Data Visualization</SkillItem>
                <SkillItem>Nextflow</SkillItem>
                <SkillItem>Docker</SkillItem>
                <SkillItem>Git</SkillItem>
                <SkillItem>AWS</SkillItem>
              </SkillsGrid>
            </Section>
            
            <Section>
              <SectionTitle>Strengths</SectionTitle>
              <SkillsGrid>
                <SkillItem>Problem Solving</SkillItem>
                <SkillItem>Data Analysis</SkillItem>
                <SkillItem>Pipeline Development</SkillItem>
                <SkillItem>Statistical Analysis</SkillItem>
                <SkillItem>Scientific Writing</SkillItem>
                <SkillItem>Collaboration</SkillItem>
                <SkillItem>Communication</SkillItem>
                <SkillItem>Project Management</SkillItem>
              </SkillsGrid>
            </Section>
            
            <Section>
              <SectionTitle>Experience</SectionTitle>
              <CareerItem>
                <JobTitle>Lead Scientist</JobTitle>
                <Company>Booz Allen Hamilton</Company>
                <Period>03/2025 - Present</Period>
                <Description>
                  Develop and implement bioinformatics pipelines for pathogen surveillance and public health at CDC. Collaborate across cross-functional teams on AMD-P project to ensure efficient deployment of pathogen-related pipelines.
                </Description>
              </CareerItem>
              
              <CareerItem>
                <JobTitle>Bioinformatics Scientist</JobTitle>
                <Company>Leidos</Company>
                <Period>07/2022 - 01/2025</Period>
                <Description>
                  Lead workflow developer for Aquascope – a NextFlow pipeline for early detection of National wastewater sequencing (NWSS) of SARS-CoV-2 variants of concern via targeted amplicon sequencing. Led sequencing data analysis projects using analytical workflows and programming languages with Version control.
                </Description>
              </CareerItem>
              
              <CareerItem>
                <JobTitle>Sr. Bioinformatics Analyst</JobTitle>
                <Company>Emory Primate Research Center</Company>
                <Period>07/2020 - 07/2022</Period>
                <Description>
                  Lead analyst for Wastewater assessment of COVID-19 from wastewater plants in Atlanta, GA. Lead Bioinformatics analyst for IMMuno Phenotyping Assessment in a COVID-19 Cohort (IMPACC) study from EPRC, featuring 5000 COVID-19 patients.
                </Description>
              </CareerItem>
              
              <CareerItem>
                <JobTitle>Bioinformatics Analyst II</JobTitle>
                <Company>Leidos Biomedical Research</Company>
                <Period>04/2018 - 06/2020</Period>
                <Description>
                  Performed comprehensive preliminary and exploratory data analysis for gene expression studies across various NIAID projects, leveraging Microarray, RNA-Seq, and Single Cell RNA sequencing data to uncover new leads and insights.
                </Description>
              </CareerItem>
            </Section>
            
            <Section>
              <SectionTitle>Education</SectionTitle>
              <CareerItem>
                <JobTitle>M.S. in Bioinformatics</JobTitle>
                <Company>Indiana University-Purdue University (IUPUI)</Company>
                <Period>2016–2017</Period>
              </CareerItem>
              
              <CareerItem>
                <JobTitle>M.S. in Biomedical Science</JobTitle>
                <Company>Symbiosis School of Biological Sciences</Company>
                <Period>2012–2014</Period>
              </CareerItem>
              
              <CareerItem>
                <JobTitle>Bachelor's in Biotechnology</JobTitle>
                <Company>Sreenidhi Institute of Science and Technology</Company>
                <Period>2007–2011</Period>
              </CareerItem>
            </Section>
          </>
        )}
      </ResumeWrapper>
    </ResumeContainer>
  );
};

export default Resume;

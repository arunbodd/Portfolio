import React from 'react';
import styled from 'styled-components';
import { FaCode, FaDna, FaDatabase, FaLaptopCode } from 'react-icons/fa';

const AboutContainer = styled.div`
  background: #0a192f;
  color: #8892b0;
  padding: 100px calc((100vw - 1200px) / 2);
  
  @media screen and (max-width: 768px) {
    padding: 80px 24px;
  }
`;

const AboutWrapper = styled.div`
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

const AboutContent = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 50px;
  margin-top: 40px;
  
  @media screen and (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const AboutText = styled.div`
  p {
    margin-bottom: 24px;
    font-size: 18px;
    line-height: 1.6;
  }
  
  a {
    color: #64ffda;
    text-decoration: none;
    
    &:hover {
      text-decoration: underline;
    }
  }
`;

const AboutImage = styled.div`
  img {
    width: 100%;
    border-radius: 5px;
    border: 2px solid #64ffda;
    filter: grayscale(20%);
    transition: all 0.3s ease;
    
    &:hover {
      filter: grayscale(0%);
      transform: translateY(-5px);
    }
  }
  
  @media screen and (max-width: 768px) {
    margin-top: 30px;
  }
`;

const SkillsContainer = styled.div`
  margin-top: 80px;
`;

const SkillsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 30px;
  margin-top: 40px;
  
  @media screen and (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const SkillCategory = styled.div`
  background: rgba(255, 255, 255, 0.05);
  border-radius: 5px;
  padding: 30px;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  }
`;

const CategoryTitle = styled.h3`
  color: #ccd6f6;
  font-size: 22px;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  
  svg {
    margin-right: 10px;
    color: #64ffda;
  }
`;

const SkillsList = styled.ul`
  list-style-type: none;
  padding: 0;
  
  li {
    position: relative;
    padding-left: 20px;
    margin-bottom: 10px;
    font-size: 16px;
    
    &:before {
      content: '▹';
      position: absolute;
      left: 0;
      color: #64ffda;
    }
  }
`;

const About = () => {
  return (
    <AboutContainer id="about">
      <AboutWrapper>
        <SectionTitle>About Me</SectionTitle>
        <AboutContent>
          <AboutText>
            <p>
              Hello! I'm Arun, a bioinformatics scientist and machine learning expert with a passion for solving complex biological problems through computational approaches.
            </p>
            <p>
              My journey in bioinformatics began during my graduate studies, where I developed a deep interest in applying computational methods to understand genomic data. Since then, I've worked on various projects involving next-generation sequencing, genomics, transcriptomics, and the application of machine learning to biological datasets.
            </p>
            <p>
              I believe in the power of open science and collaboration. My work aims to bridge the gap between biology and computer science, developing tools and methodologies that help researchers extract meaningful insights from complex biological data.
            </p>
            <p>
              When I'm not coding or analyzing data, you can find me hiking, reading about the latest advancements in AI, or experimenting with new programming languages and frameworks.
            </p>
          </AboutText>
          <AboutImage>
            <img src="/profile-image.jpg" alt="Arun Boddapati" />
          </AboutImage>
        </AboutContent>
        
        <SkillsContainer>
          <SectionTitle>Skills & Expertise</SectionTitle>
          <SkillsGrid>
            <SkillCategory>
              <CategoryTitle>
                <FaCode /> Programming Languages
              </CategoryTitle>
              <SkillsList>
                <li>Python</li>
                <li>R</li>
                <li>JavaScript</li>
                <li>Bash/Shell Scripting</li>
                <li>SQL</li>
              </SkillsList>
            </SkillCategory>
            
            <SkillCategory>
              <CategoryTitle>
                <FaDna /> Bioinformatics
              </CategoryTitle>
              <SkillsList>
                <li>Next-Generation Sequencing Analysis</li>
                <li>Genomics & Transcriptomics</li>
                <li>Single-cell RNA-seq Analysis</li>
                <li>Pathway Analysis</li>
                <li>Phylogenetics</li>
              </SkillsList>
            </SkillCategory>
            
            <SkillCategory>
              <CategoryTitle>
                <FaLaptopCode /> Machine Learning
              </CategoryTitle>
              <SkillsList>
                <li>Supervised & Unsupervised Learning</li>
                <li>Deep Learning (TensorFlow, PyTorch)</li>
                <li>Natural Language Processing</li>
                <li>Computer Vision</li>
                <li>Model Deployment</li>
              </SkillsList>
            </SkillCategory>
            
            <SkillCategory>
              <CategoryTitle>
                <FaDatabase /> Data Science
              </CategoryTitle>
              <SkillsList>
                <li>Data Visualization</li>
                <li>Statistical Analysis</li>
                <li>Big Data Processing</li>
                <li>Database Management</li>
                <li>Cloud Computing (AWS, GCP)</li>
              </SkillsList>
            </SkillCategory>
          </SkillsGrid>
        </SkillsContainer>
      </AboutWrapper>
    </AboutContainer>
  );
};

export default About;

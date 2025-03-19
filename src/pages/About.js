import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';

const AboutContainer = styled.div`
  background: ${props => props.theme.background};
  color: ${props => props.theme.textSlate};
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
  color: ${props => props.theme.textLightSlate};
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
    background: ${props => props.theme.highlight};
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
    color: ${props => props.theme.textSlate};
    margin-bottom: 24px;
    font-size: 18px;
    line-height: 1.6;
    text-align: center;
  }
  
  a {
    color: ${props => props.theme.highlight};
    text-decoration: none;
    
    &:hover {
      text-decoration: underline;
    }
  }
`;

const CanvasImage = styled.canvas`
  width: 100%;
  border-radius: 5px;
  border: 2px solid ${props => props.theme.highlight};
  filter: grayscale(20%);
  transition: all 0.3s ease;
  
  &:hover {
    filter: grayscale(0%);
    transform: translateY(-5px);
  }
`;

const AboutImage = styled.div`
  position: relative;
  overflow: hidden;
  
  @media screen and (max-width: 768px) {
    margin-top: 30px;
  }
`;

const ImageOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 5;
  cursor: default;
`;

const About = () => {
  const canvasRef = useRef(null);
  
  useEffect(() => {
    const img = new Image();
    img.crossOrigin = "Anonymous";
    img.src = "https://avatars.githubusercontent.com/u/22992035?v=4";
    
    img.onload = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      
      const ctx = canvas.getContext('2d');
      
      // Set canvas dimensions to match image
      canvas.width = img.width;
      canvas.height = img.height;
      
      // Draw the image
      ctx.drawImage(img, 0, 0);
      
      // Add subtle watermark
      ctx.font = '20px Arial';
      ctx.fillStyle = 'rgba(255, 255, 255, 0.15)';
      ctx.textAlign = 'center';
      ctx.fillText('Arun Boddapati', canvas.width / 2, canvas.height / 2);
    };
  }, []);
  
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
            <CanvasImage 
              ref={canvasRef}
              onContextMenu={(e) => e.preventDefault()}
            />
            <ImageOverlay 
              onContextMenu={(e) => e.preventDefault()}
              onClick={(e) => e.preventDefault()}
            />
          </AboutImage>
        </AboutContent>
      </AboutWrapper>
    </AboutContainer>
  );
};

export default About;

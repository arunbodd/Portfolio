import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import Typed from 'typed.js';
import { Link } from 'react-router-dom';

const HeroContainer = styled.div`
  background: #0a192f;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding: 0 calc((100vw - 1200px) / 2);
  height: 100vh;
  position: relative;
  z-index: 1;
  
  @media screen and (max-width: 768px) {
    height: auto;
    padding-top: 100px;
    padding-bottom: 100px;
  }
`;

const HeroContent = styled.div`
  max-width: 1200px;
  width: 100%;
  padding: 0 24px;
`;

const HeroGreeting = styled.p`
  color: #64ffda;
  font-size: 16px;
  font-weight: 400;
  margin-bottom: 20px;
  font-family: 'Fira Code', monospace;
`;

const HeroH1 = styled.h1`
  color: #ccd6f6;
  font-size: 80px;
  font-weight: 600;
  margin-bottom: 24px;
  
  @media screen and (max-width: 768px) {
    font-size: 40px;
  }
`;

const HeroH2 = styled.h2`
  color: #8892b0;
  font-size: 60px;
  font-weight: 600;
  margin-bottom: 24px;
  
  @media screen and (max-width: 768px) {
    font-size: 32px;
  }
`;

const HeroP = styled.p`
  color: #8892b0;
  font-size: 24px;
  max-width: 600px;
  margin-bottom: 35px;
  
  @media screen and (max-width: 768px) {
    font-size: 18px;
  }
`;

const TypedSpan = styled.span`
  color: #64ffda;
`;

const HeroBtnWrapper = styled.div`
  display: flex;
  flex-direction: row;
  
  @media screen and (max-width: 768px) {
    flex-direction: column;
  }
`;

const Button = styled(Link)`
  border-radius: 4px;
  background: ${({ primary }) => (primary ? '#64ffda' : 'transparent')};
  white-space: nowrap;
  padding: ${({ big }) => (big ? '14px 48px' : '12px 30px')};
  color: ${({ primary }) => (primary ? '#0a192f' : '#64ffda')};
  font-size: ${({ fontBig }) => (fontBig ? '20px' : '16px')};
  outline: none;
  border: ${({ primary }) => (primary ? 'none' : '1px solid #64ffda')};
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.2s ease-in-out;
  text-decoration: none;
  margin-right: 20px;
  
  &:hover {
    transition: all 0.2s ease-in-out;
    background: ${({ primary }) => (primary ? 'rgba(100, 255, 218, 0.8)' : 'rgba(100, 255, 218, 0.1)')};
  }
  
  @media screen and (max-width: 768px) {
    margin-right: 0;
    margin-bottom: 16px;
  }
`;

const Home = () => {
  const typedEl = useRef(null);

  useEffect(() => {
    const options = {
      strings: [
        'Bioinformatics Scientist',
        'Machine Learning Expert',
        'Data Scientist',
        'Genomics Researcher'
      ],
      typeSpeed: 50,
      backSpeed: 50,
      backDelay: 1000,
      loop: true
    };
    
    const typed = new Typed(typedEl.current, options);
    
    return () => {
      typed.destroy();
    };
  }, []);

  return (
    <>
      <HeroContainer id="home">
        <HeroContent>
          <HeroGreeting>Hi, my name is</HeroGreeting>
          <HeroH1>Arun Boddapati.</HeroH1>
          <HeroH2>
            I'm a <TypedSpan ref={typedEl}></TypedSpan>
          </HeroH2>
          <HeroP>
            I specialize in developing computational solutions for complex biological problems,
            with expertise in genomics, machine learning, and data science.
          </HeroP>
          <HeroBtnWrapper>
            <Button to="/projects" primary="true">
              View My Work
            </Button>
            <Button to="/contact">
              Get In Touch
            </Button>
          </HeroBtnWrapper>
        </HeroContent>
      </HeroContainer>
    </>
  );
};

export default Home;

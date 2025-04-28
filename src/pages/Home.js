import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import Typed from 'typed.js';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import Testimonials from '../components/Testimonials';

const HeroContainer = styled.div`
  background: ${props => props.theme.background};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex: 1;
  padding: 40px;
  position: relative;
  z-index: 1;

  @media screen and (max-width: 1024px) {
    width: 100%;
    flex: none;
    padding: 100px 40px 50px 40px;
    align-items: flex-start;
  }

  @media screen and (max-width: 768px) {
    padding: 80px 24px 40px 24px;
  }
`;

const HeroContent = styled.div`
  max-width: 650px;
  width: 100%;
`;

const HeroGreeting = styled.p`
  color: ${props => props.theme.highlight};
  font-size: 16px;
  font-weight: 400;
  margin-bottom: 20px;
  font-family: 'Fira Code', monospace;
`;

const HeroH1 = styled.h1`
  color: ${props => props.theme.textLightSlate};
  font-size: 80px;
  font-weight: 600;
  margin-bottom: 24px;

  @media screen and (max-width: 768px) {
    font-size: 40px;
  }
`;

const HeroH2 = styled.h2`
  color: ${props => props.theme.textSlate};
  font-size: 60px;
  font-weight: 600;
  margin-bottom: 24px;

  @media screen and (max-width: 768px) {
    font-size: 32px;
  }
`;

const HeroP = styled.p`
  color: ${props => props.theme.textSlate};
  font-size: 24px;
  max-width: 600px;
  margin-bottom: 35px;

  @media screen and (max-width: 768px) {
    font-size: 18px;
  }
`;

const TypedSpan = styled.span`
  color: ${props => props.theme.highlight};
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
  background: ${({ primary, theme }) => (primary ? theme.highlight : 'transparent')};
  white-space: nowrap;
  padding: ${({ big }) => (big ? '14px 48px' : '12px 30px')};
  color: ${({ primary, theme }) => (primary ? theme.background : theme.highlight)};
  font-size: ${({ fontBig }) => (fontBig ? '20px' : '16px')};
  outline: none;
  border: ${({ primary, theme }) => (primary ? 'none' : `1px solid ${theme.highlight}`)};
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.2s ease-in-out;
  text-decoration: none;
  margin-right: 20px;

  &:hover {
    transition: all 0.2s ease-in-out;
    background: ${({ primary, theme }) => (primary ? theme.highlightTint : theme.highlightTint)};
    color: ${({ primary, theme }) => (primary ? theme.background : theme.highlight)};
  }

  @media screen and (max-width: 768px) {
    margin-right: 0;
    margin-bottom: 16px;
  }
`;

const PageLayoutContainer = styled.div`
  display: flex;
  flex-direction: row;
  min-height: calc(100vh - 80px);
  width: 100%;
  background: ${props => props.theme.background};

  @media screen and (max-width: 1024px) {
    flex-direction: column;
    min-height: auto;
  }
`;

const TestimonialsWrapperForLayout = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px;
  background: ${props => props.theme.background};

  @media screen and (max-width: 1024px) {
    width: 100%;
    flex: none;
    padding: 20px 40px 40px 40px;
  }

  @media screen and (max-width: 768px) {
    padding: 15px 24px 30px 24px;
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
      loop: true,
      cursorChar: '|',
      smartBackspace: true
    };

    if (typedEl.current) {
      const typed = new Typed(typedEl.current, options);

      return () => {
        typed.destroy();
      };
    }
  }, []);

  return (
    <>
      <SEO 
        title="Home" 
        description="Arun Boddapati is a Lead Scientist specializing in bioinformatics, genomics, and machine learning with expertise in developing computational pipelines."
        keywords="bioinformatics, genomics, data science, machine learning, computational biology"
      />
      <PageLayoutContainer>
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
        <TestimonialsWrapperForLayout>
          <Testimonials />
        </TestimonialsWrapperForLayout>
      </PageLayoutContainer>
    </>
  );
};

export default Home;

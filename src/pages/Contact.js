import React from 'react';
import styled from 'styled-components';
import { FaEnvelope, FaLinkedin, FaGithub } from 'react-icons/fa';
import { IoLocationOutline } from 'react-icons/io5';

const ContactContainer = styled.div`
  background: ${props => props.theme.background};
  color: ${props => props.theme.textSlate};
  padding: 60px calc((100vw - 1200px) / 2);
  min-height: 70vh;
  display: flex;
  align-items: center;
  
  @media screen and (max-width: 768px) {
    padding: 60px 24px;
  }
`;

const ContactWrapper = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
`;

const SectionTitle = styled.h2`
  color: ${props => props.theme.textLightSlate};
  font-size: 32px;
  margin-bottom: 40px;
  position: relative;
  
  &:before {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 0;
    width: 70px;
    height: 3px;
    background: ${props => props.theme.highlight};
  }
`;

const ContactContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

const ContactText = styled.p`
  font-size: 20px;
  line-height: 1.6;
  margin-bottom: 40px;
  max-width: 800px;
  text-align: center;
`;

const ContactGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 30px;
  width: 100%;
  max-width: 800px;
  
  @media screen and (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

// Flip Card Container
const FlipCardContainer = styled.div`
  background-color: transparent;
  perspective: 1000px;
  height: 120px;
  
  &:hover .flip-card-inner {
    transform: rotateY(180deg);
  }
`;

// Inner container that will be flipped
const FlipCardInner = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  text-align: center;
  transition: transform 0.6s;
  transform-style: preserve-3d;
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
`;

// Front of card
const FlipCardFront = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
  background: ${props => props.theme.cardBackground};
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  
  svg {
    color: ${props => props.theme.highlight};
    font-size: 40px;
  }
`;

// Back of card
const FlipCardBack = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
  background: ${props => props.theme.highlightAlt};
  color: ${props => props.theme.textLightSlate};
  transform: rotateY(180deg);
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
`;

const ContactLink = styled.a`
  color: ${props => props.theme.textLightSlate};
  text-decoration: none;
  font-size: 18px;
  transition: color 0.3s ease;
  
  &:hover {
    color: ${props => props.theme.highlight};
  }
`;

const ContactInfo = styled.span`
  color: ${props => props.theme.textLightSlate};
  font-size: 18px;
  white-space: nowrap;
`;

const Contact = () => {
  return (
    <ContactContainer id="contact">
      <ContactWrapper>
        <SectionTitle>Get In Touch</SectionTitle>
        
        <ContactContent>
          <ContactText>
            I'm currently open to new opportunities and collaborations in bioinformatics, 
            genomics, and machine learning. Feel free to reach out if you have a question, 
            project idea, or just want to connect!
          </ContactText>
          
          <ContactGrid>
            {/* Email Card */}
            <FlipCardContainer>
              <FlipCardInner className="flip-card-inner">
                <FlipCardFront>
                  <FaEnvelope />
                </FlipCardFront>
                <FlipCardBack>
                  <ContactLink href="mailto:arunbodd@outlook.com">
                    arunbodd@outlook.com
                  </ContactLink>
                </FlipCardBack>
              </FlipCardInner>
            </FlipCardContainer>
            
            {/* LinkedIn Card */}
            <FlipCardContainer>
              <FlipCardInner className="flip-card-inner">
                <FlipCardFront>
                  <FaLinkedin />
                </FlipCardFront>
                <FlipCardBack>
                  <ContactLink href="https://linkedin.com/in/arunbodd" target="_blank" rel="noopener noreferrer">
                    linkedin.com/in/arunbodd
                  </ContactLink>
                </FlipCardBack>
              </FlipCardInner>
            </FlipCardContainer>
            
            {/* GitHub Card */}
            <FlipCardContainer>
              <FlipCardInner className="flip-card-inner">
                <FlipCardFront>
                  <FaGithub />
                </FlipCardFront>
                <FlipCardBack>
                  <ContactLink href="https://github.com/arunbodd" target="_blank" rel="noopener noreferrer">
                    github.com/arunbodd
                  </ContactLink>
                </FlipCardBack>
              </FlipCardInner>
            </FlipCardContainer>
            
            {/* Location Card */}
            <FlipCardContainer>
              <FlipCardInner className="flip-card-inner">
                <FlipCardFront>
                  <IoLocationOutline />
                </FlipCardFront>
                <FlipCardBack>
                  <ContactInfo>Atlanta, GA</ContactInfo>
                </FlipCardBack>
              </FlipCardInner>
            </FlipCardContainer>
          </ContactGrid>
        </ContactContent>
      </ContactWrapper>
    </ContactContainer>
  );
};

export default Contact;

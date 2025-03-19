import React from 'react';
import styled from 'styled-components';
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';

const FooterContainer = styled.footer`
  background-color: ${props => props.theme.navBackground};
  color: ${props => props.theme.textSlate};
  padding: 3rem 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const SocialIcons = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 1.5rem;
`;

const SocialIconLink = styled.a`
  color: ${props => props.theme.textLightSlate};
  font-size: 1.5rem;
  margin: 0 1rem;
  transition: all 0.3s ease-in-out;

  svg {
    width: 20px;
    height: 20px;
  }

  &:hover {
    color: ${props => props.theme.highlight};
    transform: translateY(-3px);
  }
`;

const Copyright = styled.p`
  font-size: 0.9rem;
  text-align: center;
  margin-bottom: 0.5rem;
`;

const FooterNav = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 1.5rem;
`;

const FooterLink = styled.a`
  color: ${props => props.theme.textLightSlate};
  text-decoration: none;
  margin: 0 1rem;
  font-size: 0.9rem;
  transition: all 0.3s ease-in-out;

  &:hover {
    color: ${props => props.theme.highlight};
  }
`;

const Footer = () => {
  return (
    <FooterContainer>
      <SocialIcons>
        <SocialIconLink href="https://github.com/arunbodd" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
          <FaGithub />
        </SocialIconLink>
        <SocialIconLink href="https://linkedin.com/in/arunboddapati" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
          <FaLinkedin />
        </SocialIconLink>
        <SocialIconLink href="mailto:contact@arunboddapati.com" aria-label="Email">
          <FaEnvelope />
        </SocialIconLink>
      </SocialIcons>
      <FooterNav>
        <FooterLink href="/">Home</FooterLink>
        <FooterLink href="/about">About</FooterLink>
        <FooterLink href="/projects">Projects</FooterLink>
        <FooterLink href="/publications">Publications</FooterLink>
        <FooterLink href="/contact">Contact</FooterLink>
      </FooterNav>
      <Copyright> {new Date().getFullYear()} Arun Boddapati. All rights reserved.</Copyright>
    </FooterContainer>
  );
};

export default Footer;

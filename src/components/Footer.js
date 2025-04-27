import React from 'react';
import styled from 'styled-components';
import { FaGithub, FaLinkedin, FaEnvelope, FaDesktop } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const FooterContainer = styled.footer`
  background-color: ${props => props.theme.navBackground};
  color: ${props => props.theme.textSlate};
  padding: 3rem 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-family: 'Montserrat', sans-serif;
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
  font-family: 'Montserrat', sans-serif;

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
  font-family: 'Montserrat', sans-serif;
  font-weight: 400;
`;

const ViewportNotice = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 0.2rem;
  padding: 2px 4px;
  font-size: 0.6rem;
  font-family: 'Montserrat', sans-serif;
  font-weight: 400;
  
  svg {
    margin-right: 3px;
    color: #a6b1e1;
    font-size: 0.6em;
    transform: scale(0.2);
  }
  
  @media screen and (min-width: 1024px) {
    display: none;
  }
`;

const FooterNav = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 1.5rem;
`;

const FooterLink = styled(Link)`
  color: ${props => props.theme.textLightSlate};
  text-decoration: none;
  margin: 0 1rem;
  font-size: 0.9rem;
  transition: all 0.3s ease-in-out;
  font-family: 'Montserrat', sans-serif;

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
        <SocialIconLink href="mailto:arunbodd@outlook.com" aria-label="Email">
          <FaEnvelope />
        </SocialIconLink>
      </SocialIcons>
      <ViewportNotice>
        <FaDesktop /> This website is best viewed on a desktop or laptop computer
      </ViewportNotice>
      <FooterNav>
        <FooterLink to="/">Home</FooterLink>
        <FooterLink to="/about">About</FooterLink>
        <FooterLink to="/career">Career</FooterLink>
        <FooterLink to="/projects">Projects</FooterLink>
        <FooterLink to="/publications">Publications</FooterLink>
        <FooterLink to="/contact">Contact</FooterLink>
      </FooterNav>
      <Copyright>&copy; 2025 Arun Boddapati. All rights reserved.</Copyright>
    </FooterContainer>
  );
};

export default Footer;

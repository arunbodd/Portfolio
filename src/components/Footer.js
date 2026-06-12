import React, { useCallback } from 'react';
import styled from 'styled-components';
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { scrollToSection } from './SmoothScroll';
import { openEmail } from '../config';

const FooterContainer = styled.footer`
  border-top: 1px solid var(--border);
  background: ${(p) => p.theme.background};
  padding: 60px 32px 40px;
  margin-top: 40px;
`;

const Inner = styled.div`
  max-width: var(--maxw);
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 26px;
`;

const Brand = styled(Link)`
  display: flex;
  align-items: center;
  gap: 10px;
  font-family: ${(p) => p.theme.fontDisplay};
  font-weight: 700;
  font-size: 1.1rem;
  color: ${(p) => p.theme.textLightSlate};
  span.mark {
    width: 30px; height: 30px;
    display: flex; align-items: center; justify-content: center;
    border-radius: 9px;
    background: ${(p) => p.theme.gradient};
    color: #05060b;
  }
`;

const Nav = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 26px;
  button {
    font-family: inherit;
    font-size: 0.9rem;
    color: ${(p) => p.theme.textSlate};
    background: none;
    border: none;
    cursor: pointer;
    transition: color 0.3s var(--ease);
    &:hover { color: ${(p) => p.theme.highlight}; }
  }
`;

const Social = styled.div`
  display: flex;
  gap: 16px;
  a, button {
    width: 42px; height: 42px;
    display: flex; align-items: center; justify-content: center;
    border-radius: 50%;
    border: 1px solid var(--border-strong);
    background: none;
    cursor: pointer;
    color: ${(p) => p.theme.textSlate};
    font-size: 1.1rem;
    transition: all 0.3s var(--ease);
    &:hover { color: ${(p) => p.theme.highlight}; border-color: ${(p) => p.theme.highlight}; transform: translateY(-3px); }
  }
`;

const Copy = styled.p`
  font-size: 0.82rem;
  color: ${(p) => p.theme.textMuted};
  margin: 0;
  text-align: center;
`;

const footerLinks = [
  { id: 'top', label: 'Home' },
  { id: 'career', label: 'Career' },
  { id: 'projects', label: 'Projects' },
  { id: 'publications', label: 'Publications' },
  { id: 'skills', label: 'Skills' },
  { id: 'contact', label: 'Contact' },
];

const Footer = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const go = useCallback(
    (id) => {
      if (location.pathname !== '/') {
        navigate('/');
        setTimeout(() => scrollToSection(id), 450);
      } else {
        scrollToSection(id);
      }
    },
    [location.pathname, navigate],
  );

  return (
  <FooterContainer>
    <Inner>
      <Brand to="/" onClick={(e) => { if (location.pathname === '/') e.preventDefault(); go('top'); }}><span className="mark">λ</span> Arun Boddapati</Brand>
      <Nav>
        {footerLinks.map((l) => (
          <button key={l.id} type="button" onClick={() => go(l.id)}>{l.label}</button>
        ))}
      </Nav>
      <Social>
        <a href="https://github.com/arunbodd" target="_blank" rel="noopener noreferrer" aria-label="GitHub"><FaGithub /></a>
        <a href="https://linkedin.com/in/arunbodd" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><FaLinkedin /></a>
        <button type="button" onClick={() => openEmail()} aria-label="Email"><FaEnvelope /></button>
      </Social>
      <Copy>© {new Date().getFullYear()} Arun Boddapati · Built with React, Three.js & GSAP</Copy>
    </Inner>
  </FooterContainer>
  );
};

export default Footer;

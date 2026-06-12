import React, { useState, useEffect, useContext, useCallback } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { FaBars, FaTimes, FaSun, FaMoon } from 'react-icons/fa';
import { scrollToSection } from './SmoothScroll';
import { ThemeContext } from '../context/ThemeContext';

const Nav = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  height: 76px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 max(32px, calc((100vw - 1400px) / 2));
  transition: background 0.4s var(--ease), backdrop-filter 0.4s var(--ease), border-color 0.4s var(--ease);
  border-bottom: 1px solid ${(p) => (p.$scrolled ? 'var(--border)' : 'transparent')};
  background: ${(p) => (p.$scrolled ? p.theme.navBackground : 'transparent')};
  backdrop-filter: ${(p) => (p.$scrolled ? 'blur(16px) saturate(140%)' : 'none')};

  @media (max-width: 768px) { padding: 0 20px; }
`;

const Logo = styled(Link)`
  display: flex;
  align-items: center;
  gap: 10px;
  font-family: ${(p) => p.theme.fontDisplay};
  font-size: 1.15rem;
  font-weight: 700;
  color: ${(p) => p.theme.textLightSlate};
  letter-spacing: -0.01em;

  span.mark {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 34px;
    height: 34px;
    border-radius: 10px;
    background: ${(p) => p.theme.gradient};
    color: #05060b;
    font-weight: 700;
  }
  span.dim { color: ${(p) => p.theme.textSlate}; font-weight: 400; }
`;

const Menu = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;

  @media (max-width: 880px) {
    position: fixed;
    inset: 0;
    flex-direction: column;
    justify-content: center;
    gap: 28px;
    background: rgba(5, 6, 11, 0.96);
    backdrop-filter: blur(20px);
    transform: translateX(${(p) => (p.$open ? '0' : '100%')});
    transition: transform 0.5s var(--ease);
  }
`;

const StyledLink = styled.button`
  position: relative;
  padding: 8px 16px;
  font-family: inherit;
  font-size: 0.92rem;
  font-weight: 500;
  color: ${(p) => p.theme.textSlate};
  background: none;
  border: none;
  cursor: pointer;
  transition: color 0.3s var(--ease);

  &::after {
    content: '';
    position: absolute;
    left: 16px;
    right: 16px;
    bottom: 2px;
    height: 1.5px;
    background: ${(p) => p.theme.gradient};
    transform: scaleX(0);
    transform-origin: right;
    transition: transform 0.4s var(--ease);
  }
  &:hover { color: ${(p) => p.theme.textLightSlate}; }
  &:hover::after { transform: scaleX(1); transform-origin: left; }
  &.active { color: ${(p) => p.theme.textLightSlate}; }
  &.active::after { transform: scaleX(1); }

  @media (max-width: 880px) { font-size: 1.5rem; font-family: ${(p) => p.theme.fontDisplay}; }
`;

const Right = styled.div`
  display: flex;
  align-items: center;
  gap: 18px;
  @media (max-width: 880px) { display: none; }
`;

const ThemeToggle = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 42px;
  height: 42px;
  border-radius: 50%;
  font-size: 1.05rem;
  color: ${(p) => p.theme.highlight};
  border: 1px solid var(--border-strong);
  background: rgba(127, 127, 127, 0.04);
  transition: border-color 0.3s var(--ease), color 0.3s var(--ease), transform 0.4s var(--ease), background 0.3s var(--ease);
  &:hover {
    border-color: ${(p) => p.theme.highlight};
    background: ${(p) => p.theme.highlightTint};
    transform: rotate(35deg);
  }
`;

const Burger = styled.button`
  display: none;
  z-index: 1001;
  font-size: 1.5rem;
  color: ${(p) => p.theme.textLightSlate};
  @media (max-width: 880px) { display: flex; }
`;

const MobileToggle = styled(ThemeToggle)`
  display: none;
  @media (max-width: 880px) { display: inline-flex; width: 54px; height: 54px; font-size: 1.3rem; }
`;

const links = [
  { id: 'top', label: 'Home' },
  { id: 'career', label: 'Career' },
  { id: 'projects', label: 'Projects' },
  { id: 'publications', label: 'Publications' },
  { id: 'skills', label: 'Skills' },
  { id: 'contact', label: 'Contact' },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState('top');
  const { isDark, toggleTheme } = useContext(ThemeContext);
  const navigate = useNavigate();
  const location = useLocation();
  const onHome = location.pathname === '/';

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Scroll-spy: highlight the section currently in view (only on the one-pager).
  useEffect(() => {
    if (!onHome) return undefined;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: '-45% 0px -50% 0px', threshold: 0 },
    );
    links.forEach((l) => {
      const el = document.getElementById(l.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [onHome]);

  const handleNav = useCallback(
    (id) => {
      setOpen(false);
      if (!onHome) {
        navigate('/');
        // Wait for the one-pager to mount before scrolling.
        setTimeout(() => scrollToSection(id), 450);
      } else {
        scrollToSection(id);
      }
    },
    [onHome, navigate],
  );

  return (
    <Nav $scrolled={scrolled}>
      <Logo to="/" onClick={(e) => { if (onHome) { e.preventDefault(); } setOpen(false); scrollToSection('top'); }}>
        <span className="mark">λ</span>
        Arun<span className="dim">.bio</span>
      </Logo>

      <Menu $open={open}>
        {links.map((l) => (
          <StyledLink
            key={l.id}
            className={onHome && active === l.id ? 'active' : ''}
            onClick={() => handleNav(l.id)}
          >
            {l.label}
          </StyledLink>
        ))}
        <MobileToggle onClick={toggleTheme} aria-label="Toggle light/dark theme">
          {isDark ? <FaSun /> : <FaMoon />}
        </MobileToggle>
      </Menu>

      <Right>
        <ThemeToggle onClick={toggleTheme} aria-label="Toggle light/dark theme">
          {isDark ? <FaSun /> : <FaMoon />}
        </ThemeToggle>
      </Right>

      <Burger onClick={() => setOpen((o) => !o)} aria-label="Toggle menu">
        {open ? <FaTimes /> : <FaBars />}
      </Burger>
    </Nav>
  );
};

export default Navbar;

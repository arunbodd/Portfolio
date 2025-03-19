import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { FaBars, FaTimes, FaSun, FaMoon } from 'react-icons/fa';
import { ThemeContext } from '../context/ThemeContext';

const Nav = styled.nav`
  background: ${props => props.theme.navBackground};
  height: 80px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem calc((100vw - 1200px) / 2);
  z-index: 10;
  position: sticky;
  top: 0;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
`;

const Logo = styled(Link)`
  color: ${props => props.theme.highlight};
  font-size: 1.8rem;
  font-weight: bold;
  text-decoration: none;
  padding: 0 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    color: ${props => props.theme.textWhite};
  }
`;

const NavMenu = styled.div`
  display: flex;
  align-items: center;
  
  @media screen and (max-width: 768px) {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 90vh;
    position: absolute;
    top: 80px;
    left: ${({ isOpen }) => (isOpen ? '0' : '-100%')};
    opacity: 1;
    transition: all 0.5s ease;
    background: ${props => props.theme.navBackground};
    padding-top: 2rem;
  }
`;

const NavItem = styled.li`
  list-style: none;
  height: 80px;
  
  @media screen and (max-width: 768px) {
    width: 100%;
    height: auto;
    padding: 1.5rem 0;
  }
`;

const NavLink = styled(Link)`
  color: ${props => props.theme.textLightSlate};
  display: flex;
  align-items: center;
  text-decoration: none;
  padding: 0 1rem;
  height: 100%;
  cursor: pointer;
  font-size: 1rem;
  transition: all 0.3s ease;
  
  &:hover {
    color: ${props => props.theme.highlight};
  }
  
  @media screen and (max-width: 768px) {
    text-align: center;
    width: 100%;
    display: table;
    padding: 1rem;
  }
`;

const NavBtn = styled.div`
  display: flex;
  align-items: center;
  margin-right: 24px;
  
  @media screen and (max-width: 768px) {
    display: none;
  }
`;

const NavBtnLink = styled.a`
  border-radius: 4px;
  background: transparent;
  padding: 10px 22px;
  color: ${props => props.theme.highlight};
  border: 1px solid ${props => props.theme.highlight};
  outline: none;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  text-decoration: none;
  margin-left: 16px;
  
  &:hover {
    transition: all 0.3s ease-in-out;
    background: rgba(100, 255, 218, 0.1);
  }
`;

const ThemeToggle = styled.button`
  background: transparent;
  color: ${props => props.theme.highlight};
  border: none;
  cursor: pointer;
  font-size: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  padding: 0.5rem;
  margin-right: 12px;
  
  &:hover {
    transform: rotate(30deg);
  }
`;

const MobileIcon = styled.div`
  display: none;
  
  @media screen and (max-width: 768px) {
    display: block;
    position: absolute;
    top: 0;
    right: 0;
    transform: translate(-100%, 60%);
    font-size: 1.8rem;
    cursor: pointer;
    color: ${props => props.theme.textLightSlate};
  }
`;

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrollNav, setScrollNav] = useState(false);
  const { theme, toggleTheme } = useContext(ThemeContext);

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  const changeNav = () => {
    if (window.scrollY >= 80) {
      setScrollNav(true);
    } else {
      setScrollNav(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', changeNav);
    return () => {
      window.removeEventListener('scroll', changeNav);
    };
  }, []);

  return (
    <Nav scrollNav={scrollNav}>
      <Logo to="/">Arun Boddapati</Logo>
      <MobileIcon onClick={toggle}>
        {isOpen ? <FaTimes /> : <FaBars />}
      </MobileIcon>
      <NavMenu isOpen={isOpen}>
        <NavItem>
          <NavLink to="/" onClick={() => setIsOpen(false)}>Home</NavLink>
        </NavItem>
        <NavItem>
          <NavLink to="/about" onClick={() => setIsOpen(false)}>About</NavLink>
        </NavItem>
        <NavItem>
          <NavLink to="/career" onClick={() => setIsOpen(false)}>Career</NavLink>
        </NavItem>
        <NavItem>
          <NavLink to="/skills" onClick={() => setIsOpen(false)}>Skills</NavLink>
        </NavItem>
        <NavItem>
          <NavLink to="/strengths" onClick={() => setIsOpen(false)}>Strengths</NavLink>
        </NavItem>
        <NavItem>
          <NavLink to="/projects" onClick={() => setIsOpen(false)}>Projects</NavLink>
        </NavItem>
        <NavItem>
          <NavLink to="/publications" onClick={() => setIsOpen(false)}>Publications</NavLink>
        </NavItem>
        <NavItem>
          <NavLink to="/contact" onClick={() => setIsOpen(false)}>Contact</NavLink>
        </NavItem>
      </NavMenu>
      <NavBtn>
        <ThemeToggle onClick={toggleTheme} aria-label="Toggle theme">
          {theme === 'dark' ? <FaSun /> : <FaMoon />}
        </ThemeToggle>
        <NavBtnLink href="/resume.pdf" target="_blank" rel="noopener noreferrer">Resume</NavBtnLink>
      </NavBtn>
    </Nav>
  );
};

export default Navbar;

import React from 'react';
import styled from 'styled-components';

// Styled container with explicit width and height constraints
const LogoContainer = styled.div`
  width: ${props => props.size || '14px'};
  height: ${props => props.size || '14px'};
  margin-right: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`;

// SVG wrapper to ensure proper sizing
const StyledSvg = styled.svg`
  width: 100%;
  height: 100%;
  display: block;
`;

// Emory logo as a React component 
export const EmoryLogo = ({ size }) => (
  <LogoContainer size={size}>
    <StyledSvg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="50" cy="50" r="30" fill="#012169"/>
      <circle cx="50" cy="50" r="20" fill="#F2A900"/>
      <circle cx="50" cy="50" r="10" fill="#012169"/>
    </StyledSvg>
  </LogoContainer>
);

// Generic company logo
export const CompanyLogo = ({ size }) => (
  <LogoContainer size={size}>
    <StyledSvg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="20" y="20" width="60" height="60" rx="5" fill="#0a192f"/>
      <rect x="30" y="35" width="40" height="8" rx="2" fill="#64ffda"/>
      <rect x="30" y="50" width="40" height="8" rx="2" fill="#64ffda"/>
      <rect x="30" y="65" width="40" height="8" rx="2" fill="#64ffda"/>
    </StyledSvg>
  </LogoContainer>
);

const Logos = { EmoryLogo, CompanyLogo };
export default Logos;

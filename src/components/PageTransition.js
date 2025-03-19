import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import styled, { keyframes, css } from 'styled-components';

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const fadeOut = keyframes`
  from {
    opacity: 1;
    transform: translateY(0);
  }
  to {
    opacity: 0;
    transform: translateY(-20px);
  }
`;

const PageWrapper = styled.div`
  position: relative;
  min-height: 100%;
  width: 100%;
  animation: ${props => {
    if (props.transitionState === 'fadeIn') {
      return css`${fadeIn} 0.4s ease-in-out forwards`;
    } else if (props.transitionState === 'fadeOut') {
      return css`${fadeOut} 0.4s ease-in-out forwards`;
    }
    return 'none';
  }};
`;

const PageTransition = ({ children }) => {
  const location = useLocation();
  const [displayLocation, setDisplayLocation] = useState(location);
  const [transitionStage, setTransitionStage] = useState("fadeIn");

  useEffect(() => {
    if (location.pathname !== displayLocation.pathname) {
      setTransitionStage("fadeOut");
      const timeout = setTimeout(() => {
        setDisplayLocation(location);
        setTransitionStage("fadeIn");
      }, 300); // This should be slightly less than the animation duration
      
      return () => clearTimeout(timeout);
    }
  }, [location, displayLocation]);

  return (
    <PageWrapper transitionState={transitionStage}>
      {children}
    </PageWrapper>
  );
};

export default PageTransition;

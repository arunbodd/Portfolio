import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const PageWrapper = styled.div`
  animation: ${fadeIn} 0.4s ease-in-out;
  min-height: 100%;
  width: 100%;
`;

const PageTransition = ({ children }) => {
  const location = useLocation();
  const [displayLocation, setDisplayLocation] = useState(location);
  const [transitionStage, setTransitionStage] = useState("fadeIn");

  useEffect(() => {
    if (location !== displayLocation) setTransitionStage("fadeIn");
  }, [location, displayLocation]);

  useEffect(() => {
    if (transitionStage === "fadeIn") {
      setDisplayLocation(location);
    }
  }, [transitionStage, location]);

  return (
    <PageWrapper>
      {children}
    </PageWrapper>
  );
};

export default PageTransition;

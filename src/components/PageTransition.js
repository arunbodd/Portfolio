import React from 'react';
import { useLocation } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const PageWrapper = styled.div`
  animation: ${fadeIn} 1.3s ease;
  min-height: 100%;
  width: 100%;
`;

const PageTransition = ({ children }) => {
  const location = useLocation();
  
  // Using React.cloneElement to pass a unique key based on the pathname
  // This forces a remount of children when the route changes
  return (
    <PageWrapper key={location.pathname}>
      {children}
    </PageWrapper>
  );
};

export default PageTransition;

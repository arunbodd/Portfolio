import React from 'react';
import styled from 'styled-components';

const EducationContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  color: ${props => props.theme.textSlate};
`;

const Title = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 1.5rem;
  color: ${props => props.theme.textLightSlate};
  position: relative;
  
  &:after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 0;
    width: 80px;
    height: 4px;
    background: ${props => props.theme.highlight};
  }
`;

const EducationList = styled.div`
  margin-top: 3rem;
`;

const EducationItem = styled.div`
  margin-bottom: 2.5rem;
  padding: 1.5rem;
  border-radius: 8px;
  background-color: ${props => props.theme.lightNavy};
  transition: transform 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  }
`;

const Degree = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
  color: ${props => props.theme.textLightSlate};
`;

const Institution = styled.h4`
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
  color: ${props => props.theme.highlight};
`;

const Period = styled.p`
  font-style: italic;
  margin-bottom: 0.5rem;
  color: ${props => props.theme.textSlate};
`;

const Location = styled.p`
  color: ${props => props.theme.textSlate};
`;

const Education = () => {
  return (
    <EducationContainer>
      <Title>Education</Title>
      
      <EducationList>
        <EducationItem>
          <Degree>M.S. in Bioinformatics</Degree>
          <Institution>Indiana University-Purdue University (IUPUI)</Institution>
          <Period>2016–2017</Period>
          <Location>Indianapolis, Indiana</Location>
        </EducationItem>
        
        <EducationItem>
          <Degree>M.S. in Biomedical Science</Degree>
          <Institution>Symbiosis School of Biological Sciences</Institution>
          <Period>2012–2014</Period>
          <Location>Pune, India</Location>
        </EducationItem>
        
        <EducationItem>
          <Degree>Bachelor's in Biotechnology</Degree>
          <Institution>Sreenidhi Institute of Science and Technology</Institution>
          <Period>2007–2011</Period>
          <Location>Hyderabad, India</Location>
        </EducationItem>
      </EducationList>
    </EducationContainer>
  );
};

export default Education;

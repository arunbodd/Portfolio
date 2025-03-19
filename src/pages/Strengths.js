import React from 'react';
import styled from 'styled-components';
import { 
  FaLightbulb, 
  FaRocket, 
  FaPuzzlePiece, 
  FaTasks, 
  FaUsers, 
  FaExchangeAlt, 
  FaClock, 
  FaChalkboardTeacher, 
  FaHandshake 
} from 'react-icons/fa';

const StrengthsContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  color: ${props => props.theme.textSlate};
  background: ${props => props.theme.background};
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

const Introduction = styled.p`
  font-size: 1.2rem;
  line-height: 1.6;
  margin: 2rem auto;
  max-width: 800px;
  text-align: center;
`;

const StrengthsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 3rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const StrengthCard = styled.div`
  background-color: ${props => props.theme.lightNavy};
  border-radius: 8px;
  padding: 2rem;
  transition: all 0.3s ease;
  height: 100%;
  display: flex;
  flex-direction: column;
  
  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  }
`;

const IconContainer = styled.div`
  font-size: 2.5rem;
  color: ${props => props.theme.highlight};
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 80px;
  width: 80px;
  border-radius: 50%;
  background-color: rgba(100, 255, 218, 0.1);
  margin: 0 auto 1.5rem;
`;

const StrengthTitle = styled.h3`
  font-size: 1.5rem;
  color: ${props => props.theme.textLightSlate};
  margin-bottom: 1rem;
  text-align: center;
`;

const StrengthDescription = styled.p`
  font-size: 1rem;
  line-height: 1.6;
  text-align: center;
  flex-grow: 1;
`;

const Strengths = () => {
  const strengthsList = [
    {
      title: "Curiosity",
      icon: <FaLightbulb />,
      description: "Always seeking to learn and understand more, driving innovation and continuous improvement in my work."
    },
    {
      title: "Initiative",
      icon: <FaRocket />,
      description: "Proactively identifying opportunities and taking action without being prompted, leading to new solutions and approaches."
    },
    {
      title: "Problem Solving",
      icon: <FaPuzzlePiece />,
      description: "Breaking down complex challenges into manageable components and finding creative solutions through analytical thinking."
    },
    {
      title: "Project Management",
      icon: <FaTasks />,
      description: "Efficiently planning, executing, and completing projects while managing resources, timelines, and stakeholder expectations."
    },
    {
      title: "Team Work",
      icon: <FaUsers />,
      description: "Collaborating effectively with diverse teams, contributing expertise while respecting and integrating others' perspectives."
    },
    {
      title: "Adaptability",
      icon: <FaExchangeAlt />,
      description: "Quickly adjusting to new situations, technologies, and requirements in the rapidly evolving field of bioinformatics."
    },
    {
      title: "Time & Resource Management",
      icon: <FaClock />,
      description: "Optimizing the use of available time and resources to deliver high-quality results efficiently and cost-effectively."
    },
    {
      title: "Mentoring",
      icon: <FaChalkboardTeacher />,
      description: "Guiding and supporting colleagues and junior team members to develop their skills and reach their full potential."
    },
    {
      title: "Client Relations",
      icon: <FaHandshake />,
      description: "Building strong, trust-based relationships with clients and stakeholders through clear communication and reliable delivery."
    }
  ];

  return (
    <StrengthsContainer>
      <Title>Strengths</Title>
      
      <Introduction>
        My professional strengths have been developed and refined throughout my career in bioinformatics and data science. 
        These core attributes enable me to deliver exceptional results and build strong collaborative relationships.
      </Introduction>
      
      <StrengthsGrid>
        {strengthsList.map((strength, index) => (
          <StrengthCard key={index}>
            <IconContainer>
              {strength.icon}
            </IconContainer>
            <StrengthTitle>{strength.title}</StrengthTitle>
            <StrengthDescription>{strength.description}</StrengthDescription>
          </StrengthCard>
        ))}
      </StrengthsGrid>
    </StrengthsContainer>
  );
};

export default Strengths;

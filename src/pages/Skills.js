import React from 'react';
import styled from 'styled-components';
import { 
  FaProjectDiagram, 
  FaDna, 
  FaCode, 
  FaStream, 
  FaBrain
} from 'react-icons/fa';

const PageContainer = styled.div`
  background: ${props => props.theme.background};
  min-height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SkillsContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  color: ${props => props.theme.textSlate};
  width: 100%;
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

const SkillsSection = styled.div`
  margin-top: 3rem;
`;

const SectionTitle = styled.h2`
  font-size: 1.8rem;
  margin-bottom: 1.5rem;
  color: ${props => props.theme.textLightSlate};
  display: flex;
  align-items: center;
  
  svg {
    font-size: 0.9rem;
    margin-right: 0.6rem;
    color: ${props => props.theme.highlight};
  }
`;

const SkillsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
  margin-bottom: 3rem;
  
  @media (max-width: 992px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: 576px) {
    grid-template-columns: 1fr;
  }
`;

const SkillItem = styled.div`
  background-color: ${props => props.theme.lightNavy};
  border-radius: 8px;
  padding: 1rem 1.2rem;
  transition: all 0.3s ease;
  border-left: 3px solid transparent;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
    background-color: ${props => props.theme.highlightTint || 'rgba(100, 255, 218, 0.07)'};
    border-left: 3px solid ${props => props.theme.highlight};
  }
`;

const SkillName = styled.p`
  font-size: 1rem;
  color: ${props => props.theme.textLightSlate};
  margin: 0;
  position: relative;
  
  &:before {
    content: '';
    position: absolute;
    left: -8px;
    top: 50%;
    transform: translateY(-50%);
    width: 0;
    height: 0;
    border-radius: 50%;
    transition: all 0.2s ease;
  }
  
  ${SkillItem}:hover & {
    color: ${props => props.theme.highlight};
  }
`;

const CategoryIcon = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin-right: 0.6rem;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background-color: rgba(100, 255, 218, 0.1);
  
  svg {
    font-size: 0.9rem;
  }
`;

const Skills = () => {
  const skillCategories = [
    {
      title: "Project Management & Leadership",
      icon: <FaProjectDiagram />,
      skills: [
        "Project Management",
        "Team Building",
        "Quality Management",
        "Mentorship",
        "Scrum",
        "Jira"
      ]
    },
    {
      title: "Bioinformatics & Genomics",
      icon: <FaDna />,
      skills: [
        "NGS Analysis",
        "Infectious Diseases",
        "Immunology",
        "Repertoire Sequencing",
        "Epidemiology",
        "Single-cell",
        "Cite-seq",
        "Metagenomics",
        "Proteomics"
      ]
    },
    {
      title: "Programming & Development",
      icon: <FaCode />,
      skills: [
        "R",
        "RShiny",
        "Quarto",
        "Python",
        "PyTorch",
        "Shell",
        "HTML",
        "CSS"
      ]
    },
    {
      title: "Workflow & DevOps",
      icon: <FaStream />,
      skills: [
        "Nextflow",
        "Snakemake",
        "CI/CD Github",
        "Singularity",
        "Docker",
        "AWS",
        "AWS ECR",
        "AWS EC2",
        "AWS Batch",
        "Sequera Tower",
        "Azure"
      ]
    },
    {
      title: "Machine Learning & AI",
      icon: <FaBrain />,
      skills: [
        "TensorFlow",
        "Regression",
        "Classification",
        "Generative Neural Nets",
        "NLP"
      ]
    }
  ];

  return (
    <PageContainer>
      <SkillsContainer>
        <Title>Skills</Title>
        
        {skillCategories.map((category, index) => (
          <SkillsSection key={index}>
            <SectionTitle>
              <CategoryIcon>{category.icon}</CategoryIcon>
              {category.title}
            </SectionTitle>
            <SkillsGrid>
              {category.skills.map((skill, skillIndex) => (
                <SkillItem key={skillIndex}>
                  <SkillName>{skill}</SkillName>
                </SkillItem>
              ))}
            </SkillsGrid>
          </SkillsSection>
        ))}
      </SkillsContainer>
    </PageContainer>
  );
};

export default Skills;

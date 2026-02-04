import React from 'react';
import styled from 'styled-components';
import { 
  FaDna, 
  FaCode, 
  FaStream, 
  FaBrain,
  FaUsers,
  FaTools
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
  text-align: center;
  
  &:after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 50%;
    transform: translateX(-50%);
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

const TwoColumnContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  margin-top: 3rem;
  
  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`;

const SkillsColumn = styled.div`
  display: flex;
  flex-direction: column;
`;

const SectionTitle = styled.h2`
  font-size: 1.8rem;
  margin-bottom: 2rem;
  color: ${props => props.theme.textLightSlate};
  text-align: left;
  position: relative;
  padding-bottom: 1rem;
  
  &:after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 60px;
    height: 3px;
    background: ${props => props.theme.highlight};
  }
`;

const SkillsGrid = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const SkillItem = styled.div`
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

const SkillTitle = styled.h3`
  font-size: 1.5rem;
  color: ${props => props.theme.textLightSlate};
  margin-bottom: 1rem;
  text-align: center;
`;

const SkillDescription = styled.p`
  font-size: 1rem;
  line-height: 1.6;
  text-align: center;
  flex-grow: 1;
`;

const Skills = () => {
  const technicalSkills = [
    {
      title: "Bioinformatics & Genomics",
      icon: <FaDna />,
      description: "Expert in NGS analysis, infectious diseases, immunology, repertoire sequencing, epidemiology, single-cell analysis, cite-seq, metagenomics, and proteomics."
    },
    {
      title: "Programming & Development",
      icon: <FaCode />,
      description: "Proficient in R, RShiny, Quarto, Python, PyTorch, Shell scripting, HTML, and CSS for developing robust bioinformatics applications."
    },
    {
      title: "Pipelines & Infrastructure",
      icon: <FaStream />,
      description: "Expert in Nextflow, nf-core, Snakemake, WDL, Docker/Singularity, AWS, Azure, CI/CD, Slurm, PBS, and SunGridEngine for building scalable bioinformatics infrastructure."
    },
    {
      title: "Machine Learning & AI",
      icon: <FaBrain />,
      description: "Experienced in TensorFlow, PyTorch, Scikit-learn, regression, classification, generative neural networks, NLP, large language models, deep learning, MCP servers, agentic tooling, and prompt engineering."
    },
    {
      title: "Technical Excellence",
      icon: <FaTools />,
      description: "Comprehensive expertise in Git version control, Linux/Unix systems, high-performance computing (HPC), data visualization, statistical analysis, and scientific communication."
    }
  ];

  const leadershipSkills = [
    {
      title: "Leadership & Management",
      icon: <FaUsers />,
      description: "Strong capabilities in project management, team building, quality management, mentorship, Scrum methodology, and Jira for effective team coordination."
    },
    {
      title: "Mentorship & Talent Development",
      icon: <FaUsers />,
      description: "Experienced in 1:1 coaching, technical skill development programs, performance feedback, junior scientist training, and upskilling initiatives to build high-performing teams."
    }
  ];

  return (
    <PageContainer>
      <SkillsContainer>
        <Title>Skills</Title>
        
        <Introduction>
          My expertise spans across bioinformatics, software development, data science, and leadership. 
          These skills enable me to deliver innovative solutions for complex biological and computational challenges while building high-performing teams.
        </Introduction>
        
        <TwoColumnContainer>
          <SkillsColumn>
            <SectionTitle>Technical Skills</SectionTitle>
            <SkillsGrid>
              {technicalSkills.map((skill, index) => (
                <SkillItem key={index}>
                  <IconContainer>
                    {skill.icon}
                  </IconContainer>
                  <SkillTitle>{skill.title}</SkillTitle>
                  <SkillDescription>{skill.description}</SkillDescription>
                </SkillItem>
              ))}
            </SkillsGrid>
          </SkillsColumn>

          <SkillsColumn>
            <SectionTitle>Leadership & Management</SectionTitle>
            <SkillsGrid>
              {leadershipSkills.map((skill, index) => (
                <SkillItem key={index}>
                  <IconContainer>
                    {skill.icon}
                  </IconContainer>
                  <SkillTitle>{skill.title}</SkillTitle>
                  <SkillDescription>{skill.description}</SkillDescription>
                </SkillItem>
              ))}
            </SkillsGrid>
          </SkillsColumn>
        </TwoColumnContainer>
      </SkillsContainer>
    </PageContainer>
  );
};

export default Skills;

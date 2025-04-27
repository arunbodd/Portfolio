import React from 'react';
import styled from 'styled-components';
import { FaQuoteLeft, FaQuoteRight, FaLinkedin } from 'react-icons/fa';
import SEO from '../components/SEO';

const TestimonialsPageContainer = styled.div`
  background: ${props => props.theme.background};
  color: ${props => props.theme.textSlate};
  padding: 60px calc((100vw - 1200px) / 2);
  min-height: 100vh;
  
  @media screen and (max-width: 768px) {
    padding: 60px 24px;
  }
`;

const TestimonialsWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const SectionTitle = styled.h2`
  color: ${props => props.theme.textLightSlate};
  font-size: 32px;
  margin-bottom: 60px;
  position: relative;
  
  &:after {
    content: '';
    position: absolute;
    bottom: -15px;
    left: 0;
    width: 70px;
    height: 3px;
    background: ${props => props.theme.highlight};
  }
`;

const TestimonialsIntro = styled.p`
  font-size: 18px;
  line-height: 1.7;
  margin-bottom: 40px;
  max-width: 800px;
`;

const TestimonialsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(500px, 1fr));
  gap: 30px;
  
  @media screen and (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const TestimonialCard = styled.div`
  background: ${props => props.theme.lightNavy};
  padding: 30px;
  border-radius: 8px;
  box-shadow: 0 10px 30px -15px rgba(2, 12, 27, 0.7);
  transition: all 0.3s ease;
  height: 100%;
  display: flex;
  flex-direction: column;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 20px 30px -15px rgba(2, 12, 27, 0.7);
  }
`;

const TestimonialText = styled.p`
  font-size: 16px;
  line-height: 1.7;
  margin-bottom: 20px;
  font-style: italic;
  color: ${props => props.theme.textLightSlate};
  flex-grow: 1;
  position: relative;
  padding: 0 20px;
  
  &:before {
    content: '"';
    position: absolute;
    left: 0;
    top: 0;
    font-size: 30px;
    color: ${props => props.theme.highlight};
    font-family: Georgia, serif;
    line-height: 1;
  }
  
  &:after {
    content: '"';
    position: absolute;
    right: 0;
    bottom: 0;
    font-size: 30px;
    color: ${props => props.theme.highlight};
    font-family: Georgia, serif;
    line-height: 1;
  }
`;

const TestimonialAuthor = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  margin-top: auto;
`;

const AuthorInfo = styled.div`
  flex-grow: 1;
  text-align: right;
`;

const AuthorName = styled.h4`
  color: ${props => props.theme.textLightSlate};
  font-size: 16px;
  margin: 0 0 5px 0;
`;

const AuthorTitle = styled.p`
  color: ${props => props.theme.highlight};
  font-size: 14px;
  margin: 0;
`;

const LinkedInLink = styled.a`
  color: ${props => props.theme.textSlate};
  font-size: 20px;
  transition: all 0.3s ease;
  
  &:hover {
    color: ${props => props.theme.highlight};
  }
`;

const testimonials = [
  {
    text: "I met Arun during my bioinformatics internship at Leidos in the summer of 2023, where he was a bioinformatics scientist in the SciComp group. Arun and I were coworkers on this team, and interacted daily. Arun has a wide variety of computational skills under his belt, and is especially adept at solving complex computational problems. For example, he led a project with another intern to produce a machine learning model to generate sequencing data for a specific disease model. He was also involved in other projects with different requirements, and has expertise in cluster computing, AWS, NextFlow, Python, and many other areas. Arun was also a go-to person when I needed help with my own projects. He was very personable and easy to work with, and always had good insights for solutions and how to implement them. Overall, I would highly recommend Arun as a computational expert and as a leader in group settings and customer service.",
    name: "Charlotte Royer, MS, Gerogia Institute of Technology",
    title: "Senior Bioinformatics Analyst",
    linkedin: "https://www.linkedin.com/in/royercj-oo5515b219/"
  },
  {
    text: "In the short time I've worked with Arun, he has demonstrated exceptional expertise in bioinformatics, particularly in developing and optimizing workflows using Nextflow, Snakemake, and containerization tools. His contributions to transcriptomics and metagenomics projects have been impactful, and his ability to work efficiently on HPC and cloud platforms is impressive. Arun would be a strong asset to any team looking for a skilled and proactive bioinformatician.",
    name: "Paramita Chatterjee, Ph.D, MBA",
    title: "Scientific Operations Lead",
    linkedin: "https://www.linkedin.com/in/paramitachatterjee2022/"
  },
  {
    text: "It is a pleasure to recommend Arun, an exceptional Bioinformatics Scientist whose work has significantly contributed to advancing public health research. I had the privilege of collaborating with him on several projects, and I was continually impressed by his technical expertise, leadership, and dedication to mentoring others in the field. He possesses a rare combination of deep knowledge of bioinformatics, innovative problem-solving skills, and an unwavering commitment to improving public health outcomes. His ability to analyze complex datasets, develop robust workflows, and communicate findings effectively has been invaluable in addressing pressing health challenges and resulting in the publication of manuscripts. What truly makes Arun stand out is his passion for mentorship and he consistently goes above and beyond to support colleagues, trainees, and early-career professionals by sharing his knowledge, providing guidance, and fostering an inclusive and collaborative environment. ",
    name: "Dr. Suchitra Chavan",
    title: "Bioinformatician at Leidos",
    linkedin: "https://www.linkedin.com/in/suchitra-chavan-623580213/"
  },
  {
    text: "I am pleased to recommend my colleague and friend, Arun Kumar Boddapati, a highly skilled researcher in genomics and transcriptomics. I have had the pleasure of working at the Emory National Primate Research Center Genomics Core at the time when Arun joined. I was impressed by his technical expertise and problem-solving abilities, consistently producing insightful results from complex datasets. Arun is a collaborative team player who is always willing to share knowledge and mentor others. He has helped and guided me several times, and I find him super approchable. He is passionate about staying current with the latest trends in genomics and demonstrates a strong commitment to ongoing learning. I am confident that Arun will continue to excel and contribute meaningfully to any future endeavors in genomics and transcriptomics.",
    name: "Dr. Prachi Gupta",
    title: "Computational Biologist",
    linkedin: "https://www.linkedin.com/in/prachi-gupta-b861059/"
  },
  {
    text: "I had the privilege of collaborating with Arun on several projects during my masters and since. I am consistently impressed by his expertise, work ethic, and forward-thinking approach. Arun combines technical prowess and strategic insight, making him a standout professional. As a mentor, he has successfully guided junior scientists and interns, ensuring their professional growth while driving project success. During our time working together, Arun demonstrated exceptional skills in bioinformatics pipeline development, database design, and next-generation sequencing (NGS) data analysis. His development of the Aquascope pipeline significantly reduced analysis time by 80%, greatly enhancing the efficiency of wastewater monitoring efforts. He approaches every task with dedication, enthusiasm, and a focus on excellence. Even without a PhD - he has co-authored and contributed to several high impact journals. It is rare to find someone who balances vision and execution as seamlessly as Arun does. I am confident that his contributions will continue to make a significant impact in any endeavor he undertakes. I wholeheartedly recommend Arun to anyone seeking a dynamic, results-driven professional who consistently exceeds expectations.",
    name: "Dr. Tarun Mamidi",
    title: "Bioinformatics Scientist",
    linkedin: "https://www.linkedin.com/in/tkmamidi/"
  }
];

const TestimonialsPage = () => {
  return (
    <TestimonialsPageContainer>
      <SEO 
        title="Testimonials" 
        description="Professional recommendations and testimonials for Arun Boddapati, a Lead Scientist specializing in bioinformatics and genomics."
        keywords="testimonials, recommendations, bioinformatics, genomics, professional references"
      />
      <TestimonialsWrapper>
        <SectionTitle>Testimonials & Recommendations</SectionTitle>
        
        <TestimonialsIntro>
          Here are some testimonials from colleagues and collaborators I've had the pleasure of working with throughout my career. 
          These recommendations reflect my commitment to excellence in bioinformatics, genomics research, and collaborative scientific work.
        </TestimonialsIntro>
        
        <TestimonialsGrid>
          {testimonials.map((testimonial, index) => (
            <TestimonialCard key={index}>
              <TestimonialText>
                {testimonial.text}
              </TestimonialText>
              <TestimonialAuthor>
                <AuthorInfo>
                  <AuthorName>{testimonial.name}</AuthorName>
                  <AuthorTitle>{testimonial.title}</AuthorTitle>
                </AuthorInfo>
                {testimonial.linkedin && (
                  <LinkedInLink 
                    href={testimonial.linkedin} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    aria-label={`${testimonial.name}'s LinkedIn profile`}
                  >
                    <FaLinkedin />
                  </LinkedInLink>
                )}
              </TestimonialAuthor>
            </TestimonialCard>
          ))}
        </TestimonialsGrid>
      </TestimonialsWrapper>
    </TestimonialsPageContainer>
  );
};

export default TestimonialsPage;

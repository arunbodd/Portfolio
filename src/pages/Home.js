import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import Typed from 'typed.js';
import { Link } from 'react-router-dom';
import { FaQuoteLeft, FaLinkedin } from 'react-icons/fa';
import SEO from '../components/SEO';

const PageContainer = styled.div`
  background: ${props => props.theme.background};
  min-height: 100vh;
  width: 100%;
`;

const HeroContainer = styled.div`
  background: ${props => props.theme.background};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 70vh;
  padding: 60px 40px;
  position: relative;
  z-index: 1;

  @media screen and (max-width: 768px) {
    padding: 30px 20px;
    min-height: 50vh;
  }
`;

const HeroContent = styled.div`
  max-width: 650px;
  width: 100%;
  text-align: center;
`;

const ProfileImageContainer = styled.div`
  position: absolute;
  top: 100px;
  left: 200px;
  z-index: 2;

  @media screen and (max-width: 1024px) {
    display: none;
  }
`;

const ProfileImage = styled.canvas`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  border: 2px solid ${props => props.theme.highlight};
  filter: grayscale(20%);
  transition: all 0.3s ease;
  
  &:hover {
    filter: grayscale(0%);
    transform: translateY(-5px);
    box-shadow: 0 10px 30px rgba(100, 255, 218, 0.3);
  }
`;

const HeroGreeting = styled.p`
  color: ${props => props.theme.highlight};
  font-size: 16px;
  font-weight: 400;
  margin-bottom: 20px;
  font-family: 'Fira Code', monospace;
`;

const HeroH1 = styled.h1`
  color: ${props => props.theme.textLightSlate};
  font-size: 80px;
  font-weight: 600;
  margin-bottom: 24px;

  @media screen and (max-width: 768px) {
    font-size: 40px;
  }
`;

const HeroH2 = styled.h2`
  color: ${props => props.theme.textSlate};
  font-size: 40px;
  font-weight: 600;
  margin-bottom: 24px;

  @media screen and (max-width: 768px) {
    font-size: 26px;
  }
  
  @media screen and (max-width: 480px) {
    font-size: 22px;
  }
`;

const HeroP = styled.p`
  color: ${props => props.theme.textSlate};
  font-size: 24px;
  max-width: 600px;
  margin: 0 0 35px 0;

  @media screen and (max-width: 768px) {
    font-size: 18px;
  }

  @media screen and (max-width: 1024px) {
    margin: 0 auto 35px auto;
  }
`;

const TypedSpan = styled.span`
  color: ${props => props.theme.highlight};
`;

const HeroBtnWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;

  @media screen and (max-width: 768px) {
    flex-direction: column;
  }
`;

const Button = styled(Link)`
  border-radius: 4px;
  background: ${({ primary, theme }) => (primary ? theme.highlight : 'transparent')};
  white-space: nowrap;
  padding: ${({ big }) => (big ? '14px 48px' : '12px 30px')};
  color: ${({ primary, theme }) => (primary ? theme.background : theme.highlight)};
  font-size: ${({ fontBig }) => (fontBig ? '20px' : '16px')};
  outline: none;
  border: ${({ primary, theme }) => (primary ? 'none' : `1px solid ${theme.highlight}`)};
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.2s ease-in-out;
  text-decoration: none;
  margin-right: 20px;

  &:hover {
    transition: all 0.2s ease-in-out;
    background: ${({ primary, theme }) => (primary ? theme.highlightTint : theme.highlightTint)};
    color: ${({ primary, theme }) => (primary ? theme.background : theme.highlight)};
  }

  @media screen and (max-width: 768px) {
    margin-right: 0;
    margin-bottom: 16px;
  }
`;

// About Section Styles
const AboutContainer = styled.div`
  background: ${props => props.theme.background};
  color: ${props => props.theme.textSlate};
  padding: 50px calc((100vw - 1200px) / 2);
  
  @media screen and (max-width: 768px) {
    padding: 30px 20px;
  }
`;

const AboutWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
`;

const SectionTitle = styled.h2`
  color: ${props => props.theme.textLightSlate};
  font-size: 32px;
  margin-bottom: 16px;
  position: relative;
  
  &:before {
    content: '';
    position: absolute;
    bottom: -8px;
    left: 0;
    width: 70px;
    height: 3px;
    background: ${props => props.theme.highlight};
  }
`;

const AboutText = styled.div`
  margin-top: 30px;
  text-align: center;
  
  p {
    color: ${props => props.theme.textSlate};
    margin-bottom: 24px;
    font-size: 18px;
    line-height: 1.7;
    max-width: 900px;
    margin-left: auto;
    margin-right: auto;
  }
  
  .highlight-text {
    color: ${props => props.theme.highlight};
    font-weight: 600;
  }
  
  a {
    color: ${props => props.theme.highlight};
    text-decoration: none;
    
    &:hover {
      text-decoration: underline;
    }
  }
`;

// Career Highlights Section Styles
const CareerHighlightsContainer = styled.div`
  background: ${props => props.theme.background};
  color: ${props => props.theme.textSlate};
  padding: 50px calc((100vw - 1200px) / 2);
  
  @media screen and (max-width: 768px) {
    padding: 30px 20px;
  }
`;

const CareerHighlightsWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
`;

const HighlightsList = styled.div`
  margin-top: 30px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 1.5rem;
  
  @media screen and (max-width: 1024px) {
    grid-template-columns: 1fr;
    grid-gap: 1rem;
  }
`;

const HighlightItem = styled.div`
  background: ${props => props.theme.lightNavy};
  padding: 1.5rem;
  border-radius: 8px;
  border-left: 4px solid ${props => props.theme.highlight};
  transition: all 0.3s ease;
  position: relative;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(100, 255, 218, 0.15);
  }
  
  &:before {
    content: '★';
    position: absolute;
    top: 1rem;
    right: 1rem;
    color: ${props => props.theme.highlight};
    font-size: 1.5rem;
  }
`;

const HighlightText = styled.p`
  color: ${props => props.theme.textLightSlate};
  font-size: 1rem;
  line-height: 1.5;
  margin: 0;
  padding-right: 1.5rem;
`;

// Testimonials Section Styles
const TestimonialsContainer = styled.div`
  background: ${props => props.theme.background};
  color: ${props => props.theme.textSlate};
  padding: 50px calc((100vw - 1200px) / 2);
  
  @media screen and (max-width: 768px) {
    padding: 30px 20px;
  }
`;

const TestimonialsWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
`;

const TestimonialsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  grid-gap: 2rem;
  margin-top: 40px;
  
  @media screen and (max-width: 768px) {
    grid-template-columns: 1fr;
  }
  
  @media screen and (max-width: 768px) {
    grid-template-columns: 1fr;
    grid-gap: 1.5rem;
  }
`;

const FlipCardContainer = styled.div`
  background-color: transparent;
  perspective: 1000px;
  height: 300px;
  cursor: pointer;
  margin-bottom: 1.5rem;
  width: 100%;
`;

const FlipCardInner = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  text-align: center;
  transition: transform 0.8s;
  transform-style: preserve-3d;
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
  
  ${FlipCardContainer}:hover & {
    transform: rotateY(180deg);
  }
`;

const FlipCardFront = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
  background: ${props => props.theme.lightNavy};
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 1.5rem;
  
  svg {
    color: ${props => props.theme.highlight};
    font-size: 40px;
    margin-bottom: 1rem;
  }
  
  &:hover {
    box-shadow: 0 10px 20px rgba(100, 255, 218, 0.15);
  }
`;

const FlipCardBack = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
  background: ${props => props.theme.navy};
  color: ${props => props.theme.textLightSlate};
  transform: rotateY(180deg);
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  padding: 1.5rem;
  overflow-y: auto;
  text-align: left;
  box-shadow: 0 4px 12px rgba(100, 255, 218, 0.2);
  
  &::-webkit-scrollbar {
    width: 5px;
  }
  
  &::-webkit-scrollbar-track {
    background: ${props => props.theme.lightNavy};
  }
  
  &::-webkit-scrollbar-thumb {
    background-color: ${props => props.theme.highlight};
    border-radius: 10px;
  }
`;

const TestimonialPreview = styled.h3`
  font-size: 1.1rem;
  margin-bottom: 0.5rem;
  color: ${props => props.theme.textLightSlate};
  text-align: center;
  line-height: 1.4;
`;

const TestimonialAuthorPreview = styled.p`
  font-style: italic;
  color: ${props => props.theme.highlight};
  font-size: 1rem;
  text-align: center;
  margin-top: auto;
`;

const TestimonialText = styled.p`
  font-size: 0.9rem;
  line-height: 1.6;
  margin-bottom: 1rem;
  color: ${props => props.theme.textLightSlate};
`;

const TestimonialAuthor = styled.div`
  margin-top: auto;
  padding-top: 1rem;
  border-top: 1px solid ${props => props.theme.highlight};
`;

const AuthorName = styled.h4`
  color: ${props => props.theme.textLightSlate};
  font-size: 1rem;
  margin: 0 0 5px 0;
`;

const AuthorTitle = styled.p`
  color: ${props => props.theme.highlight};
  font-size: 0.9rem;
  margin: 0 0 10px 0;
`;

const LinkedInLink = styled.a`
  color: ${props => props.theme.textSlate};
  font-size: 18px;
  transition: all 0.3s ease;
  
  &:hover {
    color: ${props => props.theme.highlight};
  }
`;

const testimonials = [
  {
    text: "I met Arun during my bioinformatics internship at Leidos in the summer of 2023. We were coworkers on the SciComp team and interacted daily. He has a wide variety of computational skills and is especially adept at solving complex computational problems. For example, he led a project with another intern to produce a machine learning model to generate sequencing data for a specific disease model. He was involved in other projects with different requirements, and has expertise in cluster computing, AWS, NextFlow, Python, and many other areas. He was a go-to person when I needed help with my own projects. He was very personable and easy to work with, and always had good insights for solutions and how to implement them. Overall, I would highly recommend him as a computational expert and as a leader in group settings and customer service.",
    name: "Charlotte Royer, MS, Georgia Institute of Technology",
    title: "Senior Bioinformatics Analyst",
    linkedin: "https://www.linkedin.com/in/royercj-oo5515b219/",
    preview: "Wide variety of computational skills and especially adept at solving complex problems..."
  },
  {
    text: "In the short time I've worked with Arun, he has demonstrated exceptional expertise, particularly in developing and optimizing workflows using Nextflow, Snakemake, and containerization tools. His contributions to transcriptomics and metagenomics projects have been impactful, and his ability to work efficiently on HPC and cloud platforms is impressive. He would be a strong asset to any team looking for a skilled and proactive bioinformatician.",
    name: "Paramita Chatterjee, Ph.D, MBA",
    title: "Scientific Operations Lead",
    linkedin: "https://www.linkedin.com/in/paramitachatterjee2022/",
    preview: "Demonstrated exceptional expertise in developing and optimizing workflows..."
  },
  {
    text: "It is a pleasure to recommend Arun, an exceptional Bioinformatics Scientist whose work has significantly contributed to advancing public health research. I had the privilege of collaborating with him on several projects, and I was continually impressed by his technical expertise, leadership, and dedication to mentoring others in the field. He possesses a rare combination of deep knowledge of bioinformatics, innovative problem-solving skills, and an unwavering commitment to improving public health outcomes. His ability to analyze complex datasets, develop robust workflows, and communicate findings effectively has been invaluable in addressing pressing health challenges and resulting in the publication of manuscripts. What truly makes him stand out is his passion for mentorship and he consistently goes above and beyond to support colleagues, trainees, and early-career professionals by sharing his knowledge, providing guidance, and fostering an inclusive and collaborative environment.",
    name: "Dr. Suchitra Chavan",
    title: "Bioinformatician",
    linkedin: "https://www.linkedin.com/in/suchitra-c-623580213/",
    preview: "Exceptional scientist whose work has significantly contributed to advancing public health research..."
  },
  {
    text: "I am pleased to recommend my colleague and friend, Arun Kumar Boddapati, a highly skilled researcher in genomics and transcriptomics. I have had the pleasure of working at the Emory National Primate Research Center Genomics Core when he joined. I was impressed by his technical expertise and problem-solving abilities, consistently producing insightful results from complex datasets. He is a collaborative team player who is always willing to share knowledge and mentor others. He has helped and guided me several times, and I find him super approachable. He is passionate about staying current with the latest trends in genomics and demonstrates a strong commitment to ongoing learning. I am confident that he will continue to excel and contribute meaningfully to any future endeavors in genomics and transcriptomics.",
    name: "Dr. Prachi Gupta",
    title: "Computational Biologist",
    linkedin: "https://www.linkedin.com/in/prachi-gupta-b861059/",
    preview: "Highly skilled researcher in genomics and transcriptomics with exceptional technical expertise..."
  },
  {
    text: "I had the privilege of collaborating with Arun on several projects during my masters and since. I am consistently impressed by his expertise, work ethic, and forward-thinking approach. He combines technical prowess and strategic insight, making him a standout professional. As a mentor, he has successfully guided junior scientists and interns, ensuring their professional growth while driving project success. During our time working together, he demonstrated exceptional skills in bioinformatics pipeline development, database design, and next-generation sequencing (NGS) data analysis. His development of the Aquascope pipeline significantly reduced analysis time by 80%, greatly enhancing the efficiency of wastewater monitoring efforts. He approaches every task with dedication, enthusiasm, and a focus on excellence. Even without a PhD - he has co-authored and contributed to several high impact journals. It is rare to find someone who balances vision and execution as seamlessly as he does. I am confident that his contributions will continue to make a significant impact in any endeavor he undertakes. I wholeheartedly recommend him to anyone seeking a dynamic, results-driven professional who consistently exceeds expectations.",
    name: "Dr. Tarun Mamidi",
    title: "Bioinformatics Scientist",
    linkedin: "https://www.linkedin.com/in/tkmamidi/",
    preview: "Consistently impressed by his expertise, work ethic, and forward-thinking approach..."
  },
  {
    text: "I've had the opportunity to directly supervise Arun, and have consistently seen his strong passion, drive, and proactive approach to innovation. He's constantly looking for ways to implement cutting edge solutions to streamline processes. Overall, he brings solid technical ability and is quick to explore new ideas and tools that may benefit his team!",
    name: "Dr. Gabriela Huelgas Morales",
    title: "Bioinformatics Scientist",
    linkedin: "https://www.linkedin.com/in/gabriela-huelgas-morales-0896b8b3/",
    preview: "Strong passion, drive, and proactive approach to innovation..."
  }
];

const Home = () => {
  const typedEl = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const options = {
      strings: [
        'Bioinformatics Scientist',
        'Machine Learning Expert',
        'Data Scientist',
        'Genomics Researcher'
      ],
      typeSpeed: 50,
      backSpeed: 50,
      backDelay: 2000,
      loop: true,
      cursorChar: '|',
      smartBackspace: true
    };

    if (typedEl.current) {
      const typed = new Typed(typedEl.current, options);

      return () => {
        typed.destroy();
      };
    }
  }, []);

  useEffect(() => {
    const img = new Image();
    img.crossOrigin = "Anonymous";
    img.src = "https://avatars.githubusercontent.com/u/22992035?v=4";
    
    img.onload = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      
      const ctx = canvas.getContext('2d');
      
      // Set canvas dimensions to match image
      canvas.width = img.width;
      canvas.height = img.height;
      
      // Draw the image
      ctx.drawImage(img, 0, 0);
    };
  }, []);

  return (
    <PageContainer>
      <SEO 
        title="Home" 
        description="Lead Scientist developing computational solutions for biological problems. Expertise in bioinformatics, genomics, and machine learning pipelines."
        keywords="bioinformatics, genomics, data science, machine learning, computational biology"
      />
      
      {/* Hero Section */}
      <HeroContainer id="home">
        <HeroContent>
          <ProfileImageContainer>
            <ProfileImage ref={canvasRef} />
          </ProfileImageContainer>
          <HeroGreeting>Hi, my name is</HeroGreeting>
          <HeroH1>Arun Boddapati.</HeroH1>
          <HeroH2>
            I'm a <TypedSpan ref={typedEl}></TypedSpan>
          </HeroH2>
          <HeroP>
            Developing computational solutions for complex biological problems.
            Transforming genomics data into actionable insights through AI and machine learning.
          </HeroP>
          <HeroBtnWrapper>
            <Button to="/projects" primary="true">
              View My Work
            </Button>
            <Button to="/contact">
              Get In Touch
            </Button>
          </HeroBtnWrapper>
        </HeroContent>
      </HeroContainer>

      {/* About Section */}
      <AboutContainer id="about">
        <AboutWrapper>
          <SectionTitle>About</SectionTitle>
          <AboutText>
            <p>
              My journey into bioinformatics began with a simple fascination: <span className="highlight-text">how can we decode the language of life itself?</span> As a Bioinformatics Scientist, I've spent years transforming this curiosity into computational solutions that span the entire spectrum of biological discovery - from unraveling the complexities of COVID-19 immunopathology to investigating neurological disorders through proteomics.
            </p>
            
            <p>
              My research has taken me through diverse biological landscapes - analyzing host-microbe interactions in COVID-19 patients, developing surveillance systems for pathogen genomics, investigating protein signatures in ALS spectrum disorders, and tracking SARS-CoV-2 lineages through national wastewater surveillance networks. Each dataset tells a unique story, and I specialize in <span className="highlight-text">extracting meaningful narratives from complex biological data</span> that drive real-world impact in public health and clinical research.
            </p>
            
            <p>
              What energizes me most is the collaborative nature of modern bioinformatics - working alongside clinicians, wet-lab researchers, and public health officials to transform raw data into actionable insights. Whether it's contributing to high-impact publications in Cell or developing tools that enhance disease surveillance capabilities, I believe that <span className="highlight-text">the best discoveries happen at the intersection of curiosity, collaboration, and computational innovation</span>.
            </p>
          </AboutText>
        </AboutWrapper>
      </AboutContainer>

      {/* Career Highlights Section */}
      <CareerHighlightsContainer id="career-highlights">
        <CareerHighlightsWrapper>
          <SectionTitle>Impact Snapshot</SectionTitle>
          <HighlightsList>
            <HighlightItem>
              <HighlightText>
                Co-designed and helped launch AIVA, translating genomic analyst workflows into an interactive, phenotype-aware variant interpretation experience used for rare disease diagnostics.
              </HighlightText>
            </HighlightItem>
            <HighlightItem>
              <HighlightText>
                Deployed and maintained over five production-grade pipelines supporting genomics and clinical research programs.
              </HighlightText>
            </HighlightItem>
            <HighlightItem>
              <HighlightText>
                Work featured on the Cell cover (Jan'21) for contributions to NHP pre-clinical trials evaluating Baricitinib as a therapeutic for severe COVID-19.
              </HighlightText>
            </HighlightItem>
            <HighlightItem>
              <HighlightText>
                Achieved $100K in saved costs of PBMC RNA-Seq library preparation costs for the IMPACC study through identifying duplication rates in Quality Control in collaboration with UCSF.
              </HighlightText>
            </HighlightItem>
            <HighlightItem>
              <HighlightText>
                Serving as volunteer bioinformatics consultant for the Cure VCP Disease Foundation, supporting grant-funded research at Emory University (Dr. Pant Lab).
              </HighlightText>
            </HighlightItem>
            <HighlightItem>
              <HighlightText>
                Provided bioinformatics support for more than four multi-institutional national programs, including NIH/NIAID, CDC (NCEZID, OAMD, DDRI, NWSS, NCHHSTP, DFWED), Emory Primate Center, and Emory Vaccine Center, advancing pathogen surveillance, pre-clinical trials and vaccine development.
              </HighlightText>
            </HighlightItem>
            <HighlightItem>
              <HighlightText>
                Integrated three major regulatory and clinical compliance frameworks into pipelines: Section 508, HIPAA, and CLIA.
              </HighlightText>
            </HighlightItem>
            <HighlightItem>
              <HighlightText>
                Achieved gains of 40-60% reduction in analysis and reporting time across multiple projects by implementing and optimizing Nextflow-based pipelines.
              </HighlightText>
            </HighlightItem>
            <HighlightItem>
              <HighlightText>
                Mentored and trained over 20 scientists and engineers from the CDC and Emory Primate Center through workshops on Nextflow, HPC workflows, and transcriptomics (CITE-Seq).
              </HighlightText>
            </HighlightItem>
          </HighlightsList>
        </CareerHighlightsWrapper>
      </CareerHighlightsContainer>

      {/* Testimonials Section */}
      <TestimonialsContainer id="testimonials">
        <TestimonialsWrapper>
          <SectionTitle>What People Say</SectionTitle>
          <TestimonialsGrid>
            {testimonials.map((testimonial, index) => (
              <FlipCardContainer key={index}>
                <FlipCardInner>
                  <FlipCardFront>
                    <FaQuoteLeft />
                    <TestimonialPreview>{testimonial.preview}</TestimonialPreview>
                    <TestimonialAuthorPreview>- {testimonial.name}</TestimonialAuthorPreview>
                  </FlipCardFront>
                  <FlipCardBack>
                    <TestimonialText>
                      {testimonial.text}
                    </TestimonialText>
                    <TestimonialAuthor>
                      <AuthorName>{testimonial.name}</AuthorName>
                      <AuthorTitle>{testimonial.title}</AuthorTitle>
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
                  </FlipCardBack>
                </FlipCardInner>
              </FlipCardContainer>
            ))}
          </TestimonialsGrid>
        </TestimonialsWrapper>
      </TestimonialsContainer>
    </PageContainer>
  );
};

export default Home;

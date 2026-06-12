import React, { useEffect, useRef, useContext } from 'react';
import styled from 'styled-components';
import Typed from 'typed.js';
import { FaQuoteLeft, FaLinkedin, FaArrowRight, FaArrowDown } from 'react-icons/fa';
import { gsap } from 'gsap';
import NeuralHero from '../components/NeuralHero';
import Reveal from '../components/anim/Reveal';
import Magnetic from '../components/anim/Magnetic';
import CountUp from '../components/anim/CountUp';
import { scrollToSection } from '../components/SmoothScroll';
import useScholar from '../hooks/useScholar';
import { ThemeContext } from '../context/ThemeContext';
import { Container, Eyebrow, Card } from '../components/ui';

/* ───────────────────────── HERO ───────────────────────── */
const Hero = styled.section`
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: center;
  overflow: hidden;
  background: ${(p) => p.theme.background};
  color: ${(p) => p.theme.textLightSlate};
`;

const HeroCanvasWrap = styled.div`
  position: absolute;
  inset: 0;
  z-index: 0;
  /* Strong left-side scrim (matched to the theme) so the visual never fights
     the headline. */
  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background: ${(p) => (p.theme.mode === 'light'
    ? `linear-gradient(90deg, rgba(246,248,252,0.94) 0%, rgba(246,248,252,0.78) 38%, rgba(246,248,252,0.18) 62%, transparent 78%),
       radial-gradient(55% 75% at 16% 55%, rgba(246,248,252,0.92), transparent 72%)`
    : `linear-gradient(90deg, rgba(5,6,11,0.92) 0%, rgba(5,6,11,0.72) 38%, rgba(5,6,11,0.12) 62%, transparent 78%),
       radial-gradient(55% 75% at 16% 55%, rgba(5,6,11,0.9), transparent 72%)`)};
    pointer-events: none;
  }
`;

const HeroInner = styled(Container)`
  position: relative;
  z-index: 2;
`;

const HeroContent = styled.div`
  max-width: 720px;
`;

const Greeting = styled.p`
  font-family: ${(p) => p.theme.fontMono};
  color: ${(p) => p.theme.highlight};
  font-size: 0.95rem;
  letter-spacing: 0.12em;
  margin-bottom: 22px;
  opacity: 0;
`;

const Name = styled.h1`
  font-size: clamp(3rem, 9vw, 6.6rem);
  font-weight: 700;
  line-height: 0.98;
  margin: 0 0 10px;
  color: ${(p) => p.theme.textWhite};
  span { display: block; overflow: hidden; }
  span > span { display: inline-block; }
`;

const Role = styled.h2`
  font-size: clamp(1.35rem, 3.4vw, 2.3rem);
  font-weight: 500;
  color: ${(p) => p.theme.textSlate};
  margin: 8px 0 28px;
  opacity: 0;
  line-height: 1.2;
  /* Reserve two lines so the typewriter never reflows the content below it. */
  min-height: 2.4em;
  .typed { color: ${(p) => p.theme.textLightSlate}; }
  .typed-cursor { color: ${(p) => p.theme.highlight}; font-weight: 300; }
`;

const HeroText = styled.p`
  font-size: clamp(1rem, 2vw, 1.2rem);
  color: ${(p) => p.theme.textSlate};
  max-width: 560px;
  line-height: 1.75;
  margin-bottom: 38px;
  opacity: 0;
`;

const Buttons = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 18px;
  opacity: 0;
`;

const PrimaryBtn = styled.a`
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 15px 30px;
  border-radius: 999px;
  font-weight: 600;
  color: #05060b;
  background: ${(p) => p.theme.gradient};
  box-shadow: 0 12px 40px -12px rgba(52, 227, 200, 0.5);
  transition: transform 0.3s var(--ease), box-shadow 0.3s var(--ease);
  svg { transition: transform 0.3s var(--ease); }
  &:hover { box-shadow: 0 18px 50px -10px rgba(124, 131, 255, 0.55); }
  &:hover svg { transform: translateX(5px); }
`;

// The hero primary button is just the standard gradient pill (works on both
// themes — gradient fill with dark text).
const HeroPrimaryBtn = PrimaryBtn;

const GhostBtn = styled.a`
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 15px 30px;
  border-radius: 999px;
  font-weight: 600;
  color: ${(p) => p.theme.textLightSlate};
  border: 1px solid var(--border-strong);
  transition: border-color 0.3s var(--ease), color 0.3s var(--ease);
  &:hover { border-color: ${(p) => p.theme.highlight}; color: ${(p) => p.theme.highlight}; }
`;

const ScrollHint = styled.div`
  position: absolute;
  bottom: 30px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  font-family: ${(p) => p.theme.fontMono};
  font-size: 0.7rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: ${(p) => p.theme.textMuted};
  svg { animation: bob 1.8s var(--ease) infinite; }
  @keyframes bob { 0%,100% { transform: translateY(0); opacity: 0.4; } 50% { transform: translateY(6px); opacity: 1; } }
  @media (max-width: 768px) { display: none; }
`;

/* ──────────────────────── STATS ───────────────────────── */
const Section = styled.section`
  padding: 100px 0;
  @media (max-width: 768px) { padding: 70px 0; }
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
  @media (max-width: 768px) { grid-template-columns: repeat(2, 1fr); }
`;

const Stat = styled.div`
  text-align: center;
  padding: 30px 16px;
  border: 1px solid var(--border);
  border-radius: ${(p) => p.theme.borderRadius};
  background: ${(p) => p.theme.lightNavy};
  .num {
    font-family: ${(p) => p.theme.fontDisplay};
    font-size: clamp(2rem, 4vw, 2.8rem);
    font-weight: 700;
    background: ${(p) => p.theme.gradient};
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  .label { font-size: 0.85rem; color: ${(p) => p.theme.textSlate}; margin-top: 6px; }
`;

/* ──────────────────────── ABOUT ───────────────────────── */
const SectionHead = styled.div`
  margin-bottom: 50px;
  h2 {
    font-size: clamp(2rem, 5vw, 3rem);
    color: ${(p) => p.theme.textLightSlate};
  }
`;

const AboutText = styled.div`
  max-width: 860px;
  p {
    font-size: clamp(1.05rem, 2vw, 1.3rem);
    line-height: 1.85;
    color: ${(p) => p.theme.textSlate};
    margin-bottom: 26px;
  }
  .hl { color: ${(p) => p.theme.textLightSlate}; font-weight: 600; }
`;

/* ─────────────────── IMPACT HIGHLIGHTS ─────────────────── */
const HighlightsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 22px;
  @media (max-width: 1024px) { grid-template-columns: repeat(2, 1fr); }
  @media (max-width: 640px) { grid-template-columns: 1fr; }
`;

const HCard = styled(Card)`
  padding: 26px;
  .idx { font-family: ${(p) => p.theme.fontMono}; font-size: 0.8rem; color: ${(p) => p.theme.highlight}; margin-bottom: 14px; }
  p { font-size: 0.98rem; line-height: 1.6; color: ${(p) => p.theme.textLightSlate}; margin: 0; }
`;

/* ─────────────────── TESTIMONIALS ─────────────────── */
const TGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(330px, 1fr));
  gap: 24px;
  @media (max-width: 640px) { grid-template-columns: 1fr; }
`;

const TCard = styled(Card)`
  display: flex;
  flex-direction: column;
  .quote { color: ${(p) => p.theme.highlight}; font-size: 1.6rem; opacity: 0.5; margin-bottom: 16px; }
  .text {
    color: ${(p) => p.theme.textSlate};
    font-size: 0.95rem;
    line-height: 1.7;
    display: -webkit-box;
    -webkit-line-clamp: 6;
    -webkit-box-orient: vertical;
    overflow: hidden;
    flex: 1;
  }
  &:hover .text { -webkit-line-clamp: 30; }
  .foot { display: flex; align-items: center; justify-content: space-between; margin-top: 22px; padding-top: 18px; border-top: 1px solid var(--border); }
  .name { color: ${(p) => p.theme.textLightSlate}; font-weight: 600; font-size: 0.92rem; }
  .title { color: ${(p) => p.theme.highlight}; font-size: 0.8rem; }
  a { color: ${(p) => p.theme.textSlate}; font-size: 1.2rem; transition: color 0.3s var(--ease); }
  a:hover { color: ${(p) => p.theme.highlight}; }
`;

/* ─────────────────── CTA ─────────────────── */
const CTA = styled(Container)`
  text-align: center;
  padding: 110px 32px;
  h2 { font-size: clamp(2.2rem, 6vw, 4rem); color: ${(p) => p.theme.textWhite}; margin-bottom: 20px; }
  p { color: ${(p) => p.theme.textSlate}; max-width: 540px; margin: 0 auto 38px; font-size: 1.1rem; }
`;

const highlights = [
  'Led the 4-month commercial launch of AIVA, a multi-agentic clinical variant-interpretation platform — validating a 94% case-solve rate and 80.5% F1 on phenotype-driven prioritization.',
  'Engineered Lintelligence, an enterprise LLM-RAG framework that automated validation workflows and reduced onboarding cycles by 85%.',
  'Principal architect of Aquascope (v1.0–v3.1) — the national SARS-CoV-2 wastewater surveillance pipeline whose results informed federal pandemic-response policy.',
  'Co-first-authored a scRNA-seq / CITE-seq baricitinib study published in Cell, complementing the FDA Emergency Use Authorization of baricitinib for COVID-19.',
  'Built a deterministic multi-agent orchestrator (CodArIs) for Nextflow pipelines, isolating the LLM layer from a pure-Python engine with strict Pydantic contracts.',
  'Developed a probabilistic classifier (81% accuracy) accelerating target identification and biomarker discovery in lung-remodeling pathways.',
  'Lead bioinformatician for IMPACC (5,000 patients, 15 centers); built an AWS transcriptomics QC pipeline cutting processing time by 60%.',
  'Deployed 6 production-grade Nextflow modules for national outbreak surveillance (Cyclone), cutting analysis turnaround by 40%.',
  'Trained CDC researchers and epidemiologists on Nextflow, containerization, HPC, and transcriptomic analysis across high-visibility national programs.',
];

const makeStats = (scholar) => [
  { num: '9+', label: 'Years in AI & genomics' },
  { num: `${scholar.citations}`, label: `Citations · h-index ${scholar.hIndex}` },
  { num: '80.5%', label: 'Variant classification F1' },
  { num: '85%', label: 'Faster pipeline onboarding' },
];

const testimonials = [
  { text: "I met Arun during my bioinformatics internship at Leidos in the summer of 2023. We were coworkers on the SciComp team and interacted daily. He has a wide variety of computational skills and is especially adept at solving complex computational problems. For example, he led a project with another intern to produce a machine learning model to generate sequencing data for a specific disease model. He was a go-to person when I needed help with my own projects. Overall, I would highly recommend him as a computational expert and as a leader in group settings and customer service.", name: 'Charlotte Royer, MS', title: 'Senior Bioinformatics Analyst', linkedin: 'https://www.linkedin.com/in/royercj-oo5515b219/' },
  { text: "In the short time I've worked with Arun, he has demonstrated exceptional expertise, particularly in developing and optimizing workflows using Nextflow, Snakemake, and containerization tools. His contributions to transcriptomics and metagenomics projects have been impactful, and his ability to work efficiently on HPC and cloud platforms is impressive. He would be a strong asset to any team looking for a skilled and proactive bioinformatician.", name: 'Paramita Chatterjee, Ph.D, MBA', title: 'Scientific Operations Lead', linkedin: 'https://www.linkedin.com/in/paramitachatterjee2022/' },
  { text: "It is a pleasure to recommend Arun, an exceptional Bioinformatics Scientist whose work has significantly contributed to advancing public health research. I was continually impressed by his technical expertise, leadership, and dedication to mentoring others. He possesses a rare combination of deep knowledge of bioinformatics, innovative problem-solving skills, and an unwavering commitment to improving public health outcomes. What truly makes him stand out is his passion for mentorship.", name: 'Dr. Suchitra Chavan', title: 'Bioinformatician', linkedin: 'https://www.linkedin.com/in/suchitra-c-623580213/' },
  { text: "I am pleased to recommend my colleague and friend, Arun, a highly skilled researcher in genomics and transcriptomics. I was impressed by his technical expertise and problem-solving abilities, consistently producing insightful results from complex datasets. He is a collaborative team player who is always willing to share knowledge and mentor others. He is passionate about staying current with the latest trends in genomics.", name: 'Dr. Prachi Gupta', title: 'Computational Biologist', linkedin: 'https://www.linkedin.com/in/prachi-gupta-b861059/' },
  { text: "I have had the privilege of collaborating with Arun on several projects. He combines technical prowess and strategic insight, making him a standout professional. His development of the Aquascope pipeline significantly reduced analysis time by 80%, greatly enhancing the efficiency of wastewater monitoring efforts. Even without a PhD, he has co-authored several high impact journals. It is rare to find someone who balances vision and execution as seamlessly as he does.", name: 'Dr. Tarun Mamidi', title: 'Bioinformatics Scientist', linkedin: 'https://www.linkedin.com/in/tkmamidi/' },
  { text: "I've had the opportunity to directly supervise Arun, and have consistently seen his strong passion, drive, and proactive approach to innovation. He's constantly looking for ways to implement cutting edge solutions to streamline processes. Overall, he brings solid technical ability and is quick to explore new ideas and tools that may benefit his team!", name: 'Dr. Gabriela Huelgas Morales', title: 'Bioinformatics Scientist', linkedin: 'https://www.linkedin.com/in/gabriela-huelgas-morales-0896b8b3/' },
];

const Home = () => {
  const typedEl = useRef(null);
  const heroRef = useRef(null);
  const scholar = useScholar();
  const { isDark } = useContext(ThemeContext);
  const stats = makeStats(scholar);

  const go = (e, id) => {
    e.preventDefault();
    scrollToSection(id);
  };

  useEffect(() => {
    const typed = new Typed(typedEl.current, {
      strings: ['AI / ML Data Science Lead', 'Translational Bioinformatician', 'LLM & Agentic Systems Architect', 'Genomics Researcher'],
      typeSpeed: 55,
      backSpeed: 30,
      backDelay: 1800,
      loop: true,
      smartBackspace: true,
    });
    return () => typed.destroy();
  }, []);

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const ctx = gsap.context(() => {
      const nameSpans = heroRef.current.querySelectorAll('.name-line > span');
      if (reduce) {
        gsap.set(['.greeting', '.role', '.herotext', '.herobtns', nameSpans], { opacity: 1, y: 0 });
        return;
      }
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
      tl.from('.greeting', { opacity: 0, y: 20, duration: 0.6 }, 0.2)
        .set('.greeting', { opacity: 1 }, '>-0.01')
        .from(nameSpans, { yPercent: 110, duration: 1, stagger: 0.12 }, 0.3)
        .to('.role', { opacity: 1, y: 0, duration: 0.6 }, '-=0.5')
        .from('.role', { y: 20, duration: 0.6 }, '<')
        .to('.herotext', { opacity: 1, y: 0, duration: 0.6 }, '-=0.4')
        .from('.herotext', { y: 20, duration: 0.6 }, '<')
        .to('.herobtns', { opacity: 1, y: 0, duration: 0.6 }, '-=0.4')
        .from('.herobtns', { y: 20, duration: 0.6 }, '<');
      gsap.to('.greeting', { opacity: 1, duration: 0 });
    }, heroRef);
    return () => ctx.revert();
  }, []);

  return (
    <>
      <Hero ref={heroRef} id="top">
        <HeroCanvasWrap>
          <NeuralHero key={isDark ? 'dark' : 'light'} dark={isDark} />
        </HeroCanvasWrap>
        <HeroInner>
          <HeroContent>
            <Greeting className="greeting">{'// hello, world — my name is'}</Greeting>
            <Name>
              <span className="name-line"><span>Arun</span></span>
              <span className="name-line"><span className="grad-text">Boddapati.</span></span>
            </Name>
            <Role className="role">I'm a <span className="typed" ref={typedEl} /></Role>
            <HeroText className="herotext">
              I translate unstructured multi-omics, proteomics, and spatial data into rigorous,
              production-grade AI — accelerating target identification and biomarker discovery
              through LLM-RAG frameworks and agentic systems.
            </HeroText>
            <Buttons className="herobtns">
              <Magnetic strength={0.3}><HeroPrimaryBtn href="#projects" onClick={(e) => go(e, 'projects')}>View My Work <FaArrowRight /></HeroPrimaryBtn></Magnetic>
              <Magnetic strength={0.3}><GhostBtn href="#contact" onClick={(e) => go(e, 'contact')}>Get In Touch</GhostBtn></Magnetic>
            </Buttons>
          </HeroContent>
        </HeroInner>
        <ScrollHint>Scroll <FaArrowDown /></ScrollHint>
      </Hero>

      {/* Stats */}
      <Section>
        <Container>
          <Reveal stagger>
            <StatsGrid>
              {stats.map((s) => (
                <Stat key={s.label}>
                  <div className="num"><CountUp value={s.num} /></div>
                  <div className="label">{s.label}</div>
                </Stat>
              ))}
            </StatsGrid>
          </Reveal>
        </Container>
      </Section>

      {/* About */}
      <Section id="about">
        <Container>
          <Reveal>
            <SectionHead>
              <Eyebrow>About</Eyebrow>
              <h2>Where AI meets the language of life.</h2>
            </SectionHead>
          </Reveal>
          <Reveal delay={0.1}>
            <AboutText>
              <p>
                I'm an <span className="hl">AI / ML Data Science Lead</span> with 9+ years applying
                machine learning, large language models, and agentic systems to life-sciences
                research. My work turns unstructured multi-omics, proteomics, and spatial datasets
                into rigorous, production-grade AI that accelerates target identification and
                biomarker discovery.
              </p>
              <p>
                I design <span className="hl">LLM-RAG frameworks, prompt-engineering strategies, and
                deterministic multi-agent orchestrators</span> that improve operational efficiency
                while holding strict scientific reproducibility and validation standards — from
                national pathogen surveillance pipelines to clinical variant-interpretation platforms.
              </p>
              <p>
                What energizes me most is the bridge between disciplines — translating AI capability
                into translational, clinical, and cell-therapy workflows alongside clinicians and
                researchers. I believe{' '}
                <span className="hl">the best systems are both intelligent and accountable</span>.
              </p>
            </AboutText>
          </Reveal>
        </Container>
      </Section>

      {/* Impact */}
      <Section>
        <Container>
          <Reveal>
            <SectionHead>
              <Eyebrow>Impact Snapshot</Eyebrow>
              <h2>Selected highlights.</h2>
            </SectionHead>
          </Reveal>
          <Reveal stagger>
            <HighlightsGrid>
              {highlights.map((h, i) => (
                <HCard key={i}>
                  <div className="idx">{String(i + 1).padStart(2, '0')}</div>
                  <p>{h}</p>
                </HCard>
              ))}
            </HighlightsGrid>
          </Reveal>
        </Container>
      </Section>

      {/* Testimonials */}
      <Section>
        <Container>
          <Reveal>
            <SectionHead>
              <Eyebrow>Endorsements</Eyebrow>
              <h2>What people say.</h2>
            </SectionHead>
          </Reveal>
          <Reveal stagger>
            <TGrid>
              {testimonials.map((t, i) => (
                <TCard key={i}>
                  <div className="quote"><FaQuoteLeft /></div>
                  <p className="text">{t.text}</p>
                  <div className="foot">
                    <div>
                      <div className="name">{t.name}</div>
                      <div className="title">{t.title}</div>
                    </div>
                    {t.linkedin && (
                      <a href={t.linkedin} target="_blank" rel="noopener noreferrer" aria-label={`${t.name} on LinkedIn`}>
                        <FaLinkedin />
                      </a>
                    )}
                  </div>
                </TCard>
              ))}
            </TGrid>
          </Reveal>
        </Container>
      </Section>

      {/* CTA */}
      <Reveal>
        <CTA>
          <Eyebrow style={{ justifyContent: 'center' }}>What's next</Eyebrow>
          <h2 className="grad-text" style={{ display: 'inline-block' }}>Let's build something.</h2>
          <p>I'm always open to collaborations in bioinformatics, genomics, and machine learning. Let's talk.</p>
          <Magnetic strength={0.3}><PrimaryBtn href="#contact" onClick={(e) => go(e, 'contact')}>Say Hello <FaArrowRight /></PrimaryBtn></Magnetic>
        </CTA>
      </Reveal>
    </>
  );
};

export default Home;

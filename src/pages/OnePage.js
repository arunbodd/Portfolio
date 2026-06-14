import React from 'react';
import Marquee from '../components/Marquee';
import Home from './Home';
import Career from './Career';
import Projects from './Projects';
import Publications from './Publications';
import Skills from './Skills';
import Contact from './Contact';

// The entire portfolio as one continuous scrolling page. Each child renders an
// anchored <section id="…"> so the navbar can smooth-scroll between them.
const OnePage = () => (
  <>
    <Home />
    <Marquee />
    <Career />
    <Projects />
    <Publications />
    <Marquee reverse duration={44} items={['Cell', 'Immunity', 'Nature Immunology', 'Science Advances', 'Science Immunology', 'PNAS', 'BMC Genomics', 'Bioinformatics', 'HGG Advances', 'iScience']} />
    <Skills />
    <Contact />
  </>
);

export default OnePage;

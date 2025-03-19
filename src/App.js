import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { ThemeContext } from './context/ThemeContext';
import { useContext } from 'react';
import styled, { ThemeProvider as StyledThemeProvider, createGlobalStyle } from 'styled-components';
import './App.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Career from './pages/Career';
import Skills from './pages/Skills';
import Strengths from './pages/Strengths';
import Projects from './pages/Projects';
import Publications from './pages/Publications';
import Contact from './pages/Contact';

const GlobalStyle = createGlobalStyle`
  html, body, #root, .App {
    background-color: ${props => props.theme.background};
    margin: 0;
    padding: 0;
    min-height: 100%;
  }
  
  body {
    color: ${props => props.theme.textSlate};
    transition: all 0.3s ease;
    min-height: 100vh;
    width: 100%;
  }
  
  .App {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    width: 100%;
  }
  
  #root {
    min-height: 100vh;
    width: 100%;
  }
`;

function AppContent() {
  const { currentTheme } = useContext(ThemeContext);
  
  return (
    <StyledThemeProvider theme={currentTheme}>
      <GlobalStyle />
      <Router>
        <div className="App">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/career" element={<Career />} />
            <Route path="/skills" element={<Skills />} />
            <Route path="/strengths" element={<Strengths />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/publications" element={<Publications />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
          <Footer />
        </div>
      </Router>
    </StyledThemeProvider>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

export default App;

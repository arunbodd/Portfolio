import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { ThemeContext } from './context/ThemeContext';
import { useContext } from 'react';
import { ThemeProvider as StyledThemeProvider, createGlobalStyle } from 'styled-components';
import './App.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import SmoothScroll from './components/SmoothScroll';
import Cursor from './components/Cursor';
import Ambient from './components/Ambient';
import ScrollProgress from './components/ScrollProgress';
import OnePage from './pages/OnePage';
import QRCode from './pages/QRCode';

const GlobalStyle = createGlobalStyle`
  /* CSS custom properties are set inline on <html> by ThemeContext so the
     palette switches reliably; here we just bind surfaces to those vars. */
  html, body, #root, .App {
    background-color: var(--bg);
    margin: 0;
    padding: 0;
  }
  body {
    color: var(--text-dim);
    transition: background-color 0.5s var(--ease), color 0.5s var(--ease);
  }
  .App { display: flex; flex-direction: column; min-height: 100vh; width: 100%; }
  #root { width: 100%; }
`;

function RoutedApp() {
  const location = useLocation();
  return (
    <SmoothScroll>
      <div className="App">
        <Ambient />
        <ScrollProgress />
        <Navbar />
        <div className="page-content" style={{ position: 'relative', zIndex: 1 }}>
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<OnePage />} />
            <Route path="/qrcode" element={<QRCode />} />
          </Routes>
          <Footer />
        </div>
      </div>
    </SmoothScroll>
  );
}

function AppContent() {
  const { currentTheme } = useContext(ThemeContext);

  return (
    <StyledThemeProvider theme={currentTheme}>
      <GlobalStyle />
      <Cursor />
      <Router>
        <RoutedApp />
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

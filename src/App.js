import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { ThemeContext } from './context/ThemeContext';
import { useContext, lazy, Suspense } from 'react';
import { ThemeProvider as StyledThemeProvider, createGlobalStyle } from 'styled-components';
import './App.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import SmoothScroll from './components/SmoothScroll';
import Cursor from './components/Cursor';
import Ambient from './components/Ambient';
import ScrollProgress from './components/ScrollProgress';
import Analytics from './components/Analytics';
import OnePage from './pages/OnePage';
import Writing from './pages/Writing';
import QRCode from './pages/QRCode';

// The Markdown renderer only matters on article pages; keep it out of the
// bundle the portfolio and index pay for.
const Article = lazy(() => import('./pages/Article'));

// Shown for the moment the article chunk is in flight on a cold visit, so a
// direct link to an article never paints an empty page.
const ArticleLoading = () => (
  <div style={{ minHeight: '60vh', paddingTop: 120 }} aria-busy="true" aria-label="Loading article" />
);

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
        <Analytics />
        <Ambient />
        <ScrollProgress />
        <Navbar />
        <div className="page-content" style={{ position: 'relative', zIndex: 1 }}>
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<OnePage />} />
            <Route path="/writing" element={<Writing />} />
            <Route path="/writing/:slug" element={<Suspense fallback={<ArticleLoading />}><Article /></Suspense>} />
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

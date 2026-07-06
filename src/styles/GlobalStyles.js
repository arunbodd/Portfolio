import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  :root {
    /* Static tokens. Color vars (--bg, --aqua, --text…) are injected by the
       theme-driven GlobalStyle in App.js so they switch with light/dark mode. */
    --font-sans: 'Inter', system-ui, sans-serif;
    --font-display: 'Space Grotesk', 'Inter', sans-serif;
    --font-mono: 'JetBrains Mono', 'Fira Code', monospace;

    --ease: cubic-bezier(0.16, 1, 0.3, 1);
    --maxw: 1360px;

    /* Fallbacks (dark) in case themed style hasn't mounted yet */
    --bg: #05060b;
    --surface: #0c0e16;
    --border: rgba(255, 255, 255, 0.08);
    --border-strong: rgba(255, 255, 255, 0.14);
    --aqua: #34e3c8;
    --indigo: #7c83ff;
    --text: #e7ecf6;
    --text-dim: #97a1b8;
    --text-muted: #5c6479;
    --grad-from: #34e3c8;
    --grad-to: #7c83ff;
    --vignette: rgba(0, 0, 0, 0.55);
  }

  * { box-sizing: border-box; }

  html {
    width: 100%;
    /* Native smooth-scroll OFF — Lenis owns scrolling */
    scroll-behavior: auto;
  }

  html.lenis, html.lenis body { height: auto; }
  .lenis.lenis-smooth { scroll-behavior: auto !important; }
  .lenis.lenis-smooth [data-lenis-prevent] { overscroll-behavior: contain; }
  .lenis.lenis-stopped { overflow: hidden; }

  body {
    margin: 0;
    width: 100%;
    min-height: 100vh;
    overflow-x: hidden;
    background-color: var(--bg);
    color: var(--text-dim);
    font-family: var(--font-sans);
    font-size: 16px;
    line-height: 1.65;
    -moz-osx-font-smoothing: grayscale;
    -webkit-font-smoothing: antialiased;
    text-rendering: optimizeLegibility;
  }

  /* Subtle film-grain + vignette over everything for depth.
     No blend-mode: a fixed mix-blend layer forces a full recomposite on every
     scroll frame, which causes jank. Plain low-opacity grain is nearly free. */
  body::before {
    content: '';
    position: fixed;
    inset: 0;
    z-index: 9990;
    pointer-events: none;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
    opacity: 0.025;
  }
  body::after {
    content: '';
    position: fixed;
    inset: 0;
    z-index: 9989;
    pointer-events: none;
    background: radial-gradient(120% 120% at 50% 0%, transparent 55%, var(--vignette) 100%);
  }

  h1, h2, h3, h4, h5, h6 {
    margin: 0 0 0.5em 0;
    font-family: var(--font-display);
    font-weight: 600;
    color: var(--text);
    line-height: 1.08;
    letter-spacing: -0.02em;
  }

  p { margin: 0 0 1rem 0; }

  a {
    text-decoration: none;
    color: inherit;
    transition: color 0.3s var(--ease);
  }

  button {
    cursor: pointer;
    border: 0;
    background: none;
    font-family: inherit;
    color: inherit;
    /* Without this, some browsers/OS dark-mode form-control theming paint a
       native (light gray bg, black text) button chrome over our own colors,
       which is illegible combined with any opacity dimming on inactive nav
       items. Force fully custom rendering everywhere. */
    appearance: none;
    -webkit-appearance: none;
  }

  ul, ol { padding: 0; margin: 0; list-style: none; }
  img { max-width: 100%; vertical-align: middle; }

  ::selection { background: rgba(52, 227, 200, 0.25); color: #fff; }

  /* Scrollbar */
  ::-webkit-scrollbar { width: 10px; }
  ::-webkit-scrollbar-track { background: var(--bg); }
  ::-webkit-scrollbar-thumb {
    background: linear-gradient(var(--aqua), var(--indigo));
    border-radius: 10px;
    border: 2px solid var(--bg);
  }

  /* Theme-aware gradient text (darkens in light mode for contrast) */
  .grad-text {
    background: linear-gradient(120deg, var(--grad-from), var(--grad-to));
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  /* Fixed bright gradient — used on the always-dark hero stage */
  .grad-bright {
    background: linear-gradient(120deg, #34e3c8, #7c83ff);
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  @media (prefers-reduced-motion: reduce) {
    * { animation-duration: 0.001ms !important; transition-duration: 0.001ms !important; }
  }
`;

export default GlobalStyles;

import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  :root {
    --navy: #0a192f;
    --light-navy: #112240;
    --lightest-navy: #233554;
    --slate: #8892b0;
    --light-slate: #a8b2d1;
    --lightest-slate: #ccd6f6;
    --white: #e6f1ff;
    --green: #64ffda;
    --green-tint: rgba(100, 255, 218, 0.1);
    
    --font-sans: 'Calibre', 'Inter', 'San Francisco', 'SF Pro Text', -apple-system, system-ui, sans-serif;
    --font-mono: 'Fira Code', 'Fira Mono', 'Roboto Mono', monospace;
    
    --fz-xxs: 12px;
    --fz-xs: 13px;
    --fz-sm: 14px;
    --fz-md: 16px;
    --fz-lg: 18px;
    --fz-xl: 20px;
    --fz-xxl: 22px;
    --fz-heading: 32px;
    
    --border-radius: 4px;
    --nav-height: 100px;
    --nav-scroll-height: 70px;
    
    --tab-height: 42px;
    --tab-width: 120px;
    
    --easing: cubic-bezier(0.645, 0.045, 0.355, 1);
    --transition: all 0.25s cubic-bezier(0.645, 0.045, 0.355, 1);
  }

  html {
    box-sizing: border-box;
    width: 100%;
    scroll-behavior: smooth;
  }

  *,
  *:before,
  *:after {
    box-sizing: inherit;
  }

  ::selection {
    background-color: var(--lightest-navy);
    color: var(--lightest-slate);
  }

  body {
    margin: 0;
    width: 100%;
    min-height: 100%;
    overflow-x: hidden;
    -moz-osx-font-smoothing: grayscale;
    -webkit-font-smoothing: antialiased;
    background-color: var(--navy);
    color: var(--slate);
    font-family: var(--font-sans);
    font-size: var(--fz-md);
    line-height: 1.6;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin: 0 0 10px 0;
    font-weight: 600;
    color: var(--lightest-slate);
    line-height: 1.1;
  }

  p {
    margin: 0 0 15px 0;
  }

  a {
    display: inline-block;
    text-decoration: none;
    text-decoration-skip-ink: auto;
    color: inherit;
    position: relative;
    transition: var(--transition);
    cursor: pointer;

    &:hover,
    &:focus {
      color: var(--green);
    }
  }

  button {
    cursor: pointer;
    border: 0;
    border-radius: 0;
  }

  ul, ol {
    padding: 0;
    margin: 0;
    list-style: none;
  }

  img {
    width: 100%;
    max-width: 100%;
    vertical-align: middle;
  }

  svg {
    width: 100%;
    height: 100%;
    fill: currentColor;
    vertical-align: middle;
  }

  /* Scrollbar Styles */
  ::-webkit-scrollbar {
    width: 12px;
  }
  ::-webkit-scrollbar-track {
    background: var(--navy);
  }
  ::-webkit-scrollbar-thumb {
    background-color: var(--lightest-navy);
    border: 3px solid var(--navy);
    border-radius: 10px;
  }

  /* Fade In Animation */
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .fadeIn {
    animation: fadeIn 0.5s ease forwards;
  }
`;

export default GlobalStyles;

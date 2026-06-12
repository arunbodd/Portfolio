import React, { createContext, useState, useEffect } from 'react';
import { darkTheme, lightTheme, getTheme } from '../styles/theme';

export { darkTheme, lightTheme };

export const ThemeContext = createContext({
  mode: 'dark',
  theme: darkTheme,
  currentTheme: darkTheme,
  isDark: true,
  toggleTheme: () => {},
});

export const ThemeProvider = ({ children }) => {
  const [mode, setMode] = useState(() => {
    try {
      return localStorage.getItem('theme-mode') || 'dark';
    } catch {
      return 'dark';
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('theme-mode', mode);
    } catch {
      /* ignore */
    }
    const t = getTheme(mode);
    const root = document.documentElement;
    root.setAttribute('data-theme', mode);

    // Set CSS custom properties inline on <html> — inline styles win over any
    // stylesheet :root rule, so the whole palette switches reliably.
    const vars = {
      '--bg': t.background,
      '--surface': t.lightNavy,
      '--surface-2': t.navy,
      '--border': t.border,
      '--border-strong': t.borderStrong,
      '--aqua': t.highlight,
      '--indigo': t.accent2,
      '--magenta': t.accent3,
      '--text': t.textLightSlate,
      '--text-dim': t.textSlate,
      '--text-muted': t.textMuted,
      '--grad-from': t.gradFrom,
      '--grad-to': t.gradTo,
      '--vignette': t.vignette,
    };
    Object.entries(vars).forEach(([k, v]) => root.style.setProperty(k, v));

    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute('content', mode === 'light' ? '#f6f8fc' : '#05060b');
  }, [mode]);

  const toggleTheme = () => setMode((m) => (m === 'dark' ? 'light' : 'dark'));

  const currentTheme = getTheme(mode);

  return (
    <ThemeContext.Provider
      value={{ mode, theme: currentTheme, currentTheme, isDark: mode === 'dark', toggleTheme }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

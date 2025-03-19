import React, { createContext, useState, useEffect } from 'react';

// Define theme colors
export const darkTheme = {
  background: '#1a1a2e',
  lightNavy: '#16213e',
  navy: '#0f3460',
  highlight: '#e94560',
  textSlate: '#a6b1e1',
  textLightSlate: '#e0e1dd',
  textWhite: '#ffffff',
  navBackground: '#1a1a2e',
  cardBackground: '#16213e',
};

export const lightTheme = {
  background: '#ffffff',
  lightNavy: '#f5f5f5',
  navy: '#e6e6e6',
  highlight: '#007acc',
  textSlate: '#333333',
  textLightSlate: '#222222',
  textWhite: '#000000',
  navBackground: '#ffffff',
  cardBackground: '#ffffff',
  highlightTint: 'rgba(0, 122, 204, 0.1)',
};

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  // Check for saved theme preference in localStorage or default to dark
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    console.log('Theme retrieved from localStorage:', savedTheme);
    return savedTheme || 'dark'; // Use saved theme if available, otherwise default to dark
  });

  // Set theme in localStorage when it changes
  useEffect(() => {
    console.log('Saving theme to localStorage:', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    console.log('Toggling theme from', theme, 'to', newTheme);
    setTheme(newTheme);
  };

  // Add highlightTint to darkTheme if not present
  const currentTheme = theme === 'dark' 
    ? { ...darkTheme, highlightTint: 'rgba(233, 69, 96, 0.1)' } 
    : lightTheme;

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, currentTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

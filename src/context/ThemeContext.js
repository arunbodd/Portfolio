import React, { createContext, useState, useEffect } from 'react';

// Define theme colors
export const darkTheme = {
  background: '#121212',      // Dark gray background
  lightNavy: '#1e1e1e',       // Slightly lighter gray
  navy: '#2d2d2d',            // Medium gray
  highlight: '#00ff41',       // Bright Matrix green for primary highlights
  textSlate: '#b0b0b0',       // Neutral gray text
  textLightSlate: '#e0e0e0',  // Light gray text
  textWhite: '#ffffff',       // White text
  navBackground: '#121212',   // Same as background
  cardBackground: '#1e1e1e',  // Same as lightNavy
  highlightTint: 'rgba(0, 255, 65, 0.15)', // Matrix green with transparency for hover effects
  accentRed: '#ff3e3e',       // Vibrant red for secondary accents
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
    ? darkTheme 
    : lightTheme;

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, currentTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

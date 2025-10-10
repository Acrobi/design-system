"use client"

import React, { createContext, useContext, useState, useEffect } from 'react';

type ThemeContextType = {
  setTheme: (theme: { name: string, color: string }) => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState({ name: 'default', color: '' });

  useEffect(() => {
    // Remove any existing dynamic theme stylesheet
    const existingLink = document.getElementById('dynamic-theme');
    if (existingLink) {
      existingLink.remove();
    }

    // If a theme with a color is selected, create and append a new stylesheet link.
    if (theme.name !== 'default' && theme.color) {
      const link = document.createElement('link');
      link.id = 'dynamic-theme';
      link.rel = 'stylesheet';
      link.href = `/api/themes/dynamic.css?primary=${theme.color.replace('#', '')}`;
      document.head.appendChild(link);
    }
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
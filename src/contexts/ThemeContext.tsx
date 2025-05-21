
import React, { createContext, useContext, useState, useEffect } from 'react';

type Theme = 'light' | 'dark';

type ThemeContextType = {
  theme: Theme;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>('light'); // Default to light mode always
  
  // Apply theme when it changes
  useEffect(() => {
    // Save to localStorage
    localStorage.setItem('theme', theme);
    
    // Update document class for dark mode
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
    } else {
      document.documentElement.classList.add('light');
      document.documentElement.classList.remove('dark');
    }
    
    // Apply theme to root styles
    const root = document.documentElement;
    
    if (theme === 'dark') {
      root.style.setProperty('--background', '#121212');
      root.style.setProperty('--foreground', '#ffffff');
      root.style.setProperty('--card', '#1e1e1e');
      root.style.setProperty('--card-foreground', '#ffffff');
    } else {
      root.style.setProperty('--background', '#FDFAFC');
      root.style.setProperty('--foreground', '#000000');
      root.style.setProperty('--card', '#ffffff');
      root.style.setProperty('--card-foreground', '#000000');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

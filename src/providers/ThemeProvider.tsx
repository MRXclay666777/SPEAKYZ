import React, { createContext, useContext, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ThemeContextType {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  isTransitioning: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

interface ThemeProviderProps {
  children: React.ReactNode;
}

const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    // Check for saved theme preference or default to 'light'
    const savedTheme = localStorage.getItem('speakyz-theme') as 'light' | 'dark';
    const systemPreference = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    const initialTheme = savedTheme || systemPreference;
    
    setTheme(initialTheme);
    document.documentElement.classList.toggle('dark', initialTheme === 'dark');
  }, []);

  useEffect(() => {
    // Listen for system theme changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e: MediaQueryListEvent) => {
      if (!localStorage.getItem('speakyz-theme')) {
        const newTheme = e.matches ? 'dark' : 'light';
        setTheme(newTheme);
        document.documentElement.classList.toggle('dark', newTheme === 'dark');
      }
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const toggleTheme = async () => {
    setIsTransitioning(true);
    
    // Create transition effect
    const transitionElement = document.createElement('div');
    transitionElement.className = `
      fixed inset-0 z-[9999] pointer-events-none
      bg-gradient-radial from-primary-500/20 via-transparent to-transparent
      animate-scale-in
    `;
    document.body.appendChild(transitionElement);

    // Wait for animation
    await new Promise(resolve => setTimeout(resolve, 150));

    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('speakyz-theme', newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');

    // Remove transition element
    setTimeout(() => {
      document.body.removeChild(transitionElement);
      setIsTransitioning(false);
    }, 150);
  };

  const value: ThemeContextType = {
    theme,
    toggleTheme,
    isTransitioning,
  };

  return (
    <ThemeContext.Provider value={value}>
      <AnimatePresence mode="wait">
        <motion.div
          key={theme}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className={`
            min-h-screen transition-all duration-300 ease-in-out
            ${theme === 'dark' 
              ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white' 
              : 'bg-gradient-to-br from-gray-50 via-white to-gray-100 text-gray-900'
            }
          `}
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
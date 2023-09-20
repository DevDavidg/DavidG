'use client';
import React, {
  createContext,
  useContext,
  useState,
  useMemo,
  useCallback,
  useEffect,
} from 'react';

const ThemeContext = createContext(
  {} as {
    isDarkMode: boolean;
    toggleTheme: () => void;
    isRightToLeft: boolean;
    toggleDirection: () => void;
  }
);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isRightToLeft, setIsRightToLeft] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedDarkMode = localStorage.getItem('isDarkMode');
      setIsDarkMode(storedDarkMode === 'true');

      const storedDirection = localStorage.getItem('isRightToLeft');
      setIsRightToLeft(storedDirection === 'true');
    }
  }, []);

  const toggleTheme = useCallback(() => {
    setIsDarkMode((prevMode) => !prevMode);
    localStorage.setItem('isDarkMode', (!isDarkMode).toString());
  }, [isDarkMode]);

  const toggleDirection = useCallback(() => {
    setIsRightToLeft((prevDirection) => !prevDirection);
    localStorage.setItem('isRightToLeft', (!isRightToLeft).toString());
  }, [isRightToLeft]);

  const themeValue = useMemo(
    () => ({ isDarkMode, toggleTheme, isRightToLeft, toggleDirection }),
    [isDarkMode, toggleTheme, isRightToLeft, toggleDirection]
  );

  return (
    <ThemeContext.Provider value={themeValue}>{children}</ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}

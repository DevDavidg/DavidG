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
  }
);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedDarkMode = localStorage.getItem('isDarkMode');
      setIsDarkMode(storedDarkMode === 'true');
    }
  }, []);

  const toggleTheme = useCallback(() => {
    setIsDarkMode((prevMode) => !prevMode);
  }, []);

  const themeValue = useMemo(
    () => ({ isDarkMode, toggleTheme }),
    [isDarkMode, toggleTheme]
  );

  return (
    <ThemeContext.Provider value={themeValue}>{children}</ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}

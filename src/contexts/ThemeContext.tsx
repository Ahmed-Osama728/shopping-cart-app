/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect } from 'react';
import type { ReactNode } from 'react';
import { MantineProvider as MantineProviderCore, useMantineColorScheme } from '@mantine/core';

interface ThemeContextType {
  colorScheme: 'light' | 'dark';
  toggleColorScheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

function ThemeProviderInner({ children }: { children: ReactNode }) {
  const { colorScheme, setColorScheme } = useMantineColorScheme();

  useEffect(() => {
    const saved = localStorage.getItem('color-scheme') as 'light' | 'dark' | null;
    if (saved && saved !== colorScheme && (saved === 'light' || saved === 'dark')) {
      setColorScheme(saved);
    }
  }, [colorScheme, setColorScheme]);

  const toggleColorScheme = () => {
    const currentScheme = colorScheme === 'auto' ? 'light' : colorScheme;
    const newScheme = currentScheme === 'light' ? 'dark' : 'light';
    setColorScheme(newScheme);
    localStorage.setItem('color-scheme', newScheme);
  };

  const normalizedColorScheme = colorScheme === 'auto' ? 'light' : colorScheme;

  useEffect(() => {
    const root = document.documentElement;
    const body = document.body;

    if (normalizedColorScheme === 'dark') {
      root.classList.add('dark');
      body.style.backgroundColor = '#05060d';
      body.style.color = '#f8fafc';
    } else {
      root.classList.remove('dark');
      body.style.backgroundColor = '#f4f6fb';
      body.style.color = '#111827';
    }

    return () => {
      body.style.backgroundColor = '';
      body.style.color = '';
    };
  }, [normalizedColorScheme]);

  return (
    <ThemeContext.Provider value={{ colorScheme: normalizedColorScheme, toggleColorScheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  return (
    <MantineProviderCore defaultColorScheme="light">
      <ThemeProviderInner>{children}</ThemeProviderInner>
    </MantineProviderCore>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}


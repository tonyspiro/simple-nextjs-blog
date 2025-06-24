'use client';

import React, { useState, useEffect } from 'react';

export default function ThemeToggle(): JSX.Element {
  const [theme, setTheme] = useState<'light' | 'dark' | 'system'>('system');

  useEffect(() => {
    // Get stored theme preference or default to system
    const storedTheme = localStorage.getItem('theme') as 'light' | 'dark' | 'system' | null;
    if (storedTheme) {
      setTheme(storedTheme);
    }

    // Apply theme based on preference
    const applyTheme = (currentTheme: 'light' | 'dark' | 'system') => {
      const root = window.document.documentElement;
      
      if (currentTheme === 'system') {
        const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
        root.classList.toggle('dark', systemTheme === 'dark');
      } else {
        root.classList.toggle('dark', currentTheme === 'dark');
      }
    };

    applyTheme(storedTheme || 'system');

    // Listen for system theme changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleSystemThemeChange = () => {
      if (theme === 'system') {
        applyTheme('system');
      }
    };

    mediaQuery.addEventListener('change', handleSystemThemeChange);
    return () => mediaQuery.removeEventListener('change', handleSystemThemeChange);
  }, [theme]);

  const toggleTheme = (): void => {
    const themes: ('light' | 'dark' | 'system')[] = ['light', 'dark', 'system'];
    const currentIndex = themes.indexOf(theme);
    const nextTheme = themes[(currentIndex + 1) % themes.length];
    
    setTheme(nextTheme);
    localStorage.setItem('theme', nextTheme);

    // Apply the new theme immediately
    const root = window.document.documentElement;
    if (nextTheme === 'system') {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      root.classList.toggle('dark', systemTheme === 'dark');
    } else {
      root.classList.toggle('dark', nextTheme === 'dark');
    }
  };

  const getThemeIcon = (): string => {
    switch (theme) {
      case 'light':
        return '☀️';
      case 'dark':
        return '🌙';
      case 'system':
        return '💻';
      default:
        return '💻';
    }
  };

  const getThemeLabel = (): string => {
    switch (theme) {
      case 'light':
        return 'Light';
      case 'dark':
        return 'Dark';
      case 'system':
        return 'System';
      default:
        return 'System';
    }
  };

  return (
    <button
      onClick={toggleTheme}
      className="flex items-center space-x-2 px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
      title={`Current theme: ${getThemeLabel()}. Click to switch.`}
      aria-label={`Switch theme. Current: ${getThemeLabel()}`}
    >
      <span className="text-sm">{getThemeIcon()}</span>
      <span className="text-sm font-medium text-gray-700 dark:text-gray-300 hidden sm:inline">
        {getThemeLabel()}
      </span>
    </button>
  );
}
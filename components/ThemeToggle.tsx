'use client';

import React from 'react';
import { useTheme } from './ThemeProvider';

export default function ThemeToggle(): JSX.Element {
  const { theme, setTheme } = useTheme();

  const toggleTheme = (): void => {
    const themes: ('light' | 'dark' | 'system')[] = ['light', 'dark', 'system'];
    const currentIndex = themes.indexOf(theme);
    const nextTheme = themes[(currentIndex + 1) % themes.length];
    setTheme(nextTheme);
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
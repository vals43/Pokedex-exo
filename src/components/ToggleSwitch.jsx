import { Moon, Sun } from 'lucide-react';
import React, { useState, useEffect } from 'react';

const DarkModeToggle = () => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      return savedTheme === 'dark';
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    const html = document.documentElement; 

    if (isDarkMode) {
      html.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      html.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]); 

  const toggleDarkMode = () => {
    setIsDarkMode(prevMode => !prevMode);
  };

  return (
    <button
      onClick={toggleDarkMode}
      className={`
        p-2 rounded-full flex items-center justify-center
        transition-colors duration-300 ease-in-out
        ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-yellow-300 text-gray-900'}
        shadow-md focus:outline-none focus:ring-2 focus:ring-opacity-75
        ${isDarkMode ? 'focus:ring-gray-700' : 'focus:ring-yellow-400'}
      `}
      aria-label={isDarkMode ? 'Passer en mode clair' : 'Passer en mode sombre'}
    >
      {isDarkMode ? (<Sun/>) : (<Moon/>)}
    </button>
  );
};

export default DarkModeToggle;
// src/components/ToggleSwitch.jsx
import { Moon, Sun } from 'lucide-react';
import React, { useContext } from 'react';
import { ThemeContext } from './ThemeContext.jsx';

const DarkModeToggle = () => {
  const { isDarkMode, toggleDarkMode } = useContext(ThemeContext);

  return (
    <button
      onClick={toggleDarkMode}
      className={`
        p-2 rounded-full flex items-center justify-center
        transition-colors duration-300 ease-in-out
        ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-gray-300 text-gray-950'}
        shadow-md focus:outline-none focus:ring-2 focus:ring-opacity-75
        ${isDarkMode ? 'focus:ring-gray-400' : 'focus:ring-gray-400'}
      `}
    >
      {isDarkMode ? <Moon /> : <Sun />}
    </button>
  );
};

export default DarkModeToggle;
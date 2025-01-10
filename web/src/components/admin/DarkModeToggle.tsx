'use client'

import { FaMoon, FaSun } from 'react-icons/fa';
import { motion } from 'framer-motion';

interface DarkModeToggleProps {
  isDarkMode: boolean;
  onToggle: (value: boolean) => void;
  showLabel?: boolean;
}

export default function DarkModeToggle({ isDarkMode, onToggle, showLabel = false }: DarkModeToggleProps) {
  return (
    <motion.button
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      onClick={() => onToggle(!isDarkMode)}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors
        ${isDarkMode 
          ? 'bg-crystal-blue/10 text-crystal-blue hover:bg-crystal-blue/20' 
          : 'bg-crystal-blue/10 text-crystal-blue hover:bg-crystal-blue/20'}`}
    >
      {isDarkMode ? (
        <FaMoon className="w-5 h-5" />
      ) : (
        <FaSun className="w-5 h-5" />
      )}
      {showLabel && (
        <span>
          {isDarkMode ? 'Dark Mode' : 'Light Mode'}
        </span>
      )}
    </motion.button>
  );
} 
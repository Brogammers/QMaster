"use client";

import { FaMoon, FaSun, FaLock } from "react-icons/fa";
import { motion } from "framer-motion";

interface DarkModeToggleProps {
  isDarkMode: boolean;
  onToggle: (value: boolean) => void;
  showLabel?: boolean;
  isDisabled?: boolean;
}

export default function DarkModeToggle({
  isDarkMode,
  onToggle,
  showLabel = false,
  isDisabled = false,
}: DarkModeToggleProps) {
  return (
    <motion.button
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      onClick={() => !isDisabled && onToggle(!isDarkMode)}
      whileHover={{ scale: isDisabled ? 1 : 1.02 }}
      whileTap={{ scale: isDisabled ? 1 : 0.98 }}
      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors
        ${
          isDisabled
            ? "bg-gray-500/10 text-gray-400 cursor-not-allowed"
            : isDarkMode
            ? "bg-crystal-blue/10 text-crystal-blue hover:bg-crystal-blue/20 cursor-pointer"
            : "bg-crystal-blue/10 text-crystal-blue hover:bg-crystal-blue/20 cursor-pointer"
        }`}
    >
      {isDisabled ? (
        <FaLock className="w-5 h-5" />
      ) : isDarkMode ? (
        <FaMoon className="w-5 h-5" />
      ) : (
        <FaSun className="w-5 h-5" />
      )}
      {showLabel && (
        <span className="flex-1">
          {isDisabled
            ? "Theme Locked"
            : isDarkMode
            ? "Dark Mode"
            : "Light Mode"}
        </span>
      )}
      {isDisabled && <FaLock className="w-3 h-3 opacity-50" />}
    </motion.button>
  );
}

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
      className={`p-3 rounded-xl backdrop-blur-sm z-20 transition-all duration-300 relative
        ${isDarkMode 
          ? 'bg-white/[0.02] border border-white/[0.05] hover:bg-white/[0.05]' 
          : 'bg-white shadow-lg shadow-black/5 ring-1 ring-black/5 hover:bg-gray-50'}`}
    >
      <div className="relative w-6 h-6">
        <motion.div
          initial={false}
          animate={{ 
            scale: isDarkMode ? 1 : 0,
            opacity: isDarkMode ? 1 : 0,
          }}
          transition={{ duration: 0.2 }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <FaMoon className={`w-5 h-5 ${isDarkMode ? 'text-crystal-blue' : 'text-slate-600'}`} />
        </motion.div>
        <motion.div
          initial={false}
          animate={{ 
            scale: isDarkMode ? 0 : 1,
            opacity: isDarkMode ? 0 : 1,
          }}
          transition={{ duration: 0.2 }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <FaSun className={`w-5 h-5 ${isDarkMode ? 'text-crystal-blue' : 'text-slate-600'}`} />
        </motion.div>
      </div>
      {showLabel && (
        <span className={`absolute left-full ml-2 whitespace-nowrap text-sm font-medium
          ${isDarkMode ? 'text-white/70' : 'text-slate-600'}`}>
          {isDarkMode ? 'Dark Mode' : 'Light Mode'}
        </span>
      )}
    </motion.button>
  );
} 
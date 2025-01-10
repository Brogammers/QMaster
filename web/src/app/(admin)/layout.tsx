'use client'

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import AdminSidebar from '@/app/components/admin/AdminSidebar';
import { motion } from 'framer-motion';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // Get initial dark mode preference from localStorage
    const savedDarkMode = localStorage.getItem('qmaster-dark-mode');
    setIsDarkMode(savedDarkMode === 'true');
  }, []);

  const toggleDarkMode = (value: boolean) => {
    setIsDarkMode(value);
    localStorage.setItem('qmaster-dark-mode', value.toString());
  };

  return (
    <div className={`flex h-screen overflow-hidden transition-colors duration-300
      ${isDarkMode ? 'bg-[#0A0A0A] text-white' : 'bg-white text-slate-900'}`}
    >
      <AdminSidebar isDarkMode={isDarkMode} setIsDarkMode={toggleDarkMode} />
      <motion.main 
        className={`flex-1 overflow-y-auto p-8 relative
          ${isDarkMode 
            ? 'bg-[#0A0A0A] bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#141414] via-[#0A0A0A] to-black' 
            : 'bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-50 via-white to-white'}`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Noise texture overlay */}
        <div className={`absolute inset-0 bg-[url('/noise.svg')] opacity-[0.15] mix-blend-soft-light pointer-events-none`} />
        
        {/* Subtle gradient overlays */}
        <div className={`absolute inset-0 
          ${isDarkMode 
            ? 'bg-gradient-to-b from-concrete-turqouise/5 via-transparent to-transparent' 
            : 'bg-[linear-gradient(to_right,#6366f1,#0ea5e9)] opacity-[0.03]'}`} 
        />
        <div className={`absolute inset-0 
          ${isDarkMode 
            ? 'bg-[radial-gradient(circle_at_top,rgba(19,64,77,0.1),transparent_70%)] pointer-events-none' 
            : 'bg-[radial-gradient(circle_at_top,rgba(99,102,241,0.1),transparent)]'}`} 
        />
        
        {/* Content */}
        <div className="relative max-w-7xl mx-auto">
          <h1 className={`text-3xl font-bold mb-8 
            ${isDarkMode 
              ? 'text-white bg-clip-text text-transparent bg-gradient-to-r from-crystal-blue via-crystal-blue to-baby-blue' 
              : 'text-slate-900'}`}>
            Dashboard
          </h1>
          <div className="space-y-6">
            {children}
          </div>
        </div>
      </motion.main>
    </div>
  );
} 
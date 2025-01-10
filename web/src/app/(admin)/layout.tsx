'use client'

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import AdminSidebar from '@/app/components/admin/AdminSidebar';
import { motion } from 'framer-motion';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [isDarkMode, setIsDarkMode] = useState(false);

  return (
    <div className={`flex h-screen overflow-hidden transition-colors duration-300
      ${isDarkMode 
        ? 'bg-[#0B1120] text-white' 
        : 'bg-white text-slate-900'}`}
    >
      <AdminSidebar isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
      <motion.main 
        className={`flex-1 overflow-y-auto p-8 relative
          ${isDarkMode 
            ? 'bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-800/70 via-[#0B1120] to-[#0B1120]' 
            : 'bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-50 via-white to-white'}`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Gradient background effect */}
        <div className={`absolute inset-0 
          ${isDarkMode 
            ? 'bg-[linear-gradient(to_right,#4f46e5,#0ea5e9)] opacity-[0.15]' 
            : 'bg-[linear-gradient(to_right,#6366f1,#0ea5e9)] opacity-[0.03]'}`} 
        />
        <div className={`absolute inset-0 
          ${isDarkMode 
            ? 'bg-[radial-gradient(circle_at_top,rgba(79,70,229,0.1),transparent)] from-slate-900/30 to-transparent' 
            : 'bg-[radial-gradient(circle_at_top,rgba(99,102,241,0.1),transparent)]'}`} 
        />
        
        {/* Content */}
        <div className="relative max-w-7xl mx-auto">
          <h1 className={`text-3xl font-bold mb-8 
            ${isDarkMode 
              ? 'text-white bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-cyan-400' 
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
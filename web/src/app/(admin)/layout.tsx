'use client'

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import AdminSidebar from '@/app/components/admin/AdminSidebar';
import { motion } from 'framer-motion';
import { AuthProvider, useAuth } from '@/lib/auth/AuthContext';
import ProtectedRoute from '@/components/auth/ProtectedRoute';

function AdminLayoutContent({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { admin, isLoading } = useAuth();
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const savedDarkMode = localStorage.getItem('qmaster-dark-mode');
    setIsDarkMode(savedDarkMode === 'true');
  }, []);

  // If we're on the login page, just render the children
  if (pathname === '/admin/login') {
    return children;
  }

  // Show loading state while checking auth
  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center">
        <div className="text-crystal-blue">Loading...</div>
      </div>
    );
  }

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
          {pathname === '/admin/dashboard' && (
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8"
            >
              <h2 className={`text-lg ${isDarkMode ? 'text-white/70' : 'text-slate-600'}`}>
                Welcome back,
              </h2>
              <h1 className={`text-3xl font-bold 
                ${isDarkMode 
                  ? 'text-white bg-clip-text text-transparent bg-gradient-to-r from-crystal-blue via-crystal-blue to-baby-blue' 
                  : 'text-slate-900'}`}>
                {admin?.name}
              </h1>
            </motion.div>
          )}
          <div className="space-y-6">
            {children}
          </div>
        </div>
      </motion.main>
    </div>
  );
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <ProtectedRoute>
        <AdminLayoutContent>
          {children}
        </AdminLayoutContent>
      </ProtectedRoute>
    </AuthProvider>
  );
} 
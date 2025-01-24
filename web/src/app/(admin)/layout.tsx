'use client'

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { useAuth, AuthProvider } from '@/lib/auth/AuthContext';
import AdminSidebar from '@/app/components/admin/AdminSidebar';
import SplashScreen from '@/app/shared/SplashScreen';
import { CategoriesContext, PartnerContext, StoresContext, UsersContext } from './context';
import { Partner } from './admin/partners/page';
import { Category } from './admin/categories/page';
import axios from 'axios';
import toast from 'react-hot-toast';

interface AdminLayoutProps {
  children: React.ReactNode;
}

const DEFAULT_PAGE = 1;
const DEFAULT_PER_PAGE = 10;

function AdminLayoutContent({ children }: AdminLayoutProps) {
  const pathname = usePathname();
  const { admin, isLoading } = useAuth();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [partners, setPartners] = useState<Partner[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [users, setUsers] = useState([]);
  const [stores, setStores] = useState([]);

  useEffect(() => {
    const savedDarkMode = localStorage.getItem('qmaster-dark-mode');
    setIsDarkMode(savedDarkMode === 'true');
  }, []);

  // Get partners
  useEffect(() => {
    const url = process.env.NEXT_PUBLIC_API_BASE_URL_ADMIN_GET_BUSINESSES;
    axios.get(`${url}?page=${DEFAULT_PAGE}&perPage=${DEFAULT_PER_PAGE}`)
    .then((response) => {
      if (response.status === 200) {
        return response.data.businesses;
      } else { 
        throw new Error('Error fetching partners');
      }
    })
    .then((data) => {
      console.log(data);
    })
    .catch((error) => {
      console.error('Error fetching partners:', error);
      toast.error('Error fetching partners');
    });
  }, []);

  useEffect(() => {

  }, []);

  useEffect(() => {

  });

  // If we're on the login page, just render the children
  if (pathname === '/admin/login') {
    return children;
  }

  // Show loading state while checking auth
  if (isLoading) {
    return <SplashScreen />;
  }

  const handleDarkModeToggle = (value: boolean) => {
    setIsDarkMode(value);
    localStorage.setItem('qmaster-dark-mode', value.toString());
    // Dispatch a custom event for other components to listen to
    window.dispatchEvent(new CustomEvent('darkModeChange', { detail: value }));
  };

  const getNextPartnerPage = (page: number, perPage: number) => {
  };

  const getNextCategoryPage = (page: number, perPage: number) => {
  };

  const getNextUserPage = (page: number, perPage: number) => {
  };

  const getNextStorePage = (page: number, perPage: number) => {
  };

  return (
    <div className={`flex h-screen overflow-hidden transition-colors duration-300
      ${isDarkMode ? 'bg-[#0A0A0A] text-white' : 'bg-white text-slate-900'}`}
    >
      <AdminSidebar 
        isDarkMode={isDarkMode} 
        onDarkModeToggle={handleDarkModeToggle}
      />
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
            <PartnerContext.Provider value={{ partners, setPartners, getNextPartnerPage }}>
              <UsersContext.Provider value={{ users, setUsers, getNextUserPage }}>
                <CategoriesContext.Provider value={{ categories, setCategories, getNextCategoryPage }}> 
                  <StoresContext.Provider value={{ stores, setStores, getNextStorePage }}>  
                    {children}
                  </StoresContext.Provider> 
                </CategoriesContext.Provider>                 
              </UsersContext.Provider>
            </PartnerContext.Provider>
          </div>
        </div>
      </motion.main>
    </div>
  );
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <AuthProvider>
      <AdminLayoutContent>{children}</AdminLayoutContent>
    </AuthProvider>
  );
} 
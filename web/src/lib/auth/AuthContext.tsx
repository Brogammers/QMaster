'use client'

import { createContext, useContext, useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Cookies from 'js-cookie';
import axios from 'axios';

interface Admin {
  email: string;
  name: string;
}

interface AuthContextType {
  admin: Admin | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}

const ADMIN_CREDENTIALS = [
  { email: 'hatemthedev@gmail.com', password: 'HatemSoliman', name: 'Hatem' },
  { email: 'fam@awadlouis.com', password: 'FamAwad', name: 'Fam' },
  { email: 'tonymakaryousm@gmail.com', password: 'TonyMakaryous', name: 'Tony' },
];

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [admin, setAdmin] = useState<Admin | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Check both cookie and localStorage for existing session
    const checkAuth = () => {
      const authCookie = Cookies.get('qmaster-auth');
      const savedAdmin = localStorage.getItem('qmaster-admin');

      if (!authCookie) {
        // Clear local storage if cookie is missing
        localStorage.removeItem('qmaster-admin');
        setAdmin(null);
        if (pathname?.startsWith('/admin') && pathname !== '/admin/login') {
          router.push('/admin/login');
        }
      } else if (savedAdmin) {
        setAdmin(JSON.parse(savedAdmin));
      }
      setIsLoading(false);
    };

    checkAuth();
  }, [pathname, router]);

  const login = async (email: string, password: string) => {
    const url = process.env.NEXT_PUBLIC_API_BASE_URL_ADMIN_LOGIN || "";
    return axios.post(url, { email, password })
    .then((response) => {
      if (response.status === 200) {
        return response.data;
      } else { 
        return false;
      }
    }).then((data) => {
      if (data) {
        const adminData = { email: data.email, name: data.firstName };
        setAdmin(adminData);
        // Set both cookie and localStorage
        Cookies.set('qmaster-auth', 'true', { expires: 7 }); // 7 days expiry
        localStorage.setItem('qmaster-admin', JSON.stringify(adminData));
      } 
      return !!data;
    });
  };

  const logout = () => {
    setAdmin(null);
    // Clear both cookie and localStorage
    Cookies.remove('qmaster-auth');
    localStorage.removeItem('qmaster-admin');
    router.push('/admin/login');
  };

  return (
    <AuthContext.Provider value={{ admin, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
} 
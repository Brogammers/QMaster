'use client'

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { useAuth } from '@/lib/auth/AuthContext';
import Image from 'next/image';
import { FaMoon, FaSun } from 'react-icons/fa';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const router = useRouter();
  const { login } = useAuth();

  useEffect(() => {
    const savedDarkMode = localStorage.getItem('qmaster-dark-mode');
    setIsDarkMode(savedDarkMode === 'true');
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const success = await login(email, password);
    if (success) {
      router.push('/admin/dashboard');
    } else {
      setError('Invalid email or password');
    }
  };

  const toggleDarkMode = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    localStorage.setItem('qmaster-dark-mode', newMode.toString());
  };

  return (
    <div className={`min-h-screen flex items-center justify-center p-4 relative transition-colors duration-300
      ${isDarkMode ? 'bg-[#0A0A0A]' : 'bg-white'}`}
    >
      {/* Dark Mode Toggle */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        onClick={toggleDarkMode}
        className={`absolute top-6 right-6 p-3 rounded-xl backdrop-blur-sm z-20 transition-all duration-300
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
        <span className={`absolute left-full ml-2 whitespace-nowrap text-sm font-medium
          ${isDarkMode ? 'text-white/70' : 'text-slate-600'}`}>
          {isDarkMode ? 'Dark Mode' : 'Light Mode'}
        </span>
      </motion.button>

      {/* Background effects */}
      <div className="absolute inset-0 z-0">
        <div className={`absolute inset-0 bg-[url('/noise.svg')] mix-blend-soft-light
          ${isDarkMode ? 'opacity-[0.15]' : 'opacity-[0.05]'}`} 
        />
        <div className={`absolute inset-0 
          ${isDarkMode 
            ? 'bg-gradient-to-b from-concrete-turqouise/5 via-transparent to-transparent' 
            : 'bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-50 via-white to-white'}`}
        />
      </div>
      
      {/* Content */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md relative z-10"
      >
        <div className="text-center mb-8">
          <Image
            src="/qmaster-logo.svg"
            alt="QMaster Logo"
            width={64}
            height={64}
            className="mx-auto mb-4"
          />
          <h2 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
            Welcome to QMaster Admin
          </h2>
          <p className={`mt-2 ${isDarkMode ? 'text-white/60' : 'text-slate-600'}`}>
            Please sign in to continue
          </p>
        </div>

        <form onSubmit={handleSubmit} 
          className={`rounded-xl p-6 space-y-6 backdrop-blur-sm transition-all duration-300
            ${isDarkMode 
              ? 'bg-white/[0.02] border border-white/[0.05]' 
              : 'bg-white shadow-xl shadow-black/5 ring-1 ring-black/5'}`}
        >
          {error && (
            <div className="bg-rose-500/10 text-rose-500 px-4 py-2 rounded-lg text-sm">
              {error}
            </div>
          )}

          <div>
            <label className={`block text-sm font-medium mb-2
              ${isDarkMode ? 'text-white/70' : 'text-slate-600'}`}
            >
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`w-full px-4 py-2 rounded-lg transition-colors duration-300
                ${isDarkMode 
                  ? 'border border-white/10 bg-white/[0.02] text-white focus:outline-none focus:ring-2 focus:ring-crystal-blue' 
                  : 'border border-slate-200 bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-crystal-blue'}`}
              placeholder="Enter your email"
              required
            />
          </div>

          <div>
            <label className={`block text-sm font-medium mb-2
              ${isDarkMode ? 'text-white/70' : 'text-slate-600'}`}
            >
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`w-full px-4 py-2 rounded-lg transition-colors duration-300
                ${isDarkMode 
                  ? 'border border-white/10 bg-white/[0.02] text-white focus:outline-none focus:ring-2 focus:ring-crystal-blue' 
                  : 'border border-slate-200 bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-crystal-blue'}`}
              placeholder="Enter your password"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-crystal-blue text-black font-medium py-2 px-4 rounded-lg hover:bg-opacity-90 transition-colors"
          >
            Sign In
          </button>
        </form>
      </motion.div>
    </div>
  );
} 
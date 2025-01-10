'use client'

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { useAuth } from '@/lib/auth/AuthContext';
import Image from 'next/image';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();
  const { login } = useAuth();

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

  return (
    <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center p-4 relative">
      {/* Background effects - moved to back */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[url('/noise.svg')] opacity-[0.15] mix-blend-soft-light" />
        <div className="absolute inset-0 bg-gradient-to-b from-concrete-turqouise/5 via-transparent to-transparent" />
      </div>
      
      {/* Content - brought to front */}
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
          <h2 className="text-2xl font-bold text-white">Welcome to QMaster Admin</h2>
          <p className="text-white/60 mt-2">Please sign in to continue</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white/[0.02] border border-white/[0.05] rounded-xl p-6 space-y-6 backdrop-blur-sm">
          {error && (
            <div className="bg-rose-500/10 text-rose-300 px-4 py-2 rounded-lg text-sm">
              {error}
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-white/70 mb-2">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-white/10 bg-white/[0.02] text-white focus:outline-none focus:ring-2 focus:ring-crystal-blue"
              placeholder="Enter your email"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-white/70 mb-2">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-white/10 bg-white/[0.02] text-white focus:outline-none focus:ring-2 focus:ring-crystal-blue"
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
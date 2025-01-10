'use client'

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import AdminSidebar from '@/app/components/admin/AdminSidebar';
import { motion } from 'framer-motion';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  useEffect(() => {
    const isAdmin = true;
    if (!isAdmin) {
      router.push('/login');
    }
  }, [router]);

  return (
    <div className="flex h-screen bg-[#13404D]/5 overflow-hidden">
      <AdminSidebar />
      <motion.main 
        className="flex-1 overflow-y-auto p-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-7xl mx-auto">
          {children}
        </div>
      </motion.main>
    </div>
  );
} 
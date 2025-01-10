'use client'

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import AdminSidebar from '@/app/components/admin/AdminSidebar';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  // TODO: Add actual admin authentication check
  useEffect(() => {
    // Placeholder for admin auth check
    const isAdmin = true; // This should be replaced with actual auth check
    if (!isAdmin) {
      router.push('/login');
    }
  }, [router]);

  return (
    <div className="flex h-screen bg-gray-100">
      <AdminSidebar />
      <main className="flex-1 overflow-y-auto p-8">
        {children}
      </main>
    </div>
  );
} 
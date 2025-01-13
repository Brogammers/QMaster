'use client'

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  FaBuilding, 
  FaChartLine, 
  FaUsers, 
  FaCog,
  FaStore,
  FaCalendarAlt,
  FaSignOutAlt
} from 'react-icons/fa';
import { motion } from 'framer-motion';
import QMasterLogo from "../../../../public/qmaster-logo.svg"
import { useAuth } from '@/lib/auth/AuthContext';
import DarkModeToggle from '@/components/admin/DarkModeToggle';
import axios from 'axios';

const menuItems = [
  { path: '/admin/dashboard', label: 'Dashboard', icon: FaChartLine },
  { path: '/admin/partners', label: 'Partners', icon: FaBuilding },
  { path: '/admin/categories', label: 'Categories', icon: FaStore },
  { path: '/admin/users', label: 'Users', icon: FaUsers },
  { path: '/admin/schedules', label: 'Schedules', icon: FaCalendarAlt },
  { path: '/admin/store', label: 'Store', icon: FaStore },
  { path: '/admin/settings', label: 'Settings', icon: FaCog },
];

interface AdminSidebarProps {
  isDarkMode: boolean;
  onDarkModeToggle: (value: boolean) => void;
}

export default function AdminSidebar({ isDarkMode, onDarkModeToggle }: AdminSidebarProps) {
  const pathname = usePathname();
  const { logout } = useAuth();

  const handleLogout = () => {
    axios.defaults.headers.common['Authorization'] = '';
    document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    document.cookie = 'userId=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    logout();
  }

  return (
    <div className="w-64 bg-gradient-to-b from-concrete-turqouise to-coal-black text-white h-screen relative overflow-hidden">
      {/* Animated background effect */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-5" />
      
      {/* Logo area */}
      <div className="relative p-6 border-b border-crystal-blue/20 backdrop-blur-sm">
        <div className="flex items-center gap-3">
          <Image
            src={QMasterLogo}
            alt="QMaster Logo"
            width={40}
            height={40}
            className="w-10 h-10"
          />
          <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-crystal-blue to-baby-blue">
            QMaster
          </h1>
        </div>
      </div>

      {/* Navigation */}
      <nav className="relative mt-6 space-y-1 px-3">
        {menuItems.map((item) => {
          const isActive = pathname === item.path;
          const Icon = item.icon;

          return (
            <Link key={item.path} href={item.path}>
              <motion.div
                className={`
                  flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer
                  transition-all duration-200 group relative
                  ${isActive ? 'text-crystal-blue' : 'text-off-white hover:text-crystal-blue'}
                `}
                whileHover={{ x: 4 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                {isActive && (
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-concrete-turqouise/50 to-coal-black/50 rounded-xl border border-crystal-blue/20"
                    layoutId="activeTab"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <div className="relative flex items-center gap-3">
                  <Icon className={`w-5 h-5 transition-transform duration-200 group-hover:scale-110
                    ${isActive ? 'text-crystal-blue' : ''}`} 
                  />
                  <span className={`font-medium ${isActive ? 'text-crystal-blue' : ''}`}>
                    {item.label}
                  </span>
                </div>
              </motion.div>
            </Link>
          );
        })}
      </nav>

      {/* Bottom actions */}
      <div className="absolute bottom-20 left-0 right-0 px-6 space-y-3">
        <DarkModeToggle 
          isDarkMode={isDarkMode} 
          onToggle={onDarkModeToggle}
          showLabel={true}
        />

        <motion.button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl
            bg-rose-500/10 text-rose-300 hover:bg-rose-500/20 transition-colors"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <FaSignOutAlt className="w-5 h-5" />
          <span>Sign Out</span>
        </motion.button>
      </div>
      
      {/* Bottom gradient overlay */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-coal-black to-transparent pointer-events-none" />
    </div>
  );
} 
'use client'

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  FaBuilding, 
  FaChartLine, 
  FaUsers, 
  FaCog,
  FaStore,
  FaCalendarAlt
} from 'react-icons/fa';

const menuItems = [
  { path: '/admin/dashboard', label: 'Dashboard', icon: FaChartLine },
  { path: '/admin/partners', label: 'Partners', icon: FaBuilding },
  { path: '/admin/categories', label: 'Categories', icon: FaStore },
  { path: '/admin/users', label: 'Users', icon: FaUsers },
  { path: '/admin/schedules', label: 'Schedules', icon: FaCalendarAlt },
  { path: '/admin/settings', label: 'Settings', icon: FaCog },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <div className="w-64 bg-ocean-blue text-white h-screen">
      <div className="p-6">
        <h1 className="text-2xl font-bold">QMaster Admin</h1>
      </div>
      <nav className="mt-6">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.path}
              href={item.path}
              className={`
                flex items-center gap-3 px-6 py-3 text-sm
                ${pathname === item.path 
                  ? 'bg-baby-blue text-white' 
                  : 'text-gray-200 hover:bg-baby-blue/50'}
              `}
            >
              <Icon className="w-5 h-5" />
              {item.label}
            </Link>
          );
        })}
      </nav>
    </div>
  );
} 
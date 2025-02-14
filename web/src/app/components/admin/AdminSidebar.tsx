"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FaBuilding,
  FaChartLine,
  FaUsers,
  FaCog,
  FaStore,
  FaCalendarAlt,
  FaSignOutAlt,
  FaTimes,
} from "react-icons/fa";
import { motion } from "framer-motion";
import QMasterLogo from "../../../../public/qmaster-logo.svg";
import { useAdminAuth } from "@/lib/auth/AuthContext";
import DarkModeToggle from "@/components/admin/DarkModeToggle";
import axios from "axios";

const menuItems = [
  { path: "/admin/dashboard", label: "Dashboard", icon: FaChartLine },
  { path: "/admin/partners", label: "Partners", icon: FaBuilding },
  { path: "/admin/categories", label: "Categories", icon: FaStore },
  { path: "/admin/users", label: "Users", icon: FaUsers },
  { path: "/admin/schedules", label: "Schedules", icon: FaCalendarAlt },
  { path: "/admin/store", label: "Store", icon: FaStore },
  { path: "/admin/settings", label: "Settings", icon: FaCog },
];

interface AdminSidebarProps {
  isDarkMode: boolean;
  onDarkModeToggle: (value: boolean) => void;
  onClose: () => void;
}

export default function AdminSidebar({
  isDarkMode,
  onDarkModeToggle,
  onClose,
}: AdminSidebarProps) {
  const pathname = usePathname();
  const { logout } = useAdminAuth();

  const handleLogout = () => {
    axios.defaults.headers.common["Authorization"] = "";
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie = "userId=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    logout();
  };

  return (
    <div className="h-full w-64 flex flex-col">
      {/* Logo Section */}
      <div className="p-6 flex items-center justify-between">
        <Link
          href="/admin/dashboard"
          className="flex items-center gap-2"
          onClick={onClose}
        >
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
        </Link>
        {/* Close button for mobile */}
        <button
          onClick={onClose}
          className="lg:hidden p-2 rounded-lg hover:bg-white/[0.05]"
        >
          <FaTimes className="w-5 h-5" />
        </button>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 px-4 space-y-2 overflow-y-auto">
        {menuItems.map((item) => (
          <Link
            key={item.path}
            href={item.path}
            onClick={onClose}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors
                          ${
                            pathname === item.path
                              ? isDarkMode
                                ? "bg-white/[0.05] text-white"
                                : "bg-slate-100 text-slate-900"
                              : isDarkMode
                              ? "text-white/70 hover:bg-white/[0.02] hover:text-white"
                              : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                          }`}
          >
            {item.icon}
            <span>{item.label}</span>
          </Link>
        ))}
      </nav>

      {/* Bottom Section */}
      <div className="p-4 border-t border-white/[0.05]">
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
    </div>
  );
}

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useParams, usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import {
  FaChevronDown,
  FaChevronUp,
  FaCog,
  FaDesktop,
  FaPeopleArrows,
  FaSignOutAlt,
  FaUsers,
  FaStore,
  FaTimes,
} from "react-icons/fa";
import QMasterSVG from "../../../../public/QMaster-512.svg";
import { useBusinessAuth } from "@/lib/auth/AuthContext";
import axios from "axios";
import { useRole } from "@/ctx/RoleContext";

interface EntitySidebarProps {
  isDarkMode: boolean;
  onClose: () => void;
  onNavigate?: () => void;
}

export default function EntitySidebar({
  isDarkMode,
  onClose,
  onNavigate,
}: EntitySidebarProps) {
  const pathname = usePathname();
  const { logout } = useBusinessAuth();
  const { entity } = useParams();
  const { hasPermission } = useRole();
  const router = useRouter();
  const [isAdminOpen, setIsAdminOpen] = useState(() =>
    pathname.includes("/admin")
  );
  const [isQueueManagementOpen, setIsQueueManagementOpen] = useState(() =>
    pathname.includes("/queues")
  );
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const adminMenuItems = [
    {
      path: `/${entity}/admin/details`,
      label: "Details",
      permission: "view_details",
    },
    {
      path: `/${entity}/admin/customer-feedback`,
      label: "Customer Feedback",
      permission: "view_customer-feedback",
    },
    {
      path: `/${entity}/admin/sharing-info`,
      label: "Sharing Info",
      permission: "view_sharing-info",
    },
  ];

  const menuItems = [
    {
      path: `/${entity}/admin/`,
      label: "Admin",
      icon: FaCog,
      isDropdown: true,
      permission: "view_admin",
      children: adminMenuItems.filter((item) => hasPermission(item.permission)),
    },
    {
      path: `/${entity}/queues`,
      label: "Queues",
      icon: FaPeopleArrows,
      permission: "view_queues",
    },
    {
      path: `/${entity}/counter`,
      label: "Counter",
      icon: FaUsers,
      permission: "view_counter",
    },
    {
      path: `/${entity}/display`,
      label: "Display",
      icon: FaDesktop,
      permission: "view_display",
    },
    {
      path: `/${entity}/store`,
      label: "Store",
      icon: FaStore,
      permission: "view_store",
    },
  ];

  // Filter menu items based on permissions
  const authorizedMenuItems = menuItems.filter((item) =>
    hasPermission(item.permission)
  );

  const handleLogout = () => {
    setIsLoggingOut(true);
    logout();
    axios.defaults.headers.common["Authorization"] = "";
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie = "userId=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    // No need to reset isLoggingOut as the component will unmount
  };

  const toggleAdmin = () => {
    setIsAdminOpen(!isAdminOpen);
  };

  const toggleQueueManagement = () => {
    setIsQueueManagementOpen(!isQueueManagementOpen);
  };

  const handleNavigation = (path: string) => {
    // Call the onNavigate callback if provided
    if (onNavigate) {
      onNavigate();
    }
  };

  return (
    <div className="w-64 bg-gradient-to-b from-baby-blue to-ocean-blue text-white h-screen flex flex-col overflow-hidden">
      {/* Animated background effect */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-5" />

      {/* Logo area */}
      <div className="relative p-6 border-b border-white/20 backdrop-blur-sm flex items-center justify-between">
        <Link
          href={`/${entity}/admin`}
          className="flex items-center gap-3"
          onClick={() => {
            onClose();
            if (onNavigate) onNavigate();
          }}
        >
          <Image
            src={QMasterSVG}
            alt="QMaster Logo"
            width={40}
            height={40}
            className="w-10 h-10"
          />
          <h1 className="text-3xl font-bold text-white jost-font">QMaster</h1>
        </Link>
        {/* Close button for mobile */}
        <button
          onClick={onClose}
          className="lg:hidden p-2 rounded-lg text-white/70 hover:text-white hover:bg-white/[0.05]"
        >
          <FaTimes className="w-5 h-5" />
        </button>
      </div>

      {/* Navigation */}
      <nav className="relative mt-6 space-y-1 px-3">
        {authorizedMenuItems.map((item) => {
          const isActive = item.isDropdown
            ? pathname.startsWith(item.path)
            : pathname === item.path;
          const Icon = item.icon;

          return (
            <div key={item.path}>
              {item.isDropdown && item.label === "Admin" ? (
                <div>
                  <motion.div
                    className={`
                      flex items-center justify-between px-4 py-3 rounded-xl cursor-pointer
                      transition-all duration-200 group relative
                      ${
                        isActive
                          ? "text-white"
                          : "text-white/70 hover:text-white"
                      }
                    `}
                    onClick={toggleAdmin}
                    whileHover={{ x: 4 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    {isActive && (
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent rounded-xl"
                        layoutId="activeTab"
                        transition={{
                          type: "spring",
                          bounce: 0.2,
                          duration: 0.6,
                        }}
                      />
                    )}
                    <div className="relative flex items-center gap-3">
                      <Icon
                        className={`w-5 h-5 transition-transform duration-200 group-hover:scale-110`}
                      />
                      <span className="font-medium">{item.label}</span>
                    </div>
                    {isAdminOpen ? (
                      <FaChevronUp className="w-4 h-4" />
                    ) : (
                      <FaChevronDown className="w-4 h-4" />
                    )}
                  </motion.div>
                  <AnimatePresence>
                    {isAdminOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                        className="ml-12 mt-2 space-y-1 overflow-hidden"
                      >
                        {item.children?.map((child) => {
                          const isChildActive = pathname === child.path;
                          if (!hasPermission(child.permission)) return null;
                          return (
                            <Link
                              key={child.path}
                              href={child.path}
                              onClick={() => {
                                onClose();
                                if (onNavigate) onNavigate();
                              }}
                            >
                              <motion.div
                                className={`
                                  px-4 py-2 rounded-lg text-sm cursor-pointer
                                  ${
                                    isChildActive
                                      ? "text-white"
                                      : "text-white/70 hover:text-white"
                                  }
                                `}
                                whileHover={{ x: 2 }}
                              >
                                {child.label}
                              </motion.div>
                            </Link>
                          );
                        })}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <Link
                  href={item.path}
                  onClick={() => {
                    onClose();
                    if (onNavigate) onNavigate();
                  }}
                >
                  <motion.div
                    className={`
                      flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer
                      transition-all duration-200 group relative
                      ${
                        isActive
                          ? "text-white"
                          : "text-white/70 hover:text-white"
                      }
                    `}
                    whileHover={{ x: 4 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    {isActive && (
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent rounded-xl"
                        layoutId="activeTab"
                        transition={{
                          type: "spring",
                          bounce: 0.2,
                          duration: 0.6,
                        }}
                      />
                    )}
                    <div className="relative flex items-center gap-3">
                      <Icon
                        className={`w-5 h-5 transition-transform duration-200 group-hover:scale-110`}
                      />
                      <span className="font-medium">{item.label}</span>
                    </div>
                  </motion.div>
                </Link>
              )}
            </div>
          );
        })}
      </nav>

      {/* Bottom actions */}
      <div className="absolute bottom-20 left-0 right-0 px-6">
        <motion.button
          onClick={handleLogout}
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl
            ${
              isLoggingOut
                ? "bg-gray-500/30 text-gray-400 cursor-not-allowed"
                : "bg-red-500/40 text-rose-300 hover:bg-rose-500/20"
            } transition-colors`}
          whileHover={{ scale: isLoggingOut ? 1 : 1.02 }}
          whileTap={{ scale: isLoggingOut ? 1 : 0.98 }}
          disabled={isLoggingOut}
        >
          <FaSignOutAlt
            className={`w-5 h-5 ${isLoggingOut ? "opacity-50" : ""}`}
          />
          <span>{isLoggingOut ? "Signing out..." : "Sign Out"}</span>
        </motion.button>
      </div>

      {/* Bottom gradient overlay */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-ocean-blue to-transparent pointer-events-none" />
    </div>
  );
}

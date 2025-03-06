"use client";

import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useBusinessAuth, BusinessAuthProvider } from "@/lib/auth/AuthContext";
import EntitySidebar from "@/app/components/entity/EntitySidebar";
import SplashScreen from "@/app/shared/SplashScreen";
import { StoreProvider } from "@/store/StoreProvider";
import { LocationProvider } from "@/ctx/LocationContext";
import { FaBars } from "react-icons/fa";
import { RoleProvider } from "@/ctx/RoleContext";
import MaintenanceNotification from "@/components/MaintenanceNotification";

interface PrivateLayoutProps {
  children: React.ReactNode;
}

function PrivateLayoutContent({ children }: PrivateLayoutProps) {
  const pathname = usePathname();
  const { isLoading } = useBusinessAuth();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [isNavigating, setIsNavigating] = useState(false);

  useEffect(() => {
    const savedDarkMode = localStorage.getItem("qmaster-dark-mode");
    setIsDarkMode(savedDarkMode === "true");
  }, []);

  // This effect will run when the pathname changes
  // We'll use it to reset the navigation state
  useEffect(() => {
    setIsNavigating(false);
  }, [pathname]);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  // If we're on the login page, just render the children
  if (pathname === "/login") {
    return (
      <>
        {children}
        <MaintenanceNotification />
      </>
    );
  }

  // Show loading state while checking auth or navigating
  if (isLoading || isNavigating) {
    return <SplashScreen />;
  }

  return (
    <StoreProvider>
      <RoleProvider>
        <LocationProvider>
          <div
            className={`flex min-h-screen transition-colors duration-300
                      ${
                        isDarkMode
                          ? "bg-[#0A0A0A] text-white"
                          : "bg-white text-slate-900"
                      }`}
          >
            {/* Mobile overlay */}
            {isSidebarOpen && (
              <div
                className="fixed inset-0 bg-black/50 lg:hidden z-20"
                onClick={closeSidebar}
              />
            )}

            {/* Sidebar */}
            <div
              className={`
                              fixed top-0 left-0 h-screen z-30
                              transform transition-transform duration-300 ease-in-out
                              ${
                                isSidebarOpen
                                  ? "translate-x-0"
                                  : "-translate-x-full lg:translate-x-0"
                              }
                          `}
            >
              <EntitySidebar
                isDarkMode={isDarkMode}
                onClose={closeSidebar}
                onNavigate={() => setIsNavigating(true)}
              />
            </div>

            {/* Main content wrapper - takes up space where sidebar would be on large screens */}
            <div className="hidden lg:block w-64 flex-shrink-0"></div>

            {/* Mobile header */}
            <div className="lg:hidden fixed top-0 left-0 right-0 z-10 p-4">
              <button
                onClick={toggleSidebar}
                className={`p-2 rounded-lg transition-colors duration-200 ${
                  isDarkMode
                    ? "text-white hover:bg-white/10"
                    : "text-slate-900 hover:bg-slate-100"
                }`}
              >
                <FaBars className="w-6 h-6" />
              </button>
            </div>

            {/* Main content */}
            <motion.main
              className={`flex-1 overflow-y-auto p-8 relative pt-16 lg:pt-8
                              ${
                                isDarkMode
                                  ? "bg-[#0A0A0A] bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#141414] via-[#0A0A0A] to-black"
                                  : "bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-50 via-white to-white"
                              }`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {/* Noise texture overlay */}
              <div
                className={`fixed inset-0 w-full h-full bg-[url('/noise.svg')] opacity-[0.15] mix-blend-soft-light pointer-events-none`}
              />

              {/* Subtle gradient overlays */}
              <div
                className={`fixed inset-0 w-full h-full 
                                    ${
                                      isDarkMode
                                        ? "bg-gradient-to-b from-baby-blue/5 via-transparent to-transparent"
                                        : "bg-[linear-gradient(to_right,#0ea5e9,#06b6d4)] opacity-[0.03]"
                                    }`}
              />
              <div
                className={`fixed inset-0 w-full h-full 
                                    ${
                                      isDarkMode
                                        ? "bg-[radial-gradient(circle_at_top,rgba(6,182,212,0.1),transparent_70%)] pointer-events-none"
                                        : "bg-[radial-gradient(circle_at_top,rgba(14,165,233,0.1),transparent)]"
                                    }`}
              />

              {/* Content */}
              <div className="relative max-w-7xl mx-auto">
                <div className="space-y-6">{children}</div>
              </div>
            </motion.main>

            {/* Maintenance notification */}
            <MaintenanceNotification />
          </div>
        </LocationProvider>
      </RoleProvider>
    </StoreProvider>
  );
}

export default function PrivateLayout({ children }: PrivateLayoutProps) {
  return (
    <BusinessAuthProvider>
      <PrivateLayoutContent>{children}</PrivateLayoutContent>
    </BusinessAuthProvider>
  );
}

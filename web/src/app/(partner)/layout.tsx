"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { useBusinessAuth, BusinessAuthProvider } from "@/lib/auth/AuthContext";
import EntitySidebar from "@/app/components/entity/EntitySidebar";
import SplashScreen from "@/app/shared/SplashScreen";
import { StoreProvider } from "@/store/StoreProvider";
import { LocationProvider } from "@/ctx/LocationContext";

interface PrivateLayoutProps {
    children: React.ReactNode;
}

function PrivateLayoutContent({ children }: PrivateLayoutProps) {
    const pathname = usePathname();
    const { isLoading } = useBusinessAuth();
    const [isDarkMode, setIsDarkMode] = useState(false);

    useEffect(() => {
        const savedDarkMode = localStorage.getItem("qmaster-dark-mode");
        setIsDarkMode(savedDarkMode === "true");
    }, []);

    // If we're on the login page, just render the children
    if (pathname === "/login") {
        return children;
    }

    // Show loading state while checking auth
    if (isLoading) {
        return <SplashScreen />;
    }

    return (
        <StoreProvider>
            <LocationProvider>
                <div
                    className={`flex h-screen overflow-hidden transition-colors duration-300
          ${
              isDarkMode ? "bg-[#0A0A0A] text-white" : "bg-white text-slate-900"
          }`}
                >
                    <EntitySidebar isDarkMode={isDarkMode} />
                    <motion.main
                        className={`flex-1 overflow-y-auto p-8 relative
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
                            className={`absolute inset-0 bg-[url('/noise.svg')] opacity-[0.15] mix-blend-soft-light pointer-events-none`}
                        />

                        {/* Subtle gradient overlays */}
                        <div
                            className={`absolute inset-0 
              ${
                  isDarkMode
                      ? "bg-gradient-to-b from-baby-blue/5 via-transparent to-transparent"
                      : "bg-[linear-gradient(to_right,#0ea5e9,#06b6d4)] opacity-[0.03]"
              }`}
                        />
                        <div
                            className={`absolute inset-0 
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
                </div>
            </LocationProvider>
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

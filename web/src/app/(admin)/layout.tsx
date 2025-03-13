"use client";

import AdminSidebar from "@/app/components/admin/AdminSidebar";
import SplashScreen from "@/app/shared/SplashScreen";
import { AdminAuthProvider, useAdminAuth } from "@/lib/auth/AuthContext";
import { Toaster } from "react-hot-toast";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import {
    CategoriesProvider,
    NotificationsProvider,
    PartnersProvider,
    StoresContext,
    UsersContext,
} from "./context";
import { Provider } from "react-redux";
import { store } from "@/store/store";
import { StoreData } from "./admin/store/columns";
import { FaBars, FaTimes } from "react-icons/fa";

interface AdminLayoutProps {
    children: React.ReactNode;
}

export const DEFAULT_PAGE = 1;
export const DEFAULT_PER_PAGE = 10;

function AdminLayoutContent({ children }: AdminLayoutProps) {
    const pathname = usePathname();
    const { admin, isLoading } = useAdminAuth();
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [users, setUsers] = useState([]);
    const [stores, setStores] = useState<StoreData[]>([]);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const savedDarkMode = localStorage.getItem("qmaster-dark-mode");
        setIsDarkMode(savedDarkMode === "true");
    }, []);

    // If we're on the login page, just render the children
    if (pathname === "/admin/login") {
        return children;
    }

    // Show loading state while checking auth
    if (isLoading) {
        return <SplashScreen />;
    }

    const handleDarkModeToggle = (value: boolean) => {
        setIsDarkMode(value);
        localStorage.setItem("qmaster-dark-mode", value.toString());
        // Dispatch a custom event for other components to listen to
        window.dispatchEvent(
            new CustomEvent("darkModeChange", { detail: value })
        );
    };

    const getNextPartnerPage = (page: number, perPage: number) => {};

    const getNextUserPage = (page: number, perPage: number) => {};

    const getNextStorePage = (page: number, perPage: number) => {};

    return (
        <Provider store={store}>
            <div
                className={`flex flex-col lg:flex-row min-h-screen transition-colors duration-300
        ${isDarkMode ? "bg-[#0A0A0A] text-white" : "bg-white text-slate-900"}`}
            >
                {/* Mobile Header */}
                <div className="lg:hidden flex items-center justify-between p-6 border-b border-white/10 relative z-50">
                    <button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className={`p-2 rounded-lg ${
                            isMobileMenuOpen ? "opacity-0" : "opacity-100"
                        } transition-opacity
            ${
                isDarkMode
                    ? "text-white hover:bg-white/10"
                    : "text-slate-600 hover:bg-slate-100"
            }`}
                    >
                        <FaBars className="w-6 h-6" />
                    </button>

                    {pathname === "/admin/dashboard" ? (
                        <div className="flex flex-col items-end">
                            <h2
                                className={`text-sm ${
                                    isDarkMode
                                        ? "text-white/70"
                                        : "text-slate-600"
                                }`}
                            >
                                Welcome back,
                            </h2>
                            <h1
                                className={`text-lg font-bold ${
                                    isDarkMode ? "text-white" : "text-slate-900"
                                }`}
                            >
                                {admin?.name}
                            </h1>
                        </div>
                    ) : (
                        <h1
                            className={`text-lg font-bold ${
                                isDarkMode ? "text-white" : "text-slate-900"
                            }`}
                        >
                            {getPageTitle(pathname)}
                        </h1>
                    )}
                </div>

                {/* Mobile Overlay */}
                {isMobileMenuOpen && (
                    <div
                        className="lg:hidden fixed inset-0 bg-black/50 z-40"
                        onClick={() => setIsMobileMenuOpen(false)}
                    />
                )}

                {/* Sidebar */}
                <div
                    className={`fixed top-0 left-0 h-screen z-[45] transition-transform duration-300 lg:translate-x-0
          ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"}`}
                    onClick={(e) => e.stopPropagation()}
                >
                    <AdminSidebar
                        isDarkMode={isDarkMode}
                        onDarkModeToggle={handleDarkModeToggle}
                        onClose={() => setIsMobileMenuOpen(false)}
                    />
                </div>

                {/* Separate close button for mobile as fallback */}
                {isMobileMenuOpen && (
                    <button
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="lg:hidden fixed top-6 right-6 z-[9999] p-3 rounded-lg bg-coal-black/50 text-white hover:text-white hover:bg-white/[0.15] cursor-pointer"
                    >
                        <FaTimes className="w-5 h-5" />
                    </button>
                )}

                {/* Main content wrapper - takes up space where sidebar would be on large screens */}
                <div className="hidden lg:block w-64 flex-shrink-0"></div>

                {/* Main Content */}
                <motion.main
                    className={`flex-1 overflow-y-auto relative lg:ml-0
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
                    ? "bg-gradient-to-b from-concrete-turqouise/5 via-transparent to-transparent"
                    : "bg-[linear-gradient(to_right,#6366f1,#0ea5e9)] opacity-[0.03]"
            }`}
                    />
                    <div
                        className={`fixed inset-0 w-full h-full 
            ${
                isDarkMode
                    ? "bg-[radial-gradient(circle_at_top,rgba(19,64,77,0.1),transparent_70%)] pointer-events-none"
                    : "bg-[radial-gradient(circle_at_top,rgba(99,102,241,0.1),transparent)]"
            }`}
                    />

                    {/* Content Container */}
                    <div className="relative w-full max-w-[1920px] mx-auto">
                        {/* Content Padding Container */}
                        <div className="p-4 sm:p-6 lg:p-8 xl:p-10">
                            {/* Hide welcome section on mobile since it's in the header */}
                            {pathname === "/admin/dashboard" && (
                                <motion.div
                                    initial={{ opacity: 0, y: -20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="mb-6 lg:mb-8 hidden lg:block"
                                >
                                    <h2
                                        className={`text-base lg:text-lg ${
                                            isDarkMode
                                                ? "text-white/70"
                                                : "text-slate-600"
                                        }`}
                                    >
                                        Welcome back,
                                    </h2>
                                    <h1
                                        className={`text-2xl lg:text-3xl font-bold 
                    ${
                        isDarkMode
                            ? "text-white bg-clip-text text-transparent bg-gradient-to-r from-crystal-blue via-crystal-blue to-baby-blue"
                            : "text-slate-900"
                    }`}
                                    >
                                        {admin?.name}
                                    </h1>
                                </motion.div>
                            )}

                            {/* Main Content Area with improved spacing */}
                            <div className="space-y-6 sm:space-y-8">
                                <div className="bg-white/[0.02] rounded-xl p-4 sm:p-6 xl:p-8">
                                    <PartnersProvider>
                                        <UsersContext.Provider
                                            value={{
                                                users,
                                                setUsers,
                                                getNextUserPage,
                                            }}
                                        >
                                            <CategoriesProvider>
                                                <NotificationsProvider>
                                                    <StoresContext.Provider
                                                        value={{
                                                            stores,
                                                            setStores,
                                                            getNextStorePage,
                                                        }}
                                                    >
                                                        {children}
                                                        <Toaster
                                                            position="bottom-right"
                                                            toastOptions={{
                                                                style: {
                                                                    background:
                                                                        "#17222D",
                                                                    color: "#FFF",
                                                                },
                                                                duration: 5000,
                                                            }}
                                                        />
                                                    </StoresContext.Provider>
                                                </NotificationsProvider>
                                            </CategoriesProvider>
                                        </UsersContext.Provider>
                                    </PartnersProvider>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.main>
            </div>
        </Provider>
    );
}

// Helper function to get page title from pathname
function getPageTitle(pathname: string): string {
    const path = pathname.split("/").pop();
    if (!path) return "Dashboard";
    return path.charAt(0).toUpperCase() + path.slice(1);
}

export default function AdminLayout({ children }: AdminLayoutProps) {
    return (
        <AdminAuthProvider>
            <AdminLayoutContent>{children}</AdminLayoutContent>
        </AdminAuthProvider>
    );
}

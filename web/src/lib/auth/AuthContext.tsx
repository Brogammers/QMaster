"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import Cookies from "js-cookie";
import axios from "axios";

interface Admin {
    email: string;
    name: string;
}

interface Business {
    email: string;
    name: string;
}

interface AdminAuthContextType {
    admin: Admin | null;
    login: (email: string, password: string) => Promise<boolean>;
    logout: () => void;
    isLoading: boolean;
}

interface BusinessAuthContextType {
    business: Business | null;
    login: (email: string, partnerName: string) => void;
    logout: () => void;
    isLoading: boolean;
}

const AdminAuthContext = createContext<AdminAuthContextType | undefined>(
    undefined
);
const BusinessAuthContext = createContext<BusinessAuthContextType | undefined>(
    undefined
);

export function AdminAuthProvider({ children }: { children: React.ReactNode }) {
    const [admin, setAdmin] = useState<Admin | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        // Check both cookie and localStorage for existing session
        const checkAuth = () => {
            const authCookie = Cookies.get("qmaster-auth");
            const savedAdmin = localStorage.getItem("qmaster-admin");

            if (!authCookie) {
                // Clear local storage if cookie is missing
                localStorage.removeItem("qmaster-admin");
                setAdmin(null);
                if (
                    pathname?.startsWith("/admin") &&
                    pathname !== "/admin/login"
                ) {
                    router.push("/admin/login");
                }
            } else if (savedAdmin) {
                setAdmin(JSON.parse(savedAdmin));
            }
            setIsLoading(false);
        };

        checkAuth();
    }, [pathname, router]);

    const login = async (email: string, password: string) => {
        const url = process.env.NEXT_PUBLIC_API_BASE_URL_ADMIN_LOGIN || "";
        return axios
            .post(url, { email, password })
            .then((response) => {
                if (response.status === 200) {
                    return response.data;
                } else {
                    return false;
                }
            })
            .then((data) => {
                if (data) {
                    const adminData = {
                        email: data.email,
                        name:
                            data.firstName[0].toUpperCase() +
                            data.firstName.slice(1),
                    };
                    setAdmin(adminData);
                    // Set both cookie and localStorage
                    Cookies.set("qmaster-auth", "true", { expires: 7 }); // 7 days expiry
                    localStorage.setItem(
                        "qmaster-admin",
                        JSON.stringify(adminData)
                    );
                }
                return !!data;
            });
    };

    const logout = () => {
        setAdmin(null);
        // Clear both cookie and localStorage
        Cookies.remove("qmaster-auth");
        localStorage.removeItem("qmaster-admin");
        router.push("/admin/login");
    };

    return (
        <AdminAuthContext.Provider value={{ admin, login, logout, isLoading }}>
            {children}
        </AdminAuthContext.Provider>
    );
}

export function BusinessAuthProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const [user, setUser] = useState<Business | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        // Check both cookie and localStorage for existing session
        const checkAuth = () => {
            const authCookie = Cookies.get("qmaster-auth-business");
            const savedUser = localStorage.getItem("qmaster-business");

            if (!authCookie) {
                // Clear local storage if cookie is missing
                localStorage.removeItem("qmaster-business");
                setUser(null);
                if (
                    (pathname?.includes("customer-feedback") ||
                        pathname?.includes("details") ||
                        pathname?.includes("share-info") ||
                        pathname?.includes("counter") ||
                        pathname?.includes("display") ||
                        pathname?.includes("queues") ||
                        pathname?.includes("counter") ||
                        pathname?.includes("store")) &&
                    pathname !== "/login"
                ) {
                    router.push("/login");
                }
            } else if (savedUser) {
                setUser(JSON.parse(savedUser));
            }
            setIsLoading(false);
        };

        checkAuth();
    }, [pathname, router]);

    const login = (email: string, partnerName: string) => {
        const userData = {
            email: email,
            name: partnerName,
        };
        setUser(userData);
        // Set both cookie and localStorage
        Cookies.set("qmaster-auth-business", "true", {
            expires: 7,
        }); // 7 days expiry
        localStorage.setItem("qmaster-business", JSON.stringify(userData));
        Cookies.set("business-name", partnerName, { expires: 7 }); // 7 days expiry
    };

    const logout = () => {
        setUser(null);
        // Clear both cookie and localStorage
        Cookies.remove("qmaster-auth-business");
        localStorage.removeItem("qmaster-business");
        Cookies.remove("business-name");
        router.push("/login");
    };

    return (
        <BusinessAuthContext.Provider
            value={{ business: user, login, logout, isLoading }}
        >
            {children}
        </BusinessAuthContext.Provider>
    );
}

export function useAdminAuth() {
    const context = useContext(AdminAuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}

export function useBusinessAuth() {
    const context = useContext(BusinessAuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}

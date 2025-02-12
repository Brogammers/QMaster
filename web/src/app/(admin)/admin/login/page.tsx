"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAdminAuth } from "@/lib/auth/AuthContext";
import { FaEnvelope, FaEye, FaEyeSlash, FaLock } from "react-icons/fa";
import { motion } from "framer-motion";
import SplashScreen from "@/app/shared/SplashScreen";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const router = useRouter();
    const { login } = useAdminAuth();

    if (isLoading) {
        return <SplashScreen />;
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setIsLoading(true);

        try {
            const success = await login(email, password);
            if (success) {
                router.push("/admin/dashboard");
            } else {
                setError("Invalid email or password");
            }
        } catch (err) {
            setError("An error occurred. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="bg-animation min-h-screen flex items-center justify-center p-4">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className={`w-full max-w-md bg-white/[0.02] border border-white/10 rounded-xl p-8 backdrop-blur-sm`}
            >
                <h2 className="text-3xl font-bold text-white mb-8 text-center">
                    Admin Login
                </h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-white/70 mb-2">
                            Email
                        </label>
                        <div className="relative">
                            <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50" />
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 bg-white/[0.02] border border-white/10 rounded-lg text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-crystal-blue"
                                placeholder="Enter your email"
                                required
                            />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-white/70 mb-2">
                            Password
                        </label>
                        <div className="relative">
                            <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50" />
                            <input
                                type={showPassword ? "text" : "password"}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 bg-white/[0.02] border border-white/10 rounded-lg text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-crystal-blue"
                                placeholder="Enter your password"
                                required
                            />
                            {showPassword ? (
                                <FaEyeSlash
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/50 cursor-pointer"
                                    onClick={() => setShowPassword(false)}
                                />
                            ) : (
                                <FaEye
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/50 cursor-pointer"
                                    onClick={() => setShowPassword(true)}
                                />
                            )}
                        </div>
                    </div>
                    {error && <p className="text-rose-400 text-sm">{error}</p>}
                    <button
                        type="submit"
                        className="w-full bg-crystal-blue text-black font-medium py-2 rounded-lg hover:bg-opacity-90 transition-colors"
                    >
                        Sign In
                    </button>
                </form>
            </motion.div>
        </div>
    );
}

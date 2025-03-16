"use client";

import { useState } from "react";
import LoginForm from "../components/LoginForm";
import SplashScreen from "../shared/SplashScreen";
import Image from "next/image";
import Link from "next/link";
import NavLogo from "../../../public/NavigationLogo.svg";
import { BusinessAuthProvider } from "@/lib/auth/AuthContext";
import QMasterLogo from "../shared/QMasterLogo";

export default function Login() {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  if (isLoading) {
    return <SplashScreen />;
  }

  return (
    <BusinessAuthProvider>
      <div className="min-h-screen flex bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-concrete-turqouise via-ocean-blue to-baby-blue">
        {/* Noise texture overlay */}
        <div className="fixed inset-0 bg-[url('/noise.svg')] opacity-[0.15] mix-blend-soft-light pointer-events-none" />

        {/* Subtle gradient overlays */}
        <div className="fixed inset-0 bg-[linear-gradient(to_right,#6366f1,#0ea5e9)] opacity-[0.03]" />
        <div className="fixed inset-0 bg-[radial-gradient(circle_at_top,rgba(99,102,241,0.1),transparent)]" />

        {/* Main Content */}
        <div className="flex-1 flex flex-col h-screen overflow-auto">
          <div className="flex-1 flex flex-col px-8 py-4 relative">
            {/* Logo */}
            <Link href="/" className="mb-8">
              <QMasterLogo displayQMasterText />
            </Link>

            {/* Login Form Container */}
            <div className="flex-1 flex flex-col">
              <div className="max-w-md w-full mx-auto mt-8">
                <h2 className="text-2xl text-center font-bold mb-8 text-white">
                  Log in to your Business Account
                </h2>
                <LoginForm setIsLoading={setIsLoading} />
              </div>
            </div>

            {/* Bottom Text - Smaller version */}
            <div className="w-full text-center text-white/80 py-4 text-xs">
              Join millions of customers managing their queues and discovering
              stores all in one place
            </div>
          </div>
        </div>

        {/* Testimonial Section */}
        <div className="hidden lg:flex lg:w-1/3 bg-[#f9fafbe7] p-8 relative z-10 overflow-auto">
          <div className="w-full max-w-sm mx-auto mt-16">
            <div className="rounded-lg bg-white p-6 shadow-sm">
              <div className="mb-4">
                <svg
                  className="w-8 h-8 text-baby-blue"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-[#1F2937]">
                Trusted by top workers and leading businesses in the Light
                Industrial space
              </h3>
              <p className="text-gray-600 mb-4">
                &ldquo;tawabiry has been a true partner to us. Their worker
                quality has been a differentiator for us. I do really think this
                is the future.&rdquo;
              </p>
              <div className="flex flex-col">
                <p className="text-sm font-medium text-gray-700">
                  Tony Makaryous
                </p>
                <p className="text-xs text-gray-500">
                  Managing Director, ElFady Group Egypt
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </BusinessAuthProvider>
  );
}

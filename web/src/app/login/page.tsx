"use client";

import { useState } from "react";
import LoginForm from "../components/LoginForm";
import SplashScreen from "../shared/SplashScreen";
import Image from "next/image";
import NavLogo from "../../../public/NavigationLogo.svg";

export default function Login() {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  if (isLoading) {
    return <SplashScreen />;
  }

  return (
    <div className="min-h-screen flex bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-concrete-turqouise via-ocean-blue to-baby-blue relative">
      {/* Noise texture overlay */}
      <div className="absolute inset-0 bg-[url('/noise.svg')] opacity-[0.15] mix-blend-soft-light pointer-events-none" />

      {/* Subtle gradient overlays */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#6366f1,#0ea5e9)] opacity-[0.03]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(99,102,241,0.1),transparent)]" />

      {/* Main Content */}
      <div className="flex-1 flex flex-col p-8 relative">
        {/* Logo */}
        <div className="mb-8">
          <Image
            src={NavLogo}
            alt="QMaster Logo"
            width={120}
            height={40}
            className="w-auto h-auto"
          />
        </div>

        {/* Login Form Container */}
        <div className="max-w-md w-full mx-auto mt-8">
          <h2 className="text-2xl font-bold mb-8 text-white">
            Log in to your Business Account
          </h2>
          <LoginForm setIsLoading={setIsLoading} />
        </div>
      </div>

      {/* Testimonial Section */}
      <div className="hidden lg:flex lg:w-1/3 bg-[#F9FAFB] p-8 relative z-10">
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
              &ldquo;QMaster has been a true partner to us. Their worker quality
              has been a differentiator for us. I do really think this is the
              future.&rdquo;
            </p>
            <p className="text-sm text-gray-500">
              HR Liaison, Lone Star Bakery
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

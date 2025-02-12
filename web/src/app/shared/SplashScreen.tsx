"use client";

import animatedLogo from "../../../public/splash.json";
import Lottie from "lottie-react";

export default function SplashScreen() {
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center w-full h-full bg-ocean-blue">
      <Lottie animationData={animatedLogo} width={100} autoplay loop />
    </div>
  );
}

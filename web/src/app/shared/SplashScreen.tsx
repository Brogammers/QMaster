import animatedLogo from "../../../public/splash.json";
import Lottie from "lottie-react";

export default function SplashScreen() {
  return (
    <div className="absolute top-0 left-0 flex items-center justify-center w-full min-h-screen bg-ocean-blue">
      <Lottie animationData={animatedLogo} width={100} autoplay loop />
    </div>
  );
}

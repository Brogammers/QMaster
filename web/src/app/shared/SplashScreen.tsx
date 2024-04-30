import animatedLogo from "../../../public/splash.json";
import Lottie from "lottie-react";

export default function SplashScreen() {
  return (
    <div id="splash-screen" className="flex items-center justify-center min-h-screen bg-ocean-blue">
      <div className="w-1/2 h-1/2">
      <Lottie 
        animationData={animatedLogo} 
        width={400}
        autoplay
        loop
      />
      </div>
    </div>
  );
}

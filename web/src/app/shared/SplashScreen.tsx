import { useEffect } from 'react';
import { Player, Controls } from '@lottiefiles/react-lottie-player';
import Lottie from 'react-lottie';
import Logo from '../../../public/splash.json';

export default function SplashScreen({ additionalText, backgroundColor = '#17222D' }) {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice"
    }
  };

  return (
    <div id="splash-screen" className="flex items-center justify-center min-h-screen bg-ocean-blue" style={{ backgroundColor }}>
      <div className="w-1/2 h-1/2">
      <Lottie 
        options={defaultOptions}
        height={400}
        width={400}
      />
      </div>
      {additionalText && (
        <p className="text-white text-center mt-6">{additionalText}</p>
      )}
    </div>
  );
}

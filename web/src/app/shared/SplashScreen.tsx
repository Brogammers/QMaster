import { useEffect } from 'react';
import { Player, Controls } from '@lottiefiles/react-lottie-player';
import Logo from '@/assets/images/splash.json';

export default function SplashScreen({ additionalText, backgroundColor = '#17222D' }) {
  useEffect(() => {
    // Mimic componentDidMount to auto hide splash screen after some time
    const timeout = setTimeout(() => {
      document.getElementById('splash-screen').style.display = 'none';
    }, 3000); // Adjust the duration as needed
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div id="splash-screen" className="flex items-center justify-center min-h-screen bg-ocean-blue" style={{ backgroundColor }}>
      <div className="w-1/2 h-1/2">
        <Player
          autoplay
          loop
          src="https://assets3.lottiefiles"
        >
          <Controls visible={false} buttons={['play']}>
        </Player>
      </div>
      {additionalText && (
        <p className="text-white text-center mt-6">{additionalText}</p>
      )}
    </div>
  );
}

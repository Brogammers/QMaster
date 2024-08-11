import animatedLogo from "../../../public/splash.json";
import Lottie from "lottie-react";

export default function SplashScreen() {
  return (
    <div className="flex items-center justify-center w-full min-h-screen bg-ocean-blue">
      <Lottie animationData={animatedLogo} width={100} autoplay loop />
    </div>
  );
}

// import { useState, useEffect } from "react";
// import LoginForm from "../components/LoginForm";
// import dynamic from 'next/dynamic';

// const SplashScreen = dynamic(() => import('../shared/SplashScreen'), { ssr: false });

// export default function Login() {
//   const [isLoading, setIsLoading] = useState(false);
//   const [isClient, setIsClient] = useState(false);

//   useEffect(() => {
//     setIsClient(true);
//   }, []);

//   if (isLoading && isClient) {
//     return <SplashScreen />;
//   }

//   return (
//     <div className="bg-animation flex flex-col justify-center items-center">
//       <div className="login__form container row text-center flex flex-col justify-center items-center h-4/5">
//         <h2 className="login__form--title text-8xl font-bold text-white mb-16">Login</h2>
//         <LoginForm setIsLoading={setIsLoading} />
//       </div>
//     </div>
//   )
// }

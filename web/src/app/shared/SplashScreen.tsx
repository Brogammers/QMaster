

export default function SplashScreen() {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    // animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice"
    }
  };

  return (
    <div id="splash-screen" className="flex items-center justify-center min-h-screen bg-ocean-blue">
      <div className="w-1/2 h-1/2">
      {/* <Lottie 
        options={defaultOptions}
        height={400}
        width={400}
      /> */}
      </div>
    </div>
  );
}

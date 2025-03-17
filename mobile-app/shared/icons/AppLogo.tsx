import React from "react";
import TawabiryBgLogo from "../../assets/images/tawabiry-bg.svg";
import TawabiryLogo from "../../assets/images/tawabiry.svg";

interface TawabiryLogoProps {
  width?: number;
  height?: number;
  className?: string;
  background?: boolean;
}

export default function AppLogo({
  width,
  height,
  background,
}: TawabiryLogoProps) {
  return (
    <>
      {background ? (
        <TawabiryBgLogo width={width} height={height} />
      ) : (
        <TawabiryLogo width={width} height={height} />
      )}
    </>
  );
}

import React from "react";
import { View } from "react-native";
import TawabiryBgLogo from "../../assets/images/tawabiry-bg.svg";
import TawabiryLogo from "../../assets/images/tawabiry.svg";
interface TawabiryLogoProps {
  width?: number;
  height?: number;
  className?: string;
  background?: boolean;
}

export default function Logo({ width, height, className, background }: TawabiryLogoProps) {
  return (
    <>
      {background ? (
        <TawabiryBgLogo width={width} height={height} className={className} />
      ) : (
        <TawabiryLogo width={width} height={height} className={className} />
      )}
    </>
  );
}
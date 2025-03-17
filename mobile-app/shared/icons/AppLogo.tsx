import React from "react";
import TawabiryBgLogo from "../../assets/images/tawabiry-bg.svg";
import TawabiryBgRoundedLogo from "../../assets/images/tawabiry-bg-rounded.svg";
import TawabiryLogo from "../../assets/images/tawabiry.svg";

interface TawabiryLogoProps {
  width?: number;
  height?: number;
  className?: string;
  background?: boolean;
  rounded?: boolean;
}

export default function AppLogo({
  width,
  height,
  background,
  rounded,
}: TawabiryLogoProps) {
  return (
    <>
      {background ? (
        rounded ? (
          <TawabiryBgRoundedLogo width={width} height={height} />
        ) : (
          <TawabiryBgLogo width={width} height={height} />
        )
      ) : (
        <TawabiryLogo width={width} height={height} />
      )}
    </>
  );
}

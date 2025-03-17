import React from "react";
import { View, StyleSheet } from "react-native";
import TawabiryBgLogo from "../../assets/images/tawabiry-bg.svg";
import TawabiryLogo from "../../assets/images/tawabiry.svg";

interface TawabiryLogoProps {
  width?: number;
  height?: number;
  className?: string;
  background?: boolean;
  rounded?: boolean;
  style?: any;
}

export default function Logo({
  width = 60,
  height = 60,
  className,
  background,
  rounded,
  style,
}: TawabiryLogoProps) {
  const containerStyle = [
    styles.container,
    { width, height },
    background && styles.withBackground,
    rounded && styles.rounded,
    className?.includes("rounded") && styles.rounded,
    className?.includes("rounded-2xl") && styles.roundedXl,
    style,
  ];

  return (
    <View style={containerStyle}>
      {background ? (
        <TawabiryBgLogo width={width * 0.8} height={height * 0.8} />
      ) : (
        <TawabiryLogo width={width * 0.8} height={height * 0.8} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  withBackground: {
    backgroundColor: "#17222D", // ocean-blue background
  },
  rounded: {
    borderRadius: 16,
    overflow: "hidden",
  },
  roundedXl: {
    borderRadius: 20,
    overflow: "hidden",
  },
});

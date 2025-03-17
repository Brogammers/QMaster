import React from "react";
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  I18nManager,
  ViewStyle,
} from "react-native";
import { useRouter, Href } from "expo-router";

interface BackButtonProps {
  onPress?: () => void;
  backTo?: Href<string>;
  color?: string;
  className?: string;
  style?: ViewStyle;
}

/**
 * Reusable back button component with consistent styling
 * @param onPress - Optional custom onPress handler. If not provided, defaults to router.back()
 * @param backTo - Optional route to navigate to instead of using back()
 * @param color - Optional text color for the arrow. Defaults to black
 * @param className - Optional additional Tailwind CSS classes
 * @param style - Optional additional StyleSheet styles
 */
export default function BackButton({
  onPress,
  backTo,
  color = "#000",
  className = "",
  style,
}: BackButtonProps) {
  const router = useRouter();

  const handlePress = () => {
    if (onPress) {
      onPress();
    } else if (backTo) {
      router.replace(backTo, {
        // Use horizontal slide animation
        animation: "slide_from_left",
      });
    } else {
      router.back();
    }
  };

  return (
    <TouchableOpacity
      onPress={handlePress}
      className={`bg-white shadow-sm rounded-full p-3 w-10 h-10 justify-center items-center ${className}`}
      style={style}
    >
      <Text
        style={[
          styles.arrow,
          {
            color,
            transform: [{ scaleX: I18nManager.isRTL ? 1 : -1 }],
          },
        ]}
      >
        →
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  arrow: {
    fontWeight: "bold",
    fontSize: 16,
  },
});

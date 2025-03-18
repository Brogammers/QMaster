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
  color?: string;
  className?: string;
  style?: ViewStyle;
  backTo?: Href<string>;
}

/**
 * Reusable back button component with consistent styling
 * @param onPress - Optional custom onPress handler. If not provided, defaults to router.back()
 * @param color - Optional text color for the arrow. Defaults to black
 * @param className - Optional additional Tailwind CSS classes
 * @param style - Optional additional StyleSheet styles
 * @param backTo - Optional destination path to navigate to (e.g. "/"). If provided, will navigate to this path instead of going back.
 */
export default function BackButton({
  onPress,
  color = "#000",
  className = "",
  style,
  backTo,
}: BackButtonProps) {
  const router = useRouter();

  const handlePress = () => {
    if (onPress) {
      onPress();
    } else if (backTo) {
      router.push(backTo);
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

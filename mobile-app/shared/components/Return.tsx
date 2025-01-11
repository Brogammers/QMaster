import { I18nManager, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import LeftArrow from "@/shared/icons/LeftArrow";
import { ReturnButtonProps } from "@/types";
import { Link } from "expo-router";

export default function Return({
  href,
  size,
  color,
  backgroundColor = 'transparent',
  style,
}: ReturnButtonProps) {
  return (
    <Link href={`${href}`} style={styles.returnButton}>
      <TouchableOpacity style={[styles.button, { backgroundColor, borderRadius: size / 2 }, style]}>
        <LeftArrow size={size} color={color} />
      </TouchableOpacity>
    </Link>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: 8,
  },
  returnButton: {
    position: "absolute",
    top: 60,
    left: 18,
    transform: [{ scaleX: I18nManager.isRTL ? -1 : 1 }],
  },
});

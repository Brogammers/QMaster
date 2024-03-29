import { StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import LeftArrow from "@/shared/icons/LeftArrow";
import { ReturnButtonProps } from "@/types";

export default function Return({
  size,
  color,
  backgroundColor = 'transparent',
  style,
}: ReturnButtonProps) {
  return (
    <TouchableOpacity style={[styles.button, { backgroundColor, borderRadius: size / 2 }, style]}>
      <LeftArrow size={size} color={color} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: 8,
  },
});

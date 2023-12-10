import { StyleProp, StyleSheet, ViewStyle } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import LeftArrow from "@/shared/icons/LeftArrow";

interface ReturnButtonProps {
  size: number;
  color: string;
  backgroundColor?: string;
  style?: StyleProp<ViewStyle>;
}

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

import { I18nManager, StyleSheet, View, Text } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import LeftArrow from "@/shared/icons/LeftArrow";
import { ReturnButtonProps } from "@/types";
import { Link } from "expo-router";
import i18n from "@/i18n";

export default function Return({
  href,
  size,
  color,
  backgroundColor = 'transparent',
  style,
  title,
}: ReturnButtonProps) {
  return (
    <View style={styles.container}>
      <Link href={href} style={styles.returnButton}>
        <TouchableOpacity style={[styles.button, { backgroundColor, borderRadius: size / 2 }, style]}>
          <LeftArrow size={size} color={color} />
        </TouchableOpacity>
      </Link>
      {title && (
        <Text style={[styles.title, { color }]}>
          {i18n.t(title)}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 60,
    left: 18,
    zIndex: 1000,
    flexDirection: 'row',
    alignItems: 'center',
  },
  button: {
    padding: 8,
    transform: [{ scaleX: I18nManager.isRTL ? -1 : 1 }],
  },
  returnButton: {
    zIndex: 1000,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 12,
  },
});

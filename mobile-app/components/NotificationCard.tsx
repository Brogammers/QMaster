import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useTheme } from "@/ctx/ThemeContext";
import { MotiView } from "moti";

interface NotificationCardProps {
  title: string;
  message: string;
  timestamp: string;
  emoji: string;
  onPress?: () => void;
}

export default function NotificationCard({
  title,
  message,
  timestamp,
  emoji,
  onPress,
}: NotificationCardProps) {
  const { isDarkMode } = useTheme();

  return (
    <MotiView
      from={{ opacity: 0, translateY: 5 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{
        opacity: { type: "timing", duration: 300 },
        translateY: { type: "timing", duration: 300 },
      }}
    >
      <TouchableOpacity
        onPress={onPress}
        style={[
          styles.container,
          isDarkMode ? styles.containerDark : styles.containerLight,
        ]}
        activeOpacity={0.7}
      >
        <View style={styles.emojiContainer}>
          <Text style={styles.emoji}>{emoji}</Text>
        </View>
        <View style={styles.contentContainer}>
          <View style={styles.headerRow}>
            <Text
              style={[
                styles.title,
                isDarkMode ? styles.textDark : styles.textLight,
              ]}
              numberOfLines={1}
            >
              {title}
            </Text>
            <Text style={styles.timestamp}>{timestamp}</Text>
          </View>
          <Text
            style={[
              styles.message,
              isDarkMode ? styles.messageTextDark : styles.messageTextLight,
            ]}
            numberOfLines={2}
          >
            {message}
          </Text>
        </View>
      </TouchableOpacity>
    </MotiView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 16,
    marginVertical: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  containerLight: {
    backgroundColor: "#FFFFFF",
  },
  containerDark: {
    backgroundColor: "#1E2732",
  },
  emojiContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#F5F5F5",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  emoji: {
    fontSize: 20,
  },
  contentContainer: {
    flex: 1,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 4,
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    flex: 1,
  },
  textLight: {
    color: "#000000",
  },
  textDark: {
    color: "#FFFFFF",
  },
  timestamp: {
    fontSize: 12,
    color: "#8E8E93",
    marginLeft: 8,
  },
  message: {
    fontSize: 14,
    lineHeight: 20,
  },
  messageTextLight: {
    color: "#666666",
  },
  messageTextDark: {
    color: "#CCCCCC",
  },
});

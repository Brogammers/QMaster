import React from "react";
import { View, Text, TouchableOpacity, InteractionManager } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useTheme } from "@/ctx/ThemeContext";
import { useNotification } from "@/ctx/NotificationContext";
import i18n from "@/i18n";
import { MotiView } from "moti";
import {
  CORE_NOTIFICATIONS,
  MockNotification,
} from "@/shared/data/mockNotifications";

interface NotificationTestButtonsProps {
  compact?: boolean;
}

export default function NotificationTestButtons({
  compact = false,
}: NotificationTestButtonsProps) {
  const { isDarkMode } = useTheme();
  const { addNotification } = useNotification();

  // Function to test emoji notifications
  const testEmojiNotification = (type: string) => {
    const notification = CORE_NOTIFICATIONS.find((n) => n.id === type);
    if (!notification) return;

    addNotification({
      title: notification.title,
      message: notification.message,
      type: notification.type || "info",
      duration: notification.duration || 5000,
      emoji: notification.emoji,
      actionLabel: "View",
      onAction: () => {
        console.log(`${type} notification action pressed`);
      },
    });
  };

  // Function to test all notifications in sequence
  const testAllNotifications = () => {
    // Add notifications with a small delay between each to prevent overwhelming the system
    InteractionManager.runAfterInteractions(() => {
      CORE_NOTIFICATIONS.forEach((notification, index) => {
        setTimeout(() => {
          addNotification({
            title: notification.title,
            message: notification.message,
            type: notification.type || "info",
            duration: notification.duration || 5000,
            emoji: notification.emoji,
            actionLabel: "View",
            onAction: () => {
              console.log(`${notification.id} notification action pressed`);
            },
          });
        }, index * 50); // Small staggered delay to prevent UI thread blocking
      });
    });
  };

  if (compact) {
    // Compact version for home screen and other places with limited space
    return (
      <MotiView
        from={{ opacity: 0, translateY: 10 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{
          opacity: { type: "timing", duration: 300 },
          translateY: { type: "timing", duration: 300 },
        }}
        className={`rounded-xl p-3 mb-4 ${
          isDarkMode ? "bg-slate-800/60" : "bg-white/80"
        }`}
      >
        <Text
          className={`text-sm font-medium mb-2 ${
            isDarkMode ? "text-white" : "text-coal-black"
          }`}
        >
          {i18n.t("test_notifications")}
        </Text>

        <View className="flex-row justify-between">
          {CORE_NOTIFICATIONS.map((notification) => (
            <TouchableOpacity
              key={notification.id}
              onPress={() => testEmojiNotification(notification.id)}
              className={`flex-row items-center justify-center p-2 rounded-lg ${
                isDarkMode ? "bg-slate-700/40" : "bg-gray-100/80"
              }`}
              style={{ width: "23%" }}
            >
              <Text style={{ fontSize: 18 }}>{notification.emoji}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </MotiView>
    );
  }

  // Full version with text labels
  return (
    <MotiView
      from={{ opacity: 0, translateY: 10 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{
        opacity: { type: "timing", duration: 300 },
        translateY: { type: "timing", duration: 300 },
      }}
      className={`rounded-xl p-4 mb-6 ${
        isDarkMode ? "bg-slate-800/60" : "bg-white/80"
      }`}
    >
      <Text
        className={`text-base font-medium mb-4 ${
          isDarkMode ? "text-white" : "text-coal-black"
        }`}
      >
        {i18n.t("test_notifications")}
      </Text>

      <View className="space-y-3">
        {CORE_NOTIFICATIONS.map((notification) => (
          <TouchableOpacity
            key={notification.id}
            onPress={() => testEmojiNotification(notification.id)}
            className={`flex-row items-center p-3 rounded-lg ${
              isDarkMode ? "bg-slate-700/40" : "bg-gray-100/80"
            }`}
          >
            <Text style={{ fontSize: 20, marginRight: 10 }}>
              {notification.emoji}
            </Text>
            <Text
              className={`font-medium ${
                isDarkMode ? "text-white" : "text-gray-800"
              }`}
            >
              {notification.title}
            </Text>
          </TouchableOpacity>
        ))}

        <TouchableOpacity
          onPress={testAllNotifications}
          className={`flex-row items-center p-3 rounded-lg bg-blue-500`}
        >
          <Text style={{ fontSize: 20, marginRight: 10 }}>🔄</Text>
          <Text className="font-medium text-white">Test All Sequentially</Text>
        </TouchableOpacity>
      </View>
    </MotiView>
  );
}

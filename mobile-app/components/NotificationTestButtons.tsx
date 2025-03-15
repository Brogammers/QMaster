import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useTheme } from "@/ctx/ThemeContext";
import { useNotification, NotificationType } from "@/ctx/NotificationContext";
import i18n from "@/i18n";
import { MotiView } from "moti";

interface NotificationTestButtonsProps {
  compact?: boolean;
}

export default function NotificationTestButtons({
  compact = false,
}: NotificationTestButtonsProps) {
  const { isDarkMode } = useTheme();
  const { addNotification } = useNotification();

  // Function to test in-app notifications
  const testInAppNotification = (type: NotificationType) => {
    const notificationMessages = {
      info: {
        title: "Today Only!",
        message:
          "Enjoy an exclusive deal on your favorite brew! Don't miss out!",
        emoji: "☕",
      },
      success: {
        title: i18n.t("your_turn_notification"),
        message: i18n.t("next_in_queue") + ' "Starbucks Coffee"',
        emoji: "⏱️",
      },
      warning: {
        title: "Limited Time Offer",
        message: "50% off your next coffee order. Tap to redeem now!",
        emoji: "🎁",
      },
      error: {
        title: "Last Chance!",
        message:
          "Your reward points expire today. Use them before they're gone!",
        emoji: "⚠️",
      },
    };

    addNotification({
      title: notificationMessages[type].title,
      message: notificationMessages[type].message,
      type: type,
      duration: 5000,
      actionLabel: type === "info" ? "View" : i18n.t("view_queue"),
      onAction: () => {
        console.log("Action button pressed");
      },
    });
  };

  const getIconColor = (type: NotificationType) => {
    switch (type) {
      case "success":
        return "#34C759";
      case "warning":
        return "#FF9500";
      case "error":
        return "#FF3B30";
      default:
        return "#007AFF";
    }
  };

  // Add a new function to test emoji notifications
  const testEmojiNotification = (type: string) => {
    console.log(`testEmojiNotification called with type: ${type}`);

    const emojiNotifications = {
      coffee: {
        title: "Today Only!",
        message:
          "Enjoy an exclusive deal on your favorite brew! Don't miss out!",
        emoji: "☕",
      },
      queue: {
        title: "Almost Your Turn!",
        message: 'You\'re next in the queue "Starbucks Coffee"',
        emoji: "⏱️",
      },
      offer: {
        title: "Limited Time Offer",
        message: "50% off your next coffee order. Tap to redeem now!",
        emoji: "🎁",
      },
      noWait: {
        title: "No Wait Time!",
        message: 'Your favorite place "Cafe Nero" has no queue right now!',
        emoji: "🚶",
      },
    };

    const notification =
      emojiNotifications[type as keyof typeof emojiNotifications];

    console.log("Notification to be added:", notification);

    try {
      addNotification({
        title: notification.title,
        message: notification.message,
        type: "info",
        duration: 5000,
        emoji: notification.emoji,
        actionLabel: "View",
        onAction: () => {
          console.log(`${type} notification action pressed`);
        },
      });
      console.log("Notification added successfully");
    } catch (error) {
      console.error("Error adding notification:", error);
    }
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
          <TouchableOpacity
            onPress={() => testEmojiNotification("coffee")}
            className={`flex-row items-center justify-center p-2 rounded-lg ${
              isDarkMode ? "bg-slate-700/40" : "bg-gray-100/80"
            }`}
            style={{ width: "23%" }}
          >
            <Text style={{ fontSize: 18 }}>☕</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => testEmojiNotification("queue")}
            className={`flex-row items-center justify-center p-2 rounded-lg ${
              isDarkMode ? "bg-slate-700/40" : "bg-gray-100/80"
            }`}
            style={{ width: "23%" }}
          >
            <Text style={{ fontSize: 18 }}>⏱️</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => testEmojiNotification("offer")}
            className={`flex-row items-center justify-center p-2 rounded-lg ${
              isDarkMode ? "bg-slate-700/40" : "bg-gray-100/80"
            }`}
            style={{ width: "23%" }}
          >
            <Text style={{ fontSize: 18 }}>🎁</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => testEmojiNotification("noWait")}
            className={`flex-row items-center justify-center p-2 rounded-lg ${
              isDarkMode ? "bg-slate-700/40" : "bg-gray-100/80"
            }`}
            style={{ width: "23%" }}
          >
            <Text style={{ fontSize: 18 }}>🚶</Text>
          </TouchableOpacity>
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
        <TouchableOpacity
          onPress={() => testEmojiNotification("coffee")}
          className={`flex-row items-center p-3 rounded-lg ${
            isDarkMode ? "bg-slate-700/40" : "bg-gray-100/80"
          }`}
        >
          <Text style={{ fontSize: 20, marginRight: 10 }}>☕</Text>
          <Text
            className={`font-medium ${
              isDarkMode ? "text-white" : "text-gray-800"
            }`}
          >
            Today Only! Promotion
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => testEmojiNotification("queue")}
          className={`flex-row items-center p-3 rounded-lg ${
            isDarkMode ? "bg-slate-700/40" : "bg-gray-100/80"
          }`}
        >
          <Text style={{ fontSize: 20, marginRight: 10 }}>⏱️</Text>
          <Text
            className={`font-medium ${
              isDarkMode ? "text-white" : "text-gray-800"
            }`}
          >
            {i18n.t("your_turn_notification")}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => testEmojiNotification("offer")}
          className={`flex-row items-center p-3 rounded-lg ${
            isDarkMode ? "bg-slate-700/40" : "bg-gray-100/80"
          }`}
        >
          <Text style={{ fontSize: 20, marginRight: 10 }}>🎁</Text>
          <Text
            className={`font-medium ${
              isDarkMode ? "text-white" : "text-gray-800"
            }`}
          >
            Limited Time Offer
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => testEmojiNotification("noWait")}
          className={`flex-row items-center p-3 rounded-lg ${
            isDarkMode ? "bg-slate-700/40" : "bg-gray-100/80"
          }`}
        >
          <Text style={{ fontSize: 20, marginRight: 10 }}>🚶</Text>
          <Text
            className={`font-medium ${
              isDarkMode ? "text-white" : "text-gray-800"
            }`}
          >
            No Wait Time Alert
          </Text>
        </TouchableOpacity>
      </View>
    </MotiView>
  );
}

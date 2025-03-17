import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  InteractionManager,
} from "react-native";
import { useNotification } from "@/ctx/NotificationContext";
import { useTheme } from "@/ctx/ThemeContext";
import { useSelector } from "react-redux";
import { RootState } from "@/app/redux/store";
import _ from "lodash";
import { triggerWelcomeNotifications } from "./WelcomeNotifications";
import {
  CORE_NOTIFICATIONS,
  MockNotification,
} from "@/shared/data/mockNotifications";

export default function NotificationDebugger() {
  const { addNotification, notifications, currentNotification } =
    useNotification();
  const { isDarkMode } = useTheme();
  const username = useSelector((state: RootState) => state.username.username);

  // Helper function to capitalize the username (same as in AccountPageProfile)
  const capitalizeFullName = (name: string) => {
    return name
      .split(" ")
      .map((word) => _.capitalize(word))
      .join(" ");
  };

  const testNotification = (notification: MockNotification) => {
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
  };

  // Function to trigger the welcome notifications sequence
  const handleTriggerWelcomeSequence = () => {
    // Use the exported function from WelcomeNotifications
    triggerWelcomeNotifications(
      addNotification,
      username ? capitalizeFullName(username) : undefined
    );
  };

  // Add a function to test just the personalized welcome notification
  const testPersonalizedWelcome = () => {
    if (!username) {
      // If no username, show a message about it
      addNotification({
        title: "No Username Found",
        message: "Please set up your profile to see personalized notifications",
        type: "info",
        duration: 5000,
        emoji: "👤",
        actionLabel: "OK",
        onAction: () => {
          console.log("No username notification acknowledged");
        },
      });
      return;
    }

    // Show personalized welcome
    addNotification({
      title: `Welcome back, ${capitalizeFullName(username)}!`,
      message: "We're glad to see you again. Ready to skip some lines today?",
      type: "info",
      duration: 5000,
      emoji: "✨",
      actionLabel: "View",
      onAction: () => {
        console.log("Personalized welcome action pressed");
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

  return (
    <View
      className={`p-4 rounded-lg mx-4 my-4 ${
        isDarkMode ? "bg-slate-800" : "bg-gray-100"
      }`}
    >
      <Text
        className={`text-lg font-bold mb-3 ${
          isDarkMode ? "text-white" : "text-black"
        }`}
      >
        Notification Debugger
      </Text>

      <View className="flex-row mb-4">
        <TouchableOpacity
          className="flex-1 mr-2 bg-blue-500 p-3 rounded-lg items-center"
          onPress={handleTriggerWelcomeSequence}
        >
          <Text className="text-white font-semibold text-sm">
            Show Welcome Sequence
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          className="flex-1 bg-blue-500 p-3 rounded-lg items-center"
          onPress={testPersonalizedWelcome}
        >
          <Text className="text-white font-semibold text-sm">
            Personalized Welcome
          </Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        className="bg-green-500 p-3 rounded-lg items-center mb-4"
        onPress={testAllNotifications}
      >
        <Text className="text-white font-semibold text-sm">
          Test All Notifications
        </Text>
      </TouchableOpacity>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        className="flex-row mb-4"
      >
        {CORE_NOTIFICATIONS.map((notification) => (
          <TouchableOpacity
            key={notification.id}
            className={`bg-blue-500/10 p-3 rounded-lg items-center mr-2 w-20`}
            onPress={() => testNotification(notification)}
          >
            <Text className="text-2xl mb-1">{notification.emoji}</Text>
            <Text
              className={`text-xs font-semibold ${
                isDarkMode ? "text-white" : "text-black"
              }`}
            >
              {notification.id}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <View className="mt-2">
        <Text
          className={`text-sm mb-1 ${isDarkMode ? "text-white" : "text-black"}`}
        >
          Current notification: {currentNotification ? "Yes" : "No"}
        </Text>
        <Text
          className={`text-sm mb-1 ${isDarkMode ? "text-white" : "text-black"}`}
        >
          Notifications count: {notifications.length}
        </Text>
        {username && (
          <Text
            className={`text-sm mb-1 ${
              isDarkMode ? "text-white" : "text-black"
            }`}
          >
            Current user: {capitalizeFullName(username)}
          </Text>
        )}
        <Text
          className={`text-sm mt-2 italic opacity-70 ${
            isDarkMode ? "text-white" : "text-black"
          }`}
        >
          Swipe notifications left or right to dismiss
        </Text>
      </View>
    </View>
  );
}

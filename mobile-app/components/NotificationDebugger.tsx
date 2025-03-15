import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { useNotification } from "@/ctx/NotificationContext";
import { useTheme } from "@/ctx/ThemeContext";
import { useSelector } from "react-redux";
import { RootState } from "@/app/redux/store";
import _ from "lodash";
import { triggerWelcomeNotifications } from "./WelcomeNotifications";

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

  const testNotifications = [
    {
      id: "coffee",
      title: "Today Only!",
      message: "Enjoy an exclusive deal on your favorite brew! Don't miss out!",
      emoji: "☕",
    },
    {
      id: "queue",
      title: "Almost Your Turn!",
      message: 'You\'re next in the queue "Starbucks Coffee"',
      emoji: "⏱️",
    },
    {
      id: "offer",
      title: "Limited Time Offer",
      message: "50% off your next coffee order. Tap to redeem now!",
      emoji: "🎁",
    },
    {
      id: "noWait",
      title: "No Wait Time!",
      message: 'Your favorite place "Cafe Nero" has no queue right now!',
      emoji: "🚶",
    },
  ];

  const testNotification = (notification: (typeof testNotifications)[0]) => {
    console.log(`Testing notification: ${notification.id}`);
    setTimeout(() => {
      addNotification({
        title: notification.title,
        message: notification.message,
        type: "info",
        duration: 5000,
        emoji: notification.emoji,
        actionLabel: "View",
        onAction: () => {
          console.log(`${notification.id} notification action pressed`);
        },
      });
    }, 100);
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

  return (
    <View
      style={[
        styles.container,
        isDarkMode ? styles.containerDark : styles.containerLight,
      ]}
    >
      <Text
        style={[styles.title, isDarkMode ? styles.textDark : styles.textLight]}
      >
        Notification Debugger
      </Text>

      <View style={styles.buttonRow}>
        <TouchableOpacity
          style={[styles.welcomeButton, { flex: 1, marginRight: 8 }]}
          onPress={handleTriggerWelcomeSequence}
        >
          <Text style={styles.welcomeButtonText}>Show Welcome Sequence</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.welcomeButton, { flex: 1 }]}
          onPress={testPersonalizedWelcome}
        >
          <Text style={styles.welcomeButtonText}>Personalized Welcome</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.buttonScroll}
      >
        {testNotifications.map((notification) => (
          <TouchableOpacity
            key={notification.id}
            style={styles.notificationButton}
            onPress={() => testNotification(notification)}
          >
            <Text style={styles.emoji}>{notification.emoji}</Text>
            <Text
              style={[
                styles.buttonLabel,
                isDarkMode ? styles.textDark : styles.textLight,
              ]}
            >
              {notification.id}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <View style={styles.infoContainer}>
        <Text
          style={[
            styles.infoText,
            isDarkMode ? styles.textDark : styles.textLight,
          ]}
        >
          Current notification: {currentNotification ? "Yes" : "No"}
        </Text>
        <Text
          style={[
            styles.infoText,
            isDarkMode ? styles.textDark : styles.textLight,
          ]}
        >
          Notifications count: {notifications.length}
        </Text>
        {username && (
          <Text
            style={[
              styles.infoText,
              isDarkMode ? styles.textDark : styles.textLight,
            ]}
          >
            Current user: {capitalizeFullName(username)}
          </Text>
        )}
        <Text
          style={[
            styles.infoText,
            isDarkMode ? styles.textDark : styles.textLight,
            styles.hint,
          ]}
        >
          Swipe notifications left or right to dismiss
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    borderRadius: 8,
    margin: 16,
  },
  containerLight: {
    backgroundColor: "#f0f0f0",
  },
  containerDark: {
    backgroundColor: "#1E2732",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 12,
  },
  textLight: {
    color: "#000000",
  },
  textDark: {
    color: "#FFFFFF",
  },
  buttonRow: {
    flexDirection: "row",
    marginBottom: 16,
  },
  welcomeButton: {
    backgroundColor: "#007AFF",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  welcomeButtonText: {
    color: "white",
    fontWeight: "600",
    fontSize: 14,
  },
  buttonScroll: {
    flexDirection: "row",
    marginBottom: 16,
  },
  notificationButton: {
    backgroundColor: "rgba(0, 122, 255, 0.1)",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginRight: 8,
    width: 80,
  },
  emoji: {
    fontSize: 24,
    marginBottom: 4,
  },
  buttonLabel: {
    fontSize: 12,
    fontWeight: "600",
  },
  infoContainer: {
    marginTop: 8,
  },
  infoText: {
    fontSize: 14,
    marginBottom: 4,
  },
  hint: {
    fontStyle: "italic",
    marginTop: 8,
    opacity: 0.7,
  },
});

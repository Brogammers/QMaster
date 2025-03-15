import React, { useEffect, useState } from "react";
import { useNotification } from "@/ctx/NotificationContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useSelector } from "react-redux";
import { RootState } from "@/app/redux/store";
import _ from "lodash";
import { InteractionManager } from "react-native";

// Storage key for tracking if welcome notifications have been shown
const WELCOME_NOTIFICATIONS_SHOWN_KEY = "welcome_notifications_shown";

/**
 * Component that shows a sequence of welcome notifications when the app starts.
 * This component doesn't render anything visible.
 */
export default function WelcomeNotifications() {
  const { addNotification } = useNotification();
  const [hasShownNotifications, setHasShownNotifications] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const username = useSelector((state: RootState) => state.username.username);

  // Helper function to capitalize the username (same as in AccountPageProfile)
  const capitalizeFullName = (name: string) => {
    return name
      .split(" ")
      .map((word) => _.capitalize(word))
      .join(" ");
  };

  // Function to show the welcome notifications sequence
  const showWelcomeNotifications = () => {
    // Welcome notification sequence
    const notifications = [
      {
        title: "Welcome to QMaster!",
        message: "Skip the line and manage your queues with ease",
        type: "info" as const,
        duration: 4000,
        emoji: "👋",
      },
      // Add personalized welcome back notification if username exists
      ...(username
        ? [
            {
              title: `Welcome back, ${capitalizeFullName(username)}!`,
              message:
                "We're glad to see you again. Ready to skip some lines today?",
              type: "info" as const,
              duration: 4000,
              emoji: "✨",
            },
          ]
        : []),
      {
        title: "Today Only!",
        message:
          "Enjoy an exclusive deal on your favorite brew! Don't miss out!",
        type: "info" as const,
        duration: 4000,
        emoji: "☕",
      },
      {
        title: "Almost Your Turn!",
        message: 'You\'re next in the queue "Starbucks Coffee"',
        type: "success" as const,
        duration: 4000,
        emoji: "⏱️",
      },
      {
        title: "Limited Time Offer",
        message: "50% off your next coffee order. Tap to redeem now!",
        type: "warning" as const,
        duration: 4000,
        emoji: "🎁",
      },
      {
        title: "No Wait Time!",
        message: 'Your favorite place "Cafe Nero" has no queue right now!',
        type: "info" as const,
        duration: 4000,
        emoji: "🚶",
      },
    ];

    // Add notifications with a small delay between each to prevent overwhelming the system
    InteractionManager.runAfterInteractions(() => {
      notifications.forEach((notification, index) => {
        setTimeout(() => {
          addNotification({
            ...notification,
            actionLabel: "View",
            onAction: () => {
              console.log(`${notification.title} action pressed`);
            },
          });
        }, index * 50); // Small staggered delay to prevent UI thread blocking
      });
    });

    // Mark notifications as shown
    setHasShownNotifications(true);

    // Save to AsyncStorage that notifications have been shown
    AsyncStorage.setItem(WELCOME_NOTIFICATIONS_SHOWN_KEY, "true").catch(
      (error) => console.error("Error saving notification state:", error)
    );
  };

  // Check if notifications have been shown before
  useEffect(() => {
    const checkNotificationsShown = async () => {
      try {
        const value = await AsyncStorage.getItem(
          WELCOME_NOTIFICATIONS_SHOWN_KEY
        );
        if (value !== "true") {
          // Notifications haven't been shown yet
          showWelcomeNotifications();
        } else {
          setHasShownNotifications(true);
        }
      } catch (error) {
        console.error("Error checking if notifications were shown:", error);
        // If there's an error reading from storage, show notifications anyway
        showWelcomeNotifications();
      } finally {
        setIsLoading(false);
      }
    };

    checkNotificationsShown();
  }, []);

  // This component doesn't render anything visible
  return null;
}

// Export the function to allow manual triggering from other components
export function triggerWelcomeNotifications(
  addNotification: any,
  username?: string
) {
  // Welcome notification sequence
  const notifications = [
    {
      title: "Welcome to QMaster!",
      message: "Skip the line and manage your queues with ease",
      type: "info" as const,
      duration: 4000,
      emoji: "👋",
    },
    // Add personalized welcome back notification if username exists
    ...(username
      ? [
          {
            title: `Welcome back, ${username}!`,
            message:
              "We're glad to see you again. Ready to skip some lines today?",
            type: "info" as const,
            duration: 4000,
            emoji: "✨",
          },
        ]
      : []),
    {
      title: "Today Only!",
      message: "Enjoy an exclusive deal on your favorite brew! Don't miss out!",
      type: "info" as const,
      duration: 4000,
      emoji: "☕",
    },
    {
      title: "Almost Your Turn!",
      message: 'You\'re next in the queue "Starbucks Coffee"',
      type: "success" as const,
      duration: 4000,
      emoji: "⏱️",
    },
    {
      title: "Limited Time Offer",
      message: "50% off your next coffee order. Tap to redeem now!",
      type: "warning" as const,
      duration: 4000,
      emoji: "🎁",
    },
    {
      title: "No Wait Time!",
      message: 'Your favorite place "Cafe Nero" has no queue right now!',
      type: "info" as const,
      duration: 4000,
      emoji: "🚶",
    },
  ];

  // Add notifications with a small delay between each to prevent overwhelming the system
  InteractionManager.runAfterInteractions(() => {
    notifications.forEach((notification, index) => {
      setTimeout(() => {
        addNotification({
          ...notification,
          actionLabel: "View",
          onAction: () => {
            console.log(`${notification.title} action pressed`);
          },
        });
      }, index * 50); // Small staggered delay to prevent UI thread blocking
    });
  });
}

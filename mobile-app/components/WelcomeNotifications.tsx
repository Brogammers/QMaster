import React, { useEffect, useState } from "react";
import { useNotification } from "@/ctx/NotificationContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

/**
 * Component that shows a sequence of welcome notifications when the app starts.
 * This component doesn't render anything visible.
 */
export default function WelcomeNotifications() {
  const { addNotification } = useNotification();
  const [hasShownNotifications, setHasShownNotifications] = useState(false);

  useEffect(() => {
    // Check if notifications have already been shown in this session
    if (hasShownNotifications) {
      return;
    }

    // Mark notifications as shown for this session
    setHasShownNotifications(true);

    // Welcome notification sequence
    const notifications = [
      {
        title: "Welcome to QMaster!",
        message: "Skip the line and manage your queues with ease",
        type: "info" as const,
        duration: 4000,
        emoji: "👋",
      },
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

    // Show notifications with a delay between them
    notifications.forEach((notification, index) => {
      setTimeout(() => {
        console.log(`Triggering notification ${index + 1}`);
        addNotification({
          ...notification,
          actionLabel: "View",
          onAction: () => {
            console.log(`${notification.title} action pressed`);
          },
        });
      }, 2000 + index * 5000); // Start after 2 seconds, then 5 seconds between each
    });
  }, [hasShownNotifications, addNotification]);

  // This component doesn't render anything visible
  return null;
}

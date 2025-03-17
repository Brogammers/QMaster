import { NotificationType } from "@/ctx/NotificationContext";

// Interface for mock notifications
export interface MockNotification {
  id: string;
  title: string;
  message: string;
  emoji: string;
  type: NotificationType;
  duration: number;
  timestamp?: string;
}

// Core notifications that are used across the app
export const CORE_NOTIFICATIONS: MockNotification[] = [
  {
    id: "coffee",
    title: "Today Only!",
    message: "Enjoy an exclusive deal on your favorite brew! Don't miss out!",
    emoji: "☕",
    type: "info" as NotificationType,
    duration: 4000,
    timestamp: "now",
  },
  {
    id: "queue",
    title: "Almost Your Turn!",
    message: 'You\'re next in the queue "Starbucks Coffee"',
    emoji: "⏱️",
    type: "success" as NotificationType,
    duration: 4000,
    timestamp: "5m ago",
  },
  {
    id: "offer",
    title: "Limited Time Offer",
    message: "50% off your next coffee order. Tap to redeem now!",
    emoji: "🎁",
    type: "warning" as NotificationType,
    duration: 4000,
    timestamp: "15m ago",
  },
  {
    id: "noWait",
    title: "No Wait Time!",
    message: 'Your favorite place "Cafe Nero" has no queue right now!',
    emoji: "🚶",
    type: "info" as NotificationType,
    duration: 4000,
    timestamp: "30m ago",
  },
];

// Welcome notifications sequence
export const getWelcomeNotifications = (username?: string): MockNotification[] => [
  {
    id: "welcome",
    title: "Welcome to QMaster!",
    message: "Skip the line and manage your queues with ease",
    emoji: "👋",
    type: "info" as NotificationType,
    duration: 4000,
  },
  // Add personalized welcome back notification if username exists
  ...(username
    ? [
      {
        id: "welcome-back",
        title: `Welcome back, ${username}!`,
        message: "We're glad to see you again. Ready to skip some lines today?",
        emoji: "✨",
        type: "info" as NotificationType,
        duration: 4000,
      },
    ]
    : []),
  // Add the core notifications to the welcome sequence
  ...CORE_NOTIFICATIONS,
];

// Helper function to get all notifications with timestamps
export const getNotificationsWithTimestamps = (): MockNotification[] => {
  return CORE_NOTIFICATIONS;
}; 
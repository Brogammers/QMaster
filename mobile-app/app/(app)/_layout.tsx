import React, { useState, useEffect } from "react";
import { Stack, Redirect } from "expo-router";
import { SessionProvider, useSession } from "@/ctx/AuthContext";
import SplashScreen from "../SplashScreen";
import { CartProvider } from "@/ctx/CartContext";
import { SiaProvider } from "@/ctx/SiaContext";
import { Queue, QueuesContext } from "@/components/JoinQueue";
import {
  NotificationProvider,
  useNotification,
} from "@/ctx/NotificationContext";
import QueueNotificationMonitor from "@/components/QueueNotificationMonitor";
import MockQueueData from "@/components/MockQueueData";
import { View, Text, TouchableOpacity } from "react-native";

// Simple test component to trigger notifications
const NotificationTester = () => {
  const { addNotification } = useNotification();

  useEffect(() => {
    // Test notification on mount
    console.log("NotificationTester mounted");

    // Wait a bit before showing the notification
    const timer = setTimeout(() => {
      console.log("Triggering test notification");
      addNotification({
        title: "Welcome Back!",
        message: "This is a test notification that appears on app start",
        type: "info",
        duration: 5000,
        emoji: "👋",
      });
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return null;
};

export default function AppEntry() {
  const { session, isLoading } = useSession();
  const [queues, setQueues] = useState<Queue[]>([]);
  const [selectedQueue, setSelectedQueue] = useState<Queue | null>(null);

  if (isLoading) {
    return <SplashScreen />;
  }

  if (!session) {
    return <Redirect href="/(auth)/Onboarding" />;
  }

  return (
    <SiaProvider>
      <CartProvider>
        <NotificationProvider>
          <QueuesContext.Provider
            value={{
              queues,
              selectedQueue,
              setQueues,
              setSelectedQueue,
            }}
          >
            <NotificationTester />
            <QueueNotificationMonitor />
            <MockQueueData />
            <Stack>
              <Stack.Screen
                name="(tabs)"
                options={{
                  headerShown: false,
                  presentation: "fullScreenModal",
                }}
              />
            </Stack>
          </QueuesContext.Provider>
        </NotificationProvider>
      </CartProvider>
    </SiaProvider>
  );
}

import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useNotification } from "@/ctx/NotificationContext";

export default function NotificationDebugger() {
  const { addNotification, notifications, currentNotification } =
    useNotification();

  const testSimpleNotification = () => {
    console.log("Testing simple notification");
    addNotification({
      title: "Debug Notification",
      message: "This is a test notification to debug the system",
      type: "info",
      duration: 5000,
      emoji: "🐞",
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Notification Debugger</Text>

      <TouchableOpacity style={styles.button} onPress={testSimpleNotification}>
        <Text style={styles.buttonText}>Test Simple Notification</Text>
      </TouchableOpacity>

      <View style={styles.infoContainer}>
        <Text style={styles.infoText}>
          Current notification: {currentNotification ? "Yes" : "No"}
        </Text>
        <Text style={styles.infoText}>
          Notifications count: {notifications.length}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#f0f0f0",
    borderRadius: 8,
    margin: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 12,
  },
  button: {
    backgroundColor: "#007AFF",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 12,
  },
  buttonText: {
    color: "white",
    fontWeight: "600",
  },
  infoContainer: {
    marginTop: 8,
  },
  infoText: {
    fontSize: 14,
    marginBottom: 4,
  },
});

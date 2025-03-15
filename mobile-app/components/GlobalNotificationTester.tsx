import React, { useState } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  Modal,
  Pressable,
  ScrollView,
  InteractionManager,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useNotification } from "@/ctx/NotificationContext";
import { useTheme } from "@/ctx/ThemeContext";
import { triggerWelcomeNotifications } from "./WelcomeNotifications";

/**
 * A floating button that can be added to any screen to test notifications
 * This is for development purposes only and should be removed in production
 */
export default function GlobalNotificationTester() {
  const [modalVisible, setModalVisible] = useState(false);
  const { addNotification } = useNotification();
  const { isDarkMode } = useTheme();

  // Test notifications
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

  // Function to test a single notification
  const testNotification = (notification: (typeof testNotifications)[0]) => {
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
  };

  // Function to test all notifications in sequence
  const testAllNotifications = () => {
    // Add notifications with a small delay between each to prevent overwhelming the system
    InteractionManager.runAfterInteractions(() => {
      testNotifications.forEach((notification, index) => {
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
        }, index * 50); // Small staggered delay to prevent UI thread blocking
      });
    });

    setModalVisible(false);
  };

  // Function to trigger welcome sequence
  const showWelcomeSequence = () => {
    triggerWelcomeNotifications(addNotification);
    setModalVisible(false);
  };

  if (__DEV__) {
    return (
      <>
        <TouchableOpacity
          style={[
            styles.floatingButton,
            isDarkMode ? styles.floatingButtonDark : styles.floatingButtonLight,
          ]}
          onPress={() => setModalVisible(true)}
        >
          <MaterialIcons
            name="notifications"
            size={24}
            color={isDarkMode ? "#1DCDFE" : "#0077B6"}
          />
        </TouchableOpacity>

        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <Pressable
            style={styles.modalOverlay}
            onPress={() => setModalVisible(false)}
          >
            <View
              style={[
                styles.modalContent,
                isDarkMode ? styles.modalContentDark : styles.modalContentLight,
              ]}
              onStartShouldSetResponder={() => true}
              onTouchEnd={(e) => e.stopPropagation()}
            >
              <View style={styles.modalHeader}>
                <Text
                  style={[
                    styles.modalTitle,
                    isDarkMode ? styles.textDark : styles.textLight,
                  ]}
                >
                  Test Notifications
                </Text>
                <TouchableOpacity onPress={() => setModalVisible(false)}>
                  <MaterialIcons
                    name="close"
                    size={24}
                    color={isDarkMode ? "#FFF" : "#000"}
                  />
                </TouchableOpacity>
              </View>

              <ScrollView style={styles.notificationList}>
                <TouchableOpacity
                  style={[
                    styles.sequenceButton,
                    { backgroundColor: "#007AFF" },
                  ]}
                  onPress={showWelcomeSequence}
                >
                  <Text style={styles.sequenceButtonText}>
                    Welcome Sequence
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[
                    styles.sequenceButton,
                    { backgroundColor: "#34C759" },
                  ]}
                  onPress={testAllNotifications}
                >
                  <Text style={styles.sequenceButtonText}>
                    All Notifications
                  </Text>
                </TouchableOpacity>

                <Text
                  style={[
                    styles.sectionTitle,
                    isDarkMode ? styles.textDark : styles.textLight,
                  ]}
                >
                  Individual Notifications
                </Text>

                {testNotifications.map((notification) => (
                  <TouchableOpacity
                    key={notification.id}
                    style={[
                      styles.notificationItem,
                      isDarkMode
                        ? styles.notificationItemDark
                        : styles.notificationItemLight,
                    ]}
                    onPress={() => {
                      testNotification(notification);
                      setModalVisible(false);
                    }}
                  >
                    <Text style={styles.emoji}>{notification.emoji}</Text>
                    <View style={styles.notificationText}>
                      <Text
                        style={[
                          styles.notificationTitle,
                          isDarkMode ? styles.textDark : styles.textLight,
                        ]}
                      >
                        {notification.title}
                      </Text>
                      <Text
                        style={[
                          styles.notificationMessage,
                          isDarkMode
                            ? styles.textDarkSecondary
                            : styles.textLightSecondary,
                        ]}
                        numberOfLines={2}
                      >
                        {notification.message}
                      </Text>
                    </View>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          </Pressable>
        </Modal>
      </>
    );
  }

  // Return null in production
  return null;
}

const styles = StyleSheet.create({
  floatingButton: {
    position: "absolute",
    bottom: 20,
    right: 20,
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
    zIndex: 999,
  },
  floatingButtonLight: {
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  floatingButtonDark: {
    backgroundColor: "rgba(30, 39, 50, 0.9)",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 4,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end",
  },
  modalContent: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    maxHeight: "70%",
  },
  modalContentLight: {
    backgroundColor: "#FFFFFF",
  },
  modalContentDark: {
    backgroundColor: "#1E2732",
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  textLight: {
    color: "#000000",
  },
  textDark: {
    color: "#FFFFFF",
  },
  textLightSecondary: {
    color: "#666666",
  },
  textDarkSecondary: {
    color: "#AAAAAA",
  },
  notificationList: {
    marginBottom: 20,
  },
  sequenceButton: {
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 10,
  },
  sequenceButtonText: {
    color: "#FFFFFF",
    fontWeight: "600",
    fontSize: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginTop: 10,
    marginBottom: 10,
  },
  notificationItem: {
    flexDirection: "row",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    alignItems: "center",
  },
  notificationItemLight: {
    backgroundColor: "#F5F5F5",
  },
  notificationItemDark: {
    backgroundColor: "#2A3441",
  },
  emoji: {
    fontSize: 24,
    marginRight: 15,
  },
  notificationText: {
    flex: 1,
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
  },
  notificationMessage: {
    fontSize: 14,
  },
});

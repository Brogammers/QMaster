import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  useRef,
  useCallback,
  useMemo,
} from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Platform,
  Dimensions,
  PanResponder,
  InteractionManager,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useTheme } from "./ThemeContext";
import { useSelector } from "react-redux";
import { RootState } from "@/app/redux/store";

// Define notification types
export type NotificationType = "info" | "success" | "warning" | "error";

// Define notification interface
export interface InAppNotification {
  id: string;
  title: string;
  message: string;
  type: NotificationType;
  duration?: number; // Duration in milliseconds
  timestamp: number;
  read: boolean;
  actionLabel?: string;
  onAction?: () => void;
  emoji?: string; // Add emoji support
}

// Define context interface
interface NotificationContextType {
  notifications: InAppNotification[];
  addNotification: (
    notification: Omit<InAppNotification, "id" | "timestamp" | "read">
  ) => void;
  removeNotification: (id: string) => void;
  markAsRead: (id: string) => void;
  clearAllNotifications: () => void;
  currentNotification: InAppNotification | null;
}

// Create context
const NotificationContext = createContext<NotificationContextType | undefined>(
  undefined
);

const { width } = Dimensions.get("window");

// Create provider component
export const NotificationProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [notifications, setNotifications] = useState<InAppNotification[]>([]);
  const [currentNotification, setCurrentNotification] =
    useState<InAppNotification | null>(null);
  const [opacity] = useState(new Animated.Value(0));
  const [translateY] = useState(new Animated.Value(-50));
  const [translateX] = useState(new Animated.Value(0)); // For horizontal swipe
  const { isDarkMode } = useTheme();
  const queueState = useSelector((state: RootState) => state.queue);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const notificationQueueRef = useRef<InAppNotification[]>([]);
  const isAnimatingRef = useRef(false);
  const isProcessingRef = useRef(false);

  // Create pan responder for swipe to dismiss
  const panResponder = useMemo(
    () =>
      PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onPanResponderMove: (_, gestureState) => {
          // Only allow horizontal movement
          translateX.setValue(gestureState.dx);
        },
        onPanResponderRelease: (_, gestureState) => {
          // If swiped far enough, dismiss the notification
          if (Math.abs(gestureState.dx) > 100) {
            // Animate off screen
            Animated.timing(translateX, {
              toValue: gestureState.dx > 0 ? width : -width,
              duration: 200,
              useNativeDriver: true,
            }).start(() => {
              if (currentNotification) {
                markAsRead(currentNotification.id);
                removeNotification(currentNotification.id);
              }
            });
          } else {
            // Spring back to center
            Animated.spring(translateX, {
              toValue: 0,
              friction: 5,
              useNativeDriver: true,
            }).start();
          }
        },
      }),
    [currentNotification, translateX, width]
  );

  // Process the next notification in queue
  const processNextNotification = useCallback(() => {
    if (isProcessingRef.current) return;

    if (notificationQueueRef.current.length > 0 && !isAnimatingRef.current) {
      isProcessingRef.current = true;

      // Use InteractionManager to ensure UI thread is not blocked
      InteractionManager.runAfterInteractions(() => {
        const nextNotification = notificationQueueRef.current.shift();
        console.log("Processing next notification:", nextNotification?.title);

        // Small delay to ensure animations don't conflict
        setTimeout(() => {
          setCurrentNotification(nextNotification || null);
          isProcessingRef.current = false;
        }, 300);
      });
    }
  }, []);

  // Add notification
  const addNotification = useCallback(
    (notification: Omit<InAppNotification, "id" | "timestamp" | "read">) => {
      console.log("addNotification called with:", notification);

      const newNotification: InAppNotification = {
        ...notification,
        id: Math.random().toString(36).substring(2, 9),
        timestamp: Date.now(),
        read: false,
        duration: notification.duration || 5000, // Default 5 seconds
      };

      console.log("Created new notification:", newNotification);

      // Update notifications list
      setNotifications((prev) => [newNotification, ...prev]);

      // Add to queue if there's already a notification showing
      if (currentNotification || isAnimatingRef.current) {
        console.log("Current notification exists, adding to queue");
        notificationQueueRef.current = [
          ...notificationQueueRef.current,
          newNotification,
        ];
        console.log("Queue length:", notificationQueueRef.current.length);
      } else {
        console.log("No current notification, setting as current");
        setCurrentNotification(newNotification);
      }
    },
    [currentNotification]
  );

  // Remove notification
  const removeNotification = useCallback(
    (id: string) => {
      setNotifications((prev) =>
        prev.filter((notification) => notification.id !== id)
      );

      // If the current notification is being removed, set it to null
      if (currentNotification?.id === id) {
        // Mark that we're animating
        isAnimatingRef.current = true;

        // Clear any existing timeout
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
          timeoutRef.current = null;
        }

        // Hide animation
        Animated.parallel([
          Animated.timing(opacity, {
            toValue: 0,
            duration: 200,
            useNativeDriver: true,
          }),
          Animated.timing(translateY, {
            toValue: -50,
            duration: 200,
            useNativeDriver: true,
          }),
        ]).start(() => {
          setCurrentNotification(null);

          // Use InteractionManager to ensure UI thread is not blocked
          InteractionManager.runAfterInteractions(() => {
            isAnimatingRef.current = false;

            // Process next notification after animation completes
            processNextNotification();
          });
        });
      }
    },
    [currentNotification, opacity, translateY, processNextNotification]
  );

  // Mark notification as read
  const markAsRead = useCallback((id: string) => {
    setNotifications((prev) =>
      prev.map((notification) =>
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  }, []);

  // Clear all notifications
  const clearAllNotifications = useCallback(() => {
    setNotifications([]);
    setCurrentNotification(null);
    notificationQueueRef.current = [];
    isAnimatingRef.current = false;
    isProcessingRef.current = false;

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }, []);

  // Effect to monitor queue position changes and create notifications
  useEffect(() => {
    const activeQueue = queueState.activeQueue;

    if (activeQueue && activeQueue.position <= 3 && activeQueue.position > 0) {
      addNotification({
        title: "Almost Your Turn!",
        message: `You're ${
          activeQueue.position === 1
            ? "next"
            : `${activeQueue.position} positions away`
        } in the queue "${activeQueue.name}"`,
        type: "info",
        duration: 10000,
        actionLabel: "View",
        onAction: () => {
          // Navigate to queue view
          // This will be implemented when we have navigation available
        },
      });
    }
  }, [queueState.activeQueue?.position, addNotification]);

  // Effect to handle notification display and animation
  useEffect(() => {
    console.log(
      "Notification display effect triggered, currentNotification:",
      currentNotification
    );

    if (currentNotification) {
      console.log("Showing notification:", currentNotification.title);

      // Reset position and translation
      translateY.setValue(-50);
      translateX.setValue(0);

      // Mark that we're animating
      isAnimatingRef.current = true;

      // Fade in and slide down - use InteractionManager to ensure smooth animation
      InteractionManager.runAfterInteractions(() => {
        console.log("Starting animation");
        Animated.parallel([
          Animated.timing(opacity, {
            toValue: 1,
            duration: 300,
            useNativeDriver: true,
          }),
          Animated.timing(translateY, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true,
          }),
        ]).start(() => {
          console.log("Animation completed");
          isAnimatingRef.current = false;
        });
      });

      // Set timeout to fade out
      if (timeoutRef.current) {
        console.log("Clearing existing timeout");
        clearTimeout(timeoutRef.current);
      }

      const duration = currentNotification.duration || 5000;
      console.log("Setting timeout for", duration, "ms");

      timeoutRef.current = setTimeout(() => {
        console.log("Timeout triggered, fading out notification");

        // Mark that we're animating
        isAnimatingRef.current = true;

        // Fade out and slide up
        Animated.parallel([
          Animated.timing(opacity, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true,
          }),
          Animated.timing(translateY, {
            toValue: -50,
            duration: 300,
            useNativeDriver: true,
          }),
        ]).start(() => {
          console.log("Fade out animation completed");
          markAsRead(currentNotification.id);

          // Use InteractionManager to ensure UI thread is not blocked
          InteractionManager.runAfterInteractions(() => {
            setCurrentNotification(null);
            isAnimatingRef.current = false;

            // Process next notification after animation completes
            processNextNotification();
          });
        });

        timeoutRef.current = null;
      }, duration);

      return () => {
        if (timeoutRef.current) {
          console.log("Cleanup: clearing timeout");
          clearTimeout(timeoutRef.current);
          timeoutRef.current = null;
        }
      };
    } else {
      console.log("No current notification to display");
    }
  }, [
    currentNotification,
    opacity,
    translateY,
    markAsRead,
    processNextNotification,
  ]);

  // Notification Toast component - memoize to prevent unnecessary re-renders
  const NotificationToast = useMemo(() => {
    console.log(
      "NotificationToast render called, currentNotification:",
      currentNotification
    );

    if (!currentNotification) return null;

    const getIcon = () => {
      switch (currentNotification.type) {
        case "success":
          return "check-circle";
        case "warning":
          return "warning";
        case "error":
          return "error";
        default:
          return "info";
      }
    };

    const getIconColor = () => {
      switch (currentNotification.type) {
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

    const handlePress = () => {
      if (currentNotification.onAction && currentNotification.actionLabel) {
        currentNotification.onAction();
      }
      markAsRead(currentNotification.id);
      removeNotification(currentNotification.id);
    };

    return (
      <Animated.View
        {...panResponder.panHandlers}
        style={[
          styles.toastContainer,
          {
            opacity: opacity, // Use the animated value for proper animations
            transform: [{ translateX: translateX }, { translateY: translateY }],
          },
        ]}
      >
        <View style={styles.swipeIndicator}>
          <View style={styles.swipeIndicatorBar} />
        </View>
        <View style={styles.toastContent}>
          <View style={styles.iconContainer}>
            {currentNotification.emoji ? (
              <Text style={styles.emoji}>{currentNotification.emoji}</Text>
            ) : (
              <MaterialIcons
                name={getIcon()}
                size={20}
                color={getIconColor()}
              />
            )}
          </View>
          <View style={styles.textContainer}>
            <View style={styles.titleRow}>
              <Text style={styles.title}>{currentNotification.title}</Text>
              <Text style={styles.timeText}>now</Text>
            </View>
            <Text style={styles.message}>{currentNotification.message}</Text>
          </View>
        </View>

        {currentNotification.actionLabel && (
          <TouchableOpacity style={styles.actionButton} onPress={handlePress}>
            <Text style={styles.actionText}>
              {currentNotification.actionLabel}
            </Text>
          </TouchableOpacity>
        )}
      </Animated.View>
    );
  }, [currentNotification, opacity, translateY, translateX, panResponder]);

  // Memoize the context value to prevent unnecessary re-renders
  const contextValue = useMemo(
    () => ({
      notifications,
      addNotification,
      removeNotification,
      markAsRead,
      clearAllNotifications,
      currentNotification,
    }),
    [
      notifications,
      addNotification,
      removeNotification,
      markAsRead,
      clearAllNotifications,
      currentNotification,
    ]
  );

  return (
    <NotificationContext.Provider value={contextValue}>
      {children}
      {NotificationToast}
    </NotificationContext.Provider>
  );
};

// Create hook for using the context
export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error(
      "useNotification must be used within a NotificationProvider"
    );
  }
  return context;
};

// Styles
const styles = StyleSheet.create({
  toastContainer: {
    position: "absolute",
    top: Platform.OS === "ios" ? 70 : 40,
    left: 16,
    right: 16,
    maxWidth: 500,
    alignSelf: "center",
    width: width - 32,
    borderRadius: 14,
    padding: 12,
    backgroundColor: "rgba(250, 250, 250, 0.95)",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    zIndex: 9999,
    ...Platform.select({
      ios: {
        // iOS-specific styling
        backgroundColor: "rgba(250, 250, 250, 0.95)",
      },
      android: {
        // Android-specific styling
        backgroundColor: "rgba(250, 250, 250, 0.98)",
      },
    }),
  },
  toastContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconContainer: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 16,
    backgroundColor: "rgba(0, 0, 0, 0.05)",
    borderRadius: 20,
  },
  textContainer: {
    flex: 1,
  },
  titleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 2,
  },
  title: {
    color: "#000",
    fontWeight: "600",
    fontSize: 15,
  },
  timeText: {
    fontSize: 12,
    color: "#8E8E93",
    marginLeft: 4,
  },
  message: {
    color: "#666",
    fontSize: 14,
  },
  actionButton: {
    marginTop: 8,
    alignSelf: "flex-end",
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  actionText: {
    color: "#007AFF",
    fontWeight: "600",
    fontSize: 14,
  },
  emoji: {
    fontSize: 24,
  },
  swipeIndicator: {
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 6,
    paddingBottom: 2,
  },
  swipeIndicatorBar: {
    width: 36,
    height: 4,
    borderRadius: 2,
    backgroundColor: "rgba(0, 0, 0, 0.2)",
  },
});

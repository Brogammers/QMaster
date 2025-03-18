import React, { useEffect, useState, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  useWindowDimensions,
  ActivityIndicator,
  TouchableOpacity,
  StatusBar,
  SafeAreaView,
  Platform,
} from "react-native";
import { useIsFocused } from "@react-navigation/native";
import HistoryComponent from "@/shared/components/HistoryComponent";
import { HistoryComponentProps } from "@/types";
import CarrefourLogo from "@/assets/images/CarrefourLogo.png";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios, { AxiosError } from "axios";
import { Skeleton } from "moti/skeleton";
import i18n from "@/i18n";
import { useTheme } from "@/ctx/ThemeContext";
import { LinearGradient } from "expo-linear-gradient";
import configConverter from "@/api/configConverter";
import RefreshableWrapper from "@/components/RefreshableWrapper";
import { useSelector } from "react-redux";
import { RootState } from "@/app/redux/store";
import { MotiView } from "moti";
import BackButton from "@/shared/components/BackButton";
import { Ionicons } from "@expo/vector-icons";

// Add response status enum for better type safety and readability
enum ResponseStatus {
  LOADING = "loading",
  SUCCESS = "success",
  NETWORK_ERROR = "network_error",
  NO_DATA = "no_data",
  UNAUTHORIZED = "unauthorized",
}

// Interface for notification item
interface NotificationItem {
  id: string;
  title: string;
  message: string;
  emoji: string;
  timestamp: string;
  onPress?: () => void;
}

export default function Notifications() {
  const isFocused = useIsFocused();
  const [notifications, setNotifications] = useState<HistoryComponentProps[]>(
    []
  );
  const [isLoading, setIsLoading] = useState(true);
  const windowWidth = useWindowDimensions().width;
  const { isDarkMode } = useTheme();
  const [initialLoading, setInitialLoading] = useState(true);
  const [itemsCount, setItemsCount] = useState<number | null>(null);
  const [responseStatus, setResponseStatus] = useState<ResponseStatus>(
    ResponseStatus.LOADING
  );
  const userId = useSelector((state: RootState) => state.userId.userId);

  const fetchNotifications = useCallback(async () => {
    try {
      setResponseStatus(ResponseStatus.LOADING);
      const token = await AsyncStorage.getItem("token");

      if (!token) {
        setResponseStatus(ResponseStatus.UNAUTHORIZED);
        setInitialLoading(false);
        setIsLoading(false);
        return;
      }

      const response = await axios.get(
        `${configConverter(
          "EXPO_PUBLIC_API_BASE_URL_NOTIFICATIONS"
        )}?id=${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        const data = response.data.notifications;
        let historyEnqueue = data.enqueuings.content;
        let historyDequeue = data.dequeuings.content;

        historyDequeue.forEach(
          (item: { isHistory: boolean; status: string; date: string }) => {
            item.isHistory = true;
            item.status = "Dequeued";
            item.date = "Today";
          }
        );
        historyEnqueue.forEach(
          (item: { isHistory: boolean; status: string; date: string }) => {
            item.isHistory = true;
            item.status = "Enqueued";
            item.date = "Today";
          }
        );

        let combinedHistory = [...historyEnqueue, ...historyDequeue];

        if (combinedHistory.length === 0) {
          setResponseStatus(ResponseStatus.NO_DATA);
        } else {
          setResponseStatus(ResponseStatus.SUCCESS);
          setNotifications(combinedHistory);
          setItemsCount(combinedHistory.length);
        }

        setInitialLoading(false);
        setIsLoading(false);

        await AsyncStorage.setItem(
          "notificationsData",
          JSON.stringify(combinedHistory)
        );
      } else if (response.status === 204) {
        // No content response
        setResponseStatus(ResponseStatus.NO_DATA);
        setInitialLoading(false);
        setIsLoading(false);
      } else if (response.status === 401) {
        // Unauthorized response
        setResponseStatus(ResponseStatus.UNAUTHORIZED);
        setInitialLoading(false);
        setIsLoading(false);
      }
    } catch (error) {
      console.error("Notifications fetch error:", error);

      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError;

        if (axiosError.response) {
          // Server responded with an error status
          if (axiosError.response.status === 401) {
            setResponseStatus(ResponseStatus.UNAUTHORIZED);
          } else if (axiosError.response.status === 204) {
            setResponseStatus(ResponseStatus.NO_DATA);
          } else {
            setResponseStatus(ResponseStatus.NETWORK_ERROR);
          }
        } else if (axiosError.request) {
          // Request was made but no response received (network error)
          setResponseStatus(ResponseStatus.NETWORK_ERROR);
        } else {
          // Error setting up the request
          setResponseStatus(ResponseStatus.NETWORK_ERROR);
        }
      } else {
        // Non-Axios error
        setResponseStatus(ResponseStatus.NETWORK_ERROR);
      }

      setInitialLoading(false);
      setIsLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let notificationsData = await AsyncStorage.getItem("notificationsData");
        if (notificationsData) {
          const parsedData = JSON.parse(notificationsData);

          if (parsedData && parsedData.length > 0) {
            setNotifications(parsedData);
            setItemsCount(parsedData.length);
            setResponseStatus(ResponseStatus.SUCCESS);
            setInitialLoading(false);
            setIsLoading(false);
          } else {
            await fetchNotifications();
          }
        } else {
          await fetchNotifications();
        }
      } catch (error) {
        console.error("Error loading cached notifications:", error);
        setResponseStatus(ResponseStatus.NETWORK_ERROR);
        setInitialLoading(false);
        setIsLoading(false);
      }
    };

    const fetchDataTimeout = setTimeout(() => {
      setIsLoading(false);
    }, 5000);

    fetchData();

    return () => clearTimeout(fetchDataTimeout);
  }, [isFocused, fetchNotifications]);

  // Notifications need more frequent updates as they're more time-sensitive
  const refreshInterval = 120000; // 2 minutes

  // Notification Card Component
  const NotificationCard = ({
    title,
    message,
    timestamp,
    emoji,
    onPress,
  }: NotificationItem) => {
    return (
      <MotiView
        from={{ opacity: 0, translateY: 5 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{
          opacity: { type: "timing", duration: 300 },
          translateY: { type: "timing", duration: 300 },
        }}
      >
        <TouchableOpacity
          onPress={onPress}
          style={[
            styles.notificationCard,
            isDarkMode ? styles.cardDark : styles.cardLight,
          ]}
          activeOpacity={0.7}
        >
          <View style={styles.emojiContainer}>
            <Text style={styles.emoji}>{emoji}</Text>
          </View>
          <View style={styles.notificationContent}>
            <View style={styles.headerRow}>
              <Text
                style={[
                  styles.notificationTitle,
                  isDarkMode ? styles.textDark : styles.textLight,
                ]}
                numberOfLines={1}
              >
                {title}
              </Text>
              <Text style={styles.timestamp}>{timestamp}</Text>
            </View>
            <Text
              style={[
                styles.message,
                isDarkMode ? styles.messageTextDark : styles.messageTextLight,
              ]}
              numberOfLines={2}
            >
              {message}
            </Text>
          </View>
        </TouchableOpacity>
      </MotiView>
    );
  };

  // Error message component with retry button
  const ErrorMessage = () => (
    <View style={styles.statusContainer}>
      <View style={styles.statusIconContainer}>
        <Ionicons
          name="cloud-offline"
          size={50}
          color={isDarkMode ? "#1DCDFE" : "#0077B6"}
        />
      </View>
      <Text
        style={[
          styles.statusTitle,
          isDarkMode ? styles.textDark : styles.textLight,
        ]}
      >
        {i18n.t("networkError")}
      </Text>
      <Text
        style={[
          styles.statusMessage,
          isDarkMode ? styles.messageTextDark : styles.messageTextLight,
        ]}
      >
        {i18n.t("networkErrorMessage")}
      </Text>
      <TouchableOpacity
        style={[
          styles.retryButton,
          isDarkMode ? styles.retryButtonDark : styles.retryButtonLight,
        ]}
        onPress={fetchNotifications}
      >
        <Text
          style={[
            styles.retryButtonText,
            isDarkMode ? styles.retryTextDark : styles.retryTextLight,
          ]}
        >
          {i18n.t("retry") || "Retry"}
        </Text>
      </TouchableOpacity>
    </View>
  );

  // No data message component
  const NoDataMessage = () => (
    <View style={styles.statusContainer}>
      <View style={styles.statusIconContainer}>
        <Ionicons
          name="notifications-off-outline"
          size={50}
          color={isDarkMode ? "#1DCDFE" : "#0077B6"}
        />
      </View>
      <Text
        style={[
          styles.statusTitle,
          isDarkMode ? styles.textDark : styles.textLight,
        ]}
      >
        {i18n.t("noData")}
      </Text>
      <Text
        style={[
          styles.statusMessage,
          isDarkMode ? styles.messageTextDark : styles.messageTextLight,
        ]}
      >
        {i18n.t("noNotifications") || "You don't have any notifications yet."}
      </Text>
    </View>
  );

  // Unauthorized message component
  const UnauthorizedMessage = () => (
    <View style={styles.statusContainer}>
      <View style={styles.statusIconContainer}>
        <Ionicons
          name="lock-closed-outline"
          size={50}
          color={isDarkMode ? "#1DCDFE" : "#0077B6"}
        />
      </View>
      <Text
        style={[
          styles.statusTitle,
          isDarkMode ? styles.textDark : styles.textLight,
        ]}
      >
        {i18n.t("unauthorized") || "Session Expired"}
      </Text>
      <Text
        style={[
          styles.statusMessage,
          isDarkMode ? styles.messageTextDark : styles.messageTextLight,
        ]}
      >
        {i18n.t("unauthorizedMessage") || "Please sign in again to continue."}
      </Text>
      <TouchableOpacity
        style={[
          styles.retryButton,
          isDarkMode ? styles.retryButtonDark : styles.retryButtonLight,
        ]}
        onPress={fetchNotifications}
      >
        <Text
          style={[
            styles.retryButtonText,
            isDarkMode ? styles.retryTextDark : styles.retryTextLight,
          ]}
        >
          {i18n.t("retry") || "Retry"}
        </Text>
      </TouchableOpacity>
    </View>
  );

  // Decide which status component to render
  const renderStatusMessage = () => {
    switch (responseStatus) {
      case ResponseStatus.NETWORK_ERROR:
        return <ErrorMessage />;
      case ResponseStatus.NO_DATA:
        return <NoDataMessage />;
      case ResponseStatus.UNAUTHORIZED:
        return <UnauthorizedMessage />;
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="light-content"
      />

      {/* Header with gradient background extending under status bar */}
      <LinearGradient
        colors={["#17222D", "#0B3954"]}
        style={[styles.header, { paddingTop: StatusBar.currentHeight || 44 }]}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
      >
        <View style={styles.headerContent}>
          <BackButton
            color="white"
            style={styles.backButton}
            backTo="/(app)/(tabs)"
          />
          <Text style={styles.headerTitle}>{i18n.t("notifications")}</Text>
          <View style={styles.placeholder} />
        </View>
      </LinearGradient>

      {initialLoading ? (
        <View style={styles.centeredContainer}>
          <ActivityIndicator
            size="large"
            color={isDarkMode ? "#1DCDFE" : "#0077B6"}
          />
        </View>
      ) : (
        <RefreshableWrapper
          refreshId="notifications-screen"
          onRefresh={fetchNotifications}
          autoRefreshInterval={refreshInterval}
          className={`flex-1 ${isDarkMode ? "bg-ocean-blue" : "bg-off-white"}`}
        >
          {!isDarkMode && (
            <LinearGradient
              colors={["rgba(0, 119, 182, 0.1)", "rgba(255, 255, 255, 0)"]}
              className="absolute top-0 w-full h-64"
              start={{ x: 0, y: 0 }}
              end={{ x: 0, y: 1 }}
            />
          )}

          {isLoading ? (
            <View
              className={`flex flex-col items-center justify-center ${
                isDarkMode ? "bg-ocean-blue" : "bg-off-white"
              }`}
              style={styles.loadingContainer}
            >
              {Array(4)
                .fill(0)
                .map((_, index) => (
                  <React.Fragment key={index}>
                    <View className="mb-4" />
                    <Skeleton
                      colorMode={isDarkMode ? "dark" : "light"}
                      width={(windowWidth * 11) / 12}
                      height={100}
                    />
                  </React.Fragment>
                ))}
              <View className="mb-5" />
            </View>
          ) : responseStatus !== ResponseStatus.SUCCESS ? (
            renderStatusMessage()
          ) : (
            <ScrollView contentContainerStyle={styles.scrollContent}>
              {notifications.map((item, index) => (
                <HistoryComponent
                  key={index}
                  image={CarrefourLogo}
                  name={item.name}
                  location={item.location || "Anything for now"}
                  date={item.date}
                  id={item.id}
                  status={item.status}
                  isHistory={item.isHistory}
                  isDarkMode={isDarkMode}
                />
              ))}
            </ScrollView>
          )}
        </RefreshableWrapper>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  header: {
    width: "100%",
  },
  headerContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    height: 72,
    paddingTop: 24,
    paddingBottom: 16,
  },
  backButton: {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
  placeholder: {
    width: 32,
  },
  contentContainer: {
    padding: 16,
  },
  notificationCard: {
    flexDirection: "row",
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 0,
    marginVertical: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  cardLight: {
    backgroundColor: "#FFFFFF",
  },
  cardDark: {
    backgroundColor: "#1E2732",
  },
  emojiContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(0, 0, 0, 0.05)",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  emoji: {
    fontSize: 24,
  },
  notificationContent: {
    flex: 1,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 4,
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: "600",
    flex: 1,
  },
  textLight: {
    color: "#000000",
  },
  textDark: {
    color: "#FFFFFF",
  },
  timestamp: {
    fontSize: 12,
    color: "#8E8E93",
    marginLeft: 8,
  },
  message: {
    fontSize: 14,
    lineHeight: 20,
  },
  messageTextLight: {
    color: "#666666",
  },
  messageTextDark: {
    color: "#CCCCCC",
  },
  centeredContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingContainer: {
    paddingTop: 20,
    paddingBottom: 20,
  },
  statusContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 32,
  },
  statusIconContainer: {
    marginBottom: 16,
  },
  statusTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 8,
    textAlign: "center",
  },
  statusMessage: {
    fontSize: 14,
    textAlign: "center",
    marginBottom: 24,
  },
  retryButton: {
    paddingVertical: 10,
    paddingHorizontal: 24,
    borderRadius: 8,
    marginTop: 8,
  },
  retryButtonLight: {
    backgroundColor: "#0077B6",
  },
  retryButtonDark: {
    backgroundColor: "#1DCDFE",
  },
  retryButtonText: {
    fontSize: 16,
    fontWeight: "600",
  },
  retryTextLight: {
    color: "#FFFFFF",
  },
  retryTextDark: {
    color: "#17222D",
  },
  scrollContent: {
    padding: 4,
    paddingBottom: 24,
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 32,
  },
  errorIconContainer: {
    marginBottom: 16,
  },
  errorTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 8,
    textAlign: "center",
  },
  errorMessage: {
    fontSize: 14,
    textAlign: "center",
    marginBottom: 24,
  },
});

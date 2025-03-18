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
} from "react-native";
import { useIsFocused } from "@react-navigation/native";
import HistoryComponent from "@/shared/components/HistoryComponent";
import { HistoryComponentProps } from "@/types";
import CarrefourLogo from "@/assets/images/CarrefourLogo.png";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
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
  const userId = useSelector((state: RootState) => state.userId.userId);

  const fetchNotifications = useCallback(async () => {
    try {
      const token = await AsyncStorage.getItem("token");

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
        setNotifications(combinedHistory);
        setItemsCount(combinedHistory.length);
        setInitialLoading(false);
        setIsLoading(false);

        await AsyncStorage.setItem(
          "notificationsData",
          JSON.stringify(combinedHistory)
        );
      } else {
        setInitialLoading(false);
        setIsLoading(false);
      }
    } catch (error) {
      console.error(error);
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
          setNotifications(parsedData);
          setItemsCount(parsedData.length);
          setInitialLoading(false);
          setIsLoading(false);
        } else {
          await fetchNotifications();
        }
      } catch (error) {
        console.error(error);
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
        style={styles.header}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
      >
        <SafeAreaView style={styles.safeArea}>
          <View style={styles.headerContent}>
            <BackButton
              color="white"
              style={styles.backButton}
              backTo="/(app)/(tabs)"
            />
            <Text style={styles.headerTitle}>Notifications</Text>
            <View style={styles.placeholder} />
          </View>
        </SafeAreaView>
      </LinearGradient>

      {initialLoading ? (
        <View className="flex-1 items-center justify-center">
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

          <ScrollView>
            <View style={styles.contentContainer}>
              {isLoading ? (
                <View
                  className={`flex flex-col items-center justify-center ${
                    isDarkMode ? "bg-ocean-blue" : "bg-off-white"
                  }`}
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
              ) : notifications.length === 0 ? (
                <View className="flex-1 items-center justify-center py-8">
                  <Text
                    className={`text-lg font-bold ${
                      isDarkMode ? "text-baby-blue" : "text-coal-black"
                    }`}
                  >
                    {i18n.t("noData") || "No Data Found"}
                  </Text>
                  <Text
                    className={`text-md ${
                      isDarkMode ? "text-baby-blue" : "text-coal-black"
                    }`}
                  >
                    {i18n.t("noDisplay") ||
                      "There is no data to display at the moment"}
                  </Text>
                </View>
              ) : (
                <View>
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
                </View>
              )}
            </View>
          </ScrollView>
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
    paddingTop: 0,
    paddingBottom: 0,
  },
  safeArea: {
    paddingTop: StatusBar.currentHeight || 44,
  },
  headerContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    height: 56,
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
  noDataContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 24,
  },
});

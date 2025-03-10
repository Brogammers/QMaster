import React, { useEffect, useState, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  useWindowDimensions,
  ActivityIndicator,
} from "react-native";
import { useIsFocused } from "@react-navigation/native";
import HistoryComponent from "@/shared/components/HistoryComponent";
import { HistoryComponentProps } from "@/types";
import CarrefourLogo from "@/assets/images/CarrefourLogo.png";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios, { AxiosResponse } from "axios";
import { Skeleton } from "moti/skeleton";
import Config from "react-native-config";
import i18n from "@/i18n";
import { useTheme } from "@/ctx/ThemeContext";
import { LinearGradient } from "expo-linear-gradient";
import configConverter from "@/api/configConverter";
import RefreshableWrapper from "@/components/RefreshableWrapper";
import { useSelector } from "react-redux";
import { RootState } from "@/app/redux/store";

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

  return (
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
      {initialLoading ? (
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator
            size="large"
            color={isDarkMode ? "#1DCDFE" : "#0077B6"}
          />
        </View>
      ) : isLoading && itemsCount ? (
        <View
          className={`flex flex-col items-center justify-center ${
            isDarkMode ? "bg-ocean-blue" : "bg-off-white"
          }`}
        >
          {Array(itemsCount)
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
        <View className="flex-1 items-center justify-center">
          <Text
            className={`text-lg font-bold ${
              isDarkMode ? "text-baby-blue" : "text-coal-black"
            }`}
          >
            {i18n.t("noData")}
          </Text>
          <Text
            className={`text-md ${
              isDarkMode ? "text-baby-blue" : "text-coal-black"
            }`}
          >
            {i18n.t("noDisplay")}
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
    </RefreshableWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#D9D9D9",
  },
});

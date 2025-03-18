import React, { useEffect, useState, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  useWindowDimensions,
  ActivityIndicator,
  StatusBar,
  TouchableOpacity,
  Platform,
} from "react-native";
import { useIsFocused } from "@react-navigation/native";
import { Skeleton } from "moti/skeleton";
import HistoryComponent from "@/shared/components/HistoryComponent";
import { HistoryComponentProps } from "@/types";
import CarrefourLogo from "@/assets/images/CarrefourLogo.png";
import axios, { AxiosError } from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import i18n from "@/i18n";
import { useTheme } from "@/ctx/ThemeContext";
import { LinearGradient } from "expo-linear-gradient";
import { useSelector } from "react-redux";
import { RootState } from "@/app/redux/store";
import configConverter from "@/api/configConverter";
import RefreshableWrapper from "@/components/RefreshableWrapper";
import BackButton from "@/shared/components/BackButton";
import { Ionicons } from "@expo/vector-icons";

function formatDate(date: any) {
  let day = date.getDate();
  if (day < 10) {
    day = "0" + day;
  }
  let month = date.getMonth() + 1;
  if (month < 10) {
    month = "0" + month;
  }
  let year = date.getFullYear();
  return day + "/" + month + "/" + year;
}

export default function History() {
  const isFocused = useIsFocused();
  const [historyList, setHistoryList] = useState<HistoryComponentProps[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const windowWidth = useWindowDimensions().width;
  const { isDarkMode } = useTheme();
  const [initialLoading, setInitialLoading] = useState(true);
  const [itemsCount, setItemsCount] = useState<number | null>(null);
  const [hasNetworkError, setHasNetworkError] = useState(false);

  const userId = useSelector((state: RootState) => state.userId.userId);

  const fetchHistoryData = useCallback(async () => {
    try {
      setHasNetworkError(false);
      const token = await AsyncStorage.getItem("token");

      const response = await axios.get(
        `${configConverter("EXPO_PUBLIC_API_BASE_URL_HISTORY")}?id=${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        const data = response.data.history;
        let historyEnqueue = data.enqueuings.content;
        let historyDequeue = data.dequeuings.content;

        historyDequeue.forEach(
          (item: {
            id: number;
            isHistory: boolean;
            status: string;
            date: string;
            name: string;
            time: string;
            notification: string;
            location: string;
          }) => {
            item.id = item.id;
            item.isHistory = true;
            item.status = "Dequeued";
            item.date = formatDate(new Date(item.time));
            item.name = item.name;
            item.location = item.location;
          }
        );
        historyEnqueue.forEach(
          (item: {
            id: number;
            isHistory: boolean;
            status: string;
            date: string;
            name: string;
            time: string;
            notification: string;
            location: string;
          }) => {
            item.id = item.id;
            item.isHistory = true;
            item.status = "Enqueued";
            item.date = formatDate(new Date(item.time));
            item.name = item.name;
            item.location = item.location;
          }
        );

        let combinedHistory = [...historyEnqueue, ...historyDequeue];
        setHistoryList(combinedHistory);
        setItemsCount(historyEnqueue.length + historyDequeue.length);
        setInitialLoading(false);
        setIsLoading(false);

        const timeoutDate = new Date();
        timeoutDate.setSeconds(timeoutDate.getSeconds() + 15);
        await AsyncStorage.setItem(
          "historyData",
          JSON.stringify({
            history: combinedHistory,
            date: timeoutDate,
          })
        );
        console.log("History Data Saved");
      }
    } catch (error) {
      console.error(error);
      setHasNetworkError(true);
      setInitialLoading(false);
      setIsLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const jsonData = await AsyncStorage.getItem("historyData");
        let historyData = JSON.parse(jsonData || "{}");
        const checkDate = new Date();
        console.log(
          "History Data: ",
          historyData.date,
          "Check date: ",
          checkDate
        );

        if (
          historyData &&
          historyData.date &&
          new Date(historyData.date).getTime() > checkDate.getTime()
        ) {
          setHistoryList(historyData.history);
          setItemsCount(historyData.history.length);
          setInitialLoading(false);
          setIsLoading(false);
        } else {
          fetchHistoryData();
        }
      } catch (error) {
        console.error(error);
        setHasNetworkError(true);
        setInitialLoading(false);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [isFocused, fetchHistoryData]);

  // Error message component with retry button
  const ErrorMessage = () => (
    <View style={styles.errorContainer}>
      <View style={styles.errorIconContainer}>
        <Ionicons
          name="cloud-offline"
          size={50}
          color={isDarkMode ? "#1DCDFE" : "#0077B6"}
        />
      </View>
      <Text
        style={[
          styles.errorTitle,
          isDarkMode ? styles.textDark : styles.textLight,
        ]}
      >
        {i18n.t("networkError")}
      </Text>
      <Text
        style={[
          styles.errorMessage,
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
        onPress={fetchHistoryData}
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
    <View style={styles.errorContainer}>
      <Text
        style={[
          styles.errorTitle,
          isDarkMode ? styles.textDark : styles.textLight,
        ]}
      >
        {i18n.t("noData")}
      </Text>
      <Text
        style={[
          styles.errorMessage,
          isDarkMode ? styles.messageTextDark : styles.messageTextLight,
        ]}
      >
        {i18n.t("noDisplay")}
      </Text>
    </View>
  );

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
          <Text style={styles.headerTitle}>
            {i18n.t("pastQueues") || "Past Queues"}
          </Text>
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
          refreshId="history-screen"
          onRefresh={fetchHistoryData}
          autoRefreshInterval={300000} // Auto refresh every 5 minutes
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

          {isLoading && itemsCount ? (
            <View
              className={`flex flex-col items-center justify-center ${
                isDarkMode ? "bg-ocean-blue" : "bg-off-white"
              }`}
              style={styles.loadingContainer}
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
          ) : hasNetworkError ? (
            <ErrorMessage />
          ) : historyList.length === 0 ? (
            <NoDataMessage />
          ) : (
            <ScrollView
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.scrollContent}
            >
              {historyList.map((item, index) => (
                <HistoryComponent
                  key={index}
                  image={CarrefourLogo}
                  name={item.name}
                  location={item.location}
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
  scrollContent: {
    padding: 16,
    paddingBottom: 24,
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
  textLight: {
    color: "#000000",
  },
  textDark: {
    color: "#FFFFFF",
  },
  messageTextLight: {
    color: "#666666",
  },
  messageTextDark: {
    color: "#CCCCCC",
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
});

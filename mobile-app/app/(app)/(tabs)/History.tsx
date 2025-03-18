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
import { Skeleton } from "moti/skeleton";
import HistoryComponent from "@/shared/components/HistoryComponent";
import { HistoryComponentProps } from "@/types";
import CarrefourLogo from "@/assets/images/CarrefourLogo.png";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import i18n from "@/i18n";
import { useTheme } from "@/ctx/ThemeContext";
import { LinearGradient } from "expo-linear-gradient";
import { useSelector } from "react-redux";
import { RootState } from "@/app/redux/store";
import configConverter from "@/api/configConverter";
import RefreshableWrapper from "@/components/RefreshableWrapper";

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

  const userId = useSelector((state: RootState) => state.userId.userId);

  const fetchHistoryData = useCallback(async () => {
    try {
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
        setInitialLoading(false);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [isFocused, fetchHistoryData]);

  return (
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

      <View style={styles.headerContainer}>
        <Text
          style={[
            styles.pageTitle,
            isDarkMode ? styles.textDark : styles.textLight,
          ]}
        >
          {i18n.t("past_queues") || "Past Queues"}
        </Text>
      </View>

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
      ) : historyList.length === 0 ? (
        <View className="flex-1 items-center justify-center">
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
            {i18n.t("noDisplay") || "There is no data to display at the moment"}
          </Text>
        </View>
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
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
    marginBottom: 8,
  },
  pageTitle: {
    fontSize: 24,
    fontWeight: "700",
  },
  textLight: {
    color: "#000000",
  },
  textDark: {
    color: "#FFFFFF",
  },
  scrollContent: {
    paddingBottom: 24,
  },
});

import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  useWindowDimensions,
} from "react-native";
import { useIsFocused } from "@react-navigation/native";
import HistoryComponent from "@/shared/components/HistoryComponent";
// import {
//   API_BASE_URL_HISTORY_ANDROID,
//   API_BASE_URL_HISTORY,
//   BASE_URL,
// } from "@env";
import { HistoryComponentProps } from "@/types";
import CarrefourLogo from "@/assets/images/CarrefourLogo.png";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios, { AxiosResponse } from "axios";
import { Skeleton } from "moti/skeleton";
import { HistoryList } from "@/constants";
import Config from "react-native-config";
import i18n from "@/i18n";

export default function History() {
  const isFocused = useIsFocused();
  const [historyList, setHistoryList] = useState<HistoryComponentProps[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const colorMode: "light" | "dark" = "light";
  const windowWidth = useWindowDimensions().width;

  useEffect(() => {
    const fetchData = async () => {
      try {
        let historyData = await AsyncStorage.getItem("historyData");
        if (historyData) {
          setHistoryList(JSON.parse(historyData));
        } else {
          console.log("History Response ", axios.defaults.headers);
          const token = await AsyncStorage.getItem("token");

          const timeoutPromise = new Promise((resolve, reject) => {
            setTimeout(() => reject("Timeout"), 5000); // Reject if the timeout is reached
          });

          const [response, _] = (await Promise.all([
            axios.get(`${Config.EXPO_PUBLIC_API_BASE_URL_HISTORY || "http://localhost:8080/api/v1/history/all"}?id=1`, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }),
            timeoutPromise,
          ])) as [AxiosResponse, unknown]; // Adjust 'YourResponseType' to match your API response structure

          if (response.status === 200) {
            const data = response.data.history;
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
            setHistoryList(combinedHistory);
            setIsLoading(false);

            await AsyncStorage.setItem(
              "historyData",
              JSON.stringify(combinedHistory)
            );
          } else {
            setIsLoading(false);
          }
        }
      } catch (error) {
        console.error(error);
      }
    };

    const fetchDataTimeout = setTimeout(() => {
      setIsLoading(false);
    }, 5000);

    fetchData();

    return () => clearTimeout(fetchDataTimeout);
  }, [isFocused]);

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {isLoading ? (
        <View className="bg-off-white flex flex-col items-center justify-center">
          {Array(8)
            .fill(0)
            .map((_, index) => (
              <React.Fragment key={index}>
                <View className="mb-4" />
                <Skeleton
                  colorMode={colorMode}
                  width={(windowWidth * 11) / 12}
                  height={100}
                />
              </React.Fragment>
            ))}
          <View className="mb-5" />
        </View>
      ) : historyList.length === 0 ? (
        <View
          className="h-screen bg-off-white flex flex-col justify-center items-center"
          // style={styles.noDataContainer}
        >
          <Text className="text-coal-black text-lg font-bold">
            {i18n.t("noData")}
          </Text>
          <Text className="text-coal-black text-md">
            {i18n.t("noDisplay")}
          </Text>
        </View>
      ) : (
        HistoryList.map((item, index) => (
          <HistoryComponent
            key={index}
            image={CarrefourLogo}
            name={item.name}
            location={"Anything for now"}
            date={item.date}
            id={item.id}
            status={item.status}
            isHistory={item.isHistory}
          />
        ))
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#D9D9D9",
  },
});

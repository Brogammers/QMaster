import React, { useEffect, useState } from "react";
import { Platform, StatusBar, StyleSheet, ScrollView } from "react-native";
import { useIsFocused } from "@react-navigation/native";
import HistoryComponent from "@/shared/components/HistoryComponent";
import {
  API_BASE_URL_HISTORY_ANDROID,
  API_BASE_URL_HISTORY,
  BASE_URL,
} from "@env";
import { HistoryComponentProps } from "@/types";
import CarrefourLogo from "@/assets/images/CarrefourLogo.png";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axiosInstance from "@/ctx/axiosInstance";

export default function History() {
  const isFocused = useIsFocused();
  // const HistoryList: HistoryComponentProps[] = [];
  const [historyList, setHistoryList] = useState<HistoryComponentProps[]>([]);
  const [historyEnqueue, setHistoryEnqueue] = useState<HistoryComponentProps[]>(
    []
  );
  const [historyDequeue, setHistoryDequeue] = useState<HistoryComponentProps[]>(
    []
  );
  useEffect(() => {
    const fetchData = async () => {
      try {
        let historyData = await AsyncStorage.getItem("historyData");
        if (historyData) {
          // If history data exists in AsyncStorage, parse and set it
          setHistoryList(JSON.parse(historyData));
        } else {
          // Fetch history data from API if not found in AsyncStorage
          console.log("History Response ", axiosInstance.head);
          const response = await axiosInstance.get(
            `${API_BASE_URL_HISTORY}?id=1`
          );
          const data = response.data.history;
          let historyEnqueue = data.enqueuings.content;
          let historyDequeue = data.dequeuings.content;

          // Modify history items
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

          // Combine and set history list
          let combinedHistory = [...historyEnqueue, ...historyDequeue];
          setHistoryList(combinedHistory);

          // Store fetched data in AsyncStorage for caching
          await AsyncStorage.setItem(
            "historyData",
            JSON.stringify(combinedHistory)
          );
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [isFocused]);

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {historyList.map((item, index) => (
        <HistoryComponent
          image={CarrefourLogo}
          name={item.name}
          location={"Anything for now"}
          date={item.date}
          id={item.id}
          status={item.status}
          isHistory={item.isHistory}
          key={index}
        />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#D9D9D9",
  },
});

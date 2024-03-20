import React, { useEffect, useState } from "react";
import {
  Platform,
  StatusBar,
  StyleSheet,
  ScrollView,
  useWindowDimensions,
} from "react-native";
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
import axios from "axios";
import { Skeleton } from "moti/skeleton";
import { View } from "@/components/Themed";

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
          const response = await axios.get(`${API_BASE_URL_HISTORY}?id=1`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
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
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [isFocused]);

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* {historyList.map((item, index) => (
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
      ))} */}
      {isLoading ? (
        <View className="bg-off-white flex flex-col items-center justify-center">
          {Array(8).fill(0).map(( _, index) => (
            <>
              <View className="mb-4" />
              <Skeleton
                colorMode={colorMode}
                width={windowWidth * 11 / 12}
                height={100}
              />
            </>
          ))}
          <View className="mb-5" />
        </View>
      ) : (
        historyList.map((item, index) => (
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

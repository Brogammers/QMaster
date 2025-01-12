import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  useWindowDimensions,
} from "react-native";
import { useIsFocused } from "@react-navigation/native";
import { Skeleton } from "moti/skeleton";
import HistoryComponent from "@/shared/components/HistoryComponent";
import { HistoryComponentProps } from "@/types";
import CarrefourLogo from "@/assets/images/CarrefourLogo.png";
import axios, { AxiosResponse } from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Config from "react-native-config";
import i18n from "@/i18n";
import { useTheme } from "@/ctx/ThemeContext";
import { LinearGradient } from "expo-linear-gradient";
import { useSelector } from "react-redux";
import { RootState } from "@/app/redux/store";

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

  const userId = useSelector((state:RootState) => state.userId.userId);

  useEffect(() => {
    const fetchData = async () => {      
      try {
        const jsonData = await AsyncStorage.getItem("historyData");
        let historyData = JSON.parse(jsonData || "{}");
        const checkDate = new Date();      
        
        if (historyData && new Date(historyData.date).getTime() > checkDate.getTime()) {
          setHistoryList(historyData.history);
        } else {
          const token = await AsyncStorage.getItem("token");

          const response = axios.get(`${Config.EXPO_PUBLIC_API_BASE_URL_HISTORY_ANDROID || "http://10.0.2.2:8080/api/v1/history/all"}?id=${userId}`, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            });
          
        response.then((res: AxiosResponse) => {          
          if (res.status === 200) {
            const data = res.data.history;
            let historyEnqueue = data.enqueuings.content;
            let historyDequeue = data.dequeuings.content;
            
            historyDequeue.forEach(
              (item: { id: number, isHistory: boolean; status: string; date: string, name: string, time: string, notification: string; location: string}) => {
                item.id = item.id;
                item.isHistory = true;
                item.status = "Dequeued";
                item.date = formatDate(new Date(item.time));
                item.name = item.name;
                item.location = item.location;
              }
            );
            historyEnqueue.forEach(
              (item: { id: number, isHistory: boolean; status: string; date: string; name: string, time: string, notification: string; location: string}) => {
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
            setIsLoading(false);

            const timeoutDate = new Date();
            timeoutDate.setMinutes(timeoutDate.getMinutes() + 0.5);
            AsyncStorage.setItem(
                "historyData",
                JSON.stringify({ history: combinedHistory, date: timeoutDate })
            ).then(() => {
                console.log("History Data Saved");
            });
          } else {            
            setIsLoading(false);
          }
        }
          );
        }
      } catch (error) {
        console.error(error);
      }
    };
    

    fetchData();
  }, [isFocused]);

  return (
    <View className={`flex-1 ${isDarkMode ? 'bg-ocean-blue' : 'bg-off-white'}`}>
      {!isDarkMode && (
        <LinearGradient
          colors={['rgba(0, 119, 182, 0.1)', 'rgba(255, 255, 255, 0)']}
          className="absolute top-0 w-full h-64"
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
        />
      )}
      <ScrollView showsVerticalScrollIndicator={false}>
        {isLoading ? (
          <View className={`flex flex-col items-center justify-center ${isDarkMode ? 'bg-ocean-blue' : 'bg-off-white'}`}>
            {Array(8)
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
          <View className={`flex flex-col items-center justify-center h-screen ${isDarkMode ? 'bg-ocean-blue' : 'bg-off-white'}`}>
            <Text className={`text-lg font-bold ${isDarkMode ? 'text-baby-blue' : 'text-coal-black'}`}>
              {i18n.t("noData")}
            </Text>
            <Text className={`text-md ${isDarkMode ? 'text-baby-blue' : 'text-coal-black'}`}>
              {i18n.t("noDisplay")}
            </Text>
          </View>
        ) : (
          historyList.map((item, index) => (
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
          ))
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#D9D9D9",
  },
});
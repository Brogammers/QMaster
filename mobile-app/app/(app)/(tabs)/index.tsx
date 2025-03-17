import React, { useEffect, useRef, useState, useCallback } from "react";
import {
  StatusBar,
  StyleSheet,
  SafeAreaView,
  Platform,
  View,
  useWindowDimensions,
  Text,
} from "react-native";
import ScanQr from "@/components/ScanQR";
import SearchBar from "@/components/SearchBar";
import CategoriesList from "@/components/CategoriesList";
import RecentQueues from "@/components/RecentQueues";
import FrequentlyAsked from "@/components/FrequentlyAsked";
import CurrentQueuesList from "@/components/CurrentQueuesList";
import PromoCard from "@/assets/images/promo-card.svg";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Skeleton } from "moti/skeleton";
import { useTheme } from "@/ctx/ThemeContext";
import { LinearGradient } from "expo-linear-gradient";
import { useSia } from "@/ctx/SiaContext";
import { useNavigation } from "@react-navigation/native";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/app/redux/store";
import { setCurrentQueues } from "@/app/redux/queueSlice";
import axios from "axios";
import configConverter from "@/api/configConverter";
import RefreshableWrapper from "@/components/RefreshableWrapper";

export default function Index() {
  const { isDarkMode } = useTheme();
  const [bgColor, setBgColor] = useState("#17222D");
  const [scrollY, setScrollY] = useState(0);
  const scanQrRef = useRef<View>(null);
  const [scanQrHeight, setScanQrHeight] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [recentQueues, setRecentQueues] = useState<number>(0);
  const windowWidth = useWindowDimensions().width;
  const { showSia } = useSia();
  const navigation = useNavigation();
  const dispatch = useDispatch();

  // Get current queues from Redux
  const currentQueues = useSelector(
    (state: RootState) => state.queue.currentQueues
  );

  const fetchHomeData = useCallback(async () => {
    try {
      setIsLoading(true);

      // Get current queues from AsyncStorage
      const currentQueuesData = await AsyncStorage.getItem("currentQueues");

      if (currentQueuesData) {
        const parsedQueues = JSON.parse(currentQueuesData);
        const token = await AsyncStorage.getItem("TOKEN_KEY");
        const verifiedQueues = [];

        // Verify each queue's status
        for (const queue of parsedQueues) {
          try {
            const url = configConverter(
              "EXPO_PUBLIC_API_BASE_URL_CHECK_IN_QUEUE"
            );
            const response = await axios.get(
              `${url}?queueName=${queue.serviceType}`,
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );

            if (response.status === 200 && response.data.isPresent) {
              // Update queue with latest information
              verifiedQueues.push({
                ...queue,
                position: response.data.position || queue.position,
                estimatedTime:
                  response.data.estimatedTime || queue.estimatedTime,
              });
            }
          } catch (error) {
            console.error(`Error verifying queue ${queue.serviceType}:`, error);
          }
        }

        // Update both AsyncStorage and Redux
        await AsyncStorage.setItem(
          "currentQueues",
          JSON.stringify(verifiedQueues)
        );
        dispatch(setCurrentQueues(verifiedQueues));
      }

      // Get history data
      const historyData = await AsyncStorage.getItem("historyData");
      if (historyData) {
        const parsedData = JSON.parse(historyData);
        setRecentQueues(parsedData.length);
      }

      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  }, [dispatch]);

  useEffect(() => {
    fetchHomeData();

    // Add listener for when the screen comes into focus
    const unsubscribe = navigation.addListener("focus", fetchHomeData);

    return () => {
      unsubscribe();
    };
  }, [fetchHomeData, navigation]);

  const handleScroll = (event: {
    nativeEvent: {
      contentOffset: {
        y: any;
      };
    };
  }) => {
    const currentScrollY = event.nativeEvent.contentOffset.y;
    setScrollY(currentScrollY);
  };

  useEffect(() => {
    if (scrollY > scanQrHeight) {
      setBgColor(isDarkMode ? "#0C1824" : "#D9D9D9");
      if (Platform.OS === "android") {
        StatusBar.setBackgroundColor(isDarkMode ? "#0C1824" : "#D9D9D9", true);
      }
      StatusBar.setBarStyle(isDarkMode ? "light-content" : "dark-content");
    } else {
      setBgColor("#17222D");
      if (Platform.OS === "android") {
        StatusBar.setBackgroundColor("#17222D", true);
      }
      StatusBar.setBarStyle("light-content");
    }
  }, [scrollY, scanQrHeight, isDarkMode]);

  const handleLayout = (event: {
    nativeEvent: { layout: { height: React.SetStateAction<number> } };
  }) => {
    setScanQrHeight(event.nativeEvent.layout.height);
  };

  // Home screen should refresh more frequently if user is in a queue
  const autoRefreshInterval = currentQueues.length > 0 ? 60000 : 180000; // 1 minute if in queue, 3 minutes otherwise

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: bgColor }]}>
      <StatusBar
        translucent
        backgroundColor="#17222D"
        barStyle={
          isDarkMode || scrollY <= scanQrHeight
            ? "light-content"
            : "dark-content"
        }
      />
      <RefreshableWrapper
        refreshId="home-screen"
        onRefresh={fetchHomeData}
        autoRefreshInterval={autoRefreshInterval}
        scrollViewProps={{
          className: "w-screen",
          showsVerticalScrollIndicator: false,
          scrollEventThrottle: 16,
          onScroll: handleScroll,
        }}
      >
        <View
          ref={scanQrRef}
          onLayout={handleLayout}
          className={`${isDarkMode ? "bg-ocean-blue" : "bg-slate-800"} pb-8`}
        >
          <ScanQr isDarkMode={!isDarkMode} />
        </View>
        <View
          className={`relative -mt-6 rounded-t-[30px] overflow-hidden ${
            isDarkMode ? "bg-slate-900" : "bg-off-white"
          } shadow-lg border-t ${
            isDarkMode ? "border-slate-800/50" : "border-slate-200"
          }`}
        >
          <View className="absolute inset-x-0 -top-3 h-6 bg-gradient-to-b from-black/20 to-transparent" />
          {isDarkMode ? (
            <LinearGradient
              colors={["rgba(30, 41, 59, 0.7)", "rgba(15, 23, 42, 0)"]}
              className="absolute top-0 w-full h-64"
              start={{ x: 0, y: 0 }}
              end={{ x: 0, y: 1 }}
            />
          ) : (
            <LinearGradient
              colors={["rgba(0, 119, 182, 0.1)", "rgba(255, 255, 255, 0)"]}
              className="absolute top-0 w-full h-64"
              start={{ x: 0, y: 0 }}
              end={{ x: 0, y: 1 }}
            />
          )}
          <View className="w-10/12 self-center">
            <SearchBar isDarkMode={isDarkMode} />
            {isLoading ? (
              <View
                className={`flex flex-col items-center justify-center ${
                  isDarkMode ? "bg-ocean-blue" : "bg-off-white"
                }`}
              >
                <View className="mb-4" />
                <Skeleton
                  colorMode={isDarkMode ? "dark" : "light"}
                  width={windowWidth * 0.85}
                  height={175}
                  radius={16}
                />
                <View className="mb-5" />
              </View>
            ) : currentQueues.length > 0 ? (
              <CurrentQueuesList />
            ) : (
              <PromoCard width={"100%"} />
            )}
            <CategoriesList isDarkMode={isDarkMode} />
            {recentQueues > 0 && <RecentQueues isDarkMode={isDarkMode} />}
            <FrequentlyAsked isDarkMode={isDarkMode} />
          </View>
        </View>
      </RefreshableWrapper>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop:
      Platform.OS === "android"
        ? StatusBar.currentHeight
          ? StatusBar.currentHeight - 1
          : 0
        : 0,
  },
});
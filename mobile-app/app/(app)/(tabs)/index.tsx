import React, { useEffect, useRef, useState } from "react";
import {
  StatusBar,
  StyleSheet,
  SafeAreaView,
  Platform,
  View,
  ScrollView, useWindowDimensions
} from "react-native";
import ScanQr from "@/components/ScanQR";
import SearchBar from "@/components/SearchBar";
import CategoriesList from "@/components/CategoriesList";
import RecentQueues from "@/components/RecentQueues";
import FrequentlyAsked from "@/components/FrequentlyAsked";
import CurrentQueuesList from "@/components/CurrentQueuesList";
import PromoCard from "@/assets/images/promo-card.svg";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Skeleton } from "moti/skeleton";

export default function Index() {
  const [bgColor, setBgColor] = useState("#17222D");
  const [scrollY, setScrollY] = useState(0);
  const scanQrRef = useRef<View>(null);
  const [scanQrHeight, setScanQrHeight] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [currentQueues, setCurrentQueues] = useState<number>(0);
  const [recentQueues, setRecentQueues] = useState<number>(0);

  useEffect(() => {
    // Fetch data from AsyncStorage to determine if current queues exist
    const fetchData = async () => {
      try {
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
    };

    fetchData();
  }, []);

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
      setBgColor("#D9D9D9");
      if (Platform.OS === "android") {
        StatusBar.setBackgroundColor("#D9D9D9", true);
      }
      StatusBar.setBarStyle("dark-content");
    } else {
      setBgColor("#17222D");
      if (Platform.OS === "android") {
        StatusBar.setBackgroundColor("#17222D", true);
      }
      StatusBar.setBarStyle("light-content");
    }
  }, [scrollY, scanQrHeight]);

  const handleLayout = (event: {
    nativeEvent: { layout: { height: React.SetStateAction<number> } };
  }) => {
    setScanQrHeight(event.nativeEvent.layout.height);
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: bgColor }]}>
      <StatusBar
        translucent
        backgroundColor="#17222D"
        barStyle={scrollY > scanQrHeight ? "dark-content" : "light-content"}
      />
      <ScrollView
        className="w-screen"
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={16}
        onScroll={handleScroll}
      >
        <View className="bg-off-white">
          <View ref={scanQrRef} onLayout={handleLayout}>
            <ScanQr />
          </View>
          <View className="w-10/12 self-center">
            <SearchBar />
            {isLoading ? (
              // Skeleton loading for current queues
              <SkeletonLoading />
            ) : currentQueues ? (
              <CurrentQueuesList />
            ) : (
              <PromoCard width={"100%"} />
            )}
            <CategoriesList />
            {recentQueues > 0 && <RecentQueues />}
            <FrequentlyAsked />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const SkeletonLoading = () => {
  const windowWidth = useWindowDimensions().width;
  const colorMode: 'light' | 'dark' = 'light';
  return (
    <View className="bg-white flex flex-col items-center justify-center">
      {Array(8).fill(0).map((_, index) => (
        <React.Fragment key={index}>
          <View className="mb-4" />
          <Skeleton
            colorMode={colorMode}
            width={windowWidth * (11 / 12)}
            height={100}
          />
        </React.Fragment>
      ))}
      <View className="mb-5" />
    </View>
  );
};

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
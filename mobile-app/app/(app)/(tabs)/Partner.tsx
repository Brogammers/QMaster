import configConverter from "@/api/configConverter";
import JoinQueue from "@/components/JoinQueue";
import QueueInfoCard from "@/components/QueueInfoCard";
import { useTheme } from "@/ctx/ThemeContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios, { AxiosError } from "axios";
import { LinearGradient } from "expo-linear-gradient";
import { useLocalSearchParams } from "expo-router";
import { MotiView } from "moti";
import React, { createContext, useEffect, useState, useCallback } from "react";
import { View, TouchableOpacity, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import RefreshableWrapper from "@/components/RefreshableWrapper";
import FeedbackModal from "@/components/FeedbackModal";

export const LocationContext = createContext<{
  locationData: Array<{
    label: string;
    value: number;
    id: number;
    address: string;
  }>;
  setLocationData: React.Dispatch<React.SetStateAction<any>>;
  currentLocation: number | null;
  setCurrentLocation: React.Dispatch<React.SetStateAction<number | null>>;
}>({
  locationData: [],
  setLocationData: () => {},
  currentLocation: null,
  setCurrentLocation: () => {},
});

export default function Partner() {
  const { brandName, image } = useLocalSearchParams<{
    brandName: string;
    image: any;
  }>();
  const { isDarkMode } = useTheme();

  const [locationData, setLocationData] = useState<
    Array<{
      label: string;
      value: number;
      id: number;
      address: string;
    }>
  >([]);
  const [value, setValue] = useState<number | null>(null);
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);

  const fetchLocationData = useCallback(async () => {
    try {
      const token = await AsyncStorage.getItem("TOKEN_KEY");
      const url = configConverter(
        "EXPO_PUBLIC_API_BASE_URL_GET_LOCATIONS_BY_BUSINESS"
      );

      const response = await axios.get(`${url}?businessName=${brandName}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        const data = response.data.locations;
        const locationData = data.map((store: any) => ({
          label: store.name,
          value: store.id,
          id: store.id,
          address: store.address,
          coordinates: {
            latitude: store.latitude,
            longitude: store.longitude,
          },
        }));
        setLocationData(locationData);
      }
    } catch (error) {
      console.log("Error: ", (error as AxiosError).response?.data);
    }
  }, [brandName]);

  useEffect(() => {
    fetchLocationData();
  }, [fetchLocationData]);

  // Partner screen refresh should be more frequent if user is actively considering joining a queue
  const refreshInterval = 60000; // 1 minute

  return (
    <LocationContext.Provider
      value={{
        locationData,
        setLocationData,
        currentLocation: value,
        setCurrentLocation: setValue,
      }}
    >
      <SafeAreaView
        className={`flex-1 ${isDarkMode ? "bg-ocean-blue" : "bg-off-white"}`}
      >
        <RefreshableWrapper
          refreshId="partner-screen"
          onRefresh={fetchLocationData}
          autoRefreshInterval={300000}
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

          <View className="px-4 pt-4">
            <QueueInfoCard name={brandName || ""} image={image} />
          </View>

          <View className="px-4 pt-4">
            <JoinQueue />
          </View>
        </RefreshableWrapper>
        <FeedbackModal
          visible={showFeedbackModal}
          onClose={() => setShowFeedbackModal(false)}
          businessName={brandName || ""}
          serviceName="General Service"
        />
      </SafeAreaView>
    </LocationContext.Provider>
  );
}

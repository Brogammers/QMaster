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
  }, [brandName]);

  // Partner screen refresh should be more frequent if user is actively considering joining a queue
  const refreshInterval = 60000; // 1 minute

  return (
    <View className="flex-1">
      <View
        className={`absolute top-0 left-0 right-0 bottom-0 ${
          isDarkMode ? "bg-ocean-blue" : "bg-off-white"
        }`}
      >
        {!isDarkMode && (
          <LinearGradient
            colors={["rgba(0, 119, 182, 0.1)", "rgba(255, 255, 255, 0)"]}
            className="absolute top-0 w-full h-64"
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
          />
        )}
      </View>
      <LocationContext.Provider
        value={{
          locationData: locationData,
          setLocationData: setLocationData,
          currentLocation: value,
          setCurrentLocation: setValue,
        }}
      >
        <QueueInfoCard image={image} name={brandName} />

        <SafeAreaView className="flex-1" edges={["bottom", "left", "right"]}>
          <RefreshableWrapper
            refreshId={`partner-${brandName}`}
            onRefresh={fetchLocationData}
            autoRefreshInterval={refreshInterval}
            contentContainerStyle={{ paddingBottom: 40 }}
          >
            <MotiView
              from={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                mass: 0.8,
                damping: 15,
                delay: 200,
              }}
              className="w-full px-6"
            >
              <JoinQueue />
            </MotiView>
          </RefreshableWrapper>
        </SafeAreaView>
      </LocationContext.Provider>

      {/* Demo button for testing feedback modal - remove in production */}
      {__DEV__ && (
        <TouchableOpacity
          style={{
            position: "absolute",
            bottom: 20,
            right: 20,
            backgroundColor: isDarkMode ? "#1DCDFE" : "#0077B6",
            padding: 10,
            borderRadius: 8,
          }}
          onPress={() => setShowFeedbackModal(true)}
        >
          <Text style={{ color: "white" }}>Show Feedback</Text>
        </TouchableOpacity>
      )}

      <FeedbackModal
        visible={showFeedbackModal}
        onClose={() => setShowFeedbackModal(false)}
        businessName={brandName || ""}
        serviceName="Demo Service"
      />
    </View>
  );
}

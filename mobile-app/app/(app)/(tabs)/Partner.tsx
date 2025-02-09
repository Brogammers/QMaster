import React, { createContext, useEffect, useState } from "react";
import { View, ScrollView } from "react-native";
import QueueInfoCard from "@/components/QueueInfoCard";
import JoinQueue from "@/components/JoinQueue";
import { useTheme } from "@/ctx/ThemeContext";
import { LinearGradient } from "expo-linear-gradient";
import { MotiView } from "moti";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams } from "expo-router";
import configConverter from "@/api/configConverter";
import axios, { AxiosError } from "axios";
import OpeningHours from "@/components/OpeningHours";

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

  useEffect(() => {
    const url = configConverter(
      "EXPO_PUBLIC_API_BASE_URL_GET_LOCATIONS_BY_BUSINESS"
    );

    axios
      .get(`${url}?businessName=${brandName}`)
      .then((response) => {
        if (response.status === 200) {
          return response.data.locations;
        } else {
          throw new Error("Error");
        }
      })
      .then((data) => {
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
      })
      .catch((error) => {
        console.log("Error: ", (error as AxiosError).response?.data);
      });
  }, [brandName]);

  const sampleHours = {
    monday: { open: "09:00", close: "22:00" },
    tuesday: { open: "09:00", close: "22:00" },
    wednesday: { open: "09:00", close: "22:00" },
    thursday: { open: "09:00", close: "22:00" },
    friday: { open: "09:00", close: "22:00" },
    saturday: { open: "10:00", close: "23:00" },
    sunday: { open: "10:00", close: "21:00" },
  };

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

        <OpeningHours hours={sampleHours} />

        <SafeAreaView className="flex-1" edges={["bottom", "left", "right"]}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 40 }}
            className="flex-1"
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
          </ScrollView>
        </SafeAreaView>
      </LocationContext.Provider>
    </View>
  );
}

import configConverter from "@/api/configConverter";
import arabiata from "@/assets/images/arabiata.png";
import { useTheme } from "@/ctx/ThemeContext";
import QueueCard from "@/shared/components/QueueCard";
import { CurrentQueuesProps } from "@/types";
import { useLinkTo } from "@react-navigation/native";
import axios from "axios";
import { router, useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { ScrollView, Text, View } from "react-native";
import i18n from "@/i18n";

const page = 1;
const perPage = 5;

export default function Category() {
  const { name } = useLocalSearchParams<{ name: string }>();
  const categoryName = name;
  const linkTo = useLinkTo();
  const { isDarkMode } = useTheme();
  const [current, setCurrent] = useState<CurrentQueuesProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const handleBrandPress = (brand: any) => {
    linkTo("/Partner");
    router.setParams({
      brandName: brand.name,
      image: brand.image,
    });
  };

  useEffect(() => {
    setLoading(true);
    setError(false);
    setCurrent([]);

    const url = configConverter(
      "EXPO_PUBLIC_API_BASE_URL_GET_BUSINESSES_BY_CATEGORY"
    );

    axios
      .get(`${url}?category=${name}&page=${page}&per-page=${perPage}`)
      .then((response) => {
        if (response.status === 200 && response.data?.businesses?.content) {
          return response.data.businesses.content;
        } else {
          throw new Error("No data available");
        }
      })
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          const currentQueues = data.map((business: any) => ({
            id: business.id,
            name: business.name,
            image: arabiata,
            time: 20,
            people: 20,
          }));
          setCurrent(currentQueues);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setError(true);
        setLoading(false);
      });
  }, [name]);

  return (
    <View className={`flex-1 ${isDarkMode ? "bg-slate-900" : "bg-off-white"}`}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1 }}
      >
        <View className="p-4 flex-1">
          <Text
            className={`text-xl font-bold mb-4 ${
              isDarkMode ? "text-white" : "text-ocean-blue"
            }`}
          >
            {categoryName}
          </Text>
          {!loading &&
            !error &&
            current.length > 0 &&
            current.map((brand, index) => (
              <QueueCard
                key={index}
                name={brand.name}
                image={brand.image}
                time={brand.time}
                people={brand.people}
                onPress={() => handleBrandPress(brand)}
                isDarkMode={isDarkMode}
              />
            ))}
          {!loading && (error || current.length === 0) && (
            <View className="flex-1 items-center justify-center">
              <Text
                className={`text-lg text-center font-bold ${
                  isDarkMode ? "text-white" : "text-coal-black"
                }`}
              >
                {i18n.t("noData")}
              </Text>
              <Text
                className={`text-sm text-center mt-2 ${
                  isDarkMode ? "text-gray-400" : "text-gray-600"
                }`}
              >
                {i18n.t("noDisplay")}
              </Text>
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
}

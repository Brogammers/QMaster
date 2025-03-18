import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  TextInput,
  ScrollView,
  I18nManager,
  View,
  Text,
  TouchableOpacity,
  Image,
  SafeAreaView,
  StatusBar,
  FlatList,
} from "react-native";
import { FontAwesome, Ionicons, FontAwesome5 } from "@expo/vector-icons";
import RecentItemsSearch from "@/components/RecentItemsSearch";
import PopularQueues from "@/components/PopularQueues";
import SearchFilter from "@/components/SearchFilter";
import i18n from "@/i18n";
import { useTheme } from "@/ctx/ThemeContext";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Search() {
  const page = 1;
  const perPage = 8;
  const router = useRouter();

  const [input, setInput] = useState("");
  const { isDarkMode } = useTheme();
  const [recentSearches, setRecentSearches] = useState<string[]>([]);

  useEffect(() => {
    const loadRecentSearches = async () => {
      try {
        const savedSearches = await AsyncStorage.getItem("recentSearches");
        if (savedSearches) {
          setRecentSearches(JSON.parse(savedSearches));
        } else {
          // Default example searches if none exist
          setRecentSearches([
            "banking",
            "government services",
            "hospital",
            "restaurant",
          ]);
        }
      } catch (error) {
        console.error("Failed to load recent searches", error);
      }
    };

    loadRecentSearches();
  }, []);

  const categories = [
    { id: 1, name: "Coffee", icon: "coffee" },
    { id: 2, name: "Desserts", icon: "birthday-cake" },
    { id: 3, name: "Bakery", icon: "bread-slice" },
    { id: 4, name: "Koshaary", icon: "utensils" },
    { id: 5, name: "Sandwiches", icon: "hamburger" },
  ];

  const brands = [
    { id: 1, name: "Talabat Mart", logo: "shopping-cart", minutes: "25 mins" },
    { id: 2, name: "Carrefour", logo: "shopping-basket", minutes: "37 mins" },
    { id: 3, name: "Metro", logo: "store", minutes: "22 mins" },
    { id: 4, name: "Spinneys", logo: "shopping-bag", minutes: "26 mins" },
  ];

  const vendors = [
    {
      id: 1,
      name: "Emirates Bank",
      logo: "bank",
      rating: "4.0",
      reviews: "(100+)",
      minutes: "18 mins",
      price: "AED 14.99",
    },
    {
      id: 2,
      name: "City Hospital",
      logo: "hospital",
      rating: "4.2",
      reviews: "(150+)",
      minutes: "26 mins",
      price: "AED 0.00",
    },
    {
      id: 3,
      name: "Government Services",
      logo: "building",
      rating: "3.5",
      reviews: "(80)",
      minutes: "28 mins",
      price: "AED 18.99",
    },
    {
      id: 4,
      name: "Mall Services",
      logo: "store-alt",
      rating: "4.3",
      reviews: "(200+)",
      minutes: "29 mins",
      price: "AED 0.00",
    },
  ];

  const handleBack = () => {
    router.back();
  };

  const categoryIcons: Record<string, string> = {
    Coffee: "coffee",
    Desserts: "birthday-cake",
    Bakery: "bread-slice",
    Koshaary: "utensils",
    Sandwiches: "hamburger",
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="dark-content"
      />

      {/* Header with search bar */}
      <View className="px-4 pt-2 pb-2 flex-row items-center border-b border-gray-200">
        <TouchableOpacity onPress={handleBack} className="mr-3">
          <Ionicons name="arrow-back" size={24} color="#17222D" />
        </TouchableOpacity>

        <View
          className={`flex-1 border rounded-full flex-row items-center px-4 py-2 bg-gray-100`}
        >
          <FontAwesome name="search" size={20} color="#777" />
          <TextInput
            placeholder="Search services, queues and more"
            value={input}
            onChangeText={(text) => setInput(text)}
            className={`flex-1 ${
              I18nManager.isRTL ? "text-right mr-2" : "text-left ml-2"
            }`}
            autoFocus={true}
            style={{ fontSize: 16 }}
            placeholderTextColor="#777"
          />
        </View>
      </View>

      {input.length === 0 ? (
        <ScrollView className="flex-1 bg-gray-50">
          {/* Categories tabs */}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            className="border-b border-gray-200 bg-white"
          >
            <TouchableOpacity className="py-4 px-8 border-b-2 border-baby-blue">
              <Text className="font-medium text-baby-blue">All</Text>
            </TouchableOpacity>
            <TouchableOpacity className="py-4 px-8">
              <Text className="font-medium text-gray-500">Banking</Text>
            </TouchableOpacity>
            <TouchableOpacity className="py-4 px-8">
              <Text className="font-medium text-gray-500">Healthcare</Text>
            </TouchableOpacity>
            <TouchableOpacity className="py-4 px-8">
              <Text className="font-medium text-gray-500">Government</Text>
            </TouchableOpacity>
          </ScrollView>

          {/* What are you craving today? */}
          <View className="px-4 py-5 bg-white mt-2">
            <Text className="text-lg font-semibold mb-4">
              What are you looking for today?
            </Text>

            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ paddingRight: 20 }}
            >
              {categories.map((category) => (
                <TouchableOpacity
                  key={category.id}
                  className="items-center mr-5"
                >
                  <View className="w-20 h-20 bg-gray-100 rounded-full justify-center items-center mb-2">
                    <FontAwesome5
                      name={categoryIcons[category.name] || "question"}
                      size={24}
                      color="#1DCDFE"
                    />
                  </View>
                  <Text className="text-center">{category.name}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

          {/* Recent searches */}
          <View className="px-4 py-5 bg-white mt-2">
            <Text className="text-lg font-semibold mb-4">Recent searches</Text>

            <View className="flex-row flex-wrap">
              {recentSearches.map((search, index) => (
                <TouchableOpacity
                  key={index}
                  className="flex-row items-center mr-3 mb-3 bg-gray-100 rounded-full px-4 py-2"
                >
                  <Ionicons name="time-outline" size={18} color="#777" />
                  <Text className="ml-2 text-gray-700">{search}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Big brands near you */}
          <View className="px-4 py-5 bg-white mt-2">
            <Text className="text-lg font-semibold mb-4">
              Big brands near you
            </Text>

            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ paddingRight: 20 }}
            >
              {brands.map((brand) => (
                <TouchableOpacity key={brand.id} className="items-center mr-5">
                  <View
                    className="w-20 h-20 rounded-lg justify-center items-center mb-2"
                    style={{
                      backgroundColor: [
                        "#e86a33",
                        "#0a1b4d",
                        "#0a4d8c",
                        "#308c5d",
                      ][brand.id - 1],
                    }}
                  >
                    <FontAwesome5 name={brand.logo} size={24} color="white" />
                  </View>
                  <Text className="text-center text-sm">{brand.minutes}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

          {/* Featured vendors */}
          <View className="px-4 py-5 bg-white mt-2 mb-6">
            <Text className="text-lg font-semibold mb-4">
              Featured services
            </Text>

            <View>
              {vendors.map((vendor) => (
                <TouchableOpacity
                  key={vendor.id}
                  className="flex-row py-4 border-b border-gray-100"
                >
                  <View className="w-16 h-16 rounded-lg bg-gray-100 justify-center items-center mr-3">
                    <FontAwesome5
                      name={vendor.logo}
                      size={24}
                      color="#1DCDFE"
                    />
                  </View>
                  <View className="flex-1 justify-center">
                    <View className="flex-row items-center">
                      <Text className="text-yellow-500 text-sm mr-1">
                        ★ {vendor.rating}
                      </Text>
                      <Text className="text-gray-500 text-sm">
                        {vendor.reviews}
                      </Text>
                    </View>
                    <Text className="font-medium mb-1">{vendor.name}</Text>
                    <View className="flex-row items-center">
                      <Ionicons
                        name="time-outline"
                        size={16}
                        color="#777"
                        className="mr-1"
                      />
                      <Text className="text-gray-500 text-sm mr-3">
                        {vendor.minutes}
                      </Text>
                      <Text className="text-gray-500 text-sm">
                        {vendor.price}
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </ScrollView>
      ) : (
        <SearchFilter
          page={page}
          perPage={perPage}
          input={input}
          isDarkMode={isDarkMode}
        />
      )}
    </SafeAreaView>
  );
}

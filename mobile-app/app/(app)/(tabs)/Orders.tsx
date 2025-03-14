import React from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import { useTheme } from "@/ctx/ThemeContext";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import Animated, { FadeIn } from "react-native-reanimated";

type RootStackParamList = {
  Orders: undefined;
  OrderDetails: {
    order: {
      id: string;
      customerName: string;
      location: {
        name: string;
        address: string;
        coordinates: {
          latitude: number;
          longitude: number;
        };
      };
      total: number;
      date: string;
      status: "completed" | "pending" | "cancelled";
    };
  };
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const MOCK_ORDERS = [
  {
    id: "ORD-123456",
    customerName: "John Smith",
    location: {
      name: "Madinaty Store",
      address: "Madinaty, New Cairo, Cairo Governorate",
      coordinates: {
        latitude: 30.0742,
        longitude: 31.647,
      },
    },
    total: 150,
    date: "2024-03-10",
    status: "completed" as const,
  },
  {
    id: "ORD-123457",
    customerName: "John Smith",
    location: {
      name: "Maadi Store",
      address: "Maadi, Cairo Governorate",
      coordinates: {
        latitude: 29.9602,
        longitude: 31.2569,
      },
    },
    total: 200,
    date: "2024-03-09",
    status: "pending" as const,
  },
  {
    id: "ORD-123458",
    customerName: "John Smith",
    location: {
      name: "Tagamoa Store",
      address: "Fifth Settlement, New Cairo",
      coordinates: {
        latitude: 30.0271,
        longitude: 31.462,
      },
    },
    total: 175,
    date: "2024-03-08",
    status: "cancelled" as const,
  },
];

export default function Orders() {
  const { isDarkMode } = useTheme();
  const navigation = useNavigation<NavigationProp>();

  const getStatusText = (status: "completed" | "pending" | "cancelled") => {
    switch (status) {
      case "completed":
        return "Picked Up";
      case "pending":
        return "Ready for Pickup";
      case "cancelled":
        return "Order Cancelled";
      default:
        return status;
    }
  };

  const getStatusDescription = (
    status: "completed" | "pending" | "cancelled"
  ) => {
    switch (status) {
      case "completed":
        return "Order has been collected";
      case "pending":
        return "Your order is ready for collection";
      case "cancelled":
        return "Refund will be processed in 3-5 business days";
      default:
        return "";
    }
  };

  const getStatusColor = (status: "completed" | "pending" | "cancelled") => {
    switch (status) {
      case "completed":
        return "text-green-500";
      case "pending":
        return "text-yellow-500";
      case "cancelled":
        return "text-red-500";
      default:
        return "text-slate-grey";
    }
  };

  const getStatusIcon = (status: "completed" | "pending" | "cancelled") => {
    switch (status) {
      case "completed":
        return "check-circle";
      case "pending":
        return "clock-outline";
      case "cancelled":
        return "close-circle";
    }
  };

  return (
    <View className="flex-1">
      <StatusBar barStyle={isDarkMode ? "light-content" : "dark-content"} />
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

      <SafeAreaView
        className="flex-1"
        edges={["top", "bottom", "left", "right"]}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 40 }}
          overScrollMode="never"
          scrollEventThrottle={16}
        >
          {MOCK_ORDERS.map((order, index) => (
            <Animated.View
              key={order.id}
              entering={FadeIn.delay(index * 200).duration(1000)}
              className={`p-4 rounded-xl mb-4 ${
                isDarkMode ? "bg-slate-grey/80" : "bg-slate-grey/10"
              }`}
            >
              <TouchableOpacity
                onPress={() => navigation.navigate("OrderDetails", { order })}
                className="flex-1"
              >
                <View className="flex-row items-center mb-2">
                  <MaterialCommunityIcons
                    name={getStatusIcon(order.status)}
                    size={24}
                    color={isDarkMode ? "#FFFFFF" : "#17222D"}
                  />
                  <View className="ml-3 flex-1">
                    <Text
                      className={`text-lg font-semibold ${
                        isDarkMode ? "text-white" : "text-coal-black"
                      }`}
                    >
                      {order.id}
                    </Text>
                    <Text
                      className={`${
                        isDarkMode ? "text-white/70" : "text-slate-grey"
                      }`}
                    >
                      {new Date(order.date).toLocaleDateString()}
                    </Text>
                  </View>
                  <Text
                    className={`font-semibold capitalize ${getStatusColor(
                      order.status
                    )}`}
                  >
                    {getStatusText(order.status)}
                  </Text>
                </View>

                <View className="flex-row items-center mt-2">
                  <MaterialCommunityIcons
                    name="map-marker"
                    size={20}
                    color={isDarkMode ? "#FFFFFF70" : "#17222D70"}
                  />
                  <View className="ml-2 flex-1">
                    <Text
                      className={`text-base font-semibold ${
                        isDarkMode ? "text-white" : "text-coal-black"
                      }`}
                    >
                      {order.location.name}
                    </Text>
                    <Text
                      className={`text-sm ${
                        isDarkMode ? "text-white/70" : "text-slate-grey"
                      }`}
                    >
                      {order.location.address}
                    </Text>
                    <Text
                      className={`text-xs mt-1 ${
                        isDarkMode ? "text-white/50" : "text-slate-grey/70"
                      }`}
                    >
                      {getStatusDescription(order.status)}
                    </Text>
                  </View>
                  <MaterialCommunityIcons
                    name="chevron-right"
                    size={24}
                    color={isDarkMode ? "#FFFFFF70" : "#17222D70"}
                  />
                </View>
              </TouchableOpacity>
            </Animated.View>
          ))}
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

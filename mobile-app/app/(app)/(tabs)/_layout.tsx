import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { FontAwesome, MaterialCommunityIcons } from "@expo/vector-icons";
import Home from "./index";
import History from "./History";
import Account from "./Account";
import Search from "@/app/(app)/(tabs)/Search";
import Notifications from "@/app/(app)/(tabs)/Notifications";
import { Entypo } from "@expo/vector-icons";
import QueuePage from "@/app/(app)/(tabs)/Partner";
import i18n from "@/i18n";
import AllCategories from "@/app/(app)/(tabs)/AllCategories";
import Category from "@/app/(app)/(tabs)/Category";
import Settings from "@/app/(app)/(tabs)/Settings";
import AccountInfoSettings from "./AccountInfoSettings";
import NotificationsSettings from "./NotificationSettings";
import SecuritySettings from "./SecuritySettings";
import RegionLanguageSettings from "./RegionalLanguageSettings";
import { Stack } from "expo-router";
import { useTheme } from "@/ctx/ThemeContext";
import Partner from "@/app/(app)/(tabs)/Partner";

const Tab = createBottomTabNavigator();

export default function AppEntry() {
  const { isDarkMode } = useTheme();

  return (
    <NavigationContainer independent>
        <Tab.Navigator
          initialRouteName="Home"
          screenOptions={{
            tabBarActiveTintColor: "#00FFFF",
            tabBarInactiveTintColor: "#FAFAFA",
            headerShown: false,
            tabBarStyle: {
              backgroundColor: "#17222D",
              height: 65,
              display: "flex",
              justifyContent: "space-around",
              paddingBottom: 18,
              paddingTop: 12,
            },
          }}
        >
          <Tab.Screen
            name={i18n.t("home")}
            component={Home}
            options={{
              tabBarIcon: ({ focused }) => (
                <Entypo
                  name="home"
                  size={24}
                  color={focused ? "#00FFFF" : "#FAFAFA"}
                />
              ),
            }}
          />
          <Tab.Screen
            name={i18n.t("history")}
            component={History}
            options={{
              tabBarIcon: ({ focused }) => (
                <FontAwesome
                  name="history"
                  size={24}
                  color={focused ? "#00FFFF" : "#FAFAFA"}
                />
              ),
              headerShown: true,
              headerStyle: {
                backgroundColor: "#17222D",
              },
              headerTitle: i18n.t("past queues"),
              headerTintColor: "white",
              headerTitleAlign: "center",
            }}
          />
          <Tab.Screen
            name={i18n.t("account")}
            component={Account}
            options={{
              tabBarIcon: ({ focused }) => (
                <MaterialCommunityIcons
                  name="account"
                  size={24}
                  color={focused ? "#00FFFF" : "#FAFAFA"}
                />
              ),
            }}
          />
          <Tab.Screen
            name="Search"
            component={Search}
            options={{
              tabBarButton: () => null,
              headerShown: true,
              headerStyle: {
                backgroundColor: "#17222D",
              },
              headerTitle: i18n.t("search queue"),
              headerTintColor: "white",
              headerTitleAlign: "center",
            }}
          />
          <Tab.Screen
            name="Notifications"
            component={Notifications}
            options={{
              tabBarButton: () => null,
              headerShown: true,
              headerStyle: {
                backgroundColor: "#17222D",
              },
              headerTitle: i18n.t("notifications"),
              headerTintColor: "white",
              headerTitleAlign: "center",
            }}
          />
          <Tab.Screen
            name="Partner"
            component={Partner}
            options={{
              tabBarButton: () => null,
              headerShown: false,
              headerStyle: {
                backgroundColor: "#17222D",
              },
              headerTintColor: "white",
              headerTitleAlign: "center",
            }}
          />
          <Tab.Screen
            name="Category"
            component={Category}
            options={{
              tabBarButton: () => null,
              headerShown: true,
              headerStyle: {
                backgroundColor: "#17222D",
              },
              headerTintColor: "white",
              headerTitleAlign: "center",
            }}
          />
          <Tab.Screen
            name="AllCategories"
            component={AllCategories}
            options={{
              tabBarButton: () => null,
              headerShown: true,
              headerStyle: {
                backgroundColor: "#17222D",
              },
              headerTitle: i18n.t("allCategories"),
              headerTintColor: "white",
              headerTitleAlign: "center",
            }}
          />
          <Tab.Screen
            name="Settings"
            component={Settings}
            options={{
              tabBarButton: () => null,
              headerShown: true,
              headerStyle: {
                backgroundColor: "#17222D",
              },
              headerTitle: i18n.t("settings"),
              headerTintColor: "white",
              headerTitleAlign: "center",
            }}
          />
          <Tab.Screen
            name="AccountInfoSettings"
            component={AccountInfoSettings}
            options={{
              tabBarButton: () => null,
              headerShown: true,
              headerStyle: {
                backgroundColor: "#17222D",
              },
              headerTitle: i18n.t("settings"),
              headerTintColor: "white",
              headerTitleAlign: "center",
            }}
          />
          <Tab.Screen
            name="NotificationSettings"
            component={NotificationsSettings}
            options={{
              tabBarButton: () => null,
              headerShown: true,
              headerStyle: {
                backgroundColor: "#17222D",
              },
              headerTitle: i18n.t("settings"),
              headerTintColor: "white",
              headerTitleAlign: "center",
            }}
          />
          <Tab.Screen
            name="SecuritySettings"
            component={SecuritySettings}
            options={{
              tabBarButton: () => null,
              headerShown: true,
              headerStyle: {
                backgroundColor: "#17222D",
              },
              headerTitle: i18n.t("settings"),
              headerTintColor: "white",
              headerTitleAlign: "center",
            }}
          />
          <Tab.Screen
            name="RegionLanguageSettings"
            component={RegionLanguageSettings}
            options={{
              tabBarButton: () => null,
              headerShown: true,
              headerStyle: {
                backgroundColor: "#17222D",
              },
              headerTitle: i18n.t("settings"),
              headerTintColor: "white",
              headerTitleAlign: "center",
            }}
          />
        </Tab.Navigator>
    </NavigationContainer>
  );
}
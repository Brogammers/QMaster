import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { FontAwesome, MaterialCommunityIcons } from "@expo/vector-icons";
import Home from "./index";
import History from "./History";
import Account from "./Account";
import Search from "@/app/Search";
import Notifications from "@/app/Notifications";
import { Entypo } from "@expo/vector-icons";
import BrandsList from "@/app/BrandsList";
import QueuePage from "@/app/QueuePage";
import i18n from "@/i18n";

const Tab = createBottomTabNavigator();

export default function AppEntry() {
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
            name="Home"
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
            name="History"
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
              headerTitle: "Past Queues",
              headerTintColor: "white",
              headerTitleAlign: "center",
            }}
          />
          <Tab.Screen
            name="Account"
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
              headerTitle: "Search Queue",
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
              headerTitle: "Notifications",
              headerTintColor: "white",
              headerTitleAlign: "center",
            }}
          />
          <Tab.Screen
            name="Brands"
            component={BrandsList}
            options={{
              tabBarButton: () => null,
              headerShown: true,
              headerStyle: {
                backgroundColor: "#17222D",
              },
              headerTitle: i18n.t("entities"),
              headerTintColor: "white",
              headerTitleAlign: "center",
            }}
          />
          <Tab.Screen
            name="QueuePage"
            component={QueuePage}
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
        </Tab.Navigator>
    </NavigationContainer>
  );
}
import React, { useEffect, useState } from "react";
import { Text, View, StatusBar, Dimensions } from "react-native";
import AccountPageItems from "@/components/AccountPageItems";
import { SafeAreaView } from "react-native-safe-area-context";
import AccountPageProfile from "@/components/AccountPageProfile";
import { ScrollView } from "react-native-gesture-handler";
import { useSelector } from "react-redux";
import { RootState } from "@/app/redux/store";
import { Skeleton } from "moti/skeleton";
import { MotiView } from "moti";
import { LinearGradient } from "expo-linear-gradient";
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width } = Dimensions.get('window');

export default function Account() {
  const [isLoading, setIsLoading] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const colorMode = isDarkMode ? 'dark' : 'light';

  const firstName = useSelector((state: RootState) => state.username.username)?.split(' ')[0];

  useEffect(() => {
    const loadTheme = async () => {
      try {
        const savedTheme = await AsyncStorage.getItem('theme');
        setIsDarkMode(savedTheme === 'dark');
      } catch (error) {
        console.log('Error loading theme:', error);
      }
    };
    loadTheme();
  }, []);

  useEffect(() => {
    if (typeof firstName === "string") {
      setIsLoading(false);
    }
  }, [firstName]);

  const handleThemeToggle = async () => {
    try {
      const newTheme = !isDarkMode;
      await AsyncStorage.setItem('theme', newTheme ? 'dark' : 'light');
      setIsDarkMode(newTheme);
    } catch (error) {
      console.log('Error saving theme:', error);
    }
  };

  return (
    <SafeAreaView className={`flex-1 ${isDarkMode ? 'bg-ocean-blue' : 'bg-off-white'}`}>
      <StatusBar translucent barStyle={isDarkMode ? "light-content" : "dark-content"} />
      {!isDarkMode && (
        <LinearGradient
          colors={['rgba(0, 119, 182, 0.1)', 'rgba(255, 255, 255, 0)']}
          className="absolute top-0 w-full h-64"
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
        />
      )}
      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 40 }}
        className="flex-1"
      >
        <MotiView
          from={{ opacity: 0, translateY: 20 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{
            mass: 0.8,
            damping: 15,
          }}
          className="flex-1"
        >
          <AccountPageProfile isDarkMode={isDarkMode} />
          
          <View className="px-6">
            <MotiView
              from={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                mass: 0.8,
                damping: 15,
              }}
            >
              <Skeleton
                colorMode={colorMode}
                width={width * 0.7}
                height={35}
              >
                {isLoading ? null : (
                  <Text className={`pb-4 text-3xl font-extrabold ${isDarkMode ? 'text-baby-blue' : 'text-ocean-blue'}`}>
                    Hi {firstName &&
                      firstName.charAt(0).toUpperCase() + firstName.slice(1)
                    }! 👋
                  </Text>
                )}
              </Skeleton>
              
              <Text className={`mt-2 mb-6 text-sm ${isDarkMode ? 'text-slight-slate-grey' : 'text-slate-grey'}`}>
                Manage your account settings and preferences
              </Text>
            </MotiView>

            <AccountPageItems isDarkMode={isDarkMode} onThemeToggle={handleThemeToggle} />
          </View>
        </MotiView>
      </ScrollView>
    </SafeAreaView>
  );
}
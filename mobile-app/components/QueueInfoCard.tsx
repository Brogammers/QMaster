import React, { useEffect, useState } from "react";
import { Text, View, Image, Dimensions, TouchableOpacity } from 'react-native';
import QueueBackground from '@/assets/images/QueueBackground.png';
import AccessTime from '@/assets/images/accessTime.svg';
import { QueueInfoCardProps } from "@/types";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { MotiView } from 'moti';
import { useTheme } from '@/ctx/ThemeContext';
import { useLinkTo } from "@react-navigation/native";
import { LinearGradient } from 'expo-linear-gradient';
import { router } from "expo-router";
import configConverter from "@/api/configConverter";
import axios from "axios";

const { height } = Dimensions.get('window')
const twoFifth = height * 38 / 100

export default function QueueInfoCard(props: QueueInfoCardProps) {
  const { name, image } = props;
  const { isDarkMode } = useTheme();
  const linkTo = useLinkTo();
  const [hasStore, setHasStore] = useState(true); // For demo purposes

  const handleStorePress = () => {
    linkTo('/Store');
    router.setParams({ 
      brandName: name, 
    });
  };

  useEffect(() => {
    const url = configConverter("EXPO_PUBLIC_API_BASE_URL_HAS_STORE");
    axios.get(`${url}?businessName=${name}`)
    .then((response) => {
      if(response.status === 200) {
        return response.data.access;
      } else {
        throw new Error("Error: ", response.data);
      } 
    })
    .then((data: boolean) => {
      setHasStore(data);
    })
    .catch((error) => {
      console.error("Error: ", error);
      setHasStore(false);
    })
  }, []);

  return (
    <View className="justify-end w-screen relative"
      style={{ height: twoFifth }}
    >
      <Image source={QueueBackground} className="absolute top-0 w-screen h-5/6" />
      
      {/* Store Icon */}
      {hasStore && (
        <TouchableOpacity 
          onPress={handleStorePress}
          className="absolute top-14 right-6 z-50"
        >
          <MotiView
            from={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 300 }}
          >
            <LinearGradient
              colors={
                isDarkMode 
                  ? ['rgba(23, 34, 45, 0.7)', 'rgba(26, 26, 26, 0.7)']
                  : ['rgba(23, 34, 45, 0.7)', 'rgba(26, 26, 26, 0.7)']
              }
              className="rounded-full p-2.5"
              style={{
                borderWidth: 1,
                borderColor: isDarkMode ? 'rgba(0, 255, 255, 0.3)' : 'rgba(0, 255, 255, 0.3)',
              }}
            >
              <MaterialCommunityIcons
                name="store"
                size={28}
                color="#00FFFF"
              />
            </LinearGradient>
          </MotiView>
        </TouchableOpacity>
      )}

      <View 
        className={`w-4/5 self-center h-1/2 rounded-sxl flex flex-row justify-center items-center ${!isDarkMode && 'bg-ocean-blue'}`}
        style={isDarkMode ? {
          backgroundColor: 'rgba(23, 34, 45, 0.7)',
          borderWidth: 1.5,
          borderColor: 'rgba(29, 205, 254, 0.25)',
        } : undefined}
      >
        <View className="justify-center h-full">
          <Image
            source={image}
            style={{
              height: '60%',
              aspectRatio: 1,
              borderRadius: 18,
              marginRight: 25,
            }}
          />
        </View>
        <View className="justify-between h-3/5">
          <View>
            <Text className="text-2xl font-black text-white">
              {name}
            </Text>
            <Text className={`text-base ${isDarkMode ? 'text-baby-blue' : 'text-slight-slate-grey'}`}>
              Grocery
            </Text>
          </View>
          <View className="flex-row gap-x-1.5">
            <AccessTime />
            <Text className="text-white">
              Fast
            </Text>
            <Text className={isDarkMode ? 'text-white' : 'text-slight-slate-grey'}>
              (224 ratings)
            </Text>
          </View>
        </View>
      </View>
    </View>
  )
}
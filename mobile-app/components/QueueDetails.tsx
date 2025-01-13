import React, { useState } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  Dimensions,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Wandering from "@/assets/images/wandering.svg";
import { FontAwesome } from "@expo/vector-icons";
import { QueueDetailsProps } from "@/types";
import { Entypo } from "@expo/vector-icons";
import { useTheme } from '@/ctx/ThemeContext';
import { LinearGradient } from 'expo-linear-gradient';
import { MotiView } from 'moti';

export default function QueueDetails(props: QueueDetailsProps) {
  const width = Dimensions.get('window').width * 0.85;
  const [leave, setLeave] = useState(false);
  const { branch } = props;
  const { isDarkMode } = useTheme();

  const handleLeaveQueue = () => {
    Alert.alert(
      "Leave Queue?",
      "Once you leave, your position in the queue wil be lost.",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Leave",
          onPress: () => setLeave(false),
        },
      ]
    );
  };

  const CardWrapper = ({ children }: { children: React.ReactNode }) => (
    <View style={{ width }} className="mt-6 self-center">
      <LinearGradient
        colors={
          isDarkMode 
            ? ['rgba(29, 205, 254, 0.1)', 'rgba(29, 205, 254, 0.05)']
            : ['#FFFFFF', '#F8FAFC']
        }
        className="w-full p-8 items-center justify-center rounded-xl relative"
        style={{
          borderWidth: 1.5,
          borderColor: isDarkMode ? 'rgba(29, 205, 254, 0.2)' : '#E5E7EB',
          minHeight: 180,
        }}
      >
        {children}
      </LinearGradient>
    </View>
  );

  return (
    <CardWrapper>
      {branch == -1 ? (
        <MotiView
          from={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="items-center w-full"
        >
          <View className="flex-row items-start justify-between w-full">
            <View className="items-center flex-1 mr-4">
              <Entypo 
                name="location-pin" 
                size={50} 
                color={isDarkMode ? "#1DCDFE" : "#B41818"} 
              />
              <Text className={`text-center mt-3.5 text-base ${isDarkMode ? 'text-baby-blue' : 'text-lava-black'}`}>
                Please insert location or allow the app to access your location from settings.
              </Text>
            </View>
            <View className="absolute -bottom-14 right-0 z-[9999px]">
              <Wandering width={70} height={70} />
            </View>
          </View>
        </MotiView>
      ) : !leave ? (
        <MotiView
          from={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="items-center"
        >
          <View className="items-center">
            <Text className={`text-2xl font-medium ${isDarkMode ? 'text-baby-blue' : 'text-lava-black'}`}>
              7 people in queue
            </Text>
            <View className="flex-row items-center mt-1">
              <MaterialCommunityIcons
                name="timer-sand-complete"
                size={20}
                color={isDarkMode ? "#1DCDFE" : "#444444"}
              />
              <Text className={`text-base ml-2 ${isDarkMode ? 'text-baby-blue' : 'text-lava-black'}`}>
                ~18 min
              </Text>
            </View>
          </View>
          
          <TouchableOpacity
            className="mt-8"
            onPress={() => setLeave(true)}
          >
            <LinearGradient
              colors={['#1DCDFE', '#0077B6']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              className="px-8 py-3 rounded-xl"
            >
              <Text className="text-xl font-bold text-white">
                Join Queue
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        </MotiView>
      ) : (
        <MotiView
          from={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="items-center"
        >
          <View className="items-center">
            <Text className={`text-2xl font-medium ${isDarkMode ? 'text-baby-blue' : 'text-lava-black'}`}>
              7 people in queue
            </Text>
            <View className="flex-row items-center mt-1">
              <MaterialCommunityIcons
                name="timer-sand-complete"
                size={20}
                color={isDarkMode ? "#1DCDFE" : "#444444"}
              />
              <Text className={`text-base ml-2 ${isDarkMode ? 'text-baby-blue' : 'text-lava-black'}`}>
                ~18 min
              </Text>
            </View>
          </View>
          
          <View className="items-center w-full mt-8">
            <View className="flex-row items-center justify-center w-3/5 relative h-12 mb-4">
              <View
                style={{
                  position: "absolute",
                  left: 0,
                  zIndex: 100,
                  width: 44,
                  height: 44,
                  borderRadius: 22,
                  overflow: "hidden",
                  backgroundColor: isDarkMode ? '#17222D' : 'white',
                  alignItems: "flex-end",
                }}
              >
                <FontAwesome name="check-circle" size={44} color="#1DCDFE" />
              </View>

              <LinearGradient
                colors={
                  isDarkMode 
                    ? ['rgba(29, 205, 254, 0.2)', 'rgba(29, 205, 254, 0.1)']
                    : ['#F1F5F9', '#F8FAFC']
                }
                className="w-full rounded-full h-4/5 flex justify-center items-center"
              >
                <Text className="text-baby-blue text-base text-center font-medium">
                  Queue Joined!
                </Text>
              </LinearGradient>
            </View>
            
            <TouchableOpacity
              onPress={() => handleLeaveQueue()}
              className="mt-2"
            >
              <LinearGradient
                colors={['#EF4444', '#B91C1C']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                className="px-8 py-3 rounded-xl"
              >
                <Text className="text-xl font-bold text-white">
                  Leave Queue
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </MotiView>
      )}
    </CardWrapper>
  );
}

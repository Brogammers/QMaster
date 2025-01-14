import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  Dimensions,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { QueueDetailsProps } from "@/types";
import { Entypo } from "@expo/vector-icons";
import { useTheme } from '@/ctx/ThemeContext';
import { LinearGradient } from 'expo-linear-gradient';
import { MotiView } from 'moti';

export default function QueueDetails(props: QueueDetailsProps) {
  const width = Dimensions.get('window').width * 0.85;
  const buttonWidth = width * 0.7;
  const [leave, setLeave] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const { branch } = props;
  const { isDarkMode } = useTheme();

  useEffect(() => {
    if (leave) {
      setShowDetails(false);
      const timer = setTimeout(() => {
        setShowDetails(true);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [leave]);

  const handleLeaveQueue = () => {
    Alert.alert(
      "Leave Queue?",
      "Once you leave, your position in the queue wil be lost.",
      [
        {
          text: "Cancel",
          style: "default",
          isPreferred: true,
        },
        {
          text: "Leave",
          style: "destructive",
          onPress: () => setLeave(false),
        },
      ],
      {
        cancelable: true,
      }
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
        className="w-full p-6 items-center justify-center rounded-xl"
        style={{
          borderWidth: 1.5,
          borderColor: isDarkMode ? 'rgba(29, 205, 254, 0.2)' : '#E5E7EB',
          minHeight: 160,
        }}
      >
        {children}
      </LinearGradient>
    </View>
  );

  const QueueJoinedAnimation = () => (
    <MotiView
      from={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        type: "spring",
        mass: 0.8,
        damping: 15
      }}
      className="items-center justify-center w-full"
      style={{ height: 100 }}
    >
      <View 
        className="flex-row items-center justify-center bg-opacity-10 rounded-full px-6 py-3"
        style={{ 
          backgroundColor: isDarkMode ? 'rgba(29, 205, 254, 0.1)' : 'rgba(0, 119, 182, 0.1)',
          width: buttonWidth 
        }}
      >
        <View className="flex-row items-center justify-center">
          <FontAwesome name="check-circle" size={24} color="#1DCDFE" />
          <Text className="text-baby-blue text-xl font-bold ml-3">
            Queue Joined!
          </Text>
        </View>
      </View>
    </MotiView>
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
            <View className="items-center flex-1">
              <Entypo 
                name="location-pin" 
                size={40} 
                color={isDarkMode ? "#1DCDFE" : "#B41818"} 
              />
              <Text className={`text-center mt-2 text-sm ${isDarkMode ? 'text-baby-blue' : 'text-lava-black'}`}>
                Please insert location or allow the app to access your location from settings.
              </Text>
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
            <Text className={`text-2xl font-bold ${isDarkMode ? 'text-baby-blue' : 'text-lava-black'}`}>
              7 people in queue
            </Text>
            <View className="flex-row items-center mt-3 bg-opacity-10 rounded-full px-3 py-1.5" 
              style={{ backgroundColor: isDarkMode ? 'rgba(29, 205, 254, 0.1)' : 'rgba(0, 119, 182, 0.1)' }}>
              <MaterialCommunityIcons
                name="timer-sand"
                size={18}
                color={isDarkMode ? "#1DCDFE" : "#0077B6"}
              />
              <Text className={`text-base ml-2 font-medium ${isDarkMode ? 'text-baby-blue' : 'text-ocean-blue'}`}>
                ~18 min
              </Text>
            </View>
          </View>
          
          <TouchableOpacity
            className="mt-8 w-full"
            onPress={() => setLeave(true)}
          >
            <View style={{ width: buttonWidth }} className="items-center">
              <LinearGradient
                colors={['#1DCDFE', '#0077B6']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                className="w-full py-3 rounded-lg items-center px-12"
              >
                <Text className="text-lg font-bold text-white">
                  Join Queue
                </Text>
              </LinearGradient>
            </View>
          </TouchableOpacity>
        </MotiView>
      ) : (
        <View className="items-center">
          {!showDetails ? (
            <QueueJoinedAnimation />
          ) : (
            <MotiView
              from={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ type: "timing", duration: 300 }}
              className="items-center"
            >
              <View className="items-center">
                <Text className={`text-2xl font-bold ${isDarkMode ? 'text-baby-blue' : 'text-lava-black'}`}>
                  7 people in queue
                </Text>
                <View className="flex-row items-center mt-3 bg-opacity-10 rounded-full px-3 py-1.5" 
                  style={{ backgroundColor: isDarkMode ? 'rgba(29, 205, 254, 0.1)' : 'rgba(0, 119, 182, 0.1)' }}>
                  <MaterialCommunityIcons
                    name="timer-sand"
                    size={18}
                    color={isDarkMode ? "#1DCDFE" : "#0077B6"}
                  />
                  <Text className={`text-base ml-2 font-medium ${isDarkMode ? 'text-baby-blue' : 'text-ocean-blue'}`}>
                    ~18 min
                  </Text>
                </View>
              </View>
              
              <View className="items-center w-full mt-8">
                <View className="flex-row items-center justify-center w-full relative h-9 mb-6">
                  <LinearGradient
                    colors={
                      isDarkMode 
                        ? ['rgba(29, 205, 254, 0.2)', 'rgba(29, 205, 254, 0.1)']
                        : ['#F1F5F9', '#F8FAFC']
                    }
                    className="w-full rounded-full h-full flex-row items-center justify-center px-3"
                    style={{
                      borderWidth: 1.5,
                      borderColor: isDarkMode ? 'rgba(29, 205, 254, 0.2)' : '#E5E7EB',
                    }}
                  >
                    <View className="flex-row items-center">
                      <FontAwesome name="check-circle" size={18} color="#1DCDFE" />
                      <Text className="text-baby-blue text-base font-medium ml-2">
                        Queue Joined!
                      </Text>
                    </View>
                  </LinearGradient>
                </View>
                
                <View style={{ width: buttonWidth }} className="items-center">
                  <TouchableOpacity
                    onPress={() => handleLeaveQueue()}
                    className="w-full"
                  >
                    <LinearGradient
                      colors={['#EF4444', '#B91C1C']}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 1 }}
                      className="py-3 rounded-lg items-center px-12"
                    >
                      <Text className="text-lg font-bold text-white">
                        Leave Queue
                      </Text>
                    </LinearGradient>
                  </TouchableOpacity>
                </View>
              </View>
            </MotiView>
          )}
        </View>
      )}
    </CardWrapper>
  );
}

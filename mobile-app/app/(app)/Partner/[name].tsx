import React from 'react';
import { View, Text, ScrollView, Image } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { useTheme } from '@/ctx/ThemeContext';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useLinkTo } from '@react-navigation/native';

// Static data for demo
const staticPartnerData = {
  name: "Carrefour",
  image: require('../../../assets/images/Carrefour.png'),
  rating: 4.5,
  totalRatings: 1250,
  address: "New Cairo, Road 90",
  openingHours: "9:00 AM - 11:00 PM",
  description: "Your one-stop shop for groceries, household items, and more. We offer a wide range of products at competitive prices.",
  queues: [
    { name: "Regular Checkout", waitTime: 15, peopleAhead: 8 },
    { name: "Express Checkout", waitTime: 5, peopleAhead: 3 },
    { name: "Customer Service", waitTime: 20, peopleAhead: 12 }
  ]
};

export default function PartnerScreen() {
  const { name } = useLocalSearchParams();
  const { isDarkMode } = useTheme();
  const linkTo = useLinkTo();

  const handleReturn = () => {
    linkTo("/");
  };

  return (
    <View className={`flex-1 ${isDarkMode ? 'bg-slate-900' : 'bg-off-white'}`}>
      <LinearGradient
        colors={['#17222D', '#13404D']}
        className="pt-14 pb-4 px-5"
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <View className="flex-row items-center justify-between">
          <TouchableOpacity onPress={handleReturn} className="p-2">
            <Ionicons name="arrow-back" size={24} color="#fff" />
          </TouchableOpacity>
          <Text className="text-2xl font-bold text-white flex-1 ml-4">
            {decodeURIComponent(name as string)}
          </Text>
        </View>
      </LinearGradient>

      <ScrollView className="flex-1 px-5" showsVerticalScrollIndicator={false}>
        <View className={`rounded-xl p-4 mt-4 ${isDarkMode ? 'bg-slate-700/80' : 'bg-white'}`}>
          <View className="flex-row items-center">
            <Image
              source={staticPartnerData.image}
              className="w-20 h-20 rounded-xl"
            />
            <View className="ml-4 flex-1">
              <View className="flex-row items-center">
                <Ionicons name="star" size={16} color="#FFD700" />
                <Text className={`ml-1 ${isDarkMode ? 'text-white' : 'text-coal-black'}`}>
                  {staticPartnerData.rating} ({staticPartnerData.totalRatings})
                </Text>
              </View>
              <Text className={`mt-1 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                {staticPartnerData.address}
              </Text>
              <Text className={`mt-1 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                {staticPartnerData.openingHours}
              </Text>
            </View>
          </View>

          <Text className={`mt-4 ${isDarkMode ? 'text-white' : 'text-coal-black'}`}>
            {staticPartnerData.description}
          </Text>
        </View>

        <Text className={`text-xl font-bold mt-6 mb-4 ${isDarkMode ? 'text-white' : 'text-coal-black'}`}>
          Available Queues
        </Text>

        {staticPartnerData.queues.map((queue, index) => (
          <TouchableOpacity
            key={index}
            className={`rounded-xl p-4 mb-4 ${isDarkMode ? 'bg-slate-700/80' : 'bg-white'}`}
          >
            <Text className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-coal-black'}`}>
              {queue.name}
            </Text>
            <View className="flex-row justify-between mt-2">
              <View className="flex-row items-center">
                <Ionicons name="time-outline" size={16} color={isDarkMode ? "#E5E7EB" : "#666"} />
                <Text className={`ml-1 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  ~{queue.waitTime} mins
                </Text>
              </View>
              <View className="flex-row items-center">
                <Ionicons name="people-outline" size={16} color={isDarkMode ? "#E5E7EB" : "#666"} />
                <Text className={`ml-1 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  {queue.peopleAhead} ahead
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
} 
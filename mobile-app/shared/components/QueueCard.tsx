import React from 'react';
import { View, Text, Image, TouchableOpacity, ImageSourcePropType } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import i18n from '@/i18n';

interface QueueCardProps {
  name: string;
  image: ImageSourcePropType;
  time: number;
  people: number;
  onPress: () => void;
  isDarkMode?: boolean;
}

export default function QueueCard({ name, image, time, people, onPress, isDarkMode }: QueueCardProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      className={`rounded-2xl p-4 mb-4 ${isDarkMode ? 'bg-slate-700/80' : 'bg-white'}`}
    >
      <View className="flex-row items-center justify-between">
        <View className="flex-row items-center flex-1">
          <Image
            source={image}
            className="w-16 h-16 rounded-2xl"
          />
          <View className="ml-4 flex-1">
            <Text className={`text-lg font-bold mb-1 ${isDarkMode ? 'text-white' : 'text-coal-black'}`}>{name}</Text>
            <View className="flex-row items-center justify-between">
              <View className="flex-row items-center">
                <MaterialIcons name="access-time" size={16} color={isDarkMode ? "#E5E7EB" : "#666"} />
                <Text className={`text-sm ml-1 ${isDarkMode ? 'text-gray-200' : 'text-gray-600'}`}>
                  ~{time} {i18n.t('QueueCard.minutes')}
                </Text>
              </View>
              <View className="flex-row items-center">
                <MaterialIcons name="people" size={16} color={isDarkMode ? "#E5E7EB" : "#666"} />
                <Text className={`text-sm ml-1 ${isDarkMode ? 'text-gray-200' : 'text-gray-600'}`}>
                  {people} {i18n.t('QueueCard.people')}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
} 
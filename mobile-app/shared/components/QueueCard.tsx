import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import i18n from '@/i18n';

interface QueueCardProps {
  name: string;
  image: any;
  time: number;
  people: number;
  onPress: () => void;
}

export default function QueueCard({ name, image, time, people, onPress }: QueueCardProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      className="bg-white rounded-2xl p-4 mb-4"
    >
      <View className="flex-row items-center justify-between">
        <View className="flex-row items-center flex-1">
          <Image
            source={image}
            className="w-16 h-16 rounded-2xl"
          />
          <View className="ml-4 flex-1">
            <Text className="text-lg font-bold text-coal-black mb-1">{name}</Text>
            <View className="flex-row items-center justify-between">
              <View className="flex-row items-center">
                <MaterialIcons name="access-time" size={16} color="#666" />
                <Text className="text-sm text-gray-600 ml-1">
                  ~{time} {i18n.t('QueueCard.minutes')}
                </Text>
              </View>
              <View className="flex-row items-center">
                <MaterialIcons name="people" size={16} color="#666" />
                <Text className="text-sm text-gray-600 ml-1">
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
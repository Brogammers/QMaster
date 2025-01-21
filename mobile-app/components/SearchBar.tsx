import React from 'react';
import { I18nManager, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { View, Text } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useLinkTo } from '@react-navigation/native';
import i18n from '@/i18n';

interface SearchBarProps {
  isDarkMode?: boolean;
}

export default function SearchBar({ isDarkMode }: SearchBarProps) {
  const linkTo = useLinkTo();

  const handleSearchPress = () => {
    linkTo('/Search'); 
  };

  return (
    <TouchableOpacity
      className={`h-11 border-2 rounded-3xl mt-7 mb-4 px-4 py-2 flex justify-center ${
        isDarkMode ? 'border-slate-700' : 'border-rock-stone'
      }`}
      onPress={handleSearchPress}
    >
      <View className={`${I18nManager.isRTL ? `flex-row-reverse justify-between` : `flex-row`} items-center`}>
        <FontAwesome 
          name="search" 
          size={24} 
          color={isDarkMode ? "#fff" : "#000"} 
          className={`${I18nManager.isRTL && `pl-4`}`} 
        />
        <Text className={`ml-2.5 ${isDarkMode ? 'text-white' : 'text-coal-black'}`}>
          {i18n.t('search')}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

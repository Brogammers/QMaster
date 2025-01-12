import React from 'react';
import { Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { AntDesign } from '@expo/vector-icons';
import i18n from '@/i18n';

interface FrequentlyAskedProps {
  isDarkMode?: boolean;
}

export default function FrequentlyAsked({ isDarkMode }: FrequentlyAskedProps) {
  return (
    <TouchableOpacity 
      className={`flex flex-row items-center self-center justify-between w-full h-10 px-5 mt-6 mb-6 rounded-lg ${
        isDarkMode ? 'bg-slate-700/80 border border-slate-700' : 'bg-white'
      }`}
    >
      <Text className={`font-semibold ${isDarkMode ? 'text-white' : 'text-coal-black'}`}>
        {i18n.t("faq")}
      </Text>
      <AntDesign 
        name="caretright" 
        size={15} 
        color={isDarkMode ? "#ffffff" : "#444"} 
      />
    </TouchableOpacity>
  )
}
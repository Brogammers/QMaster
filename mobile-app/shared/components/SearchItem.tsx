import React from 'react';
import { I18nManager, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Image from 'react-native-remote-svg';
import { FontAwesome6 } from '@expo/vector-icons';
import { SearchItemProps } from '@/types';
import { AntDesign } from '@expo/vector-icons';
import { useLinkTo } from '@react-navigation/native';

interface ExtendedSearchItemProps extends SearchItemProps {
  isDarkMode?: boolean;
}

export default function SearchItem(props: ExtendedSearchItemProps) {
  const { image, title, isPopular, isAccount, icon, onPress, isDarkMode = true } = props;
  const linkTo = useLinkTo();

  const handlePress = () => {
    if (onPress) {
      onPress();
    } else if (!isAccount) {
      linkTo(`/Partner?brandName=${encodeURIComponent(title)}&image=${encodeURIComponent(image)}`);
    }
  };

  const iconColor = isDarkMode ? "#1DCDFE" : "#17222D";

  return (
    <TouchableOpacity
      className={`w-full ${isAccount ? 'py-4 px-4' : 'py-2'} ${
        isDarkMode ? 'border-baby-blue/20' : 'border-lite-grey'
      } ${!isAccount && 'border-b-2'}`}
      onPress={handlePress}
    >
      <View className={`flex-row items-center justify-between w-full`}>
        {isAccount ? (
          <View className="flex-row items-center">
            <FontAwesome6 
              name={icon} 
              size={22} 
              color={iconColor}
              className="rounded-sm w-7 h-7" 
            />
            <Text className={`ml-5 text-base font-medium ${isDarkMode ? 'text-baby-blue' : 'text-ocean-blue'}`}>
              {title}
            </Text>
          </View>
        ) : (
          <View className="flex-row items-center">
            <Image 
              source={image} 
              className="rounded-sm w-7 h-7" 
            />
            <Text className={`ml-5 text-sm ${isDarkMode ? 'text-baby-blue' : 'text-concrete-turquoise'}`}>
              {title}
            </Text>
          </View>
        )}
        {isAccount ? (
          <AntDesign 
            name={I18nManager.isRTL ? "caretleft" : "caretright"} 
            size={18} 
            color={iconColor}
          />
        ) : (
          isPopular && 
            <FontAwesome6 
              name="arrow-up-right-dots" 
              size={24} 
              color={isDarkMode ? "#1DCDFE" : "#17222D"}
            />
        )}
      </View>
    </TouchableOpacity>
  );
}

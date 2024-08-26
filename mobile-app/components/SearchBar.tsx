import React from 'react';
import { I18nManager, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { View, Text } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useLinkTo } from '@react-navigation/native';
import i18n from '@/i18n';

export default function SearchBar() {
  const linkTo = useLinkTo();

  const handleSearchPress = () => {
    linkTo('/Search'); 
  };

  return (
    <TouchableOpacity
      className="h-11 border-2 rounded-3xl border-rock-stone mt-7 mb-4 px-4 py-2 flex justify-center"
      onPress={handleSearchPress}
    >
      <View className={`${I18nManager.isRTL ? `flex-row-reverse justify-between` : `flex-row`} items-center`}>
        <FontAwesome name="search" size={24} color="black" className={`${I18nManager.isRTL && `pl-4`}`} />
        <Text style={{ marginLeft: 10 }}>{i18n.t('search')}</Text>
      </View>
    </TouchableOpacity>
  );
}

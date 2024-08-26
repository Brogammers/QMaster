import React, { useState } from 'react';
import { StyleSheet, TextInput, ScrollView, I18nManager, View } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import RecentItemsSearch from '@/components/RecentItemsSearch';
import PopularQueues from '@/components/PopularQueues';
import SearchFilter from '@/components/SearchFilter';
import { Current } from '@/constants';
import i18n from '@/i18n';

export default function Search() {
  const [input, setInput] = useState("");

  return (
    <View className='bg-off-white flex-1'>
      <View className='w-10/12 self-center'>
        <View className={`h-11 border-2 rounded-lg border-rock-stone mt-7 mb-4 px-4 py-2 flex-row items-center ${I18nManager.isRTL ? "flex-row-reverse" : "flex-row"}`}>
          <FontAwesome name="search" size={24} color="black" />
          <TextInput
            placeholder={i18n.t('search')}
            autoFocus={true}
            value={input}
            onChangeText={(text) => setInput(text)}
            className={`flex-1 ${I18nManager.isRTL ? "text-right mr-2" : "text-left ml-2"}`}
            style={{ textAlign: I18nManager.isRTL ? 'right' : 'left' }}
          />
        </View>

        {input.length == 0 ? (
          <ScrollView showsVerticalScrollIndicator={false}>
            <RecentItemsSearch />
            <PopularQueues />
          </ScrollView>
        ) : (
          <SearchFilter data={Current} input={input} />
        )}
      </View>
    </View>
  )
}

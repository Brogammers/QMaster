import React from 'react';
import { Text, View } from 'react-native';
import { Current } from '@/constants';
import SearchItem from '../shared/components/SearchItem';
import i18n from '@/i18n';

export default function RecentItemsSearch() {
  return (
    <View>
      <Text className='my-3 text-lg font-semibold'>{i18n.t("searchPage.recentQueues")}</Text>
      <View>
        {Current.slice(0, 5).map((recent, index) => (
          <SearchItem image={recent.image} title={recent.name} key={index} />
        ))}
      </View>
    </View>
  )
}
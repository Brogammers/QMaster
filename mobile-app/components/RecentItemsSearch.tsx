import React from 'react';
import { I18nManager, Text, View } from 'react-native';
import { Current } from '@/constants';
import SearchItem from '../shared/components/SearchItem';
import i18n from '@/i18n';

export default function RecentItemsSearch() {
  return (
    <View>
      <Text className="my-3 text-lg font-semibold text-left">{i18n.t("searchPage.recentQueues")}</Text>
      <View>
        {Current.slice(0, 5).map((recent, index) => (
          <SearchItem 
            key={index}
            image={recent.image} 
            title={recent.name} 
            isPopular={false}
            isAccount={false}
          />
        ))}
      </View>
    </View>
  );
}
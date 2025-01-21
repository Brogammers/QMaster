import React from 'react';
import { I18nManager, Text, View } from 'react-native';
import { Current } from '@/constants';
import SearchItem from '@/shared/components/SearchItem';
import i18n from '@/i18n';

interface PopularQueuesProps {
  isDarkMode?: boolean;
}

export default function PopularQueues({ isDarkMode }: PopularQueuesProps) {
  return (
    <View>
      <Text className={`my-3 text-lg font-semibold text-left ${isDarkMode ? 'text-baby-blue' : 'text-coal-black'}`}>
        {i18n.t("searchPage.popularQueues")}
      </Text>
      <View>
        {Current.slice(0, 5).map((recent, index) => (
          <SearchItem 
            key={index}
            image={recent.image} 
            title={recent.name} 
            isPopular={true}
            isDarkMode={isDarkMode}
          />
        ))}
      </View>
    </View>
  );
}
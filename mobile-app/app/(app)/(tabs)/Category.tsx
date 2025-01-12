import React from 'react';
import { View, Text, ScrollView, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Current } from '@/constants';
import i18n from '@/i18n';

export default function Category() {
  const { name } = useLocalSearchParams();
  const categoryName = decodeURIComponent(String(name));
  const router = useRouter();

  const handleBrandPress = (brand: any) => {
    router.push({
      pathname: "/(app)/(tabs)/QueuePage",
      params: { 
        brandName: brand.name,
        image: brand.image
      }
    });
  };

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="p-4">
          <Text className="text-xl font-bold mb-4 text-ocean-blue">
            {i18n.t(categoryName)}
          </Text>
          {Current.map((brand, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => handleBrandPress(brand)}
              className="bg-white rounded-lg p-4 mb-4 shadow-sm"
            >
              <View className="flex-row items-center">
                <Image
                  source={brand.image}
                  className="w-16 h-16 rounded-full"
                />
                <View className="ml-4">
                  <Text className="text-lg font-bold text-coal-black">{brand.name}</Text>
                  <View className="flex-row items-center mt-1">
                    <Text className="text-sm text-gray-600">
                      {brand.people} {i18n.t('people')} • {brand.time} {i18n.t('minutes')}
                    </Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  }
});

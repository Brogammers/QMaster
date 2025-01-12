import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Current } from '@/constants';
import i18n from '@/i18n';
import QueueCard from '@/shared/components/QueueCard';

export default function Category() {
  const { name } = useLocalSearchParams();
  const categoryName = decodeURIComponent(String(name));
  const router = useRouter();

  const handleBrandPress = (brand: any) => {
    router.push({
      pathname: "/(app)/(tabs)/Partner",
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
            <QueueCard
              key={index}
              name={brand.name}
              image={brand.image}
              time={brand.time}
              people={brand.people}
              onPress={() => handleBrandPress(brand)}
            />
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

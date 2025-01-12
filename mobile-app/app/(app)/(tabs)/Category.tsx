import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet, ActivityIndicator, Image, TouchableOpacity } from 'react-native';
import { useRoute, RouteProp } from '@react-navigation/native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Config from 'react-native-config';
import i18n from '@/i18n';
import { useLinkTo } from '@react-navigation/native';

interface BrandProps {
  id: string;
  name: string;
  logo: string;
  location: string;
}

type RouteParams = {
  Category: { name: string };
};

export default function Category() {
  const route = useRoute<RouteProp<RouteParams, 'Category'>>();
  const categoryName = decodeURIComponent(route.params.name);
  const [brands, setBrands] = useState<BrandProps[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const linkTo = useLinkTo();

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const token = await AsyncStorage.getItem('token');

        // TODO: Replace with actual API endpoint
        // This is a placeholder API call
        const response = await axios.get(
          `${Config.EXPO_PUBLIC_API_BASE_URL}/brands/category/${categoryName}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.status === 200) {
          setBrands(response.data.brands);
        }
      } catch (err) {
        console.error('Error fetching brands:', err);
        // For now, set some dummy data
        setBrands([
          {
            id: '1',
            name: 'Sample Brand 1',
            logo: 'https://via.placeholder.com/150',
            location: 'Sample Location 1',
          },
          {
            id: '2',
            name: 'Sample Brand 2',
            logo: 'https://via.placeholder.com/150',
            location: 'Sample Location 2',
          },
        ]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBrands();
  }, [categoryName]);

  const handleBrandPress = (brand: BrandProps) => {
    linkTo(`/Partner/${encodeURIComponent(brand.name)}`);
  };

  if (isLoading) {
    return (
      <View style={[styles.container, styles.centered]}>
        <ActivityIndicator size="large" color="#17222D" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={[styles.container, styles.centered]}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="p-4">
          {brands.map((brand) => (
            <TouchableOpacity
              key={brand.id}
              onPress={() => handleBrandPress(brand)}
              className="bg-white rounded-lg p-4 mb-4"
            >
              <View className="flex-row items-center">
                <Image
                  source={{ uri: brand.logo }}
                  className="w-16 h-16 rounded-full"
                />
                <View className="ml-4">
                  <Text className="text-lg font-bold text-coal-black">{brand.name}</Text>
                  <Text className="text-sm text-gray-600">{brand.location}</Text>
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
    backgroundColor: '#D9D9D9',
  },
  centered: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 16,
    color: 'red',
    textAlign: 'center',
  },
});

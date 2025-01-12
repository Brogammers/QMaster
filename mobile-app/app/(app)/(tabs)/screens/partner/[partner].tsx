import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet, ActivityIndicator, Image } from 'react-native';
import { useLocalSearchParams, Stack } from 'expo-router';
import axios from 'axios';
import i18n from '@/i18n';
import Config from 'react-native-config';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface BrandProps {
  id: string;
  name: string;
  logo: string;
  location: string;
  category: string;
}

export default function CategoryScreen() {
  const params = useLocalSearchParams();
  const name = typeof params.name === 'string' ? params.name : Array.isArray(params.name) ? params.name[0] : '';
  const [brands, setBrands] = useState<BrandProps[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const token = await AsyncStorage.getItem('token');
        
        // TODO: Replace with actual API endpoint
        const response = await axios.get(
          `${Config.EXPO_PUBLIC_API_BASE_URL}/brands/category/${encodeURIComponent(name)}`,
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
        setError(i18n.t('errorFetchingBrands'));
      } finally {
        setIsLoading(false);
      }
    };

    fetchBrands();
  }, [name]);

  return (
    <>
      <Stack.Screen 
        options={{
          headerStyle: { backgroundColor: '#17222D' },
          headerTintColor: 'white',
          headerTitle: decodeURIComponent(name),
          headerTitleAlign: 'center',
        }} 
      />
      <View style={styles.container}>
        {isLoading ? (
          <View style={[styles.container, styles.centered]}>
            <ActivityIndicator size="large" color="#17222D" />
          </View>
        ) : error ? (
          <View style={[styles.container, styles.centered]}>
            <Text style={styles.errorText}>{error}</Text>
          </View>
        ) : brands.length === 0 ? (
          <View style={[styles.container, styles.centered]}>
            <Text style={styles.noDataText}>{i18n.t('noData')}</Text>
            <Text style={styles.noDisplayText}>{i18n.t('noDisplay')}</Text>
          </View>
        ) : (
          <ScrollView showsVerticalScrollIndicator={false}>
            <View className="p-4">
              {brands.map((brand, index) => (
                <View 
                  key={index}
                  className="bg-white rounded-lg p-4 mb-4 flex-row items-center"
                >
                  <Image 
                    source={{ uri: brand.logo }}
                    className="w-16 h-16 rounded-full"
                  />
                  <View className="ml-4">
                    <Text className="text-lg font-bold text-coal-black">{brand.name}</Text>
                    <Text className="text-sm text-gray-600">{brand.location}</Text>
                  </View>
                </View>
              ))}
            </View>
          </ScrollView>
        )}
      </View>
    </>
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
  noDataText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#17222D',
    textAlign: 'center',
  },
  noDisplayText: {
    fontSize: 16,
    color: '#17222D',
    textAlign: 'center',
    marginTop: 8,
  },
}); 
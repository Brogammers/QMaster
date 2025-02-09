import configConverter from '@/api/configConverter';
import { useCart } from '@/ctx/CartContext';
import { useTheme } from '@/ctx/ThemeContext';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import axios, { AxiosError } from 'axios';
import { LinearGradient } from 'expo-linear-gradient';
import { router, useLocalSearchParams } from 'expo-router';
import React, { useContext, useEffect, useState } from 'react';
import { ScrollView, StatusBar, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LocationContext } from './Partner';

type RootStackParamList = {
  Partner: undefined;
  Cart: undefined;
  Product: undefined;
};

type Product = {
  id: string;
  name: string;
  price: number;
  description: string;
  quantity: number;
  storeId: string;
}

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const page = 1;
const perPage = 10;

export default function Store() {
  const { isDarkMode } = useTheme();
  const navigation = useNavigation<NavigationProp>();
  const { brandName, currentLocation } = useLocalSearchParams();
  const { items } = useCart();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [products, setProducts] = useState<Product[]>([]);
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  const categories = ['All', 'Food', 'Drinks', 'Snacks', 'Essentials'];

  useEffect(() => {
    const url = configConverter("EXPO_PUBLIC_API_BASE_URL_GET_PRODUCTS_BY_BUSINESS");
    axios.get(`${url}?businessName=${brandName}&page=${page}&per-page=${perPage}&locationId=${currentLocation}`)
    .then((response) => {
      if(response.status === 200){
        return response.data.products.content;
      } else {
        throw new Error("Error: ", response.data);
      }
    })
    .then((data) => {
      const productsData = data.map((product: Product) => {
        return {
          id: product.id,
          name: product.name,
          price: product.price,
          description: product.description,
          quantity: product.quantity,
          storeId: product.storeId,
        }
      })

      setProducts(productsData);
    })
    .catch((error) => {
      console.error("Error: ", error.response.data);
    })
  }, [currentLocation]);

  const handleProductClick = (product: Product) => {
    navigation.navigate("Product");
    router.setParams({
      ...product
    });
  };

  return (
    <View className="flex-1">
      <StatusBar barStyle={isDarkMode ? "light-content" : "dark-content"} />
      <View className={`absolute top-0 left-0 right-0 bottom-0 ${isDarkMode ? 'bg-ocean-blue' : 'bg-off-white'}`}>
        {!isDarkMode && (
          <LinearGradient
            colors={['rgba(0, 119, 182, 0.1)', 'rgba(255, 255, 255, 0)']}
            className="absolute top-0 w-full h-64"
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
          />
        )}
      </View>

      <SafeAreaView className="flex-1" edges={['top', 'bottom', 'left', 'right']}>
        {/* Header */}
        <View className="flex-row justify-between items-center px-6 py-4">
          <TouchableOpacity onPress={() => navigation.navigate('Partner')}>
            <MaterialCommunityIcons 
              name="arrow-left" 
              size={24} 
              color={isDarkMode ? '#FFFFFF' : '#17222D'} 
            />
          </TouchableOpacity>
          <Text className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-coal-black'}`}>
            Store
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Cart')} className="relative">
            <MaterialCommunityIcons 
              name="cart" 
              size={24} 
              color={isDarkMode ? '#FFFFFF' : '#17222D'} 
            />
            {totalItems > 0 && (
              <View className={`absolute -top-2 -right-2 w-5 h-5 rounded-full ${isDarkMode ? 'bg-baby-blue' : 'bg-ocean-blue'} items-center justify-center`}>
                <Text className="text-white text-xs font-bold">
                  {totalItems}
                </Text>
              </View>
            )}
          </TouchableOpacity>
        </View>

        <ScrollView 
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 40 }}
          className="flex-1 px-6"
        >
          {/* Categories */}
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            className="py-4"
          >
            {categories.map((category, index) => (
              <TouchableOpacity
                key={category}
                onPress={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full mr-2 ${
                  selectedCategory === category 
                    ? isDarkMode ? 'bg-baby-blue' : 'bg-ocean-blue'
                    : isDarkMode ? 'bg-slate-grey' : 'bg-slate-grey/10'
                }`}
              >
                <Text className={
                  selectedCategory === category
                    ? 'text-white font-semibold'
                    : isDarkMode ? 'text-white/70' : 'text-slate-grey'
                }>
                  {category}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          {/* Product Grid */}
          <View className="flex-row flex-wrap justify-between mt-4">
            {products.map((item) => (
              <TouchableOpacity 
                key={item.id}
                onPress={() => handleProductClick(item)}
                className={`w-[48%] aspect-square rounded-xl mb-4 p-3 ${
                  isDarkMode ? 'bg-slate-grey' : 'bg-slate-grey/10'
                }`}
              >
                <View className="mt-auto">
                  <Text className={`text-sm ${isDarkMode ? 'text-white' : 'text-coal-black'}`} numberOfLines={2}>
                    {item.name}
                  </Text>
                  <Text className={`text-base font-semibold mt-1 ${isDarkMode ? 'text-baby-blue' : 'text-ocean-blue'}`}>
                    {item.price}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
} 
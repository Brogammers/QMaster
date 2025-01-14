import React from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '@/ctx/ThemeContext';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';

// Mock data for demonstration
const STORE_DATA = {
  name: "Carrefour City",
  type: "Grocery",
  rating: 4.8,
  products: [
    {
      id: 1,
      name: "Fresh Organic Vegetables Box",
      price: 49.99,
      image: "https://placehold.co/400x300/png",
      category: "Groceries",
    },
    {
      id: 2,
      name: "Weekly Meal Plan - Family",
      price: 129.99,
      image: "https://placehold.co/400x300/png",
      category: "Ready Meals",
    },
    {
      id: 3,
      name: "Healthy Living Guide",
      price: 19.99,
      image: "https://placehold.co/400x300/png",
      category: "Books",
    },
  ],
  categories: [
    "All",
    "Groceries",
    "Ready Meals",
    "Books",
  ]
};

export default function Store() {
  const { isDarkMode } = useTheme();
  const [selectedCategory, setSelectedCategory] = React.useState("All");
  const screenWidth = Dimensions.get('window').width;
  const cardWidth = (screenWidth - 48) / 2;

  const filteredProducts = STORE_DATA.products.filter(product => 
    selectedCategory === "All" || product.category === selectedCategory
  );

  return (
    <SafeAreaView className="flex-1" style={{ 
      backgroundColor: isDarkMode ? '#1A1A1A' : '#F8FAFC'
    }}>
      <ScrollView className="flex-1">
        {/* Store Header */}
        <LinearGradient
          colors={isDarkMode ? ['#1A1A1A', '#1A1A1A'] : ['#FFFFFF', '#F8FAFC']}
          className="p-4 border-b"
          style={{ 
            borderBottomColor: isDarkMode ? 'rgba(255,255,255,0.1)' : '#E5E7EB'
          }}
        >
          <View className="flex-row items-center justify-between">
            <View>
              <Text className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                {STORE_DATA.name}
              </Text>
              <View className="flex-row items-center mt-1">
                <MaterialCommunityIcons
                  name="store"
                  size={16}
                  color={isDarkMode ? '#1DCDFE' : '#0077B6'}
                />
                <Text className={`ml-1 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  {STORE_DATA.type}
                </Text>
                <Text className={`mx-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>•</Text>
                <Ionicons
                  name="star"
                  size={16}
                  color="#FFB800"
                />
                <Text className={`ml-1 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  {STORE_DATA.rating}
                </Text>
              </View>
            </View>
          </View>
        </LinearGradient>

        {/* Categories */}
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          className="py-4"
        >
          {STORE_DATA.categories.map((category) => (
            <TouchableOpacity
              key={category}
              onPress={() => setSelectedCategory(category)}
              className={`mx-2 px-4 py-2 rounded-full ${
                selectedCategory === category 
                  ? isDarkMode ? 'bg-baby-blue' : 'bg-ocean-blue'
                  : isDarkMode ? 'bg-gray-800' : 'bg-gray-100'
              }`}
            >
              <Text className={
                selectedCategory === category
                  ? 'text-white font-medium'
                  : isDarkMode ? 'text-gray-300' : 'text-gray-600'
              }>
                {category}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Products Grid */}
        <View className="flex-row flex-wrap justify-between px-4">
          {filteredProducts.map((product) => (
            <TouchableOpacity
              key={product.id}
              className="mb-4"
              style={{ width: cardWidth }}
            >
              <View
                className="rounded-lg overflow-hidden"
                style={{
                  backgroundColor: isDarkMode ? '#2A2A2A' : '#FFFFFF',
                  borderWidth: 1,
                  borderColor: isDarkMode ? 'rgba(255,255,255,0.1)' : '#E5E7EB',
                }}
              >
                <Image
                  source={{ uri: product.image }}
                  style={{ width: '100%', height: 150 }}
                  className="bg-gray-100"
                />
                <View className="p-3">
                  <Text 
                    className={`font-medium mb-1 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}
                    numberOfLines={2}
                  >
                    {product.name}
                  </Text>
                  <Text className={`font-bold ${isDarkMode ? 'text-baby-blue' : 'text-ocean-blue'}`}>
                    ${product.price}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
} 
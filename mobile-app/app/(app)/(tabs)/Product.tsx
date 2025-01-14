import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import { useTheme } from '@/ctx/ThemeContext';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useLinkTo } from '@react-navigation/native';

export default function Product() {
  const { isDarkMode } = useTheme();
  const linkTo = useLinkTo();
  const [quantity, setQuantity] = React.useState(0);

  const handleAddToCart = () => {
    if (quantity === 0) {
      setQuantity(1);
    }
  };

  return (
    <View className="flex-1">
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
        <View className="px-6">
          <View className="flex-row justify-between items-center py-4">
            <TouchableOpacity onPress={() => linkTo('/store')}>
              <MaterialCommunityIcons 
                name="arrow-left" 
                size={24} 
                color={isDarkMode ? '#FFFFFF' : '#17222D'} 
              />
            </TouchableOpacity>
            <Text className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-coal-black'}`}>
              Product Details
            </Text>
            <TouchableOpacity onPress={() => linkTo('/cart')}>
              <MaterialCommunityIcons 
                name="cart" 
                size={24} 
                color={isDarkMode ? '#FFFFFF' : '#17222D'} 
              />
            </TouchableOpacity>
          </View>
        </View>

        <ScrollView 
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 40 }}
          className="flex-1 px-6"
        >
          <View className="w-full aspect-square bg-slate-200 rounded-xl overflow-hidden mb-4">
            <Image
              source={{ uri: 'https://placehold.co/300x300' }}
              className="w-full h-full"
              resizeMode="cover"
            />
          </View>

          <Text className={`text-2xl font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-coal-black'}`}>
            Sample Product
          </Text>
          
          <Text className={`text-xl font-semibold mb-4 ${isDarkMode ? 'text-baby-blue' : 'text-ocean-blue'}`}>
            $19.99
          </Text>

          <Text className={`text-base mb-6 ${isDarkMode ? 'text-white/70' : 'text-slate-grey'}`}>
            Experience the finest quality with our carefully selected products. This item represents our commitment to excellence and customer satisfaction.
          </Text>

          {quantity === 0 ? (
            <TouchableOpacity 
              className={`w-full py-4 rounded-xl ${isDarkMode ? 'bg-baby-blue' : 'bg-ocean-blue'}`}
              onPress={handleAddToCart}
            >
              <Text className="text-white text-center font-semibold text-lg">
                Add to Cart
              </Text>
            </TouchableOpacity>
          ) : (
            <View className="flex-row items-center justify-between">
              <TouchableOpacity 
                className={`w-16 py-4 rounded-xl ${isDarkMode ? 'bg-baby-blue' : 'bg-ocean-blue'}`}
                onPress={() => setQuantity(Math.max(0, quantity - 1))}
              >
                <Text className="text-white text-center font-semibold text-lg">-</Text>
              </TouchableOpacity>
              <Text className={`text-xl font-semibold ${isDarkMode ? 'text-white' : 'text-coal-black'}`}>
                {quantity}
              </Text>
              <TouchableOpacity 
                className={`w-16 py-4 rounded-xl ${isDarkMode ? 'bg-baby-blue' : 'bg-ocean-blue'}`}
                onPress={() => setQuantity(quantity + 1)}
              >
                <Text className="text-white text-center font-semibold text-lg">+</Text>
              </TouchableOpacity>
            </View>
          )}
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

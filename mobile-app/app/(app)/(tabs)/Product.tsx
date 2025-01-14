import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, StatusBar } from 'react-native';
import { useTheme } from '@/ctx/ThemeContext';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useCart } from '@/ctx/CartContext';

export default function Product() {
  const { isDarkMode } = useTheme();
  const navigation = useNavigation();
  const { addToCart, updateQuantity, items } = useCart();
  const [quantity, setQuantity] = React.useState(0);

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  // Sample product data - in real app, this would come from props or API
  const product = {
    id: 1,
    name: 'Sample Product',
    price: 19.99
  };

  const cartItem = items.find(item => item.id === product.id);
  const cartQuantity = cartItem?.quantity || 0;

  const handleAddToCart = () => {
    if (cartQuantity === 0) {
      addToCart(product, 1);
    }
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
        <View className="px-6">
          <View className="flex-row justify-between items-center py-4">
            <TouchableOpacity onPress={() => navigation.navigate('Store')}>
              <MaterialCommunityIcons 
                name="arrow-left" 
                size={24} 
                color={isDarkMode ? '#FFFFFF' : '#17222D'} 
              />
            </TouchableOpacity>
            <Text className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-coal-black'}`}>
              Product Details
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

          {cartQuantity === 0 ? (
            <TouchableOpacity 
              className={`w-full py-4 rounded-xl ${isDarkMode ? 'bg-baby-blue' : 'bg-ocean-blue'}`}
              onPress={handleAddToCart}
            >
              <Text className="text-white text-center font-semibold text-lg">
                Add to Cart
              </Text>
            </TouchableOpacity>
          ) : (
            <View className="flex-row items-center justify-between bg-slate-grey/10 rounded-xl p-2">
              <TouchableOpacity 
                className={`w-14 h-14 rounded-xl ${isDarkMode ? 'bg-baby-blue' : 'bg-ocean-blue'} items-center justify-center`}
                onPress={() => updateQuantity(product.id, Math.max(0, cartQuantity - 1))}
              >
                <Text className="text-white text-center font-bold text-2xl">−</Text>
              </TouchableOpacity>
              <View className="items-center">
                <Text className={`text-sm ${isDarkMode ? 'text-white/70' : 'text-slate-grey'}`}>
                  Quantity
                </Text>
                <Text className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-coal-black'}`}>
                  {cartQuantity}
                </Text>
              </View>
              <TouchableOpacity 
                className={`w-14 h-14 rounded-xl ${isDarkMode ? 'bg-baby-blue' : 'bg-ocean-blue'} items-center justify-center`}
                onPress={() => updateQuantity(product.id, cartQuantity + 1)}
              >
                <Text className="text-white text-center font-bold text-2xl">+</Text>
              </TouchableOpacity>
            </View>
          )}
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

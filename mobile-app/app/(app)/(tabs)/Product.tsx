import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, StatusBar, Dimensions } from 'react-native';
import { useTheme } from '@/ctx/ThemeContext';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useCart } from '@/ctx/CartContext';
import Animated, { useAnimatedStyle, withTiming, Easing } from 'react-native-reanimated';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export default function Product() {
  const { isDarkMode } = useTheme();
  const navigation = useNavigation();
  const { addToCart, updateQuantity, items } = useCart();
  const [isAnimating, setIsAnimating] = React.useState(false);
  
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { scale: withTiming(isAnimating ? 0.5 : 1, { duration: 300 }) },
      { translateY: withTiming(isAnimating ? -150 : 0, { duration: 500 }) },
      { translateX: withTiming(isAnimating ? SCREEN_WIDTH * 0.4 : 0, { duration: 500 }) },
    ],
    opacity: withTiming(isAnimating ? 0 : 1, { duration: 500 }),
  }));

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
      setIsAnimating(true);
      setTimeout(() => {
        addToCart(product, 1);
        setIsAnimating(false);
      }, 500);
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
          <View className="w-full aspect-square bg-slate-200 rounded-xl overflow-hidden mb-4 relative">
            <Image
              source={{ uri: 'https://placehold.co/300x300' }}
              className="w-full h-full"
              resizeMode="cover"
            />
            <Animated.View
              style={[
                {
                  position: 'absolute',
                  width: 40,
                  height: 40,
                  backgroundColor: isDarkMode ? '#1DCDFE' : '#0077B6',
                  borderRadius: 20,
                  top: '50%',
                  left: '50%',
                  marginLeft: -20,
                  marginTop: -20,
                  opacity: 0,
                },
                animatedStyle,
              ]}
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
              disabled={isAnimating}
            >
              <Text className="text-white text-center font-semibold text-lg">
                Add to Cart
              </Text>
            </TouchableOpacity>
          ) : (
            <>
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

              <TouchableOpacity 
                className={`w-full py-4 rounded-xl mt-4 ${isDarkMode ? 'bg-slate-grey' : 'bg-ocean-blue'}`}
                onPress={() => navigation.navigate('Cart')}
              >
                <Text className="text-white text-center font-semibold text-lg">
                  View Cart
                </Text>
              </TouchableOpacity>
            </>
          )}
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

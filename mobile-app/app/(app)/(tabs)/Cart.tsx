import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StatusBar, Linking } from 'react-native';
import { useTheme } from '@/ctx/ThemeContext';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useLinkTo, useNavigation } from '@react-navigation/native';
import Animated, { FadeIn } from 'react-native-reanimated';
import { useCart } from '@/ctx/CartContext';
import { locations } from '@/constants/index';
import { PayMobService } from '@/services/PayMobService';

export default function Cart() {
  const { isDarkMode } = useTheme();
  const linkTo = useLinkTo();
  const { items, updateQuantity, getTotal } = useCart();
  const [selectedLocation, setSelectedLocation] = React.useState<number | null>(null);
  const [isProcessing, setIsProcessing] = React.useState(false);

  const handlePayment = () => {
    if (!selectedLocation) return;
    linkTo('/Payment');
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
            <TouchableOpacity onPress={() => linkTo('/Product')}>
              <MaterialCommunityIcons 
                name="arrow-left" 
                size={24} 
                color={isDarkMode ? '#FFFFFF' : '#17222D'} 
              />
            </TouchableOpacity>
            <Text className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-coal-black'}`}>
              Shopping Cart
            </Text>
            <View style={{ width: 24 }} />
          </View>
        </View>

        {items.length === 0 ? (
          <View className="flex-1 items-center justify-center px-6">
            <Animated.View 
              entering={FadeIn.duration(500)}
              className="items-center"
            >
              <MaterialCommunityIcons 
                name="cart-outline" 
                size={64} 
                color={isDarkMode ? '#FFFFFF40' : '#17222D40'} 
              />
              <Text className={`text-lg mt-4 ${isDarkMode ? 'text-white/70' : 'text-slate-grey'}`}>
                Your cart is empty
              </Text>
              <Text className={`text-sm mt-2 text-center ${isDarkMode ? 'text-white/50' : 'text-slate-grey/70'}`}>
                Browse our products and add items to your cart
              </Text>
            </Animated.View>
          </View>
        ) : (
          <>
            <ScrollView 
              className="flex-1 px-6"
              showsVerticalScrollIndicator={false}
            >
              <Text className={`text-lg font-semibold mb-3 ${isDarkMode ? 'text-white' : 'text-coal-black'}`}>
                Select Pickup Location
              </Text>
              
              {locations.map((location) => (
                <TouchableOpacity
                  key={location.id}
                  onPress={() => setSelectedLocation(location.id)}
                  className={`flex-row items-center p-4 mb-3 rounded-xl ${
                    selectedLocation === location.id
                      ? isDarkMode ? 'bg-baby-blue' : 'bg-ocean-blue'
                      : isDarkMode ? 'bg-slate-grey' : 'bg-slate-grey/10'
                  }`}
                >
                  <MaterialCommunityIcons 
                    name={selectedLocation === location.id ? "radiobox-marked" : "radiobox-blank"}
                    size={24}
                    color={
                      selectedLocation === location.id
                        ? 'white'
                        : isDarkMode ? '#FFFFFF70' : '#17222D70'
                    }
                  />
                  <View className="flex-1 ml-3">
                    <Text className={`text-lg font-bold ${
                      selectedLocation === location.id
                        ? 'text-white'
                        : isDarkMode ? 'text-white' : 'text-coal-black'
                    }`}>
                      {location.label}
                    </Text>
                    <Text className={`text-base ${
                      selectedLocation === location.id
                        ? 'text-white/80'
                        : isDarkMode ? 'text-white/50' : 'text-slate-grey'
                    }`}>
                      {location.address}
                    </Text>
                  </View>
                </TouchableOpacity>
              ))}

              <View className="h-4" />

              <Text className={`text-lg font-semibold mb-3 ${isDarkMode ? 'text-white' : 'text-coal-black'}`}>
                Cart Items
              </Text>

              {items.map((item) => (
                <Animated.View 
                  key={item.id}
                  entering={FadeIn}
                  className={`flex-row items-center justify-between p-4 mb-3 rounded-xl ${
                    isDarkMode ? 'bg-slate-grey' : 'bg-slate-grey/10'
                  }`}
                >
                  <View className="flex-1">
                    <Text className={`font-semibold ${isDarkMode ? 'text-white' : 'text-coal-black'}`}>
                      {item.name}
                    </Text>
                    <Text className={`mt-1 ${isDarkMode ? 'text-baby-blue' : 'text-ocean-blue'}`}>
                      ${item.price.toFixed(2)}
                    </Text>
                  </View>
                  
                  <View className="flex-row items-center bg-slate-grey/10 rounded-xl">
                    <TouchableOpacity 
                      className={`w-10 h-10 rounded-xl ${isDarkMode ? 'bg-baby-blue' : 'bg-ocean-blue'} items-center justify-center`}
                      onPress={() => updateQuantity(item.id, Math.max(0, item.quantity - 1))}
                    >
                      <Text className="text-white text-center font-bold text-xl">−</Text>
                    </TouchableOpacity>
                    <Text className={`mx-4 font-bold ${isDarkMode ? 'text-white' : 'text-coal-black'}`}>
                      {item.quantity}
                    </Text>
                    <TouchableOpacity 
                      className={`w-10 h-10 rounded-xl ${isDarkMode ? 'bg-baby-blue' : 'bg-ocean-blue'} items-center justify-center`}
                      onPress={() => updateQuantity(item.id, item.quantity + 1)}
                    >
                      <Text className="text-white text-center font-bold text-xl">+</Text>
                    </TouchableOpacity>
                  </View>
                </Animated.View>
              ))}
            </ScrollView>

            <View className="px-6 pt-4 pb-6">
              <View className="flex-row justify-between items-center mb-4">
                <Text className={`text-lg ${isDarkMode ? 'text-white/70' : 'text-slate-grey'}`}>
                  Total
                </Text>
                <Text className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-coal-black'}`}>
                  ${getTotal().toFixed(2)}
                </Text>
              </View>
              
              <TouchableOpacity 
                className={`w-full py-4 rounded-xl ${
                  selectedLocation
                    ? isDarkMode ? 'bg-baby-blue' : 'bg-ocean-blue'
                    : isDarkMode ? 'bg-slate-grey' : 'bg-slate-grey/10'
                }`}
                onPress={handlePayment}
                disabled={!selectedLocation || isProcessing}
              >
                <Text className={`text-center font-semibold text-lg ${
                  selectedLocation ? 'text-white' : isDarkMode ? 'text-white/50' : 'text-slate-grey'
                }`}>
                  {isProcessing 
                    ? 'Processing...' 
                    : selectedLocation 
                      ? 'Proceed to Payment' 
                      : 'Select Pickup Location'}
                </Text>
              </TouchableOpacity>
            </View>
          </>
        )}
      </SafeAreaView>
    </View>
  );
}

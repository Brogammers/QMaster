import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StatusBar, TextInput, Image } from 'react-native';
import { useTheme } from '@/ctx/ThemeContext';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type RootStackParamList = {
  Store: undefined;
  Payment: undefined;
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'Payment'>;

export default function Payment() {
  const { isDarkMode } = useTheme();
  const navigation = useNavigation<NavigationProp>();
  const [isProcessing, setIsProcessing] = React.useState(false);

  const handlePayment = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      navigation.navigate('Store');
    }, 2000);
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
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <MaterialCommunityIcons 
                name="arrow-left" 
                size={24} 
                color={isDarkMode ? '#FFFFFF' : '#17222D'} 
              />
            </TouchableOpacity>
            <Text className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-coal-black'}`}>
              Payment Gateway
            </Text>
            <View style={{ width: 24 }} />
          </View>
        </View>

        <ScrollView 
          className="flex-1 px-6"
          showsVerticalScrollIndicator={false}
        >
          <View className={`p-4 rounded-xl mb-6 ${isDarkMode ? 'bg-slate-grey/80' : 'bg-slate-grey/10'}`}>
            <Text className={`text-lg font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-coal-black'}`}>
              Card Information
            </Text>
            
            <View className="mb-4">
              <Text className={`mb-2 ${isDarkMode ? 'text-white' : 'text-slate-grey'}`}>
                Card Number
              </Text>
              <TextInput
                placeholder="4242 4242 4242 4242"
                placeholderTextColor={isDarkMode ? '#FFFFFF70' : '#17222D50'}
                className={`p-3 rounded-lg ${isDarkMode ? 'bg-slate-grey text-white border border-white/20' : 'bg-white text-coal-black'}`}
              />
            </View>

            <View className="flex-row mb-4">
              <View className="flex-1 mr-2">
                <Text className={`mb-2 ${isDarkMode ? 'text-white' : 'text-slate-grey'}`}>
                  Expiry Date
                </Text>
                <TextInput
                  placeholder="MM/YY"
                  placeholderTextColor={isDarkMode ? '#FFFFFF70' : '#17222D50'}
                  className={`p-3 rounded-lg ${isDarkMode ? 'bg-slate-grey text-white border border-white/20' : 'bg-white text-coal-black'}`}
                />
              </View>
              <View className="flex-1 ml-2">
                <Text className={`mb-2 ${isDarkMode ? 'text-white' : 'text-slate-grey'}`}>
                  CVV
                </Text>
                <TextInput
                  placeholder="123"
                  placeholderTextColor={isDarkMode ? '#FFFFFF70' : '#17222D50'}
                  className={`p-3 rounded-lg ${isDarkMode ? 'bg-slate-grey text-white border border-white/20' : 'bg-white text-coal-black'}`}
                  secureTextEntry
                />
              </View>
            </View>

            <View className="mb-4">
              <Text className={`mb-2 ${isDarkMode ? 'text-white' : 'text-slate-grey'}`}>
                Cardholder Name
              </Text>
              <TextInput
                placeholder="John Doe"
                placeholderTextColor={isDarkMode ? '#FFFFFF70' : '#17222D50'}
                className={`p-3 rounded-lg ${isDarkMode ? 'bg-slate-grey text-white border border-white/20' : 'bg-white text-coal-black'}`}
              />
            </View>
          </View>

          <TouchableOpacity 
            className={`w-full py-4 rounded-xl ${isDarkMode ? 'bg-baby-blue' : 'bg-ocean-blue'}`}
            onPress={handlePayment}
            disabled={isProcessing}
          >
            <Text className="text-white text-center font-semibold text-lg">
              {isProcessing ? 'Processing...' : 'Pay Now'}
            </Text>
          </TouchableOpacity>

          <View className="flex-row justify-center items-center mt-6">
            <MaterialCommunityIcons 
              name="shield-check" 
              size={20} 
              color={isDarkMode ? '#FFFFFF70' : '#17222D70'} 
            />
            <Text className={`ml-2 ${isDarkMode ? 'text-white/70' : 'text-slate-grey'}`}>
              Secured by
            </Text>
            <Image 
              source={require('@/assets/images/paymob-blue-logo.png')}
              className="h-4 w-16 ml-1"
              resizeMode="contain"
              style={{ 
                opacity: isDarkMode ? 0.7 : 0.5,
                tintColor: isDarkMode ? '#FFFFFF' : '#17222D'
              }}
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
} 
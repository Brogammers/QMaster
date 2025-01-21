import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, I18nManager, NativeModules, Platform, TextInput } from 'react-native';
import { useTheme } from '@/ctx/ThemeContext';
import i18n from '@/i18n';
import { LinearGradient } from 'expo-linear-gradient';
import { MotiView } from 'moti';
import { Ionicons } from '@expo/vector-icons';
import { useLinkTo } from "@react-navigation/native";

export default function RegionLanguageSettings() {
  const { isDarkMode } = useTheme();
  const linkTo = useLinkTo();
  const [selectedCountry, setSelectedCountry] = useState('Egypt (مصر)');
  const [selectedLanguage, setSelectedLanguage] = useState('English');

  useEffect(() => {
    // Get device language
    const deviceLanguage =
      Platform.OS === 'ios'
        ? NativeModules.SettingsManager.settings.AppleLocale ||
          NativeModules.SettingsManager.settings.AppleLanguages[0]
        : NativeModules.I18nManager.localeIdentifier;

    // Set language based on device settings
    const languageCode = deviceLanguage.split('_')[0]; // This will give us 'en', 'ar', etc.
    setSelectedLanguage(languageCode === 'ar' ? 'Arabic (العربية)' : 'English');
  }, []);

  const handleReturn = () => {
    linkTo("/Settings");
  }

  return (
    <>
      <View className="absolute top-4 left-4 z-10">
        <TouchableOpacity onPress={() => handleReturn()}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
      </View>
      <View className={`flex-1 ${isDarkMode ? 'bg-slate-900' : 'bg-off-white'}`}>
        <LinearGradient
          colors={['#17222D', '#13404D']}
          className="pt-14 pb-4 px-5"
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <View className="flex-row items-center">
            <Text className="text-2xl font-bold text-white">
              {i18n.t('region_language')}
            </Text>
          </View>
        </LinearGradient>

        <ScrollView className="flex-1 px-5" showsVerticalScrollIndicator={false}>
          <MotiView 
            from={{ opacity: 0, translateY: 10 }}
            animate={{ opacity: 1, translateY: 0 }}
            className={`rounded-xl p-4 mt-4 mb-6 ${isDarkMode ? 'bg-slate-800/60' : 'bg-white'}`}
          >
            <View className="space-y-6">
              <View>
                <Text className={`text-base font-medium mb-2 ${isDarkMode ? 'text-white' : 'text-coal-black'}`}>
                  {i18n.t('country')}
                </Text>
                <View className={`rounded-xl overflow-hidden ${isDarkMode ? 'bg-slate-700' : 'bg-gray-100'} flex-row items-center`}>
                  <TextInput
                    value={selectedCountry}
                    editable={false}
                    className={`px-4 py-3 flex-1 ${isDarkMode ? 'text-white/50' : 'text-black/50'}`}
                  />
                  <View className="pr-4">
                    <Ionicons name="lock-closed" size={16} color={isDarkMode ? "#ffffff80" : "#00000080"} />
                  </View>
                </View>
                <Text className="text-xs mt-2 text-gray-500">
                  {i18n.t('system_settings_note')}
                </Text>
              </View>

              <View>
                <Text className={`text-base font-medium mb-2 ${isDarkMode ? 'text-white' : 'text-coal-black'}`}>
                  {i18n.t('language')}
                </Text>
                <View className={`rounded-xl overflow-hidden ${isDarkMode ? 'bg-slate-700' : 'bg-gray-100'} flex-row items-center`}>
                  <TextInput
                    value={selectedLanguage}
                    editable={false}
                    className={`px-4 py-3 flex-1 ${isDarkMode ? 'text-white/50' : 'text-black/50'}`}
                  />
                  <View className="pr-4">
                    <Ionicons name="lock-closed" size={16} color={isDarkMode ? "#ffffff80" : "#00000080"} />
                  </View>
                </View>
                <Text className="text-xs mt-2 text-gray-500">
                  {i18n.t('system_settings_note')}
                </Text>
              </View>
            </View>
          </MotiView>
        </ScrollView>
      </View>
    </>
  );
} 
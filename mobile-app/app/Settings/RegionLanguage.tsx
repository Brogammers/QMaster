import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useTheme } from '@/ctx/ThemeContext';
import { Picker } from '@react-native-picker/picker';
import i18n from '@/i18n';
import Return from '@/shared/components/Return';

export default function RegionLanguageSettings() {
  const { isDarkMode } = useTheme();
  const [selectedCountry, setSelectedCountry] = useState('US');
  const [selectedLanguage, setSelectedLanguage] = useState('en');

  return (
    <View className={`flex-1 ${isDarkMode ? 'bg-slate-900' : 'bg-off-white'}`}>
      <View className="flex-row items-center px-5 pt-14 pb-4">
        <View className="flex-row items-center">
          <Return href="/Settings" size={30} color={isDarkMode ? "#fff" : "#000"} />
          <Text className={`text-2xl font-bold ml-4 ${isDarkMode ? 'text-white' : 'text-coal-black'}`}>
            {i18n.t('region_language')}
          </Text>
        </View>
      </View>

      <View className="flex-1 px-5">
        <View className={`rounded-xl p-4 ${isDarkMode ? 'bg-slate-800/60' : 'bg-white'}`}>
          <View className="space-y-4">
            <View>
              <Text className={`mb-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>{i18n.t('country')}</Text>
              <View className={`rounded-lg ${isDarkMode ? 'bg-slate-700' : 'bg-gray-100'}`}>
                <Picker
                  selectedValue={selectedCountry}
                  onValueChange={setSelectedCountry}
                  style={{ color: isDarkMode ? '#fff' : '#000' }}
                >
                  <Picker.Item label="United States" value="US" />
                  <Picker.Item label="United Kingdom" value="UK" />
                  <Picker.Item label="Canada" value="CA" />
                  <Picker.Item label="Saudi Arabia" value="SA" />
                  <Picker.Item label="United Arab Emirates" value="AE" />
                  <Picker.Item label="Egypt" value="EG" />
                  <Picker.Item label="Qatar" value="QA" />
                  <Picker.Item label="Kuwait" value="KW" />
                  <Picker.Item label="Bahrain" value="BH" />
                  <Picker.Item label="Oman" value="OM" />
                </Picker>
              </View>
            </View>
            <View>
              <Text className={`mb-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>{i18n.t('language')}</Text>
              <View className={`rounded-lg ${isDarkMode ? 'bg-slate-700' : 'bg-gray-100'}`}>
                <Picker
                  selectedValue={selectedLanguage}
                  onValueChange={setSelectedLanguage}
                  style={{ color: isDarkMode ? '#fff' : '#000' }}
                >
                  <Picker.Item label="English" value="en" />
                  <Picker.Item label="Arabic" value="ar" />
                </Picker>
              </View>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
} 
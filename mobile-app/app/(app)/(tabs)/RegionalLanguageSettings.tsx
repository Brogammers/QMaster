import React, { useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { useTheme } from '@/ctx/ThemeContext';
import { Picker } from '@react-native-picker/picker';
import i18n from '@/i18n';
import Return from '@/shared/components/Return';
import { LinearGradient } from 'expo-linear-gradient';
import { MotiView } from 'moti';

export default function RegionLanguageSettings() {
  const { isDarkMode } = useTheme();
  const [selectedCountry, setSelectedCountry] = useState('US');
  const [selectedLanguage, setSelectedLanguage] = useState('en');

  return (
    <View className={`flex-1 ${isDarkMode ? 'bg-slate-900' : 'bg-off-white'}`}>
      <LinearGradient
        colors={['#17222D', '#13404D']}
        className="pt-14 pb-4 px-5"
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <View className="flex-row items-center">
          <Return href="/Settings" size={30} color="#fff" />
          <Text className="text-2xl font-bold ml-4 text-white">
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
              <Text className={`text-lg font-medium mb-2 ${isDarkMode ? 'text-white' : 'text-coal-black'}`}>
                {i18n.t('country')}
              </Text>
              <View className={`rounded-lg overflow-hidden ${isDarkMode ? 'bg-slate-700' : 'bg-gray-100'}`}>
                <Picker
                  selectedValue={selectedCountry}
                  onValueChange={setSelectedCountry}
                  style={{ color: isDarkMode ? '#fff' : '#000' }}
                >
                  <Picker.Item label="United States" value="US" />
                  <Picker.Item label="United Kingdom" value="UK" />
                  <Picker.Item label="Canada" value="CA" />
                  <Picker.Item label="Australia" value="AU" />
                  <Picker.Item label="Germany" value="DE" />
                  <Picker.Item label="France" value="FR" />
                  <Picker.Item label="Spain" value="ES" />
                  <Picker.Item label="Italy" value="IT" />
                  <Picker.Item label="Japan" value="JP" />
                  <Picker.Item label="South Korea" value="KR" />
                  <Picker.Item label="China" value="CN" />
                  <Picker.Item label="India" value="IN" />
                  <Picker.Item label="Brazil" value="BR" />
                  <Picker.Item label="Mexico" value="MX" />
                  <Picker.Item label="Saudi Arabia" value="SA" />
                  <Picker.Item label="United Arab Emirates" value="AE" />
                  <Picker.Item label="Egypt" value="EG" />
                  <Picker.Item label="South Africa" value="ZA" />
                </Picker>
              </View>
            </View>

            <View>
              <Text className={`text-lg font-medium mb-2 ${isDarkMode ? 'text-white' : 'text-coal-black'}`}>
                {i18n.t('language')}
              </Text>
              <View className={`rounded-lg overflow-hidden ${isDarkMode ? 'bg-slate-700' : 'bg-gray-100'}`}>
                <Picker
                  selectedValue={selectedLanguage}
                  onValueChange={setSelectedLanguage}
                  style={{ color: isDarkMode ? '#fff' : '#000' }}
                >
                  <Picker.Item label="English" value="en" />
                  <Picker.Item label="Arabic (العربية)" value="ar" />
                  <Picker.Item label="Spanish (Español)" value="es" />
                  <Picker.Item label="French (Français)" value="fr" />
                  <Picker.Item label="German (Deutsch)" value="de" />
                  <Picker.Item label="Italian (Italiano)" value="it" />
                  <Picker.Item label="Japanese (日本語)" value="ja" />
                  <Picker.Item label="Korean (한국어)" value="ko" />
                  <Picker.Item label="Chinese (中文)" value="zh" />
                  <Picker.Item label="Hindi (हिन्दी)" value="hi" />
                  <Picker.Item label="Portuguese (Português)" value="pt" />
                </Picker>
              </View>
            </View>
          </View>
        </MotiView>
      </ScrollView>
    </View>
  );
} 
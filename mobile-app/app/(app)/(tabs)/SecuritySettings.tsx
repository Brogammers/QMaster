import React, { useState } from 'react';
import { View, Text, TextInput, ScrollView } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useTheme } from '@/ctx/ThemeContext';
import i18n from '@/i18n';
import Return from '@/shared/components/Return';
import { LinearGradient } from 'expo-linear-gradient';
import { MotiView } from 'moti';

export default function SecuritySettings() {
  const { isDarkMode } = useTheme();
  
  // Email change state
  const [currentPassword, setCurrentPassword] = useState('');
  const [newEmail, setNewEmail] = useState('');

  // Password change state
  const [currentEmail, setCurrentEmail] = useState('');
  const [currentPasswordForPass, setCurrentPasswordForPass] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const handleEmailChange = async () => {
    // TODO: Implement email change
  };

  const handlePasswordChange = async () => {
    // TODO: Implement password change
  };

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
            {i18n.t('security')}
          </Text>
        </View>
      </LinearGradient>

      <ScrollView className="flex-1 px-5" showsVerticalScrollIndicator={false}>
        <MotiView 
          from={{ opacity: 0, translateY: 10 }}
          animate={{ opacity: 1, translateY: 0 }}
          className="space-y-6 mt-4 pb-6"
        >
          {/* Change Email Section */}
          <MotiView 
            from={{ opacity: 0, translateY: 10 }}
            animate={{ opacity: 1, translateY: 0 }}
            className={`rounded-xl p-4 ${isDarkMode ? 'bg-slate-800/60' : 'bg-white'}`}
          >
            <Text className={`text-lg font-medium mb-4 ${isDarkMode ? 'text-white' : 'text-coal-black'}`}>
              {i18n.t('change_email')}
            </Text>
            <View className="space-y-4">
              <View>
                <Text className={`text-sm font-medium mb-2 ${isDarkMode ? 'text-white' : 'text-coal-black'}`}>
                  {i18n.t('current_password')}
                </Text>
                <TextInput 
                  value={currentPassword}
                  onChangeText={setCurrentPassword}
                  secureTextEntry
                  className={`py-3.5 px-4 rounded-xl ${isDarkMode ? 'bg-slate-700 text-white' : 'bg-gray-100 text-coal-black'}`}
                />
              </View>
              <View>
                <Text className={`text-sm font-medium mb-2 ${isDarkMode ? 'text-white' : 'text-coal-black'}`}>
                  {i18n.t('new_email')}
                </Text>
                <TextInput 
                  value={newEmail}
                  onChangeText={setNewEmail}
                  keyboardType="email-address"
                  className={`py-3.5 px-4 rounded-xl ${isDarkMode ? 'bg-slate-700 text-white' : 'bg-gray-100 text-coal-black'}`}
                />
              </View>
              <TouchableOpacity
                onPress={handleEmailChange}
                className={`py-3.5 rounded-xl ${isDarkMode ? 'bg-baby-blue' : 'bg-ocean-blue'}`}
              >
                <Text className="text-white text-center font-semibold">
                  {i18n.t('submit')}
                </Text>
              </TouchableOpacity>
            </View>
          </MotiView>

          {/* Change Password Section */}
          <MotiView 
            from={{ opacity: 0, translateY: 10 }}
            animate={{ opacity: 1, translateY: 0 }}
            className={`rounded-xl p-4 ${isDarkMode ? 'bg-slate-800/60' : 'bg-white'}`}
          >
            <Text className={`text-lg font-medium mb-4 ${isDarkMode ? 'text-white' : 'text-coal-black'}`}>
              {i18n.t('change_password')}
            </Text>
            <View className="space-y-4">
              <View>
                <Text className={`text-sm font-medium mb-2 ${isDarkMode ? 'text-white' : 'text-coal-black'}`}>
                  {i18n.t('current_email')}
                </Text>
                <TextInput 
                  value={currentEmail}
                  onChangeText={setCurrentEmail}
                  keyboardType="email-address"
                  className={`py-3.5 px-4 rounded-xl ${isDarkMode ? 'bg-slate-700 text-white' : 'bg-gray-100 text-coal-black'}`}
                />
              </View>
              <View>
                <Text className={`text-sm font-medium mb-2 ${isDarkMode ? 'text-white' : 'text-coal-black'}`}>
                  {i18n.t('current_password')}
                </Text>
                <TextInput 
                  value={currentPasswordForPass}
                  onChangeText={setCurrentPasswordForPass}
                  secureTextEntry
                  className={`py-3.5 px-4 rounded-xl ${isDarkMode ? 'bg-slate-700 text-white' : 'bg-gray-100 text-coal-black'}`}
                />
              </View>
              <View>
                <Text className={`text-sm font-medium mb-2 ${isDarkMode ? 'text-white' : 'text-coal-black'}`}>
                  {i18n.t('new_password')}
                </Text>
                <TextInput 
                  value={newPassword}
                  onChangeText={setNewPassword}
                  secureTextEntry
                  className={`py-3.5 px-4 rounded-xl ${isDarkMode ? 'bg-slate-700 text-white' : 'bg-gray-100 text-coal-black'}`}
                />
              </View>
              <TouchableOpacity
                onPress={handlePasswordChange}
                className={`py-3.5 rounded-xl ${isDarkMode ? 'bg-baby-blue' : 'bg-ocean-blue'}`}
              >
                <Text className="text-white text-center font-semibold">
                  {i18n.t('submit')}
                </Text>
              </TouchableOpacity>
            </View>
          </MotiView>
        </MotiView>
      </ScrollView>
    </View>
  );
} 
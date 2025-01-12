import React, { useState } from 'react';
import { View, Text, TextInput } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useTheme } from '@/ctx/ThemeContext';
import i18n from '@/i18n';
import Return from '@/shared/components/Return';

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
      <View className="flex-row items-center px-5 pt-14 pb-4">
        <View className="flex-row items-center">
          <Return href="/Settings" size={30} color={isDarkMode ? "#fff" : "#000"} />
          <Text className={`text-2xl font-bold ml-4 ${isDarkMode ? 'text-white' : 'text-coal-black'}`}>
            {i18n.t('security')}
          </Text>
        </View>
      </View>

      <View className="flex-1 px-5 space-y-6">
        {/* Change Email Section */}
        <View className={`rounded-xl p-4 ${isDarkMode ? 'bg-slate-800/60' : 'bg-white'}`}>
          <Text className={`text-xl font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-coal-black'}`}>
            {i18n.t('change_email')}
          </Text>
          <View className="space-y-4">
            <View>
              <Text className={`mb-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>{i18n.t('current_password')}</Text>
              <TextInput 
                value={currentPassword}
                onChangeText={setCurrentPassword}
                secureTextEntry
                className={`p-2 rounded-lg ${isDarkMode ? 'bg-slate-700 text-white' : 'bg-gray-100 text-coal-black'}`}
              />
            </View>
            <View>
              <Text className={`mb-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>{i18n.t('new_email')}</Text>
              <TextInput 
                value={newEmail}
                onChangeText={setNewEmail}
                keyboardType="email-address"
                className={`p-2 rounded-lg ${isDarkMode ? 'bg-slate-700 text-white' : 'bg-gray-100 text-coal-black'}`}
              />
            </View>
            <TouchableOpacity
              onPress={handleEmailChange}
              className={`py-3 rounded-lg ${isDarkMode ? 'bg-baby-blue' : 'bg-ocean-blue'}`}
            >
              <Text className="text-white text-center font-semibold">
                {i18n.t('submit')}
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Change Password Section */}
        <View className={`rounded-xl p-4 ${isDarkMode ? 'bg-slate-800/60' : 'bg-white'}`}>
          <Text className={`text-xl font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-coal-black'}`}>
            {i18n.t('change_password')}
          </Text>
          <View className="space-y-4">
            <View>
              <Text className={`mb-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>{i18n.t('current_email')}</Text>
              <TextInput 
                value={currentEmail}
                onChangeText={setCurrentEmail}
                keyboardType="email-address"
                className={`p-2 rounded-lg ${isDarkMode ? 'bg-slate-700 text-white' : 'bg-gray-100 text-coal-black'}`}
              />
            </View>
            <View>
              <Text className={`mb-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>{i18n.t('current_password')}</Text>
              <TextInput 
                value={currentPasswordForPass}
                onChangeText={setCurrentPasswordForPass}
                secureTextEntry
                className={`p-2 rounded-lg ${isDarkMode ? 'bg-slate-700 text-white' : 'bg-gray-100 text-coal-black'}`}
              />
            </View>
            <View>
              <Text className={`mb-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>{i18n.t('new_password')}</Text>
              <TextInput 
                value={newPassword}
                onChangeText={setNewPassword}
                secureTextEntry
                className={`p-2 rounded-lg ${isDarkMode ? 'bg-slate-700 text-white' : 'bg-gray-100 text-coal-black'}`}
              />
            </View>
            <TouchableOpacity
              onPress={handlePasswordChange}
              className={`py-3 rounded-lg ${isDarkMode ? 'bg-baby-blue' : 'bg-ocean-blue'}`}
            >
              <Text className="text-white text-center font-semibold">
                {i18n.t('submit')}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
} 
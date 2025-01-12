import React, { useState } from 'react';
import { View, Text, Switch, ScrollView } from 'react-native';
import { useTheme } from '@/ctx/ThemeContext';
import * as Notifications from 'expo-notifications';
import i18n from '@/i18n';
import Return from '@/shared/components/Return';
import { LinearGradient } from 'expo-linear-gradient';
import { MotiView } from 'moti';

export default function NotificationsSettings() {
  const { isDarkMode } = useTheme();
  const [externalNotifications, setExternalNotifications] = useState(false);
  const [internalNotifications, setInternalNotifications] = useState(true);

  const handleNotificationToggle = async (isExternal: boolean) => {
    if (isExternal) {
      const { status } = await Notifications.requestPermissionsAsync();
      if (status === 'granted') {
        setExternalNotifications(!externalNotifications);
      }
    } else {
      setInternalNotifications(!internalNotifications);
    }
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
            {i18n.t('notifications')}
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
            <View className="flex-row items-center justify-between">
              <View>
                <Text className={`text-lg font-medium ${isDarkMode ? 'text-white' : 'text-coal-black'}`}>
                  {i18n.t('external_notifications')}
                </Text>
                <Text className={`text-sm mt-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  {i18n.t('external_notifications_desc')}
                </Text>
              </View>
              <Switch
                value={externalNotifications}
                onValueChange={() => handleNotificationToggle(true)}
              />
            </View>

            <View className="flex-row items-center justify-between">
              <View>
                <Text className={`text-lg font-medium ${isDarkMode ? 'text-white' : 'text-coal-black'}`}>
                  {i18n.t('internal_notifications')}
                </Text>
                <Text className={`text-sm mt-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  {i18n.t('internal_notifications_desc')}
                </Text>
              </View>
              <Switch
                value={internalNotifications}
                onValueChange={() => handleNotificationToggle(false)}
              />
            </View>
          </View>
        </MotiView>
      </ScrollView>
    </View>
  );
} 
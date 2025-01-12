import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useTheme } from '@/ctx/ThemeContext';
import { useRouter, Href } from 'expo-router';
import { MaterialIcons, Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import i18n from '@/i18n';
import Return from '@/shared/components/Return';

interface MenuItem {
  title: string;
  icon: string;
  route: Href<string>;
  iconComponent: typeof MaterialIcons | typeof Ionicons;
}

export default function Settings() {
  const { isDarkMode } = useTheme();
  const router = useRouter();

  const menuItems: MenuItem[] = [
    {
      title: 'account_info',
      icon: 'account-box',
      route: '/(app)/Settings/AccountInfo' as Href<string>,
      iconComponent: MaterialIcons
    },
    {
      title: 'security',
      icon: 'security',
      route: '/(app)/Settings/Security' as Href<string>,
      iconComponent: MaterialIcons
    },
    {
      title: 'notifications',
      icon: 'notifications',
      route: '/(app)/Settings/Notifications' as Href<string>,
      iconComponent: MaterialIcons
    },
    {
      title: 'region_language',
      icon: 'language',
      route: '/(app)/Settings/RegionLanguage' as Href<string>,
      iconComponent: MaterialIcons
    }
  ];

  return (
    <View className="flex-1">
      <View className="bg-ocean-blue px-4 py-3 flex-row items-center">
        <Return href={"/(app)/(tabs)/Account" as Href<string>} size={24} color="white" />
        <Text className="text-white text-lg font-semibold ml-3">{i18n.t("settings")}</Text>
      </View>
      <ScrollView className="flex-1 bg-off-white">
        <View className="px-4 py-3">
          {menuItems.map((item, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => router.push(item.route)}
              className={`flex-row items-center py-3 px-4 mb-3 rounded-lg ${
                isDarkMode ? 'bg-slate-800 border border-slate-700' : 'bg-white shadow-sm'
              }`}
            >
              <item.iconComponent
                name={item.icon}
                size={24}
                color={isDarkMode ? "#1DCDFE" : "#17222D"}
              />
              <Text className={`ml-3 text-base ${isDarkMode ? 'text-white' : 'text-coal-black'}`}>
                {i18n.t(item.title)}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
} 
import { View, Text, ScrollView } from "react-native";
import { Link, Href } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import i18n from "@/i18n";
import { useTheme } from "@/ctx/ThemeContext";

interface MenuItem {
  title: string;
  icon: string;
  route: Href<string>;
  iconComponent: typeof MaterialIcons;
}

export default function Settings() {
  const { isDarkMode } = useTheme();

  const menuItems: MenuItem[] = [
    {
      title: "account_info",
      icon: "account-circle",
      route: "/Settings/AccountInfo" as Href<string>,
      iconComponent: MaterialIcons,
    },
    {
      title: "security",
      icon: "security",
      route: "/Settings/Security" as Href<string>,
      iconComponent: MaterialIcons,
    },
    {
      title: "notifications",
      icon: "notifications",
      route: "/Settings/Notifications" as Href<string>,
      iconComponent: MaterialIcons,
    },
    {
      title: "region_language",
      icon: "language",
      route: "/Settings/RegionLanguage" as Href<string>,
      iconComponent: MaterialIcons,
    },
  ];

  return (
    <View className={`flex-1 ${isDarkMode ? 'bg-slate-900' : 'bg-off-white'}`}>
      <ScrollView className="flex-1 px-4 pt-4">
        <View className={`rounded-xl overflow-hidden ${isDarkMode ? 'bg-slate-800/60' : 'bg-white'}`}>
          {menuItems.map((item, index) => (
            <Link key={index} href={item.route} asChild>
              <View className={`flex-row items-center py-3.5 px-4 ${
                index !== menuItems.length - 1 ? isDarkMode ? 'border-b border-slate-700/50' : 'border-b border-gray-100' : ''
              }`}>
                <item.iconComponent
                  name={item.icon as any}
                  size={24}
                  color="#1DCDFE"
                />
                <Text className={`ml-3 flex-1 text-base ${isDarkMode ? 'text-baby-blue' : 'text-coal-black'}`}>
                  {i18n.t(item.title)}
                </Text>
                <MaterialIcons
                  name="chevron-right"
                  size={24}
                  color="#1DCDFE"
                />
              </View>
            </Link>
          ))}
        </View>
      </ScrollView>
    </View>
  );
} 
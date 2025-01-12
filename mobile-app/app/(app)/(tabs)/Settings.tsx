import { View, Text, ScrollView, StatusBar } from "react-native";
import { Link, Href } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import i18n from "@/i18n";
import { useTheme } from "@/ctx/ThemeContext";
import { MotiView } from "moti";

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
      <StatusBar barStyle="light-content" />
      <ScrollView className="flex-1 px-4 pt-4">
        <View className="w-full">
          {menuItems.map((item, index) => (
            <MotiView
              key={index}
              from={{ opacity: 0, translateX: -20 }}
              animate={{ opacity: 1, translateX: 0 }}
              transition={{
                delay: index * 100,
                damping: 20,
                mass: 0.8,
              }}
              className="mb-4"
            >
              <View className={`${isDarkMode ? 'bg-concrete-turqouise/20' : 'bg-ocean-blue/5'} rounded-2xl border border-baby-blue/10`}>
                <Link href={item.route} asChild>
                  <View className="py-4 px-4">
                    <View className="flex-row items-center justify-between">
                      <View className="flex-row items-center">
                        <item.iconComponent
                          name={item.icon as any}
                          size={22}
                          color={isDarkMode ? "#1DCDFE" : "#17222D"}
                        />
                        <Text className={`ml-5 text-base font-medium ${isDarkMode ? 'text-baby-blue' : 'text-ocean-blue'}`}>
                          {i18n.t(item.title)}
                        </Text>
                      </View>
                      <MaterialIcons
                        name="chevron-right"
                        size={18}
                        color={isDarkMode ? "#1DCDFE" : "#17222D"}
                      />
                    </View>
                  </View>
                </Link>
              </View>
            </MotiView>
          ))}
        </View>
      </ScrollView>
    </View>
  );
} 
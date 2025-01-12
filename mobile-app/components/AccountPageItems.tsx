import { useAuth } from "@/ctx/AuthContext";
import React from "react";
import { View, Linking, Platform, Alert } from "react-native";
import SearchItem from "@/shared/components/SearchItem";
import { useLinkTo } from '@react-navigation/native';
import i18n from "@/i18n";
import { MotiView } from "moti";

interface AccountPageItemsProps {
  isDarkMode: boolean;
}

export default function AccountPageItems({ isDarkMode }: AccountPageItemsProps) {
  const linkTo = useLinkTo();
  const auth = useAuth();
  
  const handleRateApp = () => {
    const storeUrl = Platform.select({
      ios: 'https://apps.apple.com/us/app/your-app-id',
      android: 'market://details?id=com.yourapp.package',
    })|| '';
    
    Linking.openURL(storeUrl).catch((err) =>
      console.error('An error occurred', err)
    );
  };
  
  const handleNotificationsPress = () => {
    linkTo('/Notifications'); 
  };
  
  const handleLogout = () => {
    Alert.alert(
      i18n.t('logout'),
      i18n.t('logout_confirm'),
      [
        {
          text: i18n.t('cancel'),
          style: 'cancel',
        },
        {
          text: i18n.t('confirm'),
          onPress: () => auth.signOut(),
          style: 'destructive',
        },
      ],
      { cancelable: true }
    );
  };

  const items = [
    {
      title: i18n.t('notifications'),
      icon: 'bell',
      onPress: handleNotificationsPress,
    },
    {
      title: i18n.t('about'),
      icon: 'circle-info',
      onPress: () => console.log('About'),
    },
    {
      title: i18n.t('rate'),
      icon: 'star',
      onPress: handleRateApp,
    },
    {
      title: i18n.t('logout'),
      icon: 'arrow-right-from-bracket',
      onPress: handleLogout,
    },
  ];

  return (
    <View className="w-full">
      {items.map((item, index) => (
        <MotiView
          key={item.title}
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
            <SearchItem
              title={item.title}
              icon={item.icon}
              isAccount
              onPress={item.onPress}
              isDarkMode={isDarkMode}
            />
          </View>
        </MotiView>
      ))}
    </View>
  );
}
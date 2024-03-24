import { useAuth } from "@/ctx/AuthContext";
import React from "react";
import { View, Linking, Platform, Alert } from "react-native";
import SearchItem from "@/shared/components/SearchItem";
import { useLinkTo } from '@react-navigation/native';

export default function AccountPageItems() {
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
      'Log Out',
      'Are you sure you want to log out?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () => auth.signOut(), 
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <View className="items-center justify-center w-full">
      <SearchItem
        title={'Language'}
        icon={'globe'}
        isAccount 
        onPress={() => console.log('Language and Region')} 
      />
      <SearchItem 
        title={'Notifications'} 
        icon={'bell'} 
        isAccount 
        onPress={handleNotificationsPress}
      />
      <SearchItem 
        title={'About'} 
        icon={'circle-info'} 
        isAccount 
        onPress={() => console.log('About')} 
      />
      <SearchItem 
        title={'Rate App'}
        icon={'star'} 
        isAccount 
        onPress={handleRateApp} 
      />
      <SearchItem 
        title={'Log Out'}
        icon={'arrow-right-from-bracket'}
        isAccount
        onPress={()=> handleLogout()}
      />
    </View>
  )
}
import { useAuth } from "@/ctx/AuthContext";
import React from "react";
import { View, Linking, Platform } from "react-native";
import SearchItem from "@/shared/components/SearchItem";
import { useLinkTo } from '@react-navigation/native';

export default function AccountPageItems() {
  const linkTo = useLinkTo();
  
  const auth = useAuth();
  
  //Redirect user to Google Play/App store
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
    linkTo('/Notifications'); // Navigate to the "Notifications" page
  };
  

  return (
    <View className="items-center justify-center w-full">
      <SearchItem title={'Language'} icon={'globe'} isAccount onPress={() => console.log('Language and Region')} />
      {/* <SearchItem title={'Previous Queues'} icon={'clock-rotate-left'} isAccount onPress={() => console.log('Previous Queues')} /> */}
      <SearchItem title={'Notifications'} icon={'bell'} isAccount onPress={handleNotificationsPress} />
      <SearchItem title={'About'} icon={'circle-info'} isAccount onPress={() => console.log('About')} />
      <SearchItem title={'Rate App'} icon={'star'} isAccount onPress={handleRateApp} />
      <SearchItem title={'Log Out'} icon={'arrow-right-from-bracket'} isAccount onPress={auth?.signOut} />
    </View>
  )
}
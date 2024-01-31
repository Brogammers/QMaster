import { useAuth } from "@/ctx/AuthContext";
import React from "react";
import { View } from "react-native";
import SearchItem from "@/shared/components/SearchItem";

export default function AccountPageItems() {
  const auth = useAuth();

  return (
    <View className="items-center justify-center w-full">
      <SearchItem title={'Language and Region'} icon={'globe'} isAccount onPress={() => console.log('Language and Region')} />
      <SearchItem title={'Previous Queues'} icon={'clock-rotate-left'} isAccount onPress={() => console.log('Previous Queues')} />
      <SearchItem title={'Notifications'} icon={'bell'} isAccount onPress={() => console.log('Notifications')} />
      <SearchItem title={'About'} icon={'circle-info'} isAccount onPress={() => console.log('About')} />
      <SearchItem title={'Rate App'} icon={'star'} isAccount onPress={() => console.log('Rate App')} />
      <SearchItem title={'Log Out'} icon={'arrow-right-from-bracket'} isAccount onPress={auth?.signOut} />
    </View>
  )
}
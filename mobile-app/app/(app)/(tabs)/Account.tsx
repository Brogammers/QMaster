import React, { useEffect, useState } from "react";
import { Text, View, StatusBar, Platform, StyleSheet } from "react-native";
import AccountPageItems from '@/components/AccountPageItems';
import { SafeAreaView } from "react-native-safe-area-context";
import AccountPageProfile from "@/components/AccountPageProfile";
import { ScrollView } from "react-native-gesture-handler";
import { useIsFocused } from "@react-navigation/native";
import { API_BASE_URL_LOGIN } from "@env";
import axios from "axios";

export default function Account() {
  const isFocused = useIsFocused();
  const [username, setUsername] = useState('');

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `${API_BASE_URL_LOGIN}`
      );
      const email = response.data.email;
      setUsername(email);

    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (isFocused) {
      fetchData();
    }
  }, [isFocused]);

  return (
    <SafeAreaView className="items-center self-center flex-1 w-screen bg-off-white">
      <StatusBar
				translucent
				barStyle="dark-content"
			/>
      <AccountPageProfile />
      <View className="w-10/12">
        <ScrollView>
          <Text className="w-full pb-6 text-3xl font-extrabold text-left border-b text-ocean-blue-2 border-lite-grey">
            Hi {username}!
          </Text>
          <AccountPageItems />
        </ScrollView>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#D9D9D9',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight ? StatusBar.currentHeight - 1 : 0 : 0,
  },
});
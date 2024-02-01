import React from "react";
import { Platform, StatusBar, StyleSheet, Text, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";

export default function History() {
  return (
    <SafeAreaView style={styles.container}>
    <StatusBar
      translucent
      backgroundColor='#17222D'
      barStyle='light-content'
    />
    <ScrollView className='w-screen' showsVerticalScrollIndicator={false}>
      <View className='bg-[#D9D9D9]'>
        <Text>History</Text>
      </View>
    </ScrollView>
  </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#17222D',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight ? StatusBar.currentHeight - 1 : 0 : 0,
  },
});
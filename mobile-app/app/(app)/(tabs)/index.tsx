import React from 'react';
import { StatusBar, StyleSheet, SafeAreaView, Platform, Text, TextInput, TouchableOpacity, View } from 'react-native';
import ScanQr from '@/components/ScanQR';
import SearchBar from '@/components/SearchBar';
import { ScrollView } from 'react-native-gesture-handler';
import CategoriesList from '@/components/CategoriesList';
import RecentQueues from '@/components/RecentQueues';
import FrequentlyAsked from '@/components/FrequentlyAsked';
import TextButton from '@/shared/components/TextButton';
import useAuth from '@/ctx/AuthContext';


export default function Index() {
  const auth = useAuth();

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        translucent
        backgroundColor='#17222D'
        barStyle='light-content'
      />
      <ScrollView className='w-screen' showsVerticalScrollIndicator={false}>
      <ScanQr />
      <View className='w-[85%] self-center'>
        <SearchBar />
        <CategoriesList />
        <RecentQueues />
        <FrequentlyAsked />
        <TextButton
          text={'Logout'} 
          buttonColor={'#1DCDFE'} 
          textColor={'white'} 
          onPress={auth?.signOut}
        />
      </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#D9D9D9',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight ? StatusBar.currentHeight - 1 : 0 : 0,
  },
});

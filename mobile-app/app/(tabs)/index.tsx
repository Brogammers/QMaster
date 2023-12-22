import React from 'react';
import { StatusBar, StyleSheet, SafeAreaView, Platform, Text, TextInput, TouchableOpacity } from 'react-native';
import ScanQr from '@/components/ScanQR';
import SearchBar from '@/components/SearchBar';
import { ScrollView } from 'react-native-gesture-handler';
import CategoriesList from '@/components/CategoriesList';
import RecentQueues from '@/components/RecentQueues';
import FrequentlyAsked from '@/components/FrequentlyAsked';


export default function Index() {

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        translucent
        backgroundColor='#17222D'
        barStyle='light-content'
      />
      <ScanQr />
      <ScrollView className='self-center w-[85%]' showsVerticalScrollIndicator={false}>
        <SearchBar />
        <CategoriesList />
        <RecentQueues />
        <FrequentlyAsked />
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

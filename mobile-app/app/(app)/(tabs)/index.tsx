import React from 'react';
import {
  StatusBar,
  StyleSheet,
  SafeAreaView,
  Platform,
  View,
  ScrollView
} from 'react-native';
import ScanQr from '@/components/ScanQR';
import SearchBar from '@/components/SearchBar';
import CategoriesList from '@/components/CategoriesList';
import RecentQueues from '@/components/RecentQueues';
import FrequentlyAsked from '@/components/FrequentlyAsked';
import CurrentQueuesList from '@/components/CurrentQueuesList';


export default function Index() {

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        translucent
        backgroundColor='#17222D'
        barStyle='light-content'
      />
      <ScrollView className='w-screen' showsVerticalScrollIndicator={false}>
        <View className='bg-[#D9D9D9]'>
          <ScanQr />
          <View className='w-[85%] self-center'>
            <SearchBar />
            <CurrentQueuesList />
            <CategoriesList />
            <RecentQueues />
            <FrequentlyAsked />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#17222D',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight ? StatusBar.currentHeight - 1 : 0 : 0,
  },
});

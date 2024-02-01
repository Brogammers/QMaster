import React, { useRef, useState } from 'react';
import {
  StatusBar,
  StyleSheet,
  SafeAreaView,
  Platform,
  View,
  ScrollView,
  Dimensions
} from 'react-native';
import ScanQr from '@/components/ScanQR';
import SearchBar from '@/components/SearchBar';
import CategoriesList from '@/components/CategoriesList';
import RecentQueues from '@/components/RecentQueues';
import FrequentlyAsked from '@/components/FrequentlyAsked';
import CurrentQueuesList from '@/components/CurrentQueuesList';


export default function Index() {
  const [bgColor, setBgColor] = useState('#17222D');
  const scanQrRef = useRef<View>(null);

  const handleScroll = () => {
    scanQrRef.current?.measure((fx, fy, width, height, px, py) => {
      if (py < 0) {
        setBgColor('#D9D9D9');
      } else {
        setBgColor('#17222D');
      }
    });
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: bgColor }]}>
      <StatusBar
        translucent
        backgroundColor='#17222D'
        barStyle='light-content'
      />
      <ScrollView
        className='w-screen'
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={16}
        onScroll={handleScroll}
      >
        <View className='bg-[#D9D9D9]'>
          <View ref={scanQrRef}>
            <ScanQr />
          </View>
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
    // backgroundColor: '#17222D',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight ? StatusBar.currentHeight - 1 : 0 : 0,
  },
});

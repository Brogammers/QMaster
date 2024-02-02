import React, { useEffect, useRef, useState } from 'react';
import {
  StatusBar,
  StyleSheet,
  SafeAreaView,
  Platform,
  View,
  ScrollView,
} from 'react-native';
import ScanQr from '@/components/ScanQR';
import SearchBar from '@/components/SearchBar';
import CategoriesList from '@/components/CategoriesList';
import RecentQueues from '@/components/RecentQueues';
import FrequentlyAsked from '@/components/FrequentlyAsked';
import CurrentQueuesList from '@/components/CurrentQueuesList';


export default function Index() {
  const [bgColor, setBgColor] = useState('#17222D');
  const [scrollY, setScrollY] = useState(0);
  const scanQrRef = useRef<View>(null);
  const [scanQrHeight, setScanQrHeight] = useState(0);

  const handleScroll = (event: { 
    nativeEvent: { 
      contentOffset: { 
        y: any; 
      }; 
    }; 
  }) => {
    const currentScrollY = event.nativeEvent.contentOffset.y;
    setScrollY(currentScrollY);
  };

  useEffect(() => {
    if (scrollY > scanQrHeight) {
      setBgColor('#D9D9D9');
      if (Platform.OS === 'android') {
        StatusBar.setBackgroundColor('#D9D9D9', true);
      }
      StatusBar.setBarStyle('dark-content');
    } else {
      setBgColor('#17222D');
      if (Platform.OS === 'android') {
        StatusBar.setBackgroundColor('#17222D', true);
      }
      StatusBar.setBarStyle('light-content');
    }
  }, [scrollY, scanQrHeight]);  

  const handleLayout = (event: { nativeEvent: { layout: { height: React.SetStateAction<number>; }; }; }) => {
    setScanQrHeight(event.nativeEvent.layout.height);
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: bgColor }]}>
      <StatusBar
        translucent
        backgroundColor='#17222D'
        barStyle= {scrollY > scanQrHeight ? 'dark-content' : 'light-content'}
      />
      <ScrollView
        className='w-screen'
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={16}
        onScroll={handleScroll}
      >
        <View className='bg-[#D9D9D9]'>
          <View ref={scanQrRef} onLayout={handleLayout}>
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
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight ? StatusBar.currentHeight - 1 : 0 : 0,
  },
});

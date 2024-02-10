import React, { useEffect } from "react";
import { Platform, StatusBar, StyleSheet, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useIsFocused } from "@react-navigation/native";
import HistoryComponent from "@/shared/components/HistoryComponent";
import Carrefour from '@/assets/images/CarrefourLogo.png';
import { HistoryList } from "@/constants";

export default function History() {
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      if (Platform.OS === "android") {
        StatusBar.setBackgroundColor('#17222D', true)
      }
      StatusBar.setBarStyle('light-content');
      StatusBar.setTranslucent
    }
  }, [isFocused]);

  return (
    <ScrollView style={styles.container}
      showsVerticalScrollIndicator={false}
    >
      {
        HistoryList.map((item, index) => (
          <HistoryComponent 
          image={item.image} 
          name={item.name} 
          location={item.location} 
          date={item.date} id={item.id} 
          status={item.status} 
          isHistory 
          key={index} />
        ))
      }
    </ScrollView>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#D9D9D9',
  },
});
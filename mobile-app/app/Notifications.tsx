import React from "react";
import { ScrollView, StyleSheet } from "react-native";
import HistoryComponent from "@/shared/components/HistoryComponent";
import { HistoryList } from "@/constants";

export default function Notifications() {
  return (
    <ScrollView style={styles.container}
      showsVerticalScrollIndicator={false}
    >
      {
        HistoryList.map((item, index) => (
          <HistoryComponent 
          image={item.image} 
          name={item.name} 
          notification={item.notification}
          date={item.date}
          time={item.time}
          isNotification 
          key={index} />
        ))
      }
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#D9D9D9',
  },
});
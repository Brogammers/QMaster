// import React from "react";
// import { ScrollView, StyleSheet } from "react-native";
// import HistoryComponent from "@/shared/components/HistoryComponent";
// import { HistoryList } from "@/constants";
// import { useRoute } from '@react-navigation/native';

// export default function BrandsList() {
//   const route = useRoute();
//   const { categoryName }: any = route.params;
//   const filteredBrands = HistoryList.filter(item => item.category === categoryName)

//   return (
//     <ScrollView style={styles.container}
//       showsVerticalScrollIndicator={false}
//     >
//       {
//         filteredBrands.map((item, index) => (
//           <HistoryComponent
//             image={item.image}
//             name={item.name}
//             notification={item.notification}
//             date={item.date}
//             time={item.time}
//             isCategory
//             key={index} />
//         ))
//       }
//     </ScrollView>
//   )
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#D9D9D9',
//   },
// });
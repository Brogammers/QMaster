import React, { useState, useRef } from "react"
import { StyleSheet, View, FlatList, Animated } from "react-native"
import Image from 'react-native-remote-svg'
import logoImage from '../assets/images/logoImage.svg';
import { TouchableOpacity } from "react-native-gesture-handler";
import OnboardingItems from "../components/OnboardingItems";
import TextButton from "../components/TextButton";
import { Dimensions } from 'react-native';
import { OnboardingData } from "../data";
import Paginator from '../components/paginator'

const window = Dimensions.get('window');

const Onboarding = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;
  const slidesref = useRef (new Animated.Value(0)).current;
  const viewableItemsChanged = useRef(({ viewableItems }) => {
    setCurrentIndex(viewableItems[0].index);
  }).current;
  const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50}).current;
  
  return (
    <View className="bg-[#2F2E41] h-screen justify-center items-center" style={styles.container}>
      <View style={styles.row} className="bg-transparent">
        <View className="bg-transparent">
          <Image source={logoImage} />
        </View>

        <FlatList 
          data={OnboardingData}
          renderItem={({ item }) => <OnboardingItems item={item} />}
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          bounces={false}
          keyExtractor={(item) => item.text}
          onScroll={Animated.event([{nativeEvent: {contentOffset: { x: scrollX }}}], 
            {
              useNativeDriver: false,
            })}
            scrollEventThrottle={32}
            onViewableItemsChanged={viewableItemsChanged}
            viewabilityConfig={viewConfig}
            
        />

        <Paginator data={OnboardingData} scrollX = {scrollX}/>

        <View className="mt-12">
          <TextButton text={"Log In"} buttonColour={"#1DCDFE"} textColor={"white"} />
          <TextButton text={"Sign Up"} buttonColour={"#C5C5C5"} textColor={"black"} />
        </View>

      </View>
    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    backgroundColor: '#17222D',
    color: '#FFF',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  row: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
})
export default Onboarding;
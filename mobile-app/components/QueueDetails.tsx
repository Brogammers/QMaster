import React, { useState } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  Alert
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Wandering from "@/assets/images/wandering.svg";
import { FontAwesome } from "@expo/vector-icons";
import { QueueDetailsProps } from "@/types";
import { Entypo } from "@expo/vector-icons";

export default function QueueDetails(props: QueueDetailsProps) {
  const [leave, setLeave] = useState(false);
  const { branch } = props;

  const handleLeaveQueue = () => {
    Alert.alert(
      "Leave Queue?",
      "Once you leave, your position in the queue wil be lost.",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Leave",
          onPress: () => setLeave(false),
        },
      ]
    );
  };

  // This is the loading that will be shown while the backend is looking for the queue, paste it wherever you want during the integration
  // <>
  //   <ActivityIndicator size={50} />
  //   <Text className="mt-3.5">
  //     Processing location...
  //   </Text>
  // </>

  return (
    <View className="items-center justify-center w-11/12 mt-8 bg-white rounded-2xl h-1/2">
      {branch == -1 ? (
        <>
          <Entypo name="location-pin" size={50} color="#B41818" />
          <Text className="text-center text-lava-black mt-3.5">
            Please insert location or allow the app to access your location from
            settings.
          </Text>
        </>
      ) : !leave ? (
        <>
          <View className="items-center">
            <Text className="text-2xl font-medium">7 people in queue</Text>
            <View className="flex-row items-center mt-1">
              <MaterialCommunityIcons
                name="timer-sand-complete"
                size={20}
                color="#444444"
              />
              <Text className="text-base text-lava-black">~18 min</Text>
            </View>
          </View>
          <TouchableOpacity
            className="bg-baby-blue px-6 py-1 rounded-lg justify-center items-center mt-8"
            onPress={() => setLeave(true)}
          >
            <Text className="text-2xl font-bold text-white">Join Queue</Text>
          </TouchableOpacity>
        </>
      ) : (
        <>
          <View className="items-center">
            <Text className="text-2xl font-medium">7 people in queue</Text>
            <View className="flex-row items-center mt-1">
              <MaterialCommunityIcons
                name="timer-sand-complete"
                size={20}
                color="#444444"
              />
              <Text className="text-base text-lava-black">~18 min</Text>
            </View>
          </View>
          <View className="items-center w-full mt-8">
            <View className="flex-row items-center justify-center w-3/5 relative h-9 mb-2">
              <View
                style={{
                  position: "absolute",
                  left: 0,
                  zIndex: 100,
                  width: 40,
                  height: 40,
                  borderRadius: 20,
                  overflow: "hidden",
                  backgroundColor: "white",
                  alignItems: "flex-end",
                }}
              >
                <FontAwesome name="check-circle" size={40} color="#1DCDFE" />
              </View>

              <View className="bg-off-white w-full rounded-full h-4/5 flex justify-center items-center">
                <Text className="text-baby-blue text-base text-center">
                  Queue Joined!
                </Text>
              </View>
            </View>
            <TouchableOpacity
              className="bg-lava-red px-6 py-1 rounded-lg justify-center items-center"
              onPress={() => handleLeaveQueue()}
            >
              <Text className="text-2xl font-bold text-white">Leave Queue</Text>
            </TouchableOpacity>
          </View>
        </>
      )}

      <Wandering className="absolute bottom--50 right-8" />
    </View>
  );
}

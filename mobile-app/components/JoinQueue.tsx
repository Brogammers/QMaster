import React, { useState } from "react";
import { View, Dimensions, Text, ScrollView } from "react-native";
import DropDownPicker from 'react-native-dropdown-picker';
import { locations } from '@/constants/index';
import QueueDetails from "./QueueDetails";
import { useTheme } from '@/ctx/ThemeContext';
import { MotiView } from 'moti';
import Wandering from "@/assets/images/wandering.svg";

export default function QueuePage() {
  const width = Dimensions.get('window').width * 0.85;
  const { isDarkMode } = useTheme();

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);

  return (
    <View className="flex-1">
      <ScrollView 
        className="flex-1"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 40 }}
      >
        <View className="items-center w-full px-6">
          <MotiView
            from={{ opacity: 0, translateY: 10 }}
            animate={{ opacity: 1, translateY: 0 }}
            transition={{
              type: "spring",
              mass: 1,
              damping: 15
            }}
            className="w-full items-center"
          >
            <View className="w-full items-center">
              <DropDownPicker
                open={open}
                value={value}
                items={locations}
                setOpen={setOpen}
                setValue={setValue}
                style={{
                  width: width,
                  alignSelf: "center",
                  borderRadius: 12,
                  marginTop: 20,
                  borderWidth: 1.5,
                  backgroundColor: isDarkMode ? 'rgba(29, 205, 254, 0.1)' : 'white',
                  borderColor: isDarkMode ? 'rgba(29, 205, 254, 0.2)' : '#E5E7EB',
                  minHeight: 50,
                }}
                textStyle={{
                  fontSize: 16,
                  color: isDarkMode ? '#1DCDFE' : '#17222D',
                }}
                dropDownContainerStyle={{
                  width: width,
                  alignSelf: "center",
                  borderRadius: 12,
                  borderWidth: 1.5,
                  backgroundColor: isDarkMode ? '#17222D' : 'white',
                  borderColor: isDarkMode ? 'rgba(29, 205, 254, 0.2)' : '#E5E7EB',
                  shadowColor: "#000",
                  shadowOffset: {
                    width: 0,
                    height: 2,
                  },
                  shadowOpacity: 0.25,
                  shadowRadius: 3.84,
                  elevation: 5,
                }}
                searchContainerStyle={{
                  borderBottomColor: isDarkMode ? 'rgba(29, 205, 254, 0.2)' : '#E5E7EB',
                }}
                searchTextInputStyle={{
                  color: isDarkMode ? '#1DCDFE' : '#17222D',
                  backgroundColor: isDarkMode ? 'rgba(29, 205, 254, 0.1)' : 'white',
                }}
                placeholder="Choose Branch"
                searchable
                searchPlaceholder="Search branches..."
                ArrowUpIconComponent={() => (
                  <Text style={{ color: isDarkMode ? '#1DCDFE' : '#17222D', fontSize: 18 }}>▲</Text>
                )}
                ArrowDownIconComponent={() => (
                  <Text style={{ color: isDarkMode ? '#1DCDFE' : '#17222D', fontSize: 18 }}>▼</Text>
                )}
                listMode="SCROLLVIEW"
                scrollViewProps={{
                  nestedScrollEnabled: true,
                }}
              />
            </View>
          </MotiView>

          <View className="relative w-full">
            <MotiView
              from={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                type: "spring",
                mass: 1,
                damping: 15,
                delay: 150
              }}
              className="w-full"
            >
              <QueueDetails branch={value == null ? -1 : value} />
            </MotiView>
            {value == null && (
              <View style={{ 
                position: 'absolute',
                bottom: -25,
                right: 20,
                zIndex: 999,
              }}>
                <Wandering width={70} height={70} />
              </View>
            )}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
import React, { useState } from "react";
import { View, Dimensions, Text, ScrollView, Platform } from "react-native";
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
          <View style={{ 
            zIndex: Platform.OS === 'ios' ? 999 : undefined,
            elevation: Platform.OS === 'android' ? 999 : undefined,
            width: '100%',
            alignItems: 'center',
            marginBottom: open ? 150 : 0,
          }}>
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
              containerStyle={{
                position: 'relative',
                width: width,
              }}
              labelStyle={{
                fontSize: 16,
                color: isDarkMode ? '#1DCDFE' : '#17222D',
              }}
              textStyle={{
                fontSize: 16,
                color: isDarkMode ? '#1DCDFE' : '#17222D',
              }}
              dropDownContainerStyle={{
                width: width,
                position: 'absolute',
                top: 72,
                borderRadius: 12,
                borderWidth: 1.5,
                backgroundColor: isDarkMode ? '#0B1218' : 'white',
                borderColor: isDarkMode ? 'rgba(29, 205, 254, 0.2)' : '#E5E7EB',
                shadowColor: "#000",
                shadowOffset: {
                  width: 0,
                  height: 2,
                },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
                elevation: Platform.OS === 'android' ? 5 : undefined,
                overflow: 'visible'
              }}
              listItemContainerStyle={{
                borderBottomWidth: 1,
                borderBottomColor: isDarkMode ? 'rgba(29, 205, 254, 0.1)' : '#F1F5F9',
                padding: 12,
              }}
              listItemLabelStyle={{
                color: isDarkMode ? '#1DCDFE' : '#17222D',
              }}
              searchContainerStyle={{
                borderBottomWidth: 1,
                borderBottomColor: isDarkMode ? 'rgba(29, 205, 254, 0.2)' : '#E5E7EB',
                padding: 12,
                marginBottom: 4,
              }}
              searchTextInputStyle={{
                color: isDarkMode ? '#1DCDFE' : '#17222D',
                backgroundColor: isDarkMode ? 'rgba(29, 205, 254, 0.05)' : '#F8FAFC',
                borderRadius: 8,
                borderWidth: 1,
                borderColor: isDarkMode ? 'rgba(29, 205, 254, 0.2)' : '#E5E7EB',
                height: 40,
                paddingHorizontal: 12,
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
                showsVerticalScrollIndicator: false,
              }}
              maxHeight={250}
              itemSeparator={true}
              theme={isDarkMode ? "DARK" : "LIGHT"}
            />
          </View>

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
            style={{ 
              marginTop: 20,
              zIndex: Platform.OS === 'ios' ? -1 : undefined,
              elevation: Platform.OS === 'android' ? 1 : undefined,
            }}
          >
            <QueueDetails branch={value == null ? -1 : value} />
            {value == null && (
              <View style={{ 
                position: 'absolute',
                bottom: -25,
                right: 20,
                zIndex: Platform.OS === 'ios' ? 2 : undefined,
                elevation: Platform.OS === 'android' ? 2 : undefined,
              }}>
                <Wandering width={70} height={70} />
              </View>
            )}
          </MotiView>
        </View>
      </ScrollView>
    </View>
  );
}
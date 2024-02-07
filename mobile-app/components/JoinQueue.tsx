import React, { useState } from "react";
import { Text, View, Dimensions } from "react-native";
import DropDownPicker from 'react-native-dropdown-picker';
import {locations} from '@/constants/index';
import QueueDetails from "./QueueDetails";

export default function QueuePage() {
const width = Dimensions.get('window').width * 0.85;

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: 'Apple', value: 'apple' },
    { label: 'Banana', value: 'banana' }
  ]);
  
  return (
    <View className="items-center w-full">
      <DropDownPicker
        open={open}
        value={value}
        items={locations}
        setOpen={setOpen}
        setValue={setValue}
        setItems={setItems}
        style = {{zIndex: 1000, width: width, alignSelf: "center", borderRadius: 17, marginTop: 30}}
        dropDownContainerStyle = {{width: width, alignSelf: "center", borderRadius: 17, marginTop: 30}}
        placeholder="Choose Branch"
      />
      <QueueDetails />
    </View>
  )
}
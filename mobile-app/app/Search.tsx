import React, { useState } from 'react';
import { StyleSheet, TextInput } from 'react-native';
import { View } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import RecentItemsSearch from '@/components/RecentItemsSearch';
import PopularQueues from '@/components/PopularQueues';
import { ScrollView } from 'react-native-gesture-handler';
import SearchFilter from '@/components/SearchFilter';
import { Recent } from '@/data';

export default function Search() {
  const [input, setInput] = useState("");
  return (

    <View>
      <View className='w-[87%] self-center'>
        <View style={styles.searchBar} className='flex-row items-center self-center w-full mt-6 mb-2.5'>
          <FontAwesome name="search" size={24} color="black" />
          <TextInput
            placeholder="Search for the name of queue"
            autoFocus={true}
            value={input}
            onChangeText={(text) => setInput(text)}
            className='pl-2.5 w-full'
          />
        </View>

        {input.length == 0 ? (
          <ScrollView showsVerticalScrollIndicator={false}>
            <RecentItemsSearch />
            <PopularQueues />
          </ScrollView>
        ) : (
          <SearchFilter data={Recent} input={input} />
        )}
      </View>
    </View>

  )
}

const styles = StyleSheet.create({
  searchBar: {
    height: 44,
    borderWidth: 2,
    borderColor: '#969696',
    borderRadius: 7,
    paddingLeft: 15,
  },
});
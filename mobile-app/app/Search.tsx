import React from 'react';
import { StyleSheet, TextInput, Text, StatusBar } from 'react-native';
import { View } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import RecentItemsSearch from '@/components/RecentItemsSearch';
import PopularQueues from '@/components/PopularQueues';
import { ScrollView } from 'react-native-gesture-handler';

export default function Search() {
    return (
        
            <ScrollView showsVerticalScrollIndicator={false}>
                <StatusBar
                    translucent
                    backgroundColor='#17222D'
                    barStyle='light-content'
                />
                <View className='w-[87%] self-center'>
                    <View style={styles.searchBar} className='flex-row items-center self-center w-full mt-6 mb-2.5'>
                        <FontAwesome name="search" size={24} color="black" />
                        <TextInput
                            placeholder="Search for the name of queue"
                            autoFocus = {true}
                            className='pl-2.5 w-full'
                        />
                    </View>
                    <RecentItemsSearch />
                    <PopularQueues />
                </View>
            </ScrollView>
        
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
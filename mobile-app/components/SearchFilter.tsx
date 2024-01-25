import React from "react";
import SearchItem from "../shared/components/SearchItem";
import { View, FlatList, Text } from "react-native";
import { AntDesign } from '@expo/vector-icons';
import { SearchFilterProps } from "@/types";

export default function SearchFilter(props: SearchFilterProps) {
    const { data, input } = props;

    // Filter the data based on the input
    const filteredData = data.filter((item: { Text: string; }) => item.Text.toLowerCase().includes(input.toLowerCase()));

    return (
        <View>
            {filteredData.length === 0 ? (
                <View className="items-center w-full">
                    <AntDesign name="search1" size={80} color="gray" />
                    <Text className="mt-2 font-bold text-gray-500">We couldn't find any results</Text>
                </View>
            ) : (
                <FlatList
                    data={filteredData}
                    renderItem={({ item }) => (
                        <SearchItem Img={item.Image} Title={item.Text} />
                    )}
                />
            )}
        </View>
    );
}

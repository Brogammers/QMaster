import React, { useEffect, useState } from "react";
import SearchItem from "../shared/components/SearchItem";
import { View, FlatList, Text } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { CurrentQueuesProps, SearchFilterProps } from "@/types";
// import { API_BASE_URL_SEARCH } from "@env";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function SearchFilter(props: SearchFilterProps) {
  const { input } = props;

  // Filter the data based on the input
  const [filteredData, setFilteredData] = useState<CurrentQueuesProps[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = await AsyncStorage.getItem("token");
        const response = await axios.get(
          `${process.env.EXPO_PUBLIC_API_BASE_URL_SEARCH}?filter=${input}&page=1&per-page=1&order=order`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
        const data = response.data.queues; // Access the queues array in the response
        const filtered = data.filter((item: CurrentQueuesProps) =>
          item.name.toLowerCase().includes(input.toLowerCase())
        );
        setFilteredData(filtered);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [input]);

  // Filter the data based on the input
  // const filteredData = data.filter((item: CurrentQueuesProps) => item.name.toLowerCase().includes(input.toLowerCase()));

  return (
    <View>
      {filteredData.length === 0 ? (
        <View className="items-center w-full">
          <AntDesign name="search1" size={80} color="gray" />
          <Text className="mt-2 font-bold text-gray-500">
            We couldn't find any results
          </Text>
        </View>
      ) : (
        <FlatList
          data={filteredData}
          renderItem={({ item }) => (
            <SearchItem image={item.image} title={item.name} />
          )}
        />
      )}
    </View>
  );
}

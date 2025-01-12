import React from "react";
import { Text, View, Image, TouchableOpacity } from "react-native";
import { Entypo } from "@expo/vector-icons";
import { HistoryComponentProps } from "@/types";
import { useNavigation, NavigationProp } from "@react-navigation/native";

export default function HistoryComponent(props: HistoryComponentProps) {
	const {
		image,
		name,
		location,
		date,
		time,
		id,
		status,
		queues,
		notification,
		isHistory,
		isCategory,
		isNotification,
		isDarkMode,
	} = props;
	const navigation = useNavigation() as NavigationProp<any>;

	return (
		<TouchableOpacity
			className={`w-[85%] self-center h-[85] mt-4 rounded-xl items-center px-5 flex-row ${
				isDarkMode ? 'bg-concrete-turqouise/20' : 'bg-white'
			}`}
			onPress={() =>
				navigation.navigate("QueuePage", {
					brandName: name,
					image: image,
				})
			}
		>
			{isHistory && (
				<>
					<Image
						source={image}
						className="w-16 h-16 rounded-lg"
					/>
					<View className="w-[70%] ml-4 h-full justify-between py-2">
						<View>
							<Text className={`text-sm font-semibold ${isDarkMode ? 'text-baby-blue' : 'text-coal-black'}`}>
								{name}
							</Text>
							<View className="flex-row items-center">
								<Entypo
									name="location-pin"
									size={14}
									color="#E50404"
								/>
								<Text className={`text-xs ${isDarkMode ? 'text-baby-blue' : 'text-coal-black'}`}>
									{location}
								</Text>
							</View>
						</View>
						<View className="flex-row justify-between">
							<View>
								<Text className={`text-[8px] ${isDarkMode ? 'text-baby-blue' : 'text-coal-black'}`}>
									{date}
								</Text>
								<Text className={`text-[8px] ${isDarkMode ? 'text-baby-blue' : 'text-coal-black'}`}>
									Queue ID: {id}
								</Text>
							</View>
							<Text className="text-[#4BC337] text-[10px]">
								{status}
							</Text>
						</View>
					</View>
				</>
			)}
			{isCategory && (
				<>
					<Image
						source={image}
						className="w-16 h-16 rounded-lg"
					/>
					<View className="w-[70%] ml-4 h-full justify-center py-2">
						<View>
							<Text className={`text-xl font-semibold ${isDarkMode ? 'text-baby-blue' : 'text-coal-black'}`}>
								{name}
							</Text>
							<View className="flex-row items-center">
								<Entypo
									name="location-pin"
									size={20}
									color="#E50404"
								/>
								<Text className={`text-base ${isDarkMode ? 'text-baby-blue' : 'text-coal-black'}`}>
									{queues} Queues
								</Text>
							</View>
						</View>
					</View>
				</>
			)}
			{isNotification && (
				<>
					<Image
						source={image}
						className="w-16 h-16 rounded-lg"
					/>
					<View className="w-[70%] ml-4 h-full justify-between py-2">
						<Text className={`text-sm font-semibold ${isDarkMode ? 'text-baby-blue' : 'text-coal-black'}`}>
							{name}
						</Text>
						<Text className={`text-xs font-light ${isDarkMode ? 'text-baby-blue' : 'text-coal-black'}`}>
							{notification}
						</Text>
						<View className="flex-row justify-between">
							<View className="flex-row">
								<Text className={`text-[8px] ${isDarkMode ? 'text-baby-blue' : 'text-coal-black'}`}>
									{date}
								</Text>
								<Text className={`text-[8px] ml-3 ${isDarkMode ? 'text-baby-blue' : 'text-coal-black'}`}>
									{time}
								</Text>
							</View>
						</View>
					</View>
				</>
			)}
		</TouchableOpacity>
	);
}

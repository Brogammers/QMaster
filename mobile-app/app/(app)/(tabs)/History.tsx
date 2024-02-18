import React, { useEffect, useState } from "react";
import { Platform, StatusBar, StyleSheet, ScrollView } from "react-native";
import { useIsFocused } from "@react-navigation/native";
import HistoryComponent from "@/shared/components/HistoryComponent";
import { HistoryList } from "@/constants";
import axios from "axios";
import { API_BASE_URL_HISTORY_ANDROID } from "@env";
import { HistoryComponentProps } from "@/types";

export default function History() {
	const isFocused = useIsFocused();

	const [history, setHistory] = useState<HistoryComponentProps[]>([]);

	useEffect(() => {
		if (isFocused) {
			if (Platform.OS === "android") {
				StatusBar.setBackgroundColor("#17222D", true);
			}
			StatusBar.setBarStyle("light-content");
			StatusBar.setTranslucent;
		}

		// IOS Simulator
		// const response = await axios.get(`${API_BASE_URL_HISTORY}`);
		// Android Emulator
		const fetchData = async () => {
			try {
				const response = await axios.get(
					`${API_BASE_URL_HISTORY_ANDROID}?id=1` // TODO: Use user id from session
				);
				const data =
					response.data.enqueues + response.data.dequeues; // Access the queues array in the response
			} catch (error) {
				console.error(error);
			}
		};

		fetchData();
	}, [isFocused]);

	return (
		<ScrollView
			style={styles.container}
			showsVerticalScrollIndicator={false}
		>
			{HistoryList.map((item, index) => (
				<HistoryComponent
					image={item.image}
					name={item.name}
					location={item.location}
					date={item.date}
					id={item.id}
					status={item.status}
					isHistory
					key={index}
				/>
			))}
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#D9D9D9",
	},
});

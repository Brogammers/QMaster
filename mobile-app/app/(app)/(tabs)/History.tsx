import React, { useEffect, useState } from "react";
import { Platform, StatusBar, StyleSheet, ScrollView } from "react-native";
import { useIsFocused } from "@react-navigation/native";
import HistoryComponent from "@/shared/components/HistoryComponent";
import axios from "axios";
import { API_BASE_URL_HISTORY_ANDROID, API_BASE_URL_HISTORY } from "@env";
import { HistoryComponentProps } from "@/types";
import CarrefourLogo from "@/assets/images/CarrefourLogo.png";

export default function History() {
	const isFocused = useIsFocused();
	// const HistoryList: HistoryComponentProps[] = [];
	const [historyList, setHistoryList] = useState<HistoryComponentProps[]>(
		[]
	);
	const [historyEnqueue, setHistoryEnqueue] = useState<
		HistoryComponentProps[]
	>([]);
	const [historyDequeue, setHistoryDequeue] = useState<
		HistoryComponentProps[]
	>([]);
	useEffect(() => {
		if (isFocused) {
			if (Platform.OS === "android") {
				StatusBar.setBackgroundColor("#17222D", true);
			}
			StatusBar.setBarStyle("light-content");
			StatusBar.setTranslucent;
		}

		const fetchData = async () => {
			try {
				const response = await axios.get(
					`${API_BASE_URL_HISTORY}?id=1`
				);
				const data = response.data.history;

				// Setting enqueue and dequeue history
				setHistoryEnqueue(data.enqueuings.content);
				setHistoryDequeue(data.dequeuings.content);
				historyDequeue.forEach((item) => {
					item.isHistory = true;
					item.status = "Dequeued";
					item.date = "Today";
				});
				historyEnqueue.forEach((item) => {
					item.isHistory = true;
					item.status = "Enqueued";
					item.date = "Today";
				});
				// HistoryList.push(...historyEnqueue);
				// HistoryList.push(...historyDequeue);
				setHistoryList([...historyEnqueue, ...historyDequeue]);
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
			{historyList.map((item, index) => (
				<HistoryComponent
					image={CarrefourLogo}
					name={item.name}
					location={"Anything for now"}
					date={item.date}
					id={item.id}
					status={item.status}
					isHistory={item.isHistory}
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

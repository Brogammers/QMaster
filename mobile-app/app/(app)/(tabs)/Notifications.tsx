import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    useWindowDimensions,
} from "react-native";
import { useIsFocused } from "@react-navigation/native";
import HistoryComponent from "@/shared/components/HistoryComponent";
import { HistoryComponentProps } from "@/types";
import CarrefourLogo from "@/assets/images/CarrefourLogo.png";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios, { AxiosResponse } from "axios";
import { Skeleton } from "moti/skeleton";
import { HistoryList } from "@/constants";
import Config from "react-native-config";
import i18n from "@/i18n";
import { useTheme } from "@/ctx/ThemeContext";
import { LinearGradient } from "expo-linear-gradient";
import configConverter from "@/api/configConverter";

export default function History() {
    const isFocused = useIsFocused();
    const [historyList, setHistoryList] = useState<HistoryComponentProps[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const windowWidth = useWindowDimensions().width;
    const { isDarkMode } = useTheme();

    useEffect(() => {
        const fetchData = async () => {
            try {
                let historyData = await AsyncStorage.getItem("historyData");
                if (historyData) {
                    setHistoryList(JSON.parse(historyData));
                } else {
                    console.log("History Response ", axios.defaults.headers);
                    const token = await AsyncStorage.getItem("token");

                    const timeoutPromise = new Promise((resolve, reject) => {
                        setTimeout(() => reject("Timeout"), 5000);
                    });

                    const [response, _] = (await Promise.all([
                        axios.get(
                            `${configConverter(
                                "EXPO_PUBLIC_API_BASE_URL_HISTORY"
                            )}?id=1`,
                            {
                                headers: {
                                    Authorization: `Bearer ${token}`,
                                },
                            }
                        ),
                        timeoutPromise,
                    ])) as [AxiosResponse, unknown];

                    if (response.status === 200) {
                        const data = response.data.history;
                        let historyEnqueue = data.enqueuings.content;
                        let historyDequeue = data.dequeuings.content;

                        historyDequeue.forEach(
                            (item: {
                                isHistory: boolean;
                                status: string;
                                date: string;
                            }) => {
                                item.isHistory = true;
                                item.status = "Dequeued";
                                item.date = "Today";
                            }
                        );
                        historyEnqueue.forEach(
                            (item: {
                                isHistory: boolean;
                                status: string;
                                date: string;
                            }) => {
                                item.isHistory = true;
                                item.status = "Enqueued";
                                item.date = "Today";
                            }
                        );

                        let combinedHistory = [
                            ...historyEnqueue,
                            ...historyDequeue,
                        ];
                        setHistoryList(combinedHistory);
                        setIsLoading(false);

                        await AsyncStorage.setItem(
                            "historyData",
                            JSON.stringify(combinedHistory)
                        );
                    } else {
                        setIsLoading(false);
                    }
                }
            } catch (error) {
                console.error(error);
            }
        };

        const fetchDataTimeout = setTimeout(() => {
            setIsLoading(false);
        }, 5000);

        fetchData();

        return () => clearTimeout(fetchDataTimeout);
    }, [isFocused]);

    return (
        <View
            className={`flex-1 ${
                isDarkMode ? "bg-ocean-blue" : "bg-off-white"
            }`}
        >
            {!isDarkMode && (
                <LinearGradient
                    colors={[
                        "rgba(0, 119, 182, 0.1)",
                        "rgba(255, 255, 255, 0)",
                    ]}
                    className="absolute top-0 w-full h-64"
                    start={{ x: 0, y: 0 }}
                    end={{ x: 0, y: 1 }}
                />
            )}
            <ScrollView showsVerticalScrollIndicator={false}>
                {isLoading ? (
                    <View
                        className={`flex flex-col items-center justify-center ${
                            isDarkMode ? "bg-ocean-blue" : "bg-off-white"
                        }`}
                    >
                        {Array(8)
                            .fill(0)
                            .map((_, index) => (
                                <React.Fragment key={index}>
                                    <View className="mb-4" />
                                    <Skeleton
                                        colorMode={
                                            isDarkMode ? "dark" : "light"
                                        }
                                        width={(windowWidth * 11) / 12}
                                        height={100}
                                    />
                                </React.Fragment>
                            ))}
                        <View className="mb-5" />
                    </View>
                ) : historyList.length === 0 ? (
                    <View
                        className={`h-screen flex flex-col justify-center items-center ${
                            isDarkMode ? "bg-ocean-blue" : "bg-off-white"
                        }`}
                    >
                        <Text
                            className={`text-lg font-bold ${
                                isDarkMode
                                    ? "text-baby-blue"
                                    : "text-coal-black"
                            }`}
                        >
                            {i18n.t("noData")}
                        </Text>
                        <Text
                            className={`text-md ${
                                isDarkMode
                                    ? "text-baby-blue"
                                    : "text-coal-black"
                            }`}
                        >
                            {i18n.t("noDisplay")}
                        </Text>
                    </View>
                ) : (
                    HistoryList.map((item, index) => (
                        <HistoryComponent
                            key={index}
                            image={CarrefourLogo}
                            name={item.name}
                            location={"Anything for now"}
                            date={item.date}
                            id={item.id}
                            status={item.status}
                            isHistory={item.isHistory}
                            isDarkMode={isDarkMode}
                        />
                    ))
                )}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#D9D9D9",
    },
});

import { SessionProvider } from "@/ctx/AuthContext";
import { ThemeProvider } from "@/ctx/ThemeContext";
import { useFonts } from "expo-font";
import { Slot } from "expo-router";
import React, { useEffect } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import SplashScreen from "./SplashScreen";
// REACT-NATIVE-KEYBOARD-CONTROLLER
// import { KeyboardProvider } from 'react-native-keyboard-controller';

export default function RootLayout() {
    const [loaded, error] = useFonts({
        InterBold: require("../assets/fonts/static/Inter-Bold.ttf"),
        JostBold: require("../assets/fonts/static/Jost-Bold.ttf"),
        JostReg: require("../assets/fonts/static/Jost-Regular.ttf"),
        IstokBold: require("../assets/fonts/static/IstokWeb-Bold.ttf"),
    });
    const [showLoading, setShowLoading] = React.useState(true);

    useEffect(() => {
        if (error) throw error;

        const timer = setTimeout(() => {
            setShowLoading(false);
        }, 5000);

        return () => clearTimeout(timer);
    }, [error]);

    if (showLoading || !loaded) {
        return <SplashScreen />;
    }

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <Provider store={store}>
                <SessionProvider>
                    <ThemeProvider>
                        {/* <KeyboardProvider> */}
                        <Slot />
                        {/* </KeyboardProvider> */}
                    </ThemeProvider>
                </SessionProvider>
            </Provider>
        </GestureHandlerRootView>
    );
}

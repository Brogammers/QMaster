import React, { useState } from "react";
import { Stack, Redirect } from "expo-router";
import { SessionProvider, useSession } from "@/ctx/AuthContext";
import SplashScreen from "../SplashScreen";
import { CartProvider } from "@/ctx/CartContext";
import { SiaProvider } from "@/ctx/SiaContext";
import { Queue, QueuesContext } from "@/components/JoinQueue";

export default function AppEntry() {
    const { session, isLoading } = useSession();
    const [queues, setQueues] = useState<Queue[]>([]);
    const [selectedQueue, setSelectedQueue] = useState<Queue | null>(null);

    if (isLoading) {
        return <SplashScreen />;
    }

    if (!session) {
        return <Redirect href="/(auth)/Onboarding" />;
    }

    return (
        <SiaProvider>
            <CartProvider>
                <QueuesContext.Provider
                    value={{
                        queues,
                        selectedQueue,
                        setQueues,
                        setSelectedQueue,
                    }}
                >
                    <Stack>
                        <Stack.Screen
                            name="(tabs)"
                            options={{
                                headerShown: false,
                                presentation: "fullScreenModal",
                            }}
                        />
                    </Stack>
                </QueuesContext.Provider>
            </CartProvider>
        </SiaProvider>
    );
}

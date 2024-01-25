import { useAuth } from "@/ctx/AuthContext";
import TextButton from "@/shared/components/TextButton";
import React from "react";
import { Text, View } from "react-native";

export default function Account() {
    const auth = useAuth();
    
    return(
        <View className="items-center justify-center h-screen">
        <Text className="flex items-start justify-center">
            Account
        </Text>
        <TextButton
            text={'Logout'} 
            buttonColor={'#1DCDFE'} 
            textColor={'white'} 
            onPress={auth?.signOut}
        />
        </View>
    )
}
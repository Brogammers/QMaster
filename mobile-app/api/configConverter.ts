import { Platform } from "react-native";


function configConverter(value: string): string {
    if (Platform.OS === "android") {
        return process.env[`${value}_ANDROID`] || "";
    } else {
        return process.env[value] || "";
    }
}

export default configConverter;

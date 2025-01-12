import { Platform } from "react-native";
import Config from "react-native-config";

interface Config {
    androidField: string;
    iosField: string;
}

function configConverter(value: string): string {
    if (Platform.OS === "android") {
        return Config[`${value}_ANDROID`] || "";
    } else {
        return Config[value] || "";
    }
}

export default configConverter;

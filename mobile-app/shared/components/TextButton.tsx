import React from "react";
import { Text, StyleSheet, Dimensions, I18nManager, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { FontAwesome } from "@expo/vector-icons";
import { TextButtonProps } from "@/types";

const window = Dimensions.get("window");

export default function TextButton(props: TextButtonProps) {
  const buttonWidth = props.width ? props.width : window.width * 0.8;
  const buttonPadding = props.padding ? props.padding : 14;
  const buttonStyle = {
    padding: buttonPadding,
    backgroundColor: props.buttonColor,
    width: buttonWidth,
    borderWidth: props.border ? 1 : 0,
    borderColor: props.border || "transparent",
  };

  if (props.icon == null) {
    return (
      <TouchableOpacity
        disabled={props.disabled}
        onPress={props.onPress}
        className="flex items-center justify-center mt-5 rounded-lg"
        style={[buttonStyle]}
      >
        <Text
          className={props.textSize ? props.textSize : "text-xl"}
          font-bold
          style={[{ color: props.textColor }, styles.font]}
        >
          {props.text}
        </Text>
      </TouchableOpacity>
    );
  } else {
    const iconMap: { [key: string]: string } = {
      google: "google",
      facebook: "facebook",
      email: "envelope",
    };

    const iconName = iconMap[props.icon] || props.icon;

    return (
      <TouchableOpacity
        disabled={props.disabled}
        onPress={props.onPress}
        className="flex flex-row items-center justify-center mt-5 rounded-lg"
        style={[
          buttonStyle,
          {
            flexDirection: I18nManager.isRTL ? "row-reverse" : "row",
          },
        ]}
      >
        <FontAwesome
          name={iconName}
          size={20}
          color={props.textColor}
          style={{
            marginLeft: I18nManager.isRTL ? 0 : 10,
            marginRight: I18nManager.isRTL ? 10 : 0,
          }} // Adjust icon margin based on RTL
        />
        <Text
          className={`${
            props.textSize ? props.textSize : "text-lg"
          } font-medium pl-3.5`}
          style={[
            { color: props.textColor },
            styles.font,
            {
              paddingLeft: I18nManager.isRTL ? 0 : 10,
              paddingRight: I18nManager.isRTL ? 10 : 0,
            }, // Adjust text padding based on RTL
          ]}
        >
          {props.text}
        </Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  font: {
    fontFamily: "IstokBold",
  },
});

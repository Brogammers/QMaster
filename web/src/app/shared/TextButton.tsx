import React from "react";
import { TextButtonProps } from "../../../types";

export default function TextButton({
  text,
  buttonColor,
  textColor,
  textSize = "md",
  width,
  padding = 2,
  icon,
  onPress,
  disabled,
}: TextButtonProps) {
  return (
    <button
      onClick={onPress}
      disabled={disabled}
      className={`bg-${buttonColor} text-${textColor} text-${textSize} ${
        width && `w-${width}`
      } px-${padding} py-${padding} rounded-md`}
    >
      {icon && <span className="mr-2">{icon}</span>}
      {text}
    </button>
  );
};


import React from "react";
import { TextButtonProps } from "../../../types";

export default function TextButton({
  text,
  buttonColor,
  textColor,
  textSize,
  width,
  paddingX,
  paddingY,
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
      } px-${paddingX} py-${paddingY} rounded-md`}
    >
      {icon && <span className="mr-2">{icon}</span>}
      {text}
    </button>
  );
};


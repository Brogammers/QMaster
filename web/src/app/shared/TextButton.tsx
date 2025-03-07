import React from "react";
import { TextButtonProps } from "../../../types";

export default function TextButton({
  text,
  buttonColor,
  textColor,
  textSize,
  borderRadius,
  width,
  minWidth,
  paddingX,
  paddingY,
  icon,
  onPress,
  disabled,
  className,
}: TextButtonProps) {
  return (
    <button
      onClick={onPress}
      disabled={disabled}
      className={`${className} bg-${buttonColor} text-${textColor} text-${textSize} ${
        width && `w-${width}`
      } px-${paddingX} py-${paddingY} rounded-${borderRadius} min-w-${minWidth} font-bold flex items-center justify-center`}
    >
      {icon && <span className="mr-2">{icon}</span>}
      {text}
    </button>
  );
};


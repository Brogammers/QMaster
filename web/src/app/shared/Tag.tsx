import { TagProps } from "../../../types";

export default function Tag({ text, bgColor, fontSize }: TagProps) {
  return (
    <span className={`bg-red-500 bg-${bgColor && bgColor} px-2 py-1 rounded-md font-bold text-center text-white text-${fontSize}`}>
      {text}
    </span>
  )
};

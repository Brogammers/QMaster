import { TagProps } from "../../../types";

export default function Tag({ text, bgColor, fontSize }: TagProps) {
  return (
    <div className={`bg-${bgColor} px-2 py-1`}>
      <span className={`text-white text-${fontSize}`}>
        {text}
      </span>
    </div>
  )
};

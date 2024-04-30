import Image from "next/image";
import { ExceptionMessageProps } from "../../../types";

export default function ExceptionMessage({ title, image, message, orientation, imageTitle, width }: ExceptionMessageProps) {
  return (
    <>
      {title ? (
        <div className="flex flex-col justify-center items-center">
          <span className="text-center font-bold text-ocean-blue text-3xl">{title}</span>
          <div className={`my-2 flex flex-${orientation} justify-center items-center gap-24`}>
            <Image
              src={image}
              alt={imageTitle}
              width={width}
            />
            <span className="text-ocean-blue text-2xl text-center font-bold">{message}</span>
          </div>
        </div>
      ) : (
        <div className={`my-2 flex flex-${orientation} justify-center items-center gap-24`}>
          <Image
            src={image}
            alt={imageTitle}
            width={width}
          />
          <span className="text-ocean-blue text-2xl text-center font-bold">{message}</span>
        </div>
      )}
    </>
  )
};

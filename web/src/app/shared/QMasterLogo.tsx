import Image from "next/image";
import QMasterSVG from "../../../public/QMaster-512.svg";
import { QMasterLogoProps } from "types";

export default function QMasterLogo({ className, displayQMasterText = false }: QMasterLogoProps) {
  return (
    <div className="flex items-center gap-5">
      <figure className="w-[49.78px] sm:w-[200px">
        <Image
          src={QMasterSVG}
          alt="QMaster Logo"
          className={`w-full ${className}`}
        />
      </figure>
      {displayQMasterText && <span className="font-jost text-white text-3xl sm:block hidden">QMaster</span>}
    </div>
  );
}

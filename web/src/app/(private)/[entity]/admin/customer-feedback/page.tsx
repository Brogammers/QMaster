import Image from "next/image";
import Entity from "../../page";
import UnderConstruction from "../../../../../public/under-construction.svg";
import Tag from "@/app/shared/Tag";


export default function CustimerFeedback() {
  return (
    <Entity>
      <div className="my-32 flex flex-col justify-center items-center gap-8">
        <figure className=" w-1/2 rounded-3xl">
          <Image
            src={UnderConstruction}
            alt="Under Construction"
            width={1024}
          />
        </figure>
        <div className="construction-bg">
          <Tag
            text="this page is under construction"
            bgColor="transparent"
            fontSize="3xl"
          />
        </div>
      </div>
    </Entity>
  )
}
import QueueModal from "@/app/shared/QueueModal";
import Entity from "../page";
import Image from "next/image";
import DisplayImg from "../../../../public/display.svg";


export default function Display() {
  return (
    <Entity>
      <QueueModal>
        <div className="px-56 text-center flex flex-col justify-center items-center">
          <Image
            src={DisplayImg}
            alt="Display Image"
            width={250}
          />
          <h1 className="text-3xl font-bold">Display View</h1>
          <p className="text-lg">
            You have the option to set up a display screen to present the current queue status to your visitors. Simply access this page using the computer connected to the display screen and activate fullscreen mode by clicking the designated button.
          </p>
          <button className="bg-baby-blue text-lg px-4 py-2 rounded-lg text-white font-bold">
            Fullscreen
          </button>
        </div>
      </QueueModal>
    </Entity>
  )
};

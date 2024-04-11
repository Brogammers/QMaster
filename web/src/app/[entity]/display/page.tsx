import QueueModal from "@/app/shared/QueueModal";
import Entity from "../page";
import Image from "next/image";
import DisplayImg from "../../../../public/display.svg";


export default function Display() {
  return (
    <Entity>
      <QueueModal>
        <Image
          src={DisplayImg}
          alt="Display Image"
          width={100}
        />
        <h1>Display View</h1>
        <p>
          You have the option to set up a display screen to present the current queue status to your visitors. Simply access this page using the computer connected to the display screen and activate fullscreen mode by clicking the designated button.
        </p>
        <button>
          Fullscreen
        </button>
      </QueueModal>
    </Entity>
  )
};

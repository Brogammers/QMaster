"use client";

import { useEffect, useState } from "react";
import useWindowSize from "../../../../../hooks/useWindowSize";
import TicketNumber from "@/app/shared/TicketNumber";
import Image from "next/image";
import DisplayImg from "../../../../../public/display.svg";
import QueueModal from "@/app/shared/QueueModal";
import Entity from "../page";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import DynamicMediaDisplay from "@/app/components/DynamicMediaDisplay";
import { QueuedPerson } from "../../../../../types";
import FullscreenDisplay from "@/app/components/FullscreenDisplay";
import { withRoleProtection } from "@/lib/auth/withRoleProtection";

gsap.registerPlugin(ScrollTrigger);

const queuedPersonsData = [
  { id: 1, ticketNumber: "C-123", counter: "counter 1" },
  { id: 2, ticketNumber: "C-124", counter: "counter 6" },
  { id: 3, ticketNumber: "C-125", counter: "counter 3" },
  { id: 4, ticketNumber: "C-016", counter: "counter 4" },
  { id: 5, ticketNumber: "C-127", counter: "counter 13" },
  { id: 6, ticketNumber: "P-127", counter: "counter 16" },
  { id: 7, ticketNumber: "A-007", counter: "counter 9" },
  { id: 8, ticketNumber: "B-037", counter: "counter 2" },
  { id: 9, ticketNumber: "O-127", counter: "counter 5" },
];

function DisplayPage() {
  const [fullscreen, setFullscreen] = useState<boolean>(false);
  const [queuedPersons, setQueuedPersons] =
    useState<QueuedPerson[]>(queuedPersonsData);
  const { width, height } = useWindowSize();

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === "Escape" && fullscreen) setFullscreen(false);
    };

    const handleFullscreenChange = () => {
      setFullscreen(!document.fullscreenElement);
    };

    document.addEventListener("keydown", handleKeyPress);
    document.addEventListener("fullscreenchange", handleFullscreenChange);

    return () => {
      document.removeEventListener("keydown", handleKeyPress);
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, [fullscreen]);

  const handleFullscreen = () => {
    if (!fullscreen) {
      document.documentElement.requestFullscreen().catch(console.error);
    }
    setFullscreen(!fullscreen);
  };

  useEffect(() => {
    if (fullscreen) {
      gsap.to(".scrollContainer", {
        y: -(queuedPersonsData.length * 164),
        duration: queuedPersonsData.length * 8,
        repeat: -1,
        ease: "linear",
        onComplete: () => {
          setTimeout(() => {
            gsap.set(".scrollContainer", { y: 0 });
          }, 2000);
        },
      });
    }
  }, [fullscreen]);

  if (fullscreen) {
    return <FullscreenDisplay queuedPersons={queuedPersons} />;
  }

  return (
    <Entity>
      <QueueModal width="w-full">
        <div className="px-4 md:px-8 lg:px-56 text-center flex flex-col justify-center items-center gap-8">
          <Image
            src={DisplayImg}
            alt="Display Image"
            width={200}
            className="w-32 lg:w-64"
          />
          <h1 className="text-3xl font-bold">Display View</h1>
          <p className="text-lg hidden lg:block">
            You have the option to set up a display screen to present the
            current queue status to your visitors. Simply access this page using
            the computer connected to the display screen and activate fullscreen
            mode by clicking the designated button.
          </p>
          <div className="flex flex-col gap-4 items-center w-full">
            <button
              onClick={handleFullscreen}
              className="hidden lg:block bg-baby-blue px-4 py-2 rounded-lg text-white text-lg font-bold hover:bg-opacity-90 transition-colors"
            >
              Fullscreen
            </button>
            <div className="lg:hidden flex flex-col items-center gap-4 w-full px-4">
              <div className="bg-lava-red/10 border-2 border-lava-red rounded-lg p-4 lg:p-6 w-full max-w-md">
                <p className="text-lava-red font-bold text-xl mb-2">
                  ⚠️ Screen Size Alert
                </p>
                <p className="text-lava-red font-medium">
                  tawabiry Display View requires a larger screen (minimum 1024px
                  width) for optimal queue management display. Please switch to
                  a desktop or larger screen device.
                </p>
              </div>
            </div>
          </div>
        </div>
      </QueueModal>
    </Entity>
  );
}

export default withRoleProtection(DisplayPage, "view_display");

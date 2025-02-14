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

export default function Display() {
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

  return (
    <>
      {fullscreen ? (
        <div className="fixed inset-0 bg-gradient-to-r from-baby-blue to-ocean-blue flex overflow-hidden">
          <div className="flex-1 h-screen">
            <DynamicMediaDisplay />
          </div>
          <div className="w-1/4 bg-ocean-blue h-screen">
            <div className="scrollContainer flex flex-col">
              {queuedPersons.map((person) => (
                <TicketNumber
                  key={person.id}
                  bgColor="ocean-blue"
                  textColor="white"
                  fontSize="3xl"
                  borderRadius="none"
                  width="full"
                  maxWidth="16"
                  ticketNum={person.ticketNumber}
                  queue={person.counter}
                />
              ))}
            </div>
          </div>
        </div>
      ) : (
        <Entity>
          <QueueModal width="w-full">
            <div className="px-56 text-center flex flex-col justify-center items-center gap-8">
              <Image src={DisplayImg} alt="Display Image" width={200} />
              <h1 className="text-3xl font-bold">Display View</h1>
              <p className="text-lg hidden lg:block">
                You have the option to set up a display screen to present the
                current queue status to your visitors. Simply access this page
                using the computer connected to the display screen and activate
                fullscreen mode by clicking the designated button.
              </p>
              <div className="flex flex-col gap-4 items-center">
                <button
                  onClick={handleFullscreen}
                  className="hidden lg:block bg-baby-blue px-4 py-2 rounded-lg text-white text-lg font-bold hover:bg-opacity-90 transition-colors"
                >
                  Fullscreen
                </button>
                <div className="lg:hidden flex flex-col items-center gap-4">
                  <div className="bg-lava-red/10 border-2 border-lava-red rounded-lg p-6 max-w-md">
                    <p className="text-lava-red font-bold text-xl mb-2">
                      ⚠️ Screen Size Alert
                    </p>
                    <p className="text-lava-red font-medium">
                      QMaster Display View requires a larger screen (minimum
                      1024px width) for optimal queue management display. Please
                      switch to a desktop or larger screen device.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </QueueModal>
        </Entity>
      )}
    </>
  );
}

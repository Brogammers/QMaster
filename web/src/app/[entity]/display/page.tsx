"use client"

import { useEffect, useState } from "react";
import useWindowSize from "../../../../hooks/useWindowSize";
import TicketNumber from "@/app/shared/TicketNumber";
import Image from "next/image";
import TeamImg from "../../../../public/team.jpg";
import DisplayImg from "../../../../public/display.svg";
import QueueModal from "@/app/shared/QueueModal";
import Entity from "../page";
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Sample queued persons data
const queuedPersonsData = [
  { id: 1, ticketNumber: 'C-123', counter: 'counter 1' },
  { id: 2, ticketNumber: 'C-124', counter: 'counter 6' },
  { id: 3, ticketNumber: 'C-125', counter: 'counter 3' },
  { id: 4, ticketNumber: 'C-016', counter: 'counter 4' },
  { id: 5, ticketNumber: 'C-127', counter: 'counter 13' },
  { id: 6, ticketNumber: 'P-127', counter: 'counter 16' },
  { id: 7, ticketNumber: 'A-007', counter: 'counter 9' },
  { id: 8, ticketNumber: 'B-037', counter: 'counter 2' },
  { id: 9, ticketNumber: 'O-127', counter: 'counter 5' },
];

export default function Display() {
  const [fullscreen, setFullscreen] = useState<boolean>(false);
  const [queuedPersons, setQueuedPersons] = useState(queuedPersonsData);
  const { width, height } = useWindowSize();

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === "Escape" && fullscreen) setFullscreen(false);
    };

    const handleFullscreenChange = () => {
      setFullscreen(!document.fullscreenElement);
    };

    document.addEventListener('keydown', handleKeyPress);
    document.addEventListener('fullscreenchange', handleFullscreenChange);

    return () => {
      document.removeEventListener('keydown', handleKeyPress);
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, [fullscreen]);

  const handleFullscreen = () => {
    setFullscreen(!fullscreen);
  };

  useEffect(() => {
    if (fullscreen) {
      gsap.to(".scrollContainer", {
        y: -(queuedPersonsData.length * 164), // Adjust according to your ticket height
        duration: queuedPersonsData.length * 5, // Adjust the duration based on total tickets
        repeat: -1, // Infinite repeat
        ease: "linear",
        onComplete: () => {
          setTimeout(() => {
            gsap.set(".scrollContainer", { y: 0 }); // Reset to start position
          }, 2000); // Wait for 2 seconds before restarting
        }
      });
    }
  }, [fullscreen]);

  return (
    <>
      {fullscreen ? (
        <div className="bg-gradient-to-r from-baby-blue to-ocean-blue h-screen w-full flex justify-between overflow-hidden">
          <Image
            src={TeamImg}
            alt="QMaster"
            width={width * 0.75}
            height={height}
          />
          <div className="scrollContainer w-1/4 bg-ocean-blue flex flex-col">
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
      ) : (
        <Entity>
          <QueueModal width="w-full">
            <div className="px-56 text-center flex flex-col justify-center items-center gap-8">
              <Image
                src={DisplayImg}
                alt="Display Image"
                width={200}
              />
              <h1 className="text-3xl font-bold">Display View</h1>
              <p className="text-lg">
                You have the option to set up a display screen to present the current queue status to your visitors. Simply access this page using the computer connected to the display screen and activate fullscreen mode by clicking the designated button.
              </p>
              <button
                onClick={handleFullscreen}
                className="bg-baby-blue px-4 py-2 rounded-lg text-white text-lg font-bold"
              >
                Fullscreen
              </button>
            </div>
          </QueueModal>
        </Entity>
      )}
    </>
  )
};



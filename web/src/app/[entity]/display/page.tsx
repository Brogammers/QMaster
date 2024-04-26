"use client"

import { useEffect, useState } from "react";
import useWindowSize from "../../../../hooks/useWindowSize";
import TicketNumber from "@/app/shared/TicketNumber";
import Image from "next/image";
import TeamImg from "../../../../public/team.jpg";
import DisplayImg from "../../../../public/display.svg";
import QueueModal from "@/app/shared/QueueModal";
import Entity from "../page";

// Sample queued persons data
const queuedPersonsData = [
  { id: 1, ticketNumber: 'C-123', counter: 'counter 1' },
  { id: 2, ticketNumber: 'C-124', counter: 'counter 6' },
  { id: 3, ticketNumber: 'C-125', counter: 'counter 3' },
  { id: 4, ticketNumber: 'C-016', counter: 'counter 4' },
  { id: 5, ticketNumber: 'C-127', counter: 'counter 13' },
  { id: 5, ticketNumber: 'P-127', counter: 'counter 16' },
  { id: 5, ticketNumber: 'A-007', counter: 'counter 9' },
  { id: 5, ticketNumber: 'B-037', counter: 'counter 2' },
  { id: 5, ticketNumber: 'O-127', counter: 'counter 5' },
];

export default function Display() {
  const [fullscreen, setFullscreen] = useState<boolean>(false);
  const [queuedPersons, setQueuedPersons] = useState(queuedPersonsData);
  const [scrollIndex, setScrollIndex] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);

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

  const maxTicketsToShow = Math.floor(height / 164);

  useEffect(() => {
    if (queuedPersonsData.length > maxTicketsToShow) {
      const scrollInterval = setInterval(() => {
        setIsScrolling(true);
        setScrollIndex((prevIndex) => (prevIndex + 1) % (queuedPersonsData.length - maxTicketsToShow + 1));
      }, 3000); // Adjust scroll speed as needed

      return () => clearInterval(scrollInterval);
    }
  }, [maxTicketsToShow]);

  return (
    <>
      {fullscreen ? (
        <div className="h-screen w-full flex justify-between overflow-hidden">
          <Image
            src={TeamImg}
            alt="QMaster"
            width={width * 0.75}
            height={height}
          />
          {queuedPersonsData.length > maxTicketsToShow && isScrolling && (
            <div className="w-1/4 bg-ocean-blue flex flex-col">
              {queuedPersons.slice(scrollIndex, scrollIndex + maxTicketsToShow).map((person, index) => (
                <TicketNumber
                  key={person.id}
                  bgColor={index % 2 === 0 ? `white` : `transparent`}
                  textColor={index % 2 === 0 ? `black` : `white`}
                  fontSize="3xl"
                  borderRadius="none"
                  width="full"
                  maxWidth="16"
                  ticketNum={person.ticketNumber}
                  queue={person.counter}
                />
              ))}
            </div>
          )}
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


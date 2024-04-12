"use client"

import QueueModal from "@/app/shared/QueueModal";
import Entity from "../page";
import Image from "next/image";
import DisplayImg from "../../../../public/display.svg";
import TeamImg from "../../../../public/team.jpg";
import { useEffect, useState } from "react";
import useWindowSize from "../../../../hooks/useWindowSize";
import TicketNumber from "@/app/shared/TicketNumber";

// Sample queued persons data
const queuedPersonsData = [
  { id: 1, ticketNumber: 'C-123' },
  { id: 2, ticketNumber: 'C-124' },
  { id: 3, ticketNumber: 'C-125' },
  { id: 4, ticketNumber: 'C-016' },
  { id: 5, ticketNumber: 'C-127' },
  { id: 5, ticketNumber: 'P-127' },
  { id: 5, ticketNumber: 'A-007' },
  { id: 5, ticketNumber: 'B-037' },
  { id: 5, ticketNumber: 'O-127' },
];

export default function Display() {
  const [fullscreen, setFullscreen] = useState<boolean>(false);
  const [queuedPersons, setQueuedPersons] = useState(queuedPersonsData);

  const width = useWindowSize().width * .75;
  const height = useWindowSize().height;

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
      document.addEventListener('keydown', handleKeyPress);
      document.addEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, [fullscreen]);

  const handleFullscreen = () => {
    setFullscreen(!fullscreen);
  }

  const maxTicketsToShow = Math.floor(height / 164);

  return (
    <>
      {fullscreen ? (
        <div className="h-screen w-full flex justify-between">
          <Image
            src={TeamImg}
            alt="QMaster"
            width={width}
            height={height}
          />
          <div className="w-1/4 bg-ocean-blue">
            {/* Map through the queued persons array and render the tickets */}
            {queuedPersons.slice(0, maxTicketsToShow).map((person, index) => (
              <TicketNumber
                key={person.id}
                bgColor={index % 2 === 0 ? `white` : `transparent`}
                textColor={index % 2 === 0 ? `black` : `white`}
                fontSize="3xl"
                borderRadius="none"
                width="full"
                ticketNum={person.ticketNumber}
              />
            ))}
          </div>
        </div>
      ) : (
      <Entity>
        <QueueModal width="w-1/2">
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

"use client";

import { QueuedPerson } from "../../../types";
import TicketNumber from "@/app/shared/TicketNumber";
import DynamicMediaDisplay from "./DynamicMediaDisplay";

interface FullscreenDisplayProps {
  queuedPersons: QueuedPerson[];
}

export default function FullscreenDisplay({ queuedPersons }: FullscreenDisplayProps) {
  return (
    <div className="fixed inset-0 bg-gradient-to-r from-baby-blue to-ocean-blue flex overflow-hidden z-[100]">
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
  );
} 
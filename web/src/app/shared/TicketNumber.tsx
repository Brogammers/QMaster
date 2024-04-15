import { useState } from "react";
import { TicketNumberProps } from "../../../types";
import TextButton from "./TextButton";

export default function TicketNumber({ bgColor, textColor, fontSize, borderRadius, width, ticketNum, queue, maxWidth, labelPadding, onClick }: TicketNumberProps) {
  const [showButton, setShowButton] = useState(false);

  return (
    <div 
      className={`border-ocean-blue border-dashed border-2 bg-${bgColor} text-${textColor} rounded-${borderRadius} text-center font-bold ${width && `w-${width}`} ${maxWidth && `max-w-${maxWidth}`} h-6} px-0 py-8 flex flex-col justify-center items-center gap-4`}
      onMouseEnter={() => setShowButton(true)}
      onMouseLeave={() => setShowButton(false)}
    >
      <span className={`text-${fontSize} mx-16 whitespace-nowrap`}>
        { ticketNum }
      </span>
      {queue && (
        <span className={`text-sm bg-baby-blue text-white rounded-md px-2 py-1 ${labelPadding && `px-${labelPadding}`}`}>
          { queue }
        </span>
      )}
      {onClick && showButton && (
        <TextButton
          text={queue === "others waiting in queue" ? "Reject" : "Done"} // Dynamic button text based on queue
          buttonColor={queue === "others waiting in queue" ? "red" : "green"} // Dynamic button color based on queue
          textColor="white"
          textSize="sm"
          onPress={onClick} // Call onClick function on button press
        />
      )}
    </div>
  );
};


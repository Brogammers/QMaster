import { TicketNumberProps } from "../../../types";

export default function TicketNumber({ bgColor, textColor, fontSize, borderRadius, width, ticketNum, queue, maxWidth }: TicketNumberProps) {
  return (
    <div className={`border-white border-dashed border-2 bg-${bgColor} text-${textColor} rounded-${borderRadius} text-center font-bold ${width && `w-${width}`} ${maxWidth && `max-w-${maxWidth}`} h-6} px-0 py-16 flex flex-col justify-center items-center gap-4`}>
      <span className={`text-${fontSize} mx-24 whitespace-nowrap`}>
        { ticketNum }
      </span>
      {queue && <span className="text-sm bg-baby-blue text-white rounded-md px-2 py-1">{ queue }</span>}
    </div>
  );
};


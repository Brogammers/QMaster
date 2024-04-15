import { TicketNumberProps } from "../../../types";

export default function TicketNumber({ bgColor, textColor, fontSize, borderRadius, width, ticketNum, queue, maxWidth, labelPadding }: TicketNumberProps) {
  return (
    <div className={`border-ocean-blue border-dashed border-2 bg-${bgColor} text-${textColor} rounded-${borderRadius} text-center font-bold ${width && `w-${width}`} ${maxWidth && `max-w-${maxWidth}`} h-6} px-0 py-8 flex flex-col justify-center items-center gap-4`}>
      <span className={`text-${fontSize} mx-16 whitespace-nowrap`}>
        { ticketNum }
      </span>
      {queue && <span className={`text-sm bg-baby-blue text-white rounded-md px-2 py-1 ${labelPadding && `px-${labelPadding}`}`}>{ queue }</span>}
    </div>
  );
};


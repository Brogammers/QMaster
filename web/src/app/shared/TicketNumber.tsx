import { TicketNumberProps } from "../../../types";

export default function TicketNumber({ bgColor, textColor, fontSize, borderRadius, width, ticketNum, queue, height, active }: TicketNumberProps) {
  return (
    <div className={`bg-${bgColor} text-${textColor} rounded-${borderRadius} text-center font-bold w-${width}} py-16 ${height && `h-${height}`} flex flex-col justify-center items-center gap-4`}>
      <span className={`text-${fontSize}`}>
        { ticketNum }
      </span>
      {queue && <span className="text-sm bg-baby-blue text-white rounded-md p-1">{ queue } </span>}
    </div>
  );
};

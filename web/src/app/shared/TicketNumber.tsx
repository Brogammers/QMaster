import { TicketNumberProps } from "../../../types";

export default function TicketNumber({ bgColor, textColor, fontSize, borderRadius, width, ticketNum }: TicketNumberProps) {
  return (
    <div className={`bg-${bgColor} text-${textColor} rounded-${borderRadius} text-${fontSize} text-center font-bold w-${width}} py-16`}>
      { ticketNum }
    </div>
  );
};

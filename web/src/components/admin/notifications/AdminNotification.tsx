import { NotificationProps } from "./NotificationProps";
import { formatTimeAgo } from "@/lib/utils";

export const AdminNotification: React.FC<NotificationProps> = ({
  title,
  message,
  timestamp,
  type,
  blurOut = false,
}) => {
  const timeAgo = formatTimeAgo(timestamp);

  let styling;

  switch (type) {
    case "request":
      styling = "border-crystal-blue";
      break;
    case "warning":
      styling = "border-amber-500";
      break;
    case "error":
      styling = "border-red-500";
      break;
    case "info":
      styling = "border-blue-500";
      break;
    default:
      styling = "border-crystal-blue";
      break;
  }

  return (
    <div
      className={`p-3 bg-white/[0.02] rounded-lg border-l-4 ${styling} ${
        blurOut ? "opacity-70" : ""
      }`}
    >
      <div className="flex justify-between items-start">
        <h4 className="font-medium">{title}</h4>
        <span className="text-xs text-slate-700">{timeAgo}</span>
      </div>
      <p className="text-sm text-slate-700 mt-1">{message}</p>
    </div>
  );
};

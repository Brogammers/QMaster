export interface NotificationProps {
    title: string;
    timestamp: string;
    message: string;
    type: "info" | "warning" | "error" | "request";
    blurOut?: boolean;
}

import { ReactNode } from "react";

export interface QueueModalProps {
  title?: string;
  description?: string;
  width?: string;
  children: ReactNode;
}

export interface TextButtonProps {
  text: string;
  buttonColor: string;
  textColor: string;
  textSize?: string;
  borderRadius: string;
  width?: string;
  paddingX: string;
  paddingY: string;
  icon?: any;
  onPress?: () => void;
  disabled?: boolean;
}

export interface TicketNumberProps {
  bgColor: string;
  textColor: string;
  fontSize: string;
  borderRadius: string;
  width: string;
  ticketNum: string;
  maxWidth: string;
  queue?: string;
  height?: string;
  active?: boolean;
  labelPadding?: string;
  onClick?: () => void;
}

export interface ExceptionMessageProps {
  title?: string;
  image: string;
  message: string;
  orientation: string;
  imageTitle: string;
  width: number;
}
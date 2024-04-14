import { ReactNode } from "react";

export interface QueueModalProps {
  title?: string;
  description?: string;
  width?: string;
  children: ReactNode;
}
export interface onSelectedProps {
  onItemSelected: any
}

export interface TextButtonProps {
  text: string;
  buttonColor: string;
  textColor: string;
  textSize?: string;
  width?: number;
  padding?: number;
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
}

export interface DayFormProps { 
  day: string, 
  values: any, 
  setFieldValue: any 
}
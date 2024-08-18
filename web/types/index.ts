import { FieldArrayRenderProps } from "formik";
import { ReactNode } from "react";

export interface CarouselProps {
  children: ReactNode[];
}

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
  borderRadius: string;
  width?: string;
  minWidth: string;
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
  minWidth?: string;
  queue?: string;
  height?: string;
  active?: boolean;
  labelPadding?: string;
  counterNum?: string;
}

export interface ExceptionMessageProps {
  title?: string;
  image: string;
  message: string;
  orientation: string;
  imageTitle: string;
  width: number;
}

export interface TagProps {
  text: string;
  bgColor: string;
  fontSize: string;
}

export interface StyledFieldArrayProps {
  name: string;
  render: (arrayHelpers: FieldArrayRenderProps) => React.ReactNode;
}

export interface StyledFieldProps {
  name: string;
  placeholder: string;
  type?: string;
}

export interface DayFormProps { 
  day: string, 
  values: any, 
  setFieldValue: any 
}

export interface Media {
  id: number;
  type: "image" | "video";
  src: string;
}

export interface QueuedPerson {
  id: number;
  ticketNumber: string;
  counter: string;
}
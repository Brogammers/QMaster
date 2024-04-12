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
  width?: number;
  padding?: number;
  icon?: any;
  onPress?: () => void;
  disabled?: boolean;
}
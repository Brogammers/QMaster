import { Animated, ImageSourcePropType, StyleProp, ViewStyle } from "react-native";

export interface OnboardingItem {
  image: ImageSourcePropType;
  text: string;
}

export interface SplashScreenProps {
  additionalText?: string;
  backgroundColor?: string;
}

export interface AuthState {
  email: string | null;
}

export interface CurrentItem {
  Img: any;
  Name: String;
  People: Number;
  Time: Number;
}

export interface SearchFilterProps {
  data: any,
  input: string,
}

export interface OnboardingItem {
  image: ImageSourcePropType;
  text: string;
}

export interface CategoryProps {
  Img: any,
  Title: String,
}

export interface CurrentQueuesProps {
  Img: any,
  Name: String,
  People: Number,
  Time: Number,
  isJoin?: boolean,
  isLeave?: boolean,
  isCurrent?: boolean,
  isPopular?: boolean,
}

export interface PaginatorProps {
  data: OnboardingItem[];
  scrollX: Animated.Value;
}

export interface ReturnButtonProps {
  size: number;
  color: string;
  backgroundColor?: string;
  style?: StyleProp<ViewStyle>;
}

export interface SearchItemProps {
  Img: any;
  Title: String;
  isPopular?: boolean;
}

export interface TextButtonProps {
  text: string;
  buttonColor: string;
  textColor: string;
  icon?: any;
  onPress?: () => void;
  disabled?: boolean;
}

export interface LeftArrowProps {
  size: number;
  color: string;
}
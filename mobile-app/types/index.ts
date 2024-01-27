import { Animated, ImageSourcePropType, StyleProp, ViewStyle } from "react-native";
import { SvgProps } from "react-native-svg";

export interface OnboardingItem {
  image: React.FC<SvgProps>;
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
  image: ImageSourcePropType;
  name: string;
  people: number;
  time: number;
}

export interface SearchFilterProps {
  data: any,
  input: string,
}

export interface OnboardingItem {
  image: React.FC<SvgProps>;
  text: string;
}

export interface CategoryProps {
  image: React.FC<SvgProps>;
  title: string;
}

export interface CurrentQueuesProps {
  image: ImageSourcePropType;
  name: string;
  people: number;
  time: number;
  isJoin?: boolean;
  isLeave?: boolean;
  isCurrent?: boolean;
  isPopular?: boolean;
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
  image: any;
  title: string;
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

// export interface QueueCarouselProps {
//   loop: boolean;
// }
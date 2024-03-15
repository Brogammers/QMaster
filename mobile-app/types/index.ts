import { Animated, ImageSourcePropType, StyleProp, ViewStyle } from "react-native";
import { SvgProps } from "react-native-svg";

export interface OnboardingItem {
  image: React.FC<SvgProps> | JSX.Element | React.ReactNode;
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

export interface CategoryProps {
  image: React.FC<SvgProps> | ImageSourcePropType;
  title: string;
  onPress?: any;
  spacing?: number;
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
  image?: any;
  title: string;
  isPopular?: boolean;
  isAccount?: boolean;
  icon?: string;
  onPress?: () => void;
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

export interface AccountInfoProps {
  image: ImageSourcePropType;
  name: string;
  number: string;
}

export interface QueueDetailsProps {
  branch: number;
}

export interface ServerError {
  message: string;
}

export interface MyFormValues {
  email: string;
  password: string;
  server?: string;  // Add this line
}

export interface HistoryComponentProps {
  image: any;
  name: String;
  location?: String;
  date?: String;
  time?: String
  id?: String;
  status?: String;
  queues?: number;
  notification?: String;
  category?: String;
  isHistory?: boolean;
  isCategory?: boolean;
  isNotification?: boolean;
}

export interface QueueInfoCardProps {
  image: any,
  name: String,
}

export interface UserState {
  firstName: string | null;
  lastName: string | null;
}

export interface NavigationState {
  navigationSetter: boolean;
}
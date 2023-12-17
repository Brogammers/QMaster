import Onboarding1 from './assets/images/onboarding1.svg';
import Onboarding2 from './assets/images/onboarding2.svg';
import Onboarding3 from './assets/images/onboarding3.svg';
import Onboarding4 from './assets/images/onboarding4.svg';
import { ImageSourcePropType } from 'react-native';

// Onboarding Screen
export interface OnboardingItem {
  image: ImageSourcePropType;
  text: string;
}

export const OnboardingData: OnboardingItem[] = [
  {
    image: Onboarding1,
    text: 'Say goodbye to waiting in queues to finish a single errand.',
  },
  {
    image: Onboarding2,
    text: 'With Queue, you can finish your errands without wasting a second.',
  },
  {
    image: Onboarding3,
    text: 'Save your money using our exclusive deals and special coupons.',
  },
  {
    image: Onboarding4,
    text: 'Spend your time on the important things in life.',
  }
];

// Email Verification - SplashScreen 
export const EmailVerificationText = "Sit tight while we search our database to see if your email has a reservation with us!";

import Onboarding1 from "./assets/images/onboarding1.svg"
import Onboarding2 from "./assets/images/onboarding2.svg"
import Onboarding3 from "./assets/images/onboarding3.svg"
import Onboarding4 from "./assets/images/onboarding4.svg"

export interface OnboardingItem {
    image: any; // You may need to adjust this type based on the actual type of your SVG images
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
import Onboarding1 from './assets/images/onboarding1.svg';
import Onboarding2 from './assets/images/onboarding2.svg';
import Onboarding3 from './assets/images/onboarding3.svg';
import Onboarding4 from './assets/images/onboarding4.svg';
import Restaurant from './assets/images/Restaurant.svg';
import Government from './assets/images/government.svg';
import Clinic from './assets/images/clinic.svg';
import Grocery from './assets/images/grocery.svg';
import Bank from './assets/images/bank.svg';
import Other from './assets/images/other.svg';
import Carrefour from '@/assets/images/Carrefour.svg';
import arabiata from '@/assets/images/arabiata.png' ;
import elections from '@/assets/images/elections.jpg';
import nationalBank from '@/assets/images/NationalBank.png';
import alSalamHospital from '@/assets/images/alsalam.png';
import { CategoryProps, OnboardingItem } from '@/types';

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

//Categories
export const Categories: CategoryProps[] = [
  {
    image: Restaurant,
    title: 'Restaurant',
  },
  {
    image: Government,
    title: 'Government',
  },
  {
    image: Clinic,
    title: 'Clinic',
  },
  {
    image: Grocery,
    title: 'Grocery',
  },
  {
    image: Bank,
    title: 'Bank',
  },
  {
    image: Other,
    title: 'Other',
  },
]

//Current Queues
export const Current = [
  {
    image: Carrefour,
    name: 'Carrefour',
    people: 5,
    time: 15,
  },
  {
    image: arabiata,
    name: 'Arabiata',
    people: 20,
    time: 30,
  },
  {
    image: elections,
    name: 'Elections',
    people: 200,
    time: 120,
  },
]

//Recent Queues
export const Recent = [
  {
    image: Carrefour,
    text: 'Carrefour',
  },
  {
    image: arabiata,
    text: 'Arabiata',
  },
  {
    image: elections,
    text: 'Elections',
  },
  {
    image: alSalamHospital,
    text: 'Al-Salam Hospital ',
  },
  {
    image: nationalBank,
    text: 'National Bank of Egypt',
  },
]
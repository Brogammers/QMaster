import FirstOnboarding from '@/assets/images/onboarding1.png'
import SecondOnboarding from '@/assets/images/onboarding2.png';
import ThirdOnboarding from '@/assets/images/onboarding3.png';
import FourthOnboarding from '@/assets/images/onboarding4.png';
import Restaurant from '@/assets/images/Restaurant.png';
import Government from '@/assets/images/Government.png';
import Clinic from '@/assets/images/Medical.png';
import Grocery from '@/assets/images/Grocery.png';
import Bank from '@/assets/images/Bank.png';
import Other from '@/assets/images/Other.png';
import carrefour from '@/assets/images/Carrefour.png';
import arabiata from '@/assets/images/arabiata.png' ;
import elections from '@/assets/images/elections.jpg';
import nationalBank from '@/assets/images/NationalBank.png';
import alSalamHospital from '@/assets/images/alsalam.png';
import profile from '@/assets/images/Profile.png'

import { 
  AccountInfoProps,
  CategoryProps, 
  CurrentQueuesProps, 
  OnboardingItem 
} from '@/types';

export const OnboardingData: OnboardingItem[] = [
  {
    image: FirstOnboarding,
    text: 'Say goodbye to waiting in queues to finish a single errand.',
  },
  {
    image: SecondOnboarding,
    text: 'With Queue, you can finish your errands without wasting a second.',
  },
  {
    image: ThirdOnboarding,
    text: 'Save your money using our exclusive deals and special coupons.',
  },
  {
    image: FourthOnboarding,
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
export const Current: CurrentQueuesProps[] = [
  {
    image: carrefour,
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
  {
    image: alSalamHospital,
    name: 'Al-Salam Hospital ',
    people: 300,
    time: 30,
  },
  {
    image: nationalBank,
    name: 'National Bank of Egypt',
    people: 250,
    time: 10,
  },
]

//Account Page Profile
export const AccountInfo: AccountInfoProps[] = [
  {
    image: profile,
    name: 'John Doe',
    number: '+201206309531',
  }
]

//Recent Queues
// export const Recent = [
//   {
//     image: Carrefour,
//     text: 'Carrefour',
//   },
//   {
//     image: arabiata,
//     text: 'Arabiata',
//   },
//   {
//     image: elections,
//     text: 'Elections',
//   },
//   {
//     image: alSalamHospital,
//     text: 'Al-Salam Hospital ',
//   },
//   {
//     image: nationalBank,
//     text: 'National Bank of Egypt',
//   },
// ]

// Locations
export const locations = [
  { label: 'Madinaty', value: '1' },
  { label: 'Maadi', value: '2' },
  { label: 'Elshorouk', value: '3' },
  { label: 'Al-rehab road', value: '4' },
  { label: 'Tagamoa', value: '5' },
  { label: 'Almaza', value: '6' },
  { label: 'October', value: '7' },
  { label: 'Arabella', value: '8' },
]
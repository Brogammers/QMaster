import FirstOnboarding from '@/assets/images/onboarding1.png';
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
import arabiata from '@/assets/images/arabiata.png';
import elections from '@/assets/images/elections.jpg';
import nationalBank from '@/assets/images/NationalBank.png';
import alSalamHospital from '@/assets/images/alsalam.png';
import profile from '@/assets/images/Profile.png';
import CarrefourLogo from '@/assets/images/CarrefourLogo.png';
import i18n from '@/i18n';

import {
  AccountInfoProps,
  CategoryProps,
  CurrentQueuesProps,
  HistoryComponentProps,
  OnboardingItem
} from '@/types';

export const OnboardingData: OnboardingItem[] = [
  {
    image: FirstOnboarding,
    text: i18n.t('goodByeToWaiting'),
  },
  {
    image: SecondOnboarding,
    text: i18n.t('finishErrands'),
  },
  {
    image: ThirdOnboarding,
    text: i18n.t('saveMoney'),
  },
  {
    image: FourthOnboarding,
    text: i18n.t('spendTime'),
  }
];


// Email Verification - SplashScreen 
export const EmailVerificationText = i18n.t('sitTight');

//Categories
export const Categories: CategoryProps[] = [
  {
    image: Restaurant,
    title: i18n.t('restaurants'),
    name: "Restaurants"
  },
  {
    image: Government,
    title: i18n.t('governments'),
    name: "Governments"
  },
  {
    image: Clinic,
    title: i18n.t('clinics'),
    name: "Clinics"
  },
  // {
  //   image: Grocery,
  //   title: i18n.t('groceries'),
  //   name: "Groceries"
  // },
  {
    image: Bank,
    title: i18n.t('banks'),
    name: "Banks"
  },
  {
    image: Other,
    title: i18n.t('others'),
    name: "Others"
  },
];

export const AllCategories: CategoryProps[] = [
  // Include original categories first
  {
    image: Restaurant,
    title: i18n.t('restaurants'),
    name: "Restaurants"
  },
  {
    image: Government,
    title: i18n.t('governments'),
    name: "Governments"
  },
  {
    image: Clinic,
    title: i18n.t('clinics'),
    name: "Clinics"
  },
  // {
  //   image: Grocery,
  //   title: i18n.t('groceries'),
  //   name: "Groceries"
  // },
  {
    image: Bank,
    title: i18n.t('banks'),
    name: "Banks"
  },
  // Add new categories
  {
    image: Other,
    title: i18n.t('autoRepair'),
    name: "Auto Repair"
  },
  {
    image: Other,
    title: i18n.t('privateCatering'),
    name: "Private Catering"
  },
  {
    image: Other,
    title: i18n.t('ceremonyHalls'),
    name: "Ceremony Halls"
  },
  {
    image: Other,
    title: i18n.t('carDealerships'),
    name: "Car Dealerships"
  },
  {
    image: Other,
    title: i18n.t('motoDealerships'),
    name: "Moto Dealerships"
  },
  // {
  //   image: Other,
  //   title: i18n.t('education'),
  // },
  // {
  //   image: Other,
  //   title: i18n.t('salons'),
  // },
  // {
  //   image: Other,
  //   title: i18n.t('spas'),
  // },
  // {
  //   image: Other,
  //   title: i18n.t('telecom'),
  // },
  // {
  //   image: Other,
  //   title: i18n.t('realEstate'),
  // },
  // {
  //   image: Other,
  //   title: i18n.t('insurance'),
  // },
  // {
  //   image: Other,
  //   title: i18n.t('petCare'),
  // },
  // {
  //   image: Other,
  //   title: i18n.t('fitness'),
  // },
  // {
  //   image: Other,
  //   title: i18n.t('entertainment'),
  // },
  // {
  //   image: Other,
  //   title: i18n.t('pharmacies'),
  // },
  {
    image: Other,
    title: i18n.t('hotels'),
    name: "Hotels"
  },
  {
    image: Other,
    title: i18n.t('flightTickets'),
    name: "Flight Tickets"
  },
  // {
  //   image: Other,
  //   title: i18n.t('laundry'),
  // },
  // {
  //   image: Other,
  //   title: i18n.t('bookstores'),
  // },
  // {
  //   image: Other,
  //   title: i18n.t('toyStores'),
  // },
  // {
  //   image: Other,
  //   title: i18n.t('sportingGoods'),
  // },
  // {
  //   image: Other,
  //   title: i18n.t('furniture'),
  // },
  // {
  //   image: Other,
  //   title: i18n.t('electronics'),
  // },
  // {
  //   image: Other,
  //   title: i18n.t('jewelry'),
  // },
  // {
  //   image: Other,
  //   title: i18n.t('opticians'),
  // },
  // {
  //   image: Other,
  //   title: i18n.t('tailors'),
  // },
  // {
  //   image: Other,
  //   title: i18n.t('carWash'),
  // },
  // {
  //   image: Other,
  //   title: i18n.t('postOffices'),
  // },
  // {
  //   image: Other,
  //   title: i18n.t('libraries'),
  // },
  // {
  //   image: Other,
  //   title: i18n.t('museums'),
  // },
  // {
  //   image: Other,
  //   title: i18n.t('theaters'),
  // },
  // {
  //   image: Other,
  //   title: i18n.t('cinemas'),
  // },
  // {
  //   image: Other,
  //   title: i18n.t('artGalleries'),
  // },
  // {
  //   image: Other,
  //   title: i18n.t('computerRepair'),
  // },
  // {
  //   image: Other,
  //   title: i18n.t('phoneRepair'),
  // },
  // {
  //   image: Other,
  //   title: i18n.t('homeServices'),
  // },
  // {
  //   image: Other,
  //   title: i18n.t('travelAgencies'),
  // }
];

//Current Queues
export const Current: CurrentQueuesProps[] = [
  {
    image: CarrefourLogo,
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

// Locations
export const locations = [
  {
    label: 'Madinaty',
    value: '1',
    id: 1,
    address: 'Madinaty, New Cairo',
    coordinates: {
      latitude: 30.0742,
      longitude: 31.6470
    }
  },
  {
    label: 'Maadi',
    value: '2',
    id: 2,
    address: 'Maadi, Cairo',
    coordinates: {
      latitude: 29.9602,
      longitude: 31.2569
    }
  },
  {
    label: 'Elshorouk',
    value: '3',
    id: 3,
    address: 'El Shorouk City',
    coordinates: {
      latitude: 30.1498,
      longitude: 31.6278
    }
  },
  {
    label: 'Al-rehab road',
    value: '4',
    id: 4,
    address: 'Al Rehab City, New Cairo',
    coordinates: {
      latitude: 30.0595,
      longitude: 31.4922
    }
  },
  {
    label: 'Tagamoa',
    value: '5',
    id: 5,
    address: 'Fifth Settlement, New Cairo',
    coordinates: {
      latitude: 30.0271,
      longitude: 31.4620
    }
  },
  {
    label: 'Almaza',
    value: '6',
    id: 6,
    address: 'Almaza, Heliopolis',
    coordinates: {
      latitude: 30.0911,
      longitude: 31.3425
    }
  },
  {
    label: 'October',
    value: '7',
    id: 7,
    address: '6th of October City',
    coordinates: {
      latitude: 29.9285,
      longitude: 30.9188
    }
  },
  {
    label: 'Arabella',
    value: '8',
    id: 8,
    address: 'Arabella Plaza, New Cairo',
    coordinates: {
      latitude: 30.0288,
      longitude: 31.4597
    }
  }
];

//History
export const HistoryList: HistoryComponentProps[] = [
  {
    image: CarrefourLogo,
    name: 'carrefour',
    location: 'New administrative Capital',
    date: '18 January 2024',
    id: '1234XXXXXXXXX',
    status: 'Queued',
    queues: 75,
    time: '10:09',
    notification: '5 people remaining in your queue, make sure you don\'t lose your turn!',
    category: 'Grocery'
  },
  {
    image: arabiata,
    name: 'Arabiata',
    location: 'German University in Cairo',
    date: '18 January 2024',
    id: '1234XXXXXXXXX',
    status: 'Cancelled',
    queues: 1,
    time: '10:09',
    notification: '5 people remaining in your queue, make sure you don\'t lose your turn!',
    category: 'Restaurant'
  },
  {
    image: elections,
    name: 'Elections',
    location: '5th settlement',
    date: '18 January 2024',
    id: '1234XXXXXXXXX',
    status: 'Queued',
    queues: 100,
    time: '10:09',
    notification: '5 people remaining in your queue, make sure you don\'t lose your turn!',
    category: 'Government'
  },
  {
    image: nationalBank,
    name: 'National Bank',
    location: 'New administrative Capital',
    date: '18 January 2024',
    id: '1234XXXXXXXXX',
    status: 'Cancelled',
    queues: 5,
    time: '10:09',
    notification: '5 people remaining in your queue, make sure you don\'t lose your turn!',
    category: 'Bank'
  },
  {
    image: alSalamHospital,
    name: 'Al-Salam Hospital',
    location: 'Al-Salam',
    date: '18 January 2024',
    id: '1234XXXXXXXXX',
    status: 'Queued',
    queues: 1,
    time: '10:09',
    notification: '5 people remaining in your queue, make sure you don\'t lose your turn!',
    category: 'Clinic'
  },
  {
    image: CarrefourLogo,
    name: 'carrefour',
    location: 'New administrative Capital',
    date: '18 January 2024',
    id: '1234XXXXXXXXX',
    status: 'Queued',
    queues: 75,
    time: '10:09',
    notification: '5 people remaining in your queue, make sure you don\'t lose your turn!',
    category: 'Grocery'
  },
  {
    image: CarrefourLogo,
    name: 'carrefour',
    location: 'New administrative Capital',
    date: '18 January 2024',
    id: '1234XXXXXXXXX',
    status: 'Queued',
    queues: 75,
    time: '10:09',
    notification: '5 people remaining in your queue, make sure you don\'t lose your turn!',
    category: 'Other'
  },
  {
    image: CarrefourLogo,
    name: 'carrefour',
    location: 'New administrative Capital',
    date: '18 January 2024',
    id: '1234XXXXXXXXX',
    status: 'Cancelled',
    queues: 75,
    time: '10:09',
    notification: '5 people remaining in your queue, make sure you don\'t lose your turn!',
    category: 'Other'
  },
  {
    image: CarrefourLogo,
    name: 'carrefour',
    location: 'New administrative Capital',
    date: '18 January 2024',
    id: '1234XXXXXXXXX',
    status: 'Queued',
    queues: 75,
    time: '10:09',
    notification: '5 people remaining in your queue, make sure you don\'t lose your turn!',
    category: 'Other'
  },
  {
    image: CarrefourLogo,
    name: 'carrefour',
    location: 'New administrative Capital',
    date: '18 January 2024',
    id: '1234XXXXXXXXX',
    status: 'Cancelled',
    queues: 75,
    time: '10:09',
    notification: '5 people remaining in your queue, make sure you don\'t lose your turn!',
    category: 'Other'
  }
]

export const countries = [
  { value: 'afghanistan', label: 'Afghanistan' },
  { value: 'albania', label: 'Albania' },
  { value: 'algeria', label: 'Algeria' },
  { value: 'andorra', label: 'Andorra' },
  { value: 'angola', label: 'Angola' },
  { value: 'antigua_and_barbuda', label: 'Antigua and Barbuda' },
  { value: 'argentina', label: 'Argentina' },
  { value: 'armenia', label: 'Armenia' },
  { value: 'australia', label: 'Australia' },
  { value: 'austria', label: 'Austria' },
  { value: 'azerbaijan', label: 'Azerbaijan' },
  { value: 'bahamas', label: 'The Bahamas' },
  { value: 'bahrain', label: 'Bahrain' },
  { value: 'bangladesh', label: 'Bangladesh' },
  { value: 'barbados', label: 'Barbados' },
  { value: 'belarus', label: 'Belarus' },
  { value: 'belgium', label: 'Belgium' },
  { value: 'belize', label: 'Belize' },
  { value: 'benin', label: 'Benin' },
  { value: 'bhutan', label: 'Bhutan' },
  { value: 'bolivia', label: 'Bolivia' },
  { value: 'bosnia_and_herzegovina', label: 'Bosnia and Herzegovina' },
  { value: 'botswana', label: 'Botswana' },
  { value: 'brazil', label: 'Brazil' },
  { value: 'brunei', label: 'Brunei' },
  { value: 'bulgaria', label: 'Bulgaria' },
  { value: 'burkina_faso', label: 'Burkina Faso' },
  { value: 'burundi', label: 'Burundi' },
  { value: 'cabo_verde', label: 'Cabo Verde' },
  { value: 'cambodia', label: 'Cambodia' },
  { value: 'cameroon', label: 'Cameroon' },
  { value: 'canada', label: 'Canada' },
  { value: 'central_african_republic', label: 'Central African Republic' },
  { value: 'chad', label: 'Chad' },
  { value: 'chile', label: 'Chile' },
  { value: 'china', label: 'China' },
  { value: 'colombia', label: 'Colombia' },
  { value: 'comoros', label: 'Comoros' },
  { value: 'congo', label: 'Congo' },
  { value: 'costa_rica', label: 'Costa Rica' },
  { value: 'cote_d_ivoire', label: 'Côte d\'Ivoire' },
  { value: 'croatia', label: 'Croatia' },
  { value: 'cuba', label: 'Cuba' },
  { value: 'cyprus', label: 'Cyprus' },
  { value: 'czech_republic', label: 'Czech Republic' },
  { value: 'denmark', label: 'Denmark' },
  { value: 'djibouti', label: 'Djibouti' },
  { value: 'dominica', label: 'Dominica' },
  { value: 'dominican_republic', label: 'Dominican Republic' },
  { value: 'east_timor', label: 'East Timor' },
  { value: 'ecuador', label: 'Ecuador' },
  { value: 'egypt', label: 'Egypt' },
  { value: 'el_salvador', label: 'El Salvador' },
  { value: 'equatorial_guinea', label: 'Equatorial Guinea' },
  { value: 'eritrea', label: 'Eritrea' },
  { value: 'estonia', label: 'Estonia' },
  { value: 'eswatini', label: 'Eswatini' },
  { value: 'ethiopia', label: 'Ethiopia' },
  { value: 'fiji', label: 'Fiji' },
  { value: 'finland', label: 'Finland' },
  { value: 'france', label: 'France' },
  { value: 'gabon', label: 'Gabon' },
  { value: 'gambia', label: 'The Gambia' },
  { value: 'georgia', label: 'Georgia' },
  { value: 'germany', label: 'Germany' },
  { value: 'ghana', label: 'Ghana' },
  { value: 'greece', label: 'Greece' },
  { value: 'grenada', label: 'Grenada' },
  { value: 'guatemala', label: 'Guatemala' },
  { value: 'guinea', label: 'Guinea' },
  { value: 'guinea_bissau', label: 'Guinea-Bissau' },
  { value: 'guyana', label: 'Guyana' },
  { value: 'haiti', label: 'Haiti' },
  { value: 'honduras', label: 'Honduras' },
  { value: 'hungary', label: 'Hungary' },
  { value: 'iceland', label: 'Iceland' },
  { value: 'india', label: 'India' },
  { value: 'indonesia', label: 'Indonesia' },
  { value: 'iran', label: 'Iran' },
  { value: 'iraq', label: 'Iraq' },
  { value: 'ireland', label: 'Ireland' },
  { value: 'israel', label: 'Israel' },
  { value: 'italy', label: 'Italy' },
  { value: 'jamaica', label: 'Jamaica' },
  { value: 'japan', label: 'Japan' },
  { value: 'jordan', label: 'Jordan' },
  { value: 'kazakhstan', label: 'Kazakhstan' },
  { value: 'kenya', label: 'Kenya' },
  { value: 'kiribati', label: 'Kiribati' },
  { value: 'korea_north', label: 'Korea, North' },
  { value: 'korea_south', label: 'Korea, South' },
  { value: 'kosovo', label: 'Kosovo' },
  { value: 'kuwait', label: 'Kuwait' },
  { value: 'kyrgyzstan', label: 'Kyrgyzstan' },
  { value: 'laos', label: 'Laos' },
  { value: 'latvia', label: 'Latvia' },
  { value: 'lebanon', label: 'Lebanon' },
  { value: 'lesotho', label: 'Lesotho' },
  { value: 'liberia', label: 'Liberia' },
  { value: 'libya', label: 'Libya' },
  { value: 'liechtenstein', label: 'Liechtenstein' },
  { value: 'lithuania', label: 'Lithuania' },
  { value: 'luxembourg', label: 'Luxembourg' },
  { value: 'madagascar', label: 'Madagascar' },
  { value: 'malawi', label: 'Malawi' },
  { value: 'malaysia', label: 'Malaysia' },
  { value: 'maldives', label: 'Maldives' },
  { value: 'mali', label: 'Mali' },
  { value: 'malta', label: 'Malta' },
  { value: 'marshall_islands', label: 'Marshall Islands' },
  { value: 'mauritania', label: 'Mauritania' },
  { value: 'mauritius', label: 'Mauritius' },
  { value: 'mexico', label: 'Mexico' },
  { value: 'micronesia', label: 'Micronesia' },
  { value: 'moldova', label: 'Moldova' },
  { value: 'monaco', label: 'Monaco' },
  { value: 'mongolia', label: 'Mongolia' },
  { value: 'montenegro', label: 'Montenegro' },
  { value: 'morocco', label: 'Morocco' },
  { value: 'mozambique', label: 'Mozambique' },
  { value: 'myanmar', label: 'Myanmar' },
  { value: 'namibia', label: 'Namibia' },
  { value: 'nauru', label: 'Nauru' },
  { value: 'nepal', label: 'Nepal' },
  { value: 'netherlands', label: 'Netherlands' },
  { value: 'new_zealand', label: 'New Zealand' },
  { value: 'nicaragua', label: 'Nicaragua' },
  { value: 'niger', label: 'Niger' },
  { value: 'nigeria', label: 'Nigeria' },
  { value: 'north_macedonia', label: 'North Macedonia' },
  { value: 'norway', label: 'Norway' },
  { value: 'oman', label: 'Oman' },
  { value: 'pakistan', label: 'Pakistan' },
  { value: 'palau', label: 'Palau' },
  { value: 'panama', label: 'Panama' },
  { value: 'papua_new_guinea', label: 'Papua New Guinea' },
  { value: 'paraguay', label: 'Paraguay' },
  { value: 'peru', label: 'Peru' },
  { value: 'philippines', label: 'Philippines' },
  { value: 'poland', label: 'Poland' },
  { value: 'portugal', label: 'Portugal' },
  { value: 'qatar', label: 'Qatar' },
  { value: 'romania', label: 'Romania' },
  { value: 'russia', label: 'Russia' },
  { value: 'rwanda', label: 'Rwanda' },
  { value: 'saint_kitts_and_nevis', label: 'Saint Kitts and Nevis' },
  { value: 'saint_lucia', label: 'Saint Lucia' },
  { value: 'saint_vincent_and_the_grenadines', label: 'Saint Vincent and the Grenadines' },
  { value: 'samoa', label: 'Samoa' },
  { value: 'san_marino', label: 'San Marino' },
  { value: 'sao_tome_and_principe', label: 'Sao Tome and Principe' },
  { value: 'saudi_arabia', label: 'Saudi Arabia' },
  { value: 'senegal', label: 'Senegal' },
  { value: 'serbia', label: 'Serbia' },
  { value: 'seychelles', label: 'Seychelles' },
  { value: 'sierra_leone', label: 'Sierra Leone' },
  { value: 'singapore', label: 'Singapore' },
  { value: 'slovakia', label: 'Slovakia' },
  { value: 'slovenia', label: 'Slovenia' },
  { value: 'solomon_islands', label: 'Solomon Islands' },
  { value: 'somalia', label: 'Somalia' },
  { value: 'south_africa', label: 'South Africa' },
  { value: 'south_sudan', label: 'South Sudan' },
  { value: 'spain', label: 'Spain' },
  { value: 'sri_lanka', label: 'Sri Lanka' },
  { value: 'sudan', label: 'Sudan' },
  { value: 'suriname', label: 'Suriname' },
  { value: 'sweden', label: 'Sweden' },
  { value: 'switzerland', label: 'Switzerland' },
  { value: 'syria', label: 'Syria' },
  { value: 'taiwan', label: 'Taiwan' },
  { value: 'tajikistan', label: 'Tajikistan' },
  { value: 'tanzania', label: 'Tanzania' },
  { value: 'thailand', label: 'Thailand' },
  { value: 'togo', label: 'Togo' },
  { value: 'tonga', label: 'Tonga' },
  { value: 'trinidad_and_tobago', label: 'Trinidad and Tobago' },
  { value: 'tunisia', label: 'Tunisia' },
  { value: 'turkey', label: 'Turkey' },
  { value: 'turkmenistan', label: 'Turkmenistan' },
  { value: 'tuvalu', label: 'Tuvalu' },
  { value: 'uganda', label: 'Uganda' },
  { value: 'ukraine', label: 'Ukraine' },
  { value: 'united_arab_emirates', label: 'United Arab Emirates' },
  { value: 'united_kingdom', label: 'United Kingdom' },
  { value: 'united_states', label: 'United States' },
  { value: 'uruguay', label: 'Uruguay' },
  { value: 'uzbekistan', label: 'Uzbekistan' },
  { value: 'vanuatu', label: 'Vanuatu' },
  { value: 'vatican_city', label: 'Vatican City' },
  { value: 'venezuela', label: 'Venezuela' },
  { value: 'vietnam', label: 'Vietnam' },
  { value: 'yemen', label: 'Yemen' },
  { value: 'zambia', label: 'Zambia' },
  { value: 'zimbabwe', label: 'Zimbabwe' }
];

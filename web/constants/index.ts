import { faFacebook, faLinkedin, faInstagram, faTwitter, faTiktok, faYoutube, faPinterest } from '@fortawesome/free-brands-svg-icons';
import { faLink } from '@fortawesome/free-solid-svg-icons';

export const QueuesData = [
  [
    //Name
    'Cashier',
    //Max Length
    'No',
    //Number of visitors to notify
    '3',
    //Estimated waiting time mode
    'Auto',
    //Enabled only in opening hours
    'Yes'
  ],
  [
    'Lost and found',
    'No',
    '3',
    'Auto',
    'Yes'
  ],
  [
    'Changing room',
    'No',
    '3',
    'Auto',
    'Yes'
  ],
  [
    'Changing room',
    'No',
    '3',
    'Auto',
    'Yes'
  ]
]

// Social Media Platform Info
export const socialMediaPlatforms = [
  {
    name: "Facebook",
    url: "https://facebook.com/",
    icon: faFacebook,
  },
  {
    name: "LinkedIn",
    url: "https://linkedin.com/in/",
    icon: faLinkedin,
  },
  {
    name: "Instagram",
    url: "https://instagram.com/",
    icon: faInstagram,
  },
  {
    name: "Twitter",
    url: "https://x.com/",
    icon: faTwitter,
  },
  {
    name: "TikTok",
    url: "https://tiktok.com/",
    icon: faTiktok,
  },
  {
    name: "YouTube",
    url: "https://youtube.com/",
    icon: faYoutube,
  },
  {
    name: "Pinterest",
    url: "https://pinterest.com/",
    icon: faPinterest,
  },
  {
    name: "Website",
    url: "https://hatemsoliman.dev/",
    icon: faLink,
  },
];

export const features = [
  {
    title: "Seamless Check-ins and Real-time Updates",
    subtitle: "Effortless Queuing Experience",
    paragraphs: [
      "Check-in at your favorite spots without the hassle of standing in line. Our app allows you to queue virtually, giving you the freedom to manage your time efficiently.",
      "Receive instant updates on your queue status and estimated wait times directly to your phone. Stay informed and save time with QMaster!",
    ],
    image: "/featureOne.png",
    attribution: "Photo by Lisanto 李奕良 on Unsplash",
  },
  {
    title: "Keep Track of Your Appointments",
    subtitle: "Never Miss a Spot",
    paragraphs: [
      "Book appointments and secure your place in line for services at your convenience. Whether it's a doctor's appointment, a restaurant reservation, or a salon visit, QMaster has got you covered.",
      "Get reminders and notifications to ensure you never miss your turn. Our app keeps you organized and on schedule.",
    ],
    image: "/featureTwo.png",
    attribution: "Photo by Austin Distel on Unsplash",
  },
  {
    title: "Enhanced User Experience",
    subtitle: "User-Friendly and Intuitive",
    paragraphs: [
      "Navigate the app with ease thanks to its user-friendly design and intuitive interface. Whether you're tech-savvy or a beginner, iQueue is simple and straightforward to use.",
      "Our app is designed to provide a seamless experience, ensuring that all users can enjoy its benefits without any hassle.",
    ],
    image: "/featureThree.png",
    attribution: "N/A",
  },
  {
    title: "Security and Control",
    subtitle: "Your Data, Your Control",
    paragraphs: [
      "Enjoy peace of mind with robust security features. Control what information you share and manage your data with ease.",
      "Our app uses advanced security measures to protect your personal information, ensuring a safe and secure experience for all users.",
    ],
    image: "/featureFour.png",
    attribution: "Photo by Markus Spiske on Unsplash",
  },
];

// Landing Page Footer Links
export const footerLinks = [
  {
    title: "Social",
    links: [
      // { title: "Facebook", url: "https://www.facebook.com/" },
      // { title: "Instagram", url: "https://www.instagram.com/" },
      // { title: "Twitter", url: "https://www.x.com/" },
      { title: "Linkedin", url: "https://www.linkedin.com/company/qmasterapp/" },
    ],
  },
  {
    title: "Legal",
    links: [
      { title: "Terms of Use", url: "/" },
      { title: "Privacy Policy", url: "/" },
    ],
  },
  {
    title: "Media",
    links: [
      { title: "Release Content", url: "/" },
    ],
  },
];

// E-store Badges
export const StoreBadges = [
  {
    name: "App Store",
    url: "https://apps.apple.com/us/app/qmaster/id1581537622",
    icon: "/apple-store.png",
  },
  {
    name: "Google Play",
    url: "https://play.google.com/store/apps/details?id=com.qmaster",
    icon: "/google-play-badge.png",
  },
];
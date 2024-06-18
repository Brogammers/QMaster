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
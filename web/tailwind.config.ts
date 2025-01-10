import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        "ocean-blue": "#096DD9",
        "concrete-turqouise": "#13404D",
        "crystal-blue": "#34F5C5",
        "baby-blue": "#1890FF",
        "off-white": "#D9D9D9",
        "lite-grey": "#ADADAD",
        "shark-grey": "#C5C5C5",
        "slate-grey": "#7D7D7D",
        "slight-slate-grey": "#C3C3C3",
        "dark-grey": "#515151",
        "ignite-black": "#3E3E3E",
        "coal-black": "#262626",
        "lava-black": "444444",
        "lava-red": "#B41818",
      },
      screens: {
        'xsm': '478px',
      },
      animation: {
        'gradient': 'gradient 8s linear infinite',
      },
      keyframes: {
        gradient: {
          '0%, 100%': {
            'background-size': '200% 200%',
            'background-position': 'left center'
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'right center'
          },
        },
      },
    },
  },
  plugins: [],
};
export default config;

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
        "ocean-blue": "#17222D",
        "concrete-turqouise": "#13404D",
        "baby-blue": "#1DCDFE",
        "off-white": "#D9D9D9",
        "lite-grey": "#ADADAD",
        "shark-grey": "#C5C5C5",
        "slate-grey": "#7D7D7D",
        "slight-slate-grey": "#C3C3C3",
        "dark-grey": "#515151",
        "ignite-black": "#3E3E3E",
        "coal-black": "#2F2E41",
        "lava-black": "444444",
        "lava-red": "#B41818",
      },
    },
  },
  plugins: [],
};
export default config;

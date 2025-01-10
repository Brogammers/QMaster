/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}", "./shared/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
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
        "rock-stone": "#969696",
        "ignite-black": "#3E3E3E",
        "coal-black": "#2F2E41",
        "lava-black": "444444",
        "lava-red": "#B41818",
      },
      borderRadius: {
        "sxl": "18px",
      },
      spacing: {
        '-50': '-50px',
      },
    },
  },
  plugins: [],
}


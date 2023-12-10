/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}", ],
  theme: {
    extend: {
      colors: {
        "ocean-blue": "#17222D",
        "baby-blue": "#1DCDFE",
        "shark-grey": "#C5C5C5",
        "dark-grey": "#515151"
      },
    },
  },
  plugins: [],
}


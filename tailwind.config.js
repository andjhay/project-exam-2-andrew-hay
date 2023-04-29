/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        lightblue: "#AAB9BF",
        darkblue: "#7B92A6",
        darkbrown: "#252617",
        sand: "#D9B282",
        yellowsand: "#F2CF8D",
      },
      fontFamily: {
        header: ["Concert One"],
        subheader: ["Lexend"],
        paragraph: ["Ubuntu"],
      },
    },
  },
  plugins: [],
};

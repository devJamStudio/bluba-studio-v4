/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,jsx,ts,tsx}",
    "./src/components/**/*.{js,jsx,ts,tsx}",
    "./src/templates/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        "3xl": "2000px",
      },
      colors: {
        white: "#FAFAF7",
        black: "#1D2020",
        bluba: "#BAC5FF",
      },
      fontSize: {
        sm: ["0.046875rem"], // 0.75 / 16
        base: ["1rem"], // 16px
        md: ["1rem"], // 1 / 16
        lg: ["1.0625rem", "1"], // 1.33 / 16
        xl: ["2.0625rem", "1.375"], // 1.5 / 16
        "2xl": ["2.664375rem", "1.17"], // 56 / 16, 60 / 16
        "3xl": ["4.735rem", "1.05"], // 75.76 / 16, 80 / 16
      },
      fontFamily: {
        antipol: ["antipol", "sans-serif"],
        blow: ["blow-up", "sans-serif"],
      },
      fontWeight: {
        light: "300",
        medium: "500",
        bold: "700",
        black: "900",
      },
      letterSpacing: {
        tightest: "-.075em",
        tighter: "-.05em",
        tight: "-.025em",
        normal: "0",
        wide: ".025em",
        wider: ".05em",
        widest: ".1em",
      },
    },
  },
  plugins: [],
  darkMode: "class",
};

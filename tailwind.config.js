/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");
const defaultColors = require("tailwindcss/colors");

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    screens: {
      mobile: "425px",
      tablet: "768px",
      pc: "2560px",
      laptop: "1440px",
      ...defaultTheme.screens,
    },
    colors: {
      transparent: "transparent",
      white: "#ffffff",
      black: "#000",
      grey: "#ededed",
      softGrey: "#c4c4c4",
      neutral: "#fafafa",
      turquoise: "#01959f",
      darkGrey: "#b7b7b7",
      bg1: "#f7feff",
      bd1: "#2da7af",
      bg2: "#fffcf3",
      bd2: "#feeec7",
      bg3: "#fffafa",
      bd3: "#f7bec3",
      bg4: "#f8fbf9",
      bd4: "#c4e1d3",
      ...defaultColors,
    },
    fontSize: {
      sm: ["14px"],
      base: ["16px"],
      lg: ["20px"],
      xl: ["24px"],
    },
    fontWeight: {
      hairline: 100,
      thin: 200,
      light: 300,
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
      extrabold: 800,
    },
  },
  plugins: [],
};

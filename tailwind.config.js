/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        Inter: ['"Inter"', ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [
    require("@tailwindcss/forms"),
    require("flowbite/plugin"), // add this line
  ],
  screens: {
    sm: { max: "640px" },
    md: { min: "641px", max: "768px" },
    lg: { min: "769px", max: "1024px" },
    xl: { min: "1025px", max: "1280px" },
    "2xl": { min: "1281px" },
  },
};

/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html",
    "./src/pages/**/*.{html,js,jsx,ts,tsx}",
    "./src/components/**/*.{html,js,jsx,ts,tsx}",
  ],
  important: "#root",
  theme: {
    extend: {},
    screens: {
      xs: "475px",
      xxs: "0px",

      ...defaultTheme.screens,
    },
    container: {
      padding: {
        DEFAULT: "1rem",
      },
      ...defaultTheme.container,
    },
  },
  plugins: [require("@tailwindcss/typography")],
};

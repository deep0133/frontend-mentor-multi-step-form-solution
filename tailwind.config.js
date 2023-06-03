/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");
module.exports = {
  content: ["./index.html", "./index.js"],
  theme: {
    screens: {
      xxxs: "220px",
      xxs: "500px",
      ...defaultTheme.screens,
    },
  },
  plugins: [],
};

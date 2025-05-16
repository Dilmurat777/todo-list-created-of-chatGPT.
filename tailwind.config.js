/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // для Vite/React
  ],
  darkMode: 'class', // включаем темную тему по классу
  theme: {
    extend: {},
  },
  plugins: [],
};

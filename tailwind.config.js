/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./test.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  safelist: [
    'text-red-500',
    'text-green-50',
    'text-green-100',
  ],
  theme: {
    extend: {
      colors: require('tailwindcss/colors'), // <-- Add this line
    },
  },
  plugins: [],
}
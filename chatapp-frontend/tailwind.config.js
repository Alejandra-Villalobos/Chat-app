/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    fontFamily: {
      'patua': ['Patua One'], 
    },
    extend: {},
  },
  plugins: [
    require('tailwindcss-patterns'),
  ],
}
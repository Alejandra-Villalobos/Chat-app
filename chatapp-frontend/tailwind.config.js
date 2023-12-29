/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    fontFamily: {
      'patua': ['Patua One'], 
      'jost': ['Jost'], 
    },
    extend: {},
  },
  plugins: [
    require('tailwindcss-patterns'),
  ],
}
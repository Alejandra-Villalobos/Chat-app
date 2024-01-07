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
    screens: {
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
      'max-phone': {'max': '600px'},
    },
    extend: {
    },
  },
  plugins: [
    require('tailwindcss-patterns'),
  ],
}
/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class', // 또는 'media'
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['SpoqaHanSansNeo'],
      },
    },
  },
  plugins: [],
};

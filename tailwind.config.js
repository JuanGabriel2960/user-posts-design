/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'dominant': '#ffffff',
        'secondary': '#f8f8f8',
        'accent': '#ee4865',
        'font-strong': '#123141',
        'font-light': '#677983',
      },
    },
  },
  plugins: [],
}

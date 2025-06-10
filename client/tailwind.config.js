module.exports = {
  theme: {
    extend: {
      colors: {
        primary: '#00178F',
        secondary: '#4B96FF',
        accent: '#FFA2B6',
      },
    },
  },
  theme: {
    screens: {
      'xs': '475px',
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
    },
  },
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
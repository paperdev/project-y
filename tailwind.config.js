/** @type {import('tailwindcss').Config} */
const konstaConfig = require('konsta/config');

// wrap your config with konstaConfig
module.exports = konstaConfig({
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  i18n: {
    locales: ['en-US'],
    defaultLocale: 'en-US',
  },
  theme: {
    extend: {},
  },
  darkMode: 'class',
  plugins: [],

  // screens: {
  //   '2xs': { min: '300px' },
  //   xs: { max: '575px' }, // Mobile (iPhone 3 - iPhone XS Max).
  //   sm: { min: '576px', max: '897px' }, // Mobile (matches max: iPhone 11 Pro Max landscape @ 896px).
  //   md: { min: '898px', max: '1199px' }, // Tablet (matches max: iPad Pro @ 1112px).
  //   lg: { min: '1200px' }, // Desktop smallest.
  //   xl: { min: '1259px' }, // Desktop wide.
  //   '2xl': { min: '1359px' } // Desktop widescreen.
  // },
});

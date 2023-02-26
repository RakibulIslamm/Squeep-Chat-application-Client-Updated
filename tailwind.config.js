/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        transparent: 'transparent',
        current: 'currentColor',
        'primary': '#30405F',
        'secondary': '#2A3751',
        'lightBlack': '#191C21',
        'sidebarBg': '#1F293D',
        'yellow': '#FFE14C',
        'green': '#39FF14',
      },
      screens: {
        xxs: { max: '400px' },
        xs: { max: '699px' }, // Mobile (iPhone 3 - iPhone XS Max).
        sm: { min: '700px', max: '897px' }, // Mobile (matches max: iPhone 11 Pro Max landscape @ 896px).
        md: { min: '898px', max: '1180px' }, // Tablet (matches max: iPad Pro @ 1112px).
        lg: { min: '1181px' }, // Desktop smallest.
        xl: { min: '1159px' }, // Desktop wide.
        xxl: { min: '1359px' } // Desktop widescreen.
      },
    },
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
    require('tailwind-scrollbar'),
  ],
  variants: {
    scrollbar: ['rounded']
  },
}

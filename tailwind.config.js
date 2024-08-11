/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './index.html'],
  theme: {
    extend: {
      colors: {
        'bg-slide': 'hsla(0,0%,100%,0.3)',
      },
    },
    keyframes: {
      ht: {
        '100%': { height: '0px' },
      },
    },
    screens: {
      responsePublic: '1600px',
    },
  },
  plugins: [require('tailwind-scrollbar-hide')],
};

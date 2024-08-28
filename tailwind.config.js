/** @type {import('tailwindcss').Config} */

export default {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './index.html'],
  theme: {
    extend: {
      fontFamily: {
        roboto: ['Roboto', 'sans-serif'],
      },
      colors: {
        'bg-slide': 'hsla(0,0%,100%,0.3)',
        'bg-slide_chart': 'hsla(0,0%,100%,0.1)',
        'bg-overlay': 'rgba(0, 0, 0, 0.45)',
      },
    },
    keyframes: {
      'scale-up-img': {
        '0%': {
          '-webkit-transform': 'scale(1)',
          transform: 'scale(1)',
        },
        '100%': {
          '-webkit-transform': 'scale(1.2)',
          transform: 'scale(1.2)',
        },
      },
      'scale-down-img': {
        '0%': {
          '-webkit-transform': 'scale(1.2)',
          transform: 'scale(1.2)',
        },
        '100%': {
          '-webkit-transform': 'scale(1)',
          transform: 'scale(1)',
        },
      },
    },
    animation: {
      'scale-down-img':
        'scale-down-img 0.3s cubic-bezier(0.250, 0.460, 0.450,  0.940) both',
      'scale-up-img':
        'scale-up-img 0.3s cubic-bezier(0.250, 0.460, 0.450, 0.940) both',
    },
    screens: {
      responsePublic: '1600px',
      responseChart: '1400px',
    },
  },
  plugins: [
    require('tailwind-scrollbar-hide'),
    function ({ addUtilities }) {
      const newUtilities = {
        '.text-gradient': {
          background:
            'linear-gradient(to left, #ED7B72, #5DA4E5, #5DA4E5, #ED7B72)',
          '-webkit-background-clip': 'text',
          '-webkit-text-fill-color': 'transparent',
        },
      };

      addUtilities(newUtilities, ['responsive', 'hover']);
    },
  ],
};

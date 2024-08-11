/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './index.html'],
  theme: {
    extend: {
      colors: {
        'bg-slide': 'hsla(0,0%,100%,0.3)',
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
    },
  },
  plugins: [require('tailwind-scrollbar-hide')],
};

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  safelist: [
    'col-span-1',
    'col-span-2',
    'col-span-3',
    'col-span-4',
    'col-span-5',
    'col-span-6',
    'col-span-7'
  ],
  theme: {
    container: {
      center: true
    },
    extend: {},
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}


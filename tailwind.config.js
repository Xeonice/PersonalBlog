const colors = require('tailwindcss/colors');

module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx,mdx}',
    './src/pages/**/*.{js,jsx,ts,tsx}',
    './src/components/**/*.{js,jsx,ts,tsx}',
  ],
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        black: {
          lightest: '#454545',
          lighter: '#2a2a2a',
          light: '#161616',
          default: '#111',
        },
        silver: {
          default: '#878787',
          darker: '#676767',
          darkest: '#AAA',
        },
        blue: '#8DB6DE',
        white: {
          lightest: '#bababa',
          lighter: '#d5d5d5',
          light: '#e9e9e9',
          default: '#eee',
          darker: '#F5F5F5',
        },
        cyan: '#2BB6C9',
        gray: {
          default: '#787878',
          darker: '#989898',
          darkest: '#555',
        },
      },
    },
  },
  plugins: [],
};
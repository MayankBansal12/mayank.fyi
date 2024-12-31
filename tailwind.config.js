/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'solid-heading': '#42446E',
        'light-content': '#A7A7A7',
        'light-heading': '#ffffff',
        'dark-heading': '#000000',
        'dark-content': '#666666',
        'dark-background': '#000000',
        'dark-card': '#363636',
        'green-text': '#018C0F',
        'github-link': '#0969da',
      },
    },
    fontFamily: {
      primary: ['Excalifont-Regular', 'sans-serif'],
      secondary: ['DM Sans', 'sans-serif'],
    },
  },
  plugins: [],
};

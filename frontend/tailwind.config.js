/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{html,ts}', 
  ],
  
  darkMode: false, 

  theme: {
    extend: {
    },
  },

  variants: {
    extend: {
    },
  },

  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'), 
    require('@tailwindcss/aspect-ratio'), 
  ],
};

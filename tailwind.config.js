module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: {
      title: ["Potta One", "cursive"],
    },
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [ require('@tailwindcss/forms')],
};

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
    extend: {
      margin: ["hover"],
      borderWidth: ["hover"],
    },
  },
  plugins: [require("@tailwindcss/forms")],
};

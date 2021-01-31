module.exports = {
  darkMode: false, // or 'media' or 'class'
  purge: [
    './index.html',
    './app/**/*.tsx'
  ],
  theme: {
    fontFamily: {
      title: ['Potta One', 'cursive']
    },
    extend: {
      transitionProperty: {
        width: 'width'
      }
    }
  },
  variants: {
    extend: {
      margin: ['hover'],
      borderWidth: ['hover']
    }
  },
  plugins: [require('@tailwindcss/forms')]
}

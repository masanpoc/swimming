module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      gridTemplateColumns: {
        'toggle': 'repeat( auto-fill, minmax(80px, 1fr) )'
      }
    }
  },
  variants: {
    extend: {},
  },
  plugins: [],
};

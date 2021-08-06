module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      gridTemplateColumns: {
        toggle: "repeat( auto-fill, minmax(80px, 1fr) )",
      },
      fontFamily: {
        bebas: ["Bebas Neue"],
        play: ["Play"],
        lato: ["Lato"],
      },
      colors: {
        "dark-grey": "#cdcdcd",
        "light-grey": "#989898",
        "lighter-grey": "#858585",
        "blue-ocean": "#1272dc",
        "green-herb": "#00de61",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};

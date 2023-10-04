/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      fontFamily: {
        DEFAULT: ["Open Sans", "Roboto Slab", "sans-serif"],
        sans: ["Open Sans", "Source Sans Pro", "sans-serif"],
        sansBold: ["Open Sans Bold", "Open Sans", "sans-serif"],
        roboto: ["Roboto Slab", "sans-serif"],
        robotoSlabBold: ["Roboto Slab Bold", "Roboto Slab", "sans-serif"],
      },
      colors: {
        DEFAULT: "#333",
        primary: "#c5e0f9",
        blue: {
          DEFAULT: "#036",
          light: "#0094ff",
          dark: "#003764",
        },
        gray: {
          DEFAULT: "#8492a6",
          light: "#d9e0e7",
          "7f7": "#7f7f7f",
          e0e: "#e0e0e0",
          f9f: "#f9f9f9",
          "9f9": "#9f9f9f",
          d2d: "#d2d2d2",
          807: "#807f83",
          c2c: "#c2c2c2",
          f7f: "#f7f7f7",
          aaa: "#aaaaaa",
          f2f: "#F2F2F2",
        },
      },
    },
  },
  plugins: [],
};

/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{html,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
      },
      colors: {
        primary: "#6DAE81",            // main green
        primary_lighter: "#A7DCA5",    // lighter green
        secondary: "#FDFDFD",          // background white
        accent: "#FFE6C7",             // for buttons or highlights
        danger: "#EF476F",             // for error states
        dark: "#444444",               // main body text - dark gray
      },
      fontFamily: {
        sans: ['Manrope'],                  // Body
        manrope: ['Manrope', 'sans-serif'], // Header
      },
    },
  },
  plugins: [],
}

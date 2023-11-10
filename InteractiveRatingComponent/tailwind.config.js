/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors:{
        orange: "#fb7413",
        white: "#ffffff",
        lightgrey: "#959eac",
        mediumgrey: "#7c8798",
        darkblue: "#252d37",
        verydarkblue: "	#121417",
      },
      fontFamily: {
        'overpass': ['Overpass', 'sans-serif'],
      },
    },
  },
  plugins: [],
}


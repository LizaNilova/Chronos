/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,,ts,tsx}",
  ],
  theme: {
    extend: {
      width:{
        '1\/7': '14.2%',
        '6\/7':'85.2%'
      },
      height:{
        '2screen':'200vh',
        '1\/12': '8.3%',
        '1\/24': '4.2%',
        '2\/24':'8.35%',
        '3\/24':'12.45%',
        '4\/24':'16.6%',
        '5\/24':'20.75%',
        '6\/24':'24.9%',
        '7\/24':'29%',
        '8\/24':'33.15%',
        '9\/24':'37.30%',
        '10\/24':'41.45%',
        '11\/24':'45.60%',
        '12\/24':'49.75%',
        '13\/24':'53.9%',
        '14\/24':'58.05%',
        '15\/24':'62.2%',
        '16\/24':'66.35%',
        '17\/24':'70.5%',
        '18\/24':'74.65%',
        '19\/24':'78.8%',
        '20\/24':'82.95%',
        '21\/24':'87.1%',
        '22\/24':'91.25%',
        '23\/24':'95.4%',
        '2full': '200%',
        '3full': '300%'
      },
      colors: {
        red_picker: "#b80000",
        orange_picker: "#db3e00",
        yellow_picker: "#fccb00",
        green_picker: "#008b02",
        cyan_picker: "#006b76",
        sky_picker: "#1273de",
        blue_picker: "#004dcf",
        violet_picker: "#5300eb",
        pink_picker: "#eb9694",
        rose_picker: "#fad0c3",
        fuchsia_picker: "#fef3bd",
        light_sky_picker: "#c1e1c5",
        light_blue_picker: "#bedadc",
        cyan_blue_picker: "#c4def6",
        blue_sky_picker: "#bed3f3",
        light_violet_picker: "#d4c4fb",
      }
    },
  },
  plugins: [],
}

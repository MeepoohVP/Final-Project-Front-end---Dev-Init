/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        layerTop: {
          '0%': { marginTop: '-2rem' },
          '60%': { marginTop: '-0.5rem' },
          '100%': { marginTop: '-1.5rem' },
        },
        layerBottom: {
          '0%': { marginTop: '2rem' },
          '60%': { marginTop: '0.5rem' },
          '100%': { marginTop: '1.5rem' },
        },
      },
      animation: {
        layerTop: 'layerTop 0.7s linear',
        layerBottom: 'layerBottom 0.7s linear',
      }
    },
  },
  daisyui: {
    themes: ["light", "dark", "cupcake","acid","pastel","night","sunset","fantasy"],
  },
  plugins: [require("daisyui")],
}


/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        "2xl": "1400px",
        ds: "320px",
        xxs: "350px",
        xs: "480px",
        bs: "520px",
        mdl: "850px",
        xxs: "485px",
        breakpoint: "640px",
      },
      colors: {
        bg_color: "#8C77F9",
        primary: "#8C77F9",
        grey_text: "#81807E" ,
        grey_lighter: "#676665" ,
        secondary_dark: "#e7e5e4",
        inStock_bg: "#152011",
        inStock_text: "#8AF265",
        outOfStock_bg: "#fee2e2",
        outOfStock_text: "#ef4444",
        commingSoon_text: "#3b82f6",
        ComingSoon_bg: "#dbeafe"
      }
    },
  },
  plugins: [],
}


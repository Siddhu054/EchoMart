/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#fb641b",
          dark: "#e65c19",
        },
        secondary: {
          DEFAULT: "#ff9f43",
          dark: "#f39c12",
        },
      },
    },
  },
  plugins: [],
};

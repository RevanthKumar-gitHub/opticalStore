/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: {
          300: "rgb(255, 166, 47)",
          200: "rgb(255, 201, 111)",
          100: "#FFE8C8",
        },
        secondary: {},
        darkGray: "#1e293b",
        mediumGray: "#424769",
        lightGray:"#f1f5f9",
      },
      fontFamily: {
        ubuntu: "Ubuntu, sans-serif",
        karla: "Karla, sans-serif",
      },
    },
    container: {
      center: true,
      padding: "30px",
    },
  },
  variants: {
    extend: {
      backgroundColor: ["dark"],
      textColor: ["dark"],
    },
  },
  plugins: [],
};

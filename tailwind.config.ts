import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        sea: "#5ec8bf",
        "sea-dark": "#3fa79e",
        sand: "#f3d9a4",
        ink: "#070b12",
      },
      fontFamily: {
        sans: ["var(--font-poppins)", "var(--font-myanmar)", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
} satisfies Config;

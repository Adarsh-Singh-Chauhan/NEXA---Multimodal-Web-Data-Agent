import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          orange: "#ff5a1f",
          dark: "#111111",
          gray: "#f7f7f8",
          border: "#e5e5e5",
        }
      },
      backgroundImage: {
        "grid-pattern": "url('/grid.svg')",
      }
    },
  },
  plugins: [],
};
export default config;

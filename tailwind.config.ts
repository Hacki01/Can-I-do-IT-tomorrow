import type { Config } from "tailwindcss";

import { nextui } from "@nextui-org/theme";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        bg: "var(--background)",
        elementBg: "var(--elementBg)",
        textGray: "var(--textGray)",
      },
    },
  },
  darkMode: "class",
  plugins: [nextui({
    addCommonColors: true,
    themes: {
      light: {
        colors: {
          background: "#FFFFFF",
          foreground: "#11181C",
          primary: {
            foreground: "#FFFFFF",
            DEFAULT: "#005bc4",
          },
          secondary: {
            foreground: "#FFFFFF",
            DEFAULT: "#7828C8",
          },
          warning: {
            foreground: "#FFFFFF",
            DEFAULT: "#F5A524",
          },
          default: {
            foreground: "#FFFFFF",
            DEFAULT: "#A1A1AA",
          },
          success: {
            foreground: "#FFFFFF",
            DEFAULT: "#45D483",
          },
        },
      },
    }
  })]
};
export default config;

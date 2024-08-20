import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    colors: ({ colors }) => {
      const newColors = {
        ...colors,
        'shareware-blue': '#2CC8D3',
        'shareware-purple': '#8A2CD3',
        'shareware-red': '#D3372C',
        'shareware-green': '#75D32C'
      } as any;

      // These colors are deprecated, and as a result need to be deleted to prevent warnings from appearing.
      delete newColors.lightBlue;
      delete newColors.warmGray;
      delete newColors.trueGray;
      delete newColors.coolGray;
      delete newColors.blueGray;

      return newColors;
    },
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      maxHeight: {
        "1/2": "50%"
      }
    },
  },
  plugins: [],
};
export default config;

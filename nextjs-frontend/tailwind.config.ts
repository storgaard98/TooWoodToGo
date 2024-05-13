import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "stark-orange": "#F5821E",
        "stark-blue": "#01346B",
        "input-box-blue":  "#001E3E",
        "product-blue": "#D9E1E9",
        "upload-grey": "#657383",
      },
      borderRadius: {
        "3px": "3px",
        "45px": "45px",
        "70px": "70px",
      },

      height:{
        "16/17": "94.118%",
        "600px": "600px",
      },

      padding:{
        "205px": "205px",
        "500px": "500px",
        "2080px": "2080px",
        "2528px": "2528px",
        "3px": "3px",
        "45px": "45px",
        "70px": "70px",
      },

      height:{
        "16/17": "94.118%",
        "600px": "600px",
      },

      padding:{
        "205px": "205px",
        "500px": "500px",
        "2080px": "2080px",
        "2528px": "2528px",
      },

      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [require("daisyui")],
};
export default config;

import type { Config } from "tailwindcss";

const config: Config = {
  mode: "jit",
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
        "input-box-blue": "#001E3E",
        "product-blue": "#D9E1E9",
        "upload-grey": "#657383",
        "cross-red": "#F00",
        "accept-blue": "#0CD1FD",
        "product-box-blue": "#D9D9D9",

      },
      borderRadius: {
        "3px": "3px",
        "45px": "45px",
        "70px": "70px",
      },

      height: {
        "16/17": "94.118%",
        "600px": "600px",
        "57%": "57%",
      },
      width:{
        "4%":"100%",
      },

      padding: {
        "205px": "205px",
        "500px": "500px",
        "2080px": "2080px",
        "2528px": "2528px",
        "3px": "3px",
        "45px": "45px",
        "70px": "70px",
        "5%": "5%",
        "20%": "20%",
        "custom": "0.25rem",
      },
      rotate: {
        "180deg": "180deg",
      },


      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },

      boxShadow: {
        "product-box": "4px 4px 4px 0px rgba(0, 0, 0, 0.25)",
      },
    },
  },
  plugins: [require("daisyui")],
};
export default config;

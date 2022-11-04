import plugin from "tailwindcss/plugin.js";
import colors from "tailwindcss/colors.js";
import forms from "@tailwindcss/forms";
export default {
  content: ["./index.html", "./src/**/*.{svelte,js,ts}"],

  theme: {
    extend: {
      colors: {
        dark: {
         
          300: "#3b3c3f",
  
        },
        light: {
          300: "#ef663a",
        },

        custom: {
          whatsapp: "#1db656",
          telegram: "#37aee2",
        },
       
      },
      fontFamily: {
        titillium: "var(--font-family)",
      },
    },
  },

  

  plugins: [
    forms
  ],
};

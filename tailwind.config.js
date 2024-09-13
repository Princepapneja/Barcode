/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "primary": "#0f2257",
        "primary-cta": "#1F5FFF",
        "primary-foreground": "white",
        "primary-light": "#f5f8fd",
        "secondary-light": "#f6f1eb",
        // "secondary": "",
        "tertiary-light": "#E8CACE",
        "tertiary": "#ecb035",
        "fourth": "#117FAA",
        "text": "black",
        "desc": "#7e7e7e",
        "background": "#f2f2f3",
        "border": "#ecf3fa",
        "body-background":"#788094",
        "title":"#000D44",
        "smoke":"#F5F7FA",
        "success":"#04CE78",
        "warn":"#FF5F15",
        "danger":"#ff0505",
      },
      fontFamily: {
        "lexend": ['Lexend', 'sans-serif']
      },
      backgroundImage: {
        "custom-gradient": "linear-gradient(180deg, #1F5FFF 37.5%, #E3EBFF 100%)",
        "success-gradient": "linear-gradient(180deg, #04CE78 37.5%, #DDFFF1 100%)",
        "light-gradient": "linear-gradient(180deg, #C2D4FF 37.5%, #F0F4FF 100%)",
        "danger-gradient": "linear-gradient(180deg, #ff0505 37.5%, #FFCCCB 100%)",
        "primary-before": "linear-gradient(180deg, #A3BDFF 0%, rgba(155, 184, 255, 0) 58.65%)",
        "success-before": "linear-gradient(180deg, #A9FFDA 0%, rgba(169, 255, 218, 0) 78.65%)",
        "light-before": "linear-gradient(180deg, #F9FAFD 0%, rgba(249, 250, 253, 0) 78.65%)",
        "danger-before": "linear-gradient(180deg, #F9FAFD 0%, rgba(234, 232, 232, 0) 58.65%)",
      },
      boxShadow: {
        "custom-primary": "0px 3px 15px #B0BAD3",
        "custom-success": "0px 3px 15px #aed3c3b3",
        "custom-light": "0px 2px 10px rgba(184, 191, 208, 0.5)",
        "custom-danger": "0px 3px 15px rgba(114, 3, 12, 0.5)",
        "card": "0px 4px 20px rgba(0,0,0,0.04)",
        "card-2": "0px 10px 50px rgba(2, 29, 53, 0.06)",
      },
    },
  },
  plugins: [],
}

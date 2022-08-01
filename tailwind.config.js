const pxToRem = (px, oneRemPx = 16) => `${px / oneRemPx}rem`;

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./src/**/**/*.{js,jsx,ts,tsx}"],
  theme: {
    fontSize: {
      xxxs: pxToRem(10), //10
      xxs: pxToRem(11), //11
      xs: pxToRem(12), //12
      sm: pxToRem(13), //13
      base: pxToRem(13.5), //13.5
      lg: pxToRem(14), //14
      xl: pxToRem(16), //16
      "2xl": pxToRem(18), //18
      "3xl": pxToRem(24), //24
    },
    extend: {
      colors: {
        primary: "rgba(var(--primary), 1)",
        secondary: "rgba(var(--secondary), 1)",
        success: "rgba(var(--success), 1)",
        successHighlight: "rgba(var(--success), 0.1)",
        failure: "rgba(var(--failure), 1)",
        failureHighlight: "rgba(var(--failure), 0.1)",
        blue: "rgba(var(--blue), 1)",
        blueHighlight: "rgba(var(--blue), 0.1)",
        neutral: "rgba(var(--neutral), 1)",
        border: "rgba(var(--border), 1)",
      },
    },
  },
  plugins: [],
};

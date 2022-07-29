/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./src/**/**/*.{js,jsx,ts,tsx}"],
  theme: {
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
      fontSize: {
        sm: ["13px", "20px"],
        md: ["14px", "20px"],
      },
    },
  },
  plugins: [],
};

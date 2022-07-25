/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./src/**/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "var(--primary)",
        secondary: "var(--secondary)",
        success: "var(--success)",
        failure: "var(--failure)",
        highlight: "rgba(var(--highlight), 0.1)",
        highlightText: "rgba(var(--highlight), 1)",
        neutral: "var(--neutral)",
        border: "var(--border)",
      },
      fontSize: {
        sm: ["13px", "20px"],
        md: ["14px", "20px"],
      },
    },
  },
  plugins: [],
};

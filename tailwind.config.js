/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}",   // bạn đang dùng /src
    "./app/**/*.{js,ts,jsx,tsx}",   // nếu có App Router
  ],
  theme: {
    extend: {
      colors: {
        bg: "#e3dec5",
        card: "#11182a",
        text: "#e5e7eb",
        muted: "#94a3b8",
        accent: "#22c55e",
      },
      borderRadius: {
        xl: "1rem",    // giống card
        lg: "0.75rem", // giống button
      },
    },
  },
  plugins: [],
};

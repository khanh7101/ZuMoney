/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}",   // bạn đang dùng /src
    "./app/**/*.{js,ts,jsx,tsx}",   // nếu có App Router
  ],
  theme: { extend: {} },
  plugins: [],
};

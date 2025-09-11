/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}", // nếu bạn còn component trong /src
  ],
  theme: { extend: {} },
  plugins: [],
};

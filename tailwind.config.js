/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // ← rất quan trọng để Tailwind quét đúng file
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

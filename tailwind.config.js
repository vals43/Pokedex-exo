// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // Scanne tous les fichiers JS, TS, JSX, TSX dans le dossier src et ses sous-dossiers
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
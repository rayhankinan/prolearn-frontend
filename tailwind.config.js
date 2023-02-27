/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'blackbutton' : "#3C3C43",
        'greytext' : "#666666",
    },
  },
  plugins: [],
}
};

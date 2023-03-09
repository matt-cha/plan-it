/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./**/**.{html,js,jsx}'],
  theme: {
    extend: {
      colors: {
        brightRed: 'hsl(12, 88%, 59%)',
        overlay: 'rgba(65, 65, 65, 0.55)',
        beigeRosh: '#f2dec8'
      },
      backgroundImage: {
        wedding: "url('../images/checklist.webp')"
      },
      fontFamily: {
        lato: "'Lato', serif",
        smokum: "'Smokum', serif"

      }
    }
  },
  plugins: []
};

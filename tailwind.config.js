/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./**/**.{html,js,jsx}'],
  theme: {
   /*  screens: {
      sm: '320px',
      md: '480px ',
      lg: '770px ',
      xl: '1025px ',
      xxl: '1200px'
    }, */
    extend: {
      colors: {
        brightRed: 'hsl(12, 88%, 59%)',
        overlay: 'rgba(65, 65, 65, 0.55)'
      },
      backgroundImage: {
        wedding: "url('../images/checklist.webp')"
      }
    }
  },
  plugins: []
};

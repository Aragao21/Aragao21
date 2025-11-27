/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        flux: {
          red: '#ED1C24',
          dark: '#111111',
          gray: '#5A5A5A'
        }
      }
    }
  },
  plugins: []
};

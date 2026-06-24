/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#070707',
        surface: '#111214',
        accent: '#E11D2E',
        text: '#F8FAFC',
        muted: '#A1A1AA',
        line: '#242424',
      },
      fontFamily: {
        display: ['Impact', 'Haettenschweiler', '"Arial Narrow"', 'sans-serif'],
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'Segoe UI', 'sans-serif'],
      },
      boxShadow: {
        clean: '0 18px 45px rgba(0, 0, 0, 0.28)',
      },
    },
  },
  plugins: [],
};

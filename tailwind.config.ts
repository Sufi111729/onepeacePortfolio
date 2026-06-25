import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './data/**/*.{ts,tsx}', './lib/**/*.{ts,tsx}'],
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

export default config;

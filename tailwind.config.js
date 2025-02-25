// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        surface: {
          50: '#f9fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          800: '#1e293b',
          900: '#0f172a',
          950: '#020617',
        },
        primary: {
          50: '#ebf4ff',
          100: '#cee3fe',
          500: '#3a6ff8',
          600: '#2552e6',
          700: '#1e40af',
          900: '#172554',
        },
        accent: {
          300: '#7eeafc',
          400: '#38d9f8',
          500: '#0ac5e4',
          600: '#0687a8',
        },
        success: {
          400: '#4ade80',
          500: '#22c55e',
          600: '#16a34a',
        },
        warning: {
          400: '#fbc218',
          500: '#f59e0b',
          600: '#d97706',
        },
        danger: {
          400: '#fb7185',
          500: '#f43f5e',
          600: '#e11d48',
        },
        gold: {
          100: '#f8f0d7',
          200: '#f5dcab',
          300: '#f7d986',
          400: '#f7cb61',
        },
      },
      boxShadow: {
        'card': '0 4px 20px rgba(0, 0, 0, 0.08)',
        'card-hover': '0 10px 40px rgba(0, 0, 0, 0.12)',
        'card-dark': '0 4px 20px rgba(0, 0, 0, 0.3)',
        'card-dark-hover': '0 10px 40px rgba(0, 0, 0, 0.5)',
      },
    },
  },
  plugins: [],
}
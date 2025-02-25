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
        // Main background colors
        background: {
          dark: '#0F1116',
          card: '#181A22',
          light: '#FFFFFF'
        },
        // Primary brand colors
        primary: {
          50: '#F3EFFB',
          100: '#E9E1F8',
          200: '#D5C4F1',
          300: '#BEA2EA',
          400: '#A27EE3',
          500: '#8B5CF6', // Main purple
          600: '#6D48D7',
          700: '#5336B3',
          800: '#3C278F',
          900: '#281C6B',
        },
        // Secondary accent colors
        secondary: {
          50: '#ECFEFF',
          100: '#D8FDFF',
          200: '#B6F8FF',
          300: '#8AEEFF',
          400: '#36DFFF',
          500: '#06B6D4', // Main cyan
          600: '#0892B3',
          700: '#066F8E',
          800: '#045169',
          900: '#032C3A',
        },
        // Additional accent colors
        accent: {
          blue: {
            500: '#3B82F6',
          },
          teal: {
            500: '#14B8A6',
          },
          green: {
            500: '#10B981',
          },
          rose: {
            500: '#F43F5E',
          }
        },
        // UI elements
        surface: {
          dark: {
            DEFAULT: 'rgba(24, 26, 34, 0.6)',
            hover: 'rgba(32, 35, 45, 0.6)',
            active: 'rgba(40, 43, 54, 0.6)',
            border: 'rgba(55, 59, 69, 0.5)',
          },
          light: {
            DEFAULT: '#FFFFFF',
            hover: '#F9FAFB',
            active: '#F3F4F6',
            border: '#E5E7EB',
          }
        },
        // Text colors
        text: {
          dark: {
            primary: '#FFFFFF',
            secondary: '#A1A1AA',
            tertiary: '#71717A',
            inverse: '#111827',
          },
          light: {
            primary: '#111827',
            secondary: '#4B5563',
            tertiary: '#6B7280',
            inverse: '#FFFFFF',
          }
        }
      },
      boxShadow: {
        'glow-sm': '0 0 8px rgba(139, 92, 246, 0.3)',
        'glow-md': '0 0 16px rgba(139, 92, 246, 0.3)',
        'glow-lg': '0 0 24px rgba(139, 92, 246, 0.3)',
        'glow-xl': '0 0 32px rgba(139, 92, 246, 0.3)',
        'glow-cyan-sm': '0 0 8px rgba(6, 182, 212, 0.3)',
        'glow-cyan-md': '0 0 16px rgba(6, 182, 212, 0.3)',
        'card-dark': '0 8px 16px rgba(0, 0, 0, 0.2)',
        'card-light': '0 4px 12px rgba(0, 0, 0, 0.08)'
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-glow': 'linear-gradient(180deg, rgba(139, 92, 246, 0.15) 0%, rgba(6, 182, 212, 0.15) 100%)',
        'gradient-primary': 'linear-gradient(90deg, #8B5CF6 0%, #06B6D4 100%)'
      },
      backdropBlur: {
        xs: '2px',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'float': 'float 3s ease-in-out infinite',
      },
      keyframes: {
        glow: {
          '0%': { opacity: 0.5 },
          '100%': { opacity: 1 },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
    },
  },
  plugins: [],
}
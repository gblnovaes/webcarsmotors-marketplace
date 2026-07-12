/** @type {import('tailwindcss').Config} */
// Carriage design system — tokens mapped to Tailwind theme.
// Swap the accent preset in src/index.css (:root) to re-theme the whole product.
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        neutral: {
          0: '#FFFFFF',
          50: '#F7F8FA',
          100: '#EEF0F4',
          200: '#E1E4EA',
          300: '#CBD0D9',
          400: '#8A94A3',
          500: '#5A6472',
          600: '#414A57',
          700: '#2A313B',
          800: '#1A1F27',
          900: '#0F1419',
        },
        accent: {
          50: 'var(--accent-50)',
          100: 'var(--accent-100)',
          400: 'var(--accent-400)',
          500: 'var(--accent-500)',
          600: 'var(--accent-600)',
          700: 'var(--accent-700)',
        },
        // Semantic tokens
        primary: 'var(--accent-600)',
        'primary-hover': 'var(--accent-700)',
        'accent-soft': 'var(--accent-50)',
        success: '#15803D',
        warning: '#B45309',
        error: '#DC2626',
      },
      fontFamily: {
        sans: ['Inter', 'Söhne', 'Helvetica Neue', 'Arial', 'sans-serif'],
      },
      fontSize: {
        display: ['48px', { lineHeight: '52px', fontWeight: '700', letterSpacing: '-0.02em' }],
        h1: ['34px', { lineHeight: '40px', fontWeight: '700', letterSpacing: '-0.015em' }],
        h2: ['26px', { lineHeight: '32px', fontWeight: '600', letterSpacing: '-0.01em' }],
        h3: ['20px', { lineHeight: '28px', fontWeight: '600', letterSpacing: '-0.005em' }],
        'body-l': ['17px', { lineHeight: '26px', fontWeight: '400' }],
        body: ['15px', { lineHeight: '24px', fontWeight: '400' }],
        label: ['13px', { lineHeight: '18px', fontWeight: '500', letterSpacing: '0.01em' }],
        caption: ['12px', { lineHeight: '16px', fontWeight: '500', letterSpacing: '0.02em' }],
        overline: ['11px', { lineHeight: '14px', fontWeight: '600', letterSpacing: '0.08em' }],
      },
      spacing: {
        1: '4px',
        2: '8px',
        3: '12px',
        4: '16px',
        6: '24px',
        8: '32px',
        12: '48px',
        16: '64px',
        24: '96px',
      },
      maxWidth: {
        content: '1200px',
      },
      borderRadius: {
        sm: '6px',
        md: '10px',
        lg: '16px',
        pill: '999px',
      },
      boxShadow: {
        sm: '0 1px 2px rgba(15,20,25,.06)',
        md: '0 4px 12px rgba(15,20,25,.08)',
        lg: '0 12px 32px rgba(15,20,25,.12)',
      },
      ringWidth: {
        DEFAULT: '2px',
      },
    },
  },
  plugins: [],
}

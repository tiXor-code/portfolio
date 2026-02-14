/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['Commissioner', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
        'serif': ['Fraunces', 'Charter', 'Georgia', 'serif'],
        'display': ['Fraunces', 'Charter', 'Georgia', 'serif'],
      },
      colors: {
        // Editorial color system - cream, black, red accents
        'editorial': {
          'cream': '#FEFEFE',
          'paper': '#FCFCFC', 
          'light-gray': '#F5F5F5',
          'gray': '#E5E5E5',
          'dark-gray': '#A3A3A3',
          'charcoal': '#525252',
          'near-black': '#1A1A1A',
          'black': '#0A0A0A',
          'red': '#DC2626',
          'red-hover': '#B91C1C',
          'red-light': '#FEE2E2',
        },
        // Semantic color tokens
        'bg': {
          'primary': '#FEFEFE',
          'secondary': '#FCFCFC',
          'tertiary': '#F5F5F5',
          'elevated': '#FFFFFF',
        },
        'text': {
          'primary': '#1A1A1A',
          'secondary': '#525252',
          'tertiary': '#A3A3A3',
          'inverse': '#FEFEFE',
        },
        'accent': {
          'primary': '#DC2626',
          'primary-hover': '#B91C1C',
          'light': '#FEE2E2',
        },
        'border': {
          'subtle': '#E5E5E5',
          'strong': '#A3A3A3',
        },
      },
      fontSize: {
        // Editorial typography scale
        'hero': ['clamp(4rem, 12vw, 8rem)', { lineHeight: '0.85', letterSpacing: '-0.04em' }],
        'display': ['clamp(2.75rem, 8vw, 5rem)', { lineHeight: '0.9', letterSpacing: '-0.03em' }],
        'headline': ['clamp(2rem, 5vw, 3.5rem)', { lineHeight: '1.0', letterSpacing: '-0.02em' }],
        'title': ['clamp(1.5rem, 3vw, 2.25rem)', { lineHeight: '1.1', letterSpacing: '-0.015em' }],
        'subtitle': ['clamp(1.125rem, 2vw, 1.375rem)', { lineHeight: '1.3', letterSpacing: '-0.01em' }],
        'body': ['1.0625rem', { lineHeight: '1.65' }], // 17px
        'body-sm': ['1rem', { lineHeight: '1.6' }], // 16px
        'caption': ['0.9375rem', { lineHeight: '1.5' }], // 15px
        'small': ['0.875rem', { lineHeight: '1.4' }], // 14px
        'xs': ['0.8125rem', { lineHeight: '1.4' }], // 13px
      },
      maxWidth: {
        'content': '1440px', // Magazine-wide layout
        'prose': '68ch', // Optimal reading width
        'narrow': '580px', // Single column content
      },
      spacing: {
        'section': 'clamp(4rem, 10vh, 8rem)',
        'section-sm': 'clamp(3rem, 8vh, 6rem)',
        '18': '4.5rem',
        '22': '5.5rem', 
        '28': '7rem',
        '32': '8rem',
        '36': '9rem',
        '40': '10rem',
      },
      animation: {
        'fade-in': 'fadeIn 0.8s ease-out forwards',
        'fade-in-up': 'fadeInUp 1s ease-out forwards',
        'fade-in-down': 'fadeInDown 1s ease-out forwards',
        'slide-in-left': 'slideInLeft 1s ease-out forwards',
        'slide-in-right': 'slideInRight 1s ease-out forwards',
        'scale-in': 'scaleIn 0.8s ease-out forwards',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(40px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeInDown: {
          '0%': { opacity: '0', transform: 'translateY(-40px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideInLeft: {
          '0%': { opacity: '0', transform: 'translateX(-60px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        slideInRight: {
          '0%': { opacity: '0', transform: 'translateX(60px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.9)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
      },
      transitionDuration: {
        '400': '400ms',
        '600': '600ms',
        '800': '800ms',
        '1000': '1000ms',
      },
      screens: {
        'xs': '475px',
        '3xl': '1680px',
      },
      gridTemplateColumns: {
        // Magazine-style grid layouts
        'magazine': 'repeat(12, minmax(0, 1fr))',
        'editorial': '1fr 2fr 1fr',
        'asymmetric': '2fr 3fr',
      },
      aspectRatio: {
        'editorial': '4 / 3',
        'landscape': '3 / 2',
        'portrait': '3 / 4',
      },
    },
  },
  plugins: [],
}
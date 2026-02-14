/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['Satoshi', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
        'display': ['Clash Display', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
        'mono': ['JetBrains Mono', 'Consolas', 'Monaco', 'monospace'],
      },
      colors: {
        'bg-primary': '#0A0A0A',
        'bg-secondary': '#1A1A1A',
        'text-primary': '#FAFAFA',
        'text-secondary': '#A1A1A1',
        'text-tertiary': '#6B6B6B',
        'accent-primary': '#FF7A5F', // Warm coral
        'accent-primary-hover': '#FF6347',
        'accent-warm': '#FFB347', // Warm orange
        'accent-blue': '#4A9EFF', // Softer blue
        'accent-blue-hover': '#0052CC',
        'surface-elevated': '#1A1A1A',
        'surface-elevated-hover': '#2A2A2A',
        'border-subtle': '#2A2A2A',
        'border-strong': '#404040',
      },
      fontSize: {
        'hero': ['clamp(3.5rem, 10vw, 7rem)', { lineHeight: '0.85', letterSpacing: '-0.03em' }],
        'display': ['clamp(2.5rem, 6vw, 4rem)', { lineHeight: '1.0', letterSpacing: '-0.02em' }],
        'title': ['clamp(1.75rem, 4vw, 2.75rem)', { lineHeight: '1.1', letterSpacing: '-0.015em' }],
        'subtitle': ['clamp(1.25rem, 2.5vw, 1.5rem)', { lineHeight: '1.3', letterSpacing: '-0.01em' }],
        'body': ['1.125rem', { lineHeight: '1.7' }],
        'body-sm': ['1rem', { lineHeight: '1.6' }],
        'small': ['0.875rem', { lineHeight: '1.5' }],
        'xs': ['0.75rem', { lineHeight: '1.4' }],
      },
      maxWidth: {
        'content': '1200px',
        'prose': '65ch',
      },
      spacing: {
        'section': 'clamp(5rem, 12vh, 10rem)',
        '18': '4.5rem',
        '22': '5.5rem',
        '28': '7rem',
        '32': '8rem',
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out',
        'fade-in-up': 'fadeInUp 0.8s ease-out',
        'fade-in-down': 'fadeInDown 0.8s ease-out',
        'scale-in': 'scaleIn 0.6s ease-out',
        'slide-left': 'slideLeft 0.6s ease-out',
        'slide-right': 'slideRight 0.6s ease-out',
        'grain': 'grain 20s linear infinite',
        'scroll-pulse': 'scroll-pulse 2s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeInDown: {
          '0%': { opacity: '0', transform: 'translateY(-30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        slideLeft: {
          '0%': { opacity: '0', transform: 'translateX(50px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        slideRight: {
          '0%': { opacity: '0', transform: 'translateX(-50px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        grain: {
          '0%, 100%': { transform: 'translate(0, 0)' },
          '10%': { transform: 'translate(-5%, -10%)' },
          '20%': { transform: 'translate(-15%, 5%)' },
          '30%': { transform: 'translate(7%, -25%)' },
          '40%': { transform: 'translate(-5%, 25%)' },
          '50%': { transform: 'translate(-15%, 10%)' },
          '60%': { transform: 'translate(15%, 0%)' },
          '70%': { transform: 'translate(0%, 15%)' },
          '80%': { transform: 'translate(3%, 35%)' },
          '90%': { transform: 'translate(-10%, 10%)' },
        },
        'scroll-pulse': {
          '0%, 100%': { transform: 'translateY(-100%)', opacity: '0' },
          '50%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
      transitionDuration: {
        '600': '600ms',
        '800': '800ms',
      },
      backdropBlur: {
        'subtle': '12px',
      },
      screens: {
        'xs': '475px',
      },
    },
  },
  plugins: [],
}
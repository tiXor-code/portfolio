/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Satoshi', 'system-ui', '-apple-system', 'Segoe UI', 'sans-serif'],
        display: ['Clash Display', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['JetBrains Mono', 'ui-monospace', 'Menlo', 'monospace'],
      },
      colors: {
        base: '#08080B',
        panel: '#0F0F14',
        'panel-2': '#15151C',
        elevated: '#1C1C24',
        line: '#22222C',
        'line-strong': '#33333F',
        ink: '#ECECEF',
        'ink-dim': '#9A9AA6',
        'ink-faint': '#5E5E6B',
        signal: '#5BE8A4',
        'signal-dim': '#2E7355',
        warm: '#F2B441',
        cold: '#6E8FD0',
      },
      maxWidth: { shell: '1180px' },
      fontSize: {
        mega: ['clamp(2.9rem, 8vw, 6.2rem)', { lineHeight: '0.95', letterSpacing: '-0.035em' }],
        big: ['clamp(2rem, 4.5vw, 3.4rem)', { lineHeight: '1.02', letterSpacing: '-0.025em' }],
        mid: ['clamp(1.4rem, 2.6vw, 2rem)', { lineHeight: '1.12', letterSpacing: '-0.018em' }],
      },
      keyframes: {
        blink: { '0%,100%': { opacity: '1' }, '50%': { opacity: '0.15' } },
        sweep: { '0%': { transform: 'translateX(-100%)' }, '100%': { transform: 'translateX(220%)' } },
      },
      animation: {
        blink: 'blink 1.1s steps(1) infinite',
        sweep: 'sweep 1.4s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Space Grotesk', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'ui-monospace', 'monospace'],
      },
      colors: {
        base: '#050506',
        panel: '#0C0C10',
        'panel-2': '#121218',
        elevated: '#181820',
        ink: '#F4F2EC',
        'ink-dim': 'rgba(244,242,236,0.60)',
        'ink-faint': 'rgba(244,242,236,0.34)',
        line: 'rgba(244,242,236,0.10)',
        'line-2': 'rgba(244,242,236,0.20)',
        accent: '#F07A48',
        'accent-dim': '#7a3d24',
        hot: '#6FE3C2',
        warm: '#F2B441',
        cold: '#8A93B5',
      },
      maxWidth: { shell: '1280px' },
      fontSize: {
        mega: ['clamp(3rem,8.4vw,8.6rem)', { lineHeight: '0.98', letterSpacing: '-0.035em' }],
        big: ['clamp(2.2rem,5vw,4rem)', { lineHeight: '1.0', letterSpacing: '-0.03em' }],
        mid: ['clamp(1.5rem,2.8vw,2.2rem)', { lineHeight: '1.12', letterSpacing: '-0.02em' }],
      },
      keyframes: {
        blink: { '0%,100%': { opacity: '1' }, '50%': { opacity: '0.2' } },
        sweep: { '0%': { transform: 'translateX(-100%)' }, '100%': { transform: 'translateX(260%)' } },
        wipe: { '0%': { transform: 'translateX(-100%)' }, '60%,100%': { transform: 'translateX(120%)' } },
      },
      animation: {
        blink: 'blink 1.1s steps(1) infinite',
        sweep: 'sweep 1.5s ease-in-out infinite',
        wipe: 'wipe 2s ease infinite',
      },
    },
  },
  plugins: [],
}

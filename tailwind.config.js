/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // Theme-aware surfaces — driven by CSS variables so the dark/light
        // toggle swaps every surface at once (see src/index.css).
        base: {
          0: 'rgb(var(--bg-0) / <alpha-value>)',
          1: 'rgb(var(--bg-1) / <alpha-value>)',
          2: 'rgb(var(--bg-2) / <alpha-value>)',
          3: 'rgb(var(--bg-3) / <alpha-value>)',
        },
        ink: {
          hi: 'rgb(var(--text-hi) / <alpha-value>)',
          mid: 'rgb(var(--text-mid) / <alpha-value>)',
          low: 'rgb(var(--text-low) / <alpha-value>)',
        },
        line: 'rgb(var(--line) / <alpha-value>)',
        // Fixed neon accents — identical in both themes so brand stays constant.
        neon: {
          blue: '#3d7bff',
          cyan: '#22d3ee',
          violet: '#8b5cf6',
          purple: '#b14aed',
        },
      },
      fontFamily: {
        sans: ['Sora', 'Inter', 'system-ui', '-apple-system', 'Segoe UI', 'sans-serif'],
        display: ['Sora', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
      },
      fontSize: {
        'display-sm': ['clamp(2.1rem, 7vw, 3.2rem)', { lineHeight: '1.05', letterSpacing: '-0.03em' }],
        'display-md': ['clamp(2.6rem, 8.5vw, 5rem)', { lineHeight: '1.02', letterSpacing: '-0.035em' }],
        'display-lg': ['clamp(3rem, 11vw, 7.5rem)', { lineHeight: '0.95', letterSpacing: '-0.045em' }],
      },
      maxWidth: {
        shell: '1200px',
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.75rem',
      },
      boxShadow: {
        glass: '0 24px 60px -20px rgba(4, 6, 15, 0.75), inset 0 1px 0 0 rgb(var(--glass-hi) / 0.55)',
        'neu-out': 'var(--neu-out)',
        'neu-in': 'var(--neu-in)',
        'glow-blue': '0 0 0 1px rgba(61, 123, 255, 0.35), 0 12px 44px -12px rgba(61, 123, 255, 0.6)',
        'glow-violet': '0 0 0 1px rgba(139, 92, 246, 0.35), 0 12px 44px -12px rgba(139, 92, 246, 0.6)',
        'glow-cyan': '0 0 0 1px rgba(34, 211, 238, 0.35), 0 12px 44px -12px rgba(34, 211, 238, 0.55)',
      },
      backgroundImage: {
        'grad-brand': 'linear-gradient(110deg, #3d7bff 0%, #22d3ee 38%, #8b5cf6 72%, #b14aed 100%)',
        'grad-silver': 'linear-gradient(120deg, #ffffff 0%, #cbd5e1 45%, #94a3b8 100%)',
        'grid-fine':
          'linear-gradient(rgb(var(--line) / 0.55) 1px, transparent 1px), linear-gradient(90deg, rgb(var(--line) / 0.55) 1px, transparent 1px)',
        noise:
          "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3'/%3E%3C/filter%3E%3Crect width='140' height='140' filter='url(%23n)' opacity='0.42'/%3E%3C/svg%3E\")",
      },
      backgroundSize: {
        'grid-fine': '56px 56px',
      },
      transitionTimingFunction: {
        smooth: 'cubic-bezier(0.22, 1, 0.36, 1)',
        snap: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
      },
      keyframes: {
        'aurora-drift': {
          '0%,100%': { transform: 'translate3d(0,0,0) scale(1)' },
          '33%': { transform: 'translate3d(6%,-4%,0) scale(1.12)' },
          '66%': { transform: 'translate3d(-5%,5%,0) scale(0.94)' },
        },
        'gradient-pan': {
          '0%,100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        float: {
          '0%,100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        'pulse-ring': {
          '0%': { transform: 'scale(0.85)', opacity: '0.7' },
          '70%': { transform: 'scale(1.6)', opacity: '0' },
          '100%': { transform: 'scale(1.6)', opacity: '0' },
        },
        caret: {
          '0%,49%': { opacity: '1' },
          '50%,100%': { opacity: '0' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'spin-slow': {
          to: { transform: 'rotate(360deg)' },
        },
        'sheen-sweep': {
          '0%': { transform: 'translateX(-120%) skewX(-18deg)' },
          '100%': { transform: 'translateX(320%) skewX(-18deg)' },
        },
      },
      animation: {
        'aurora-drift': 'aurora-drift 24s ease-in-out infinite',
        'gradient-pan': 'gradient-pan 7s ease-in-out infinite',
        float: 'float 6s ease-in-out infinite',
        'pulse-ring': 'pulse-ring 2.6s cubic-bezier(0.22,1,0.36,1) infinite',
        caret: 'caret 1s step-end infinite',
        marquee: 'marquee 32s linear infinite',
        'spin-slow': 'spin-slow 22s linear infinite',
        'sheen-sweep': 'sheen-sweep 1.1s cubic-bezier(0.22,1,0.36,1)',
      },
    },
  },
  plugins: [],
}

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        cyber: {
          bg: '#040704',
          card: '#080d08',
          border: '#143314',
          green: '#22c55e',
          lightGreen: '#86efac',
          dimGreen: '#166534',
          amber: '#f59e0b',
          red: '#ef4444',
          cyan: '#06b6d4',
          scanline: 'rgba(34, 197, 94, 0.04)',
        }
      },
      fontFamily: {
        mono: [
          'JetBrains Mono',
          'Share Tech Mono',
          'Courier New',
          'monospace'
        ]
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glitch': 'glitch 0.3s ease-in-out',
      },
      keyframes: {
        glitch: {
          '0%, 100%': { transform: 'translate(0)' },
          '20%': { transform: 'translate(-2px, 2px)' },
          '40%': { transform: 'translate(-2px, -2px)' },
          '60%': { transform: 'translate(2px, 2px)' },
          '80%': { transform: 'translate(2px, -2px)' },
        }
      }
    },
  },
  plugins: [],
}

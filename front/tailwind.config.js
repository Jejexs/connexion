/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        pulse: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        pulse: {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0.5 },
        },
        backgroundImage: {
          'cs2': "url('/img/bg-cs.png')",
          'dota2': "url('/img/bg-dota2.png')",
          'lol': "url('/img/bg-lol.png')",
        },
      },
    },
  },
  plugins: [],
}

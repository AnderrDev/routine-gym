/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'gym-dark': '#0a0a0a',
        'gym-card': '#1a1a1a',
        'gym-accent': '#ff4444',
        'gym-accent-secondary': '#ff6b35',
        'gym-text': '#ffffff',
        'gym-text-secondary': '#a0a0a0',
        'gym-border': '#2a2a2a',
      },
    },
  },
  plugins: [],
}


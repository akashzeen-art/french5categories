/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#080710",
        cooking: {
          light: "#FFF8EE",
          dark: "#1C140A",
          gold: "#D4AF37",
          accent: "#FF4500",
        },
        comedy: {
          dark: "#0F1A15",
          lime: "#A3E635",
          emerald: "#10B981",
        },
        cartoon: {
          sky: "#E0F2FE",
          pink: "#FBCFE8",
          purple: "#DDD6FE",
          primary: "#6366F1",
        },
        games: {
          cyan: "#00F0FF",
          magenta: "#FF007F",
          dark: "#05050A",
          rgbBorder: "linear-gradient(90deg, #00f0ff, #ff007f, #00f0ff)",
        },
        fashion: {
          cream: "#FAF9F6",
          charcoal: "#1A1A1A",
          gold: "#C5A880",
        }
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        display: ["Outfit", "sans-serif"],
        serif: ["Playfair Display", "serif"],
      },
      animation: {
        'spin-slow': 'spin 12s linear infinite',
        'bounce-slow': 'bounce 3s infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'float-delayed': 'float 6s ease-in-out 3s infinite',
        'marquee': 'marquee 30s linear infinite',
        'glitch': 'glitch 1s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-100%)' },
        },
        glitch: {
          '0%, 100%': { transform: 'translate(0)' },
          '20%': { transform: 'translate(-2px, 2px)' },
          '40%': { transform: 'translate(-2px, -2px)' },
          '60%': { transform: 'translate(2px, 2px)' },
          '80%': { transform: 'translate(2px, -2px)' },
        }
      },
      backdropBlur: {
        xs: "2px",
      }
    },
  },
  plugins: [],
}

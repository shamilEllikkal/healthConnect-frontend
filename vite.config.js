import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
   theme: {
    extend: {
     colors: {
        'teal-diagonal': 'linear-gradient(135deg, #14b8a6 0%, #0d9488 100%)',
        'teal-contrast': '#0d9488',
      },
       animation: {
        'float': 'float 3s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        }
      }
    },
  },
  plugins: [react(),  tailwindcss()],
  server:{
host : true,
port: 5173,
  }
})

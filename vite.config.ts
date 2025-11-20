import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  css: {
    devSourcemap: true, // Enable CSS source maps for easier debugging
  },
  plugins: [react(),tailwindcss(),],
})

// vite.config.js
// Tailwind v4 ships its own Vite plugin — no postcss.config or tailwind.config needed
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(), // ← handles Tailwind v4 automatically
  ],
})
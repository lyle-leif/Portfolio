import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// GitHub Pages serves from /<repo-name>/; Netlify serves from /.
export default defineConfig({
  base: process.env.BASE_PATH ?? '/',
  plugins: [react(), tailwindcss()],
  // The lazy-loaded 3D hero chunk is large by nature (three.js).
  build: { chunkSizeWarningLimit: 1000 },
})

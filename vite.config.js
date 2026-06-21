import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// Custom domain serves from site root (charliefatherdaygift.xyz)
// github.io project URL also works with base '/' when custom domain is configured
const pagesBase = '/'

// https://vite.dev/config/
export default defineConfig(({ mode }) => ({
  base: mode === 'pages' ? pagesBase : '/',
  plugins: [react(), tailwindcss()],
}))

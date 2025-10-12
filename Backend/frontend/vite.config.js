import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Include .docx files as static assets so they can be imported from src
  // Accept both glob and RegExp to ensure matching in different environments
  assetsInclude: ['**/*.docx', /\.docx$/],
  server: {
    proxy: {
      // Proxy API requests to backend during development
      '/api': 'http://localhost:3000'
    }
  }
})

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    host: true,
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
      },
    },
  },
  preview: {
    headers: {
      'Content-Security-Policy': [
        "default-src 'self'",
        "base-uri 'self'",
        "form-action 'self'",
        "frame-ancestors 'none'",
        "font-src 'self' https://r2cdn.perplexity.ai",
        "connect-src 'self' *",
        "style-src 'self' 'unsafe-inline'",
        "script-src 'self'",
        "img-src 'self' data: blob:",
        "media-src 'self'",
        "object-src 'none'",
        "frame-src 'self'",
        "worker-src 'self' blob:",
      ].join('; ')
    }
  }
})

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/wip3/',
  plugins: [react()],
  server: {
    port: 3000,
    host: 'localhost'
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor': ['react', 'react-dom'],
          'animations': ['framer-motion'],
          'router': ['react-router-dom']
        }
      }
    },
    chunkSizeWarningLimit: 700
  }
})
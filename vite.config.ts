import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    host: 'localhost'
  },
  build: {
    chunkSizeWarningLimit: 700,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('three')) {
              return 'vendor_three';
            }
            if (id.includes('@react-three/fiber')) {
              return 'vendor_react-three-fiber';
            }
            if (id.includes('framer-motion')) {
              return 'vendor_framer-motion';
            }
            if (id.includes('react-dom') || id.includes('react-reconciler') || id.includes('react')) {
              return 'vendor_react';
            }
            return 'vendor';
          }
        }
      }
    }
  }
})
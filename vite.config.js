import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: '/HTP_Test/',
  plugins: [react()],
  resolve: {
    alias: {
      '@': '/src'
    }
  },
  assetsInclude: ['**/*.PNG', '**/*.png'],
  build: {
    assetsInlineLimit: 0,
    rollupOptions: {
      output: {
        assetFileNames: 'assets/[name][extname]'
      }
    }
  }
})

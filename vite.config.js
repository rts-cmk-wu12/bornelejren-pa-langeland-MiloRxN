import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'
import Pages from "vite-plugin-pages";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), Pages()],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
      '@assets': resolve(__dirname, './src/assets'),
      '@data': resolve(__dirname, './src/data'),
      '@scss': resolve(__dirname, './src/scss'),
      '@components': resolve(__dirname, './src/components'),
      '@utils': resolve(__dirname, './src/utils'),
      '@pages': resolve(__dirname, './src/pages'),
      '@layout': resolve(__dirname, './src/layout'),
    }
  },
  server: {
    proxy: {
      '/api': 'http://localhost:3000'
    }
  }
})

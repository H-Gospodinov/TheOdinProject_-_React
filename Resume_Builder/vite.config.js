import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // custom entry points:
  root: 'src',
  build: {
    outDir: '../dist',
  }
})
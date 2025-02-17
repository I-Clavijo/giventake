import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dotenv from 'dotenv'

dotenv.config() // load env vars from .env

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    // expose env vars to the client
    'process.env': process.env
  },
  optimizeDeps: {
    needsInterop: ['sharp']
    // exclude: ['sharp']
  }
})

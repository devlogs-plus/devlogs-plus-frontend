import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'fs'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    https: {
      key: fs.readFileSync('C:/Certs/localhost+2-key.pem'),
      cert: fs.readFileSync('C:/Certs/localhost+2.pem'),
    },
    host: true,   // optional: makes server available on network addresses
    port: 5173,   // optional: set preferred port
  },
})
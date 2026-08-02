import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'fs'

export default defineConfig(({ command }) => ({
  plugins: [react()],
  server: command === 'serve'
    ? {
        https: {
          key: fs.readFileSync('C:/Certs/localhost+2-key.pem'),
          cert: fs.readFileSync('C:/Certs/localhost+2.pem'),
        },
        host: true,
        port: 5173,
      }
    : {},
}))

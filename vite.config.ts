import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { join } from 'path'
import mockServer from 'vite-plugin-mock-server'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    mockServer({
      logLevel: 'info'
    })
  ],
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
      }  
    }
  },
  resolve: {
    alias: [
      {
        find: '@',
        replacement: join(__dirname, "src")
      },
      {
        find: /^~/, 
        replacement: '',
      },
    ],
  },
})

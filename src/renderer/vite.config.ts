import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'node:path'

export default defineConfig({
  plugins: [vue()],
  base: './',
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
            @import "@/assets/css/_variables.scss";
            @import "@/assets/css/_resets.scss";
            @import "@/assets/css/_transitions.scss";
          `
      }
    }
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  preview: {
    host: true,
    cors: false,
    port: 5173
  }
})

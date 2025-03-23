import { defineConfig } from 'vitest/config'
import Vue from '@vitejs/plugin-vue'
import path from 'node:path'

export default defineConfig({
  plugins: [Vue()],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
            @import "@lib/assets/css/_fonts.scss";
            @import "@lib/assets/css/_helpers.scss";
            @import "@lib/assets/css/_mixins.scss";
            @import "@lib/assets/css/_resets.scss";
            @import "@lib/assets/css/_transitions.scss";
            @import "@lib/assets/css/_variables.scss";
        `
      }
    }
  },
  test: {
    globals: true,
    environment: 'jsdom'
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src/renderer')
    }
  }
})

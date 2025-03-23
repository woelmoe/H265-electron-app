import { defineConfig, externalizeDepsPlugin } from 'electron-vite'
import vue from '@vitejs/plugin-vue'
import { viteStaticCopy } from 'vite-plugin-static-copy'
import path from 'node:path'

export default defineConfig({
  main: {
    plugins: [
      externalizeDepsPlugin(),
      viteStaticCopy({
        targets: [
          // {
          //   src: 'src/main/manual',
          //   dest: ''
          // }
        ]
      })
    ]
  },
  // preload: {
  //   plugins: [externalizeDepsPlugin()]
  //   // build: {
  //   //   rollupOptions: {
  //   //     input: path.resolve(__dirname, 'src', 'preload')
  //   //   }
  //   // }
  // },
  renderer: {
    build: {
      rollupOptions: {
        input: {
          browser: path.resolve(__dirname, 'src/renderer/index.html')
        }
      }
    },
    resolve: {
      alias: [
        {
          find: '@',
          replacement: path.resolve(__dirname, './src/renderer')
        }
      ]
    },
    plugins: [
      vue()
      // eslint()
    ],
    css: {
      preprocessorOptions: {
        scss: {}
      }
    }
  }
})

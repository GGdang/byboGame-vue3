import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import vueDevTools from 'vite-plugin-vue-devtools'
import commonjs from 'vite-plugin-commonjs'
import { nodePolyfills } from 'vite-plugin-node-polyfills'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/byboGame-vue3/',
  plugins: [
    vue(),
    vueJsx(),
    vueDevTools(),
    commonjs(),
    nodePolyfills({
      // Whether to polyfill `node:` protocol imports.
      protocolImports: true
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    headers: {
      'Cache-Control': 'no-store, must-revalidate',
      Pragma: 'no-cache',
      Expires: '0'
    }
  },
  define: {
    __VUE_OPTIONS_API__: false
    // global: 'globalThis'
  }
  // build: {
  //   target: 'es2020',
  //   commonjsOptions: {
  //     include: [/node_modules/, /@tonconnect\/sdk/]
  //   }
  // },
})

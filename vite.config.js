import { fileURLToPath, URL } from 'url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '@gallery': fileURLToPath(new URL('./src/gallery', import.meta.url)),
      '@common': fileURLToPath(new URL('./src/common', import.meta.url)),
      '@website': fileURLToPath(new URL('./src/website', import.meta.url))
    }
  }
})

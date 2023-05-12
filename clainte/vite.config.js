import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dynamicImport from 'vite-plugin-dynamic-import'
import ViteRequireContext from '@originjs/vite-plugin-require-context'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    dynamicImport(),
    ViteRequireContext(),
  ],
})

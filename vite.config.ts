import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from "path"
import { chromeExtension } from "vite-plugin-chrome-extension"


// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      'webextension-polyfill-ts': 'webextension-polyfill-ts',
    },
  },
  build: {
    rollupOptions: {
      input: {
        manifest: 'src/manifest.json',
      }
    }
  },
  plugins: [
    react(),
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    chromeExtension()
  ]
})

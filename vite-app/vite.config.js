import { fileURLToPath, URL } from 'url';

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

const BASE_URL = 'http://localhost:8002';

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    rollupOptions: {
      input: 'src/main.js',
      preserveEntrySignatures: true,
      output: {
        format: 'system',
        entryFileNames: 'src/[name].js',
      },
    },
  },
  server: {
    origin: BASE_URL,
  },
  plugins: [
    vue({
      template: {
        transformAssetUrls: {
          base: BASE_URL + '/src',
        },
      },
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
});

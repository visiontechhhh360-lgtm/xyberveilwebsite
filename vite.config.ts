import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    // Legal pages get their own HTML entry so /privacy-policy and /terms-of-service resolve on any static host
    rollupOptions: {
      input: {
        main: 'index.html',
        privacy: 'privacy-policy/index.html',
        terms: 'terms-of-service/index.html',
      },
    },
  },
})

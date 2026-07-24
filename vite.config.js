import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import mdx from "@mdx-js/rollup"

// https://vite.dev/config/
export default defineConfig({
  base: '/DU1080-Documentation-React.github.io/',

  plugins: [
    mdx(),
    react(),
  ]
})

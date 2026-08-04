import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import mdx from "@mdx-js/rollup"
import remarkGfm from "remark-gfm"

// https://vite.dev/config/
export default defineConfig({
  base: '/DU1080-Documentation-React/',

  plugins: [
    mdx({
      remarkPlugins: [remarkGfm],
    }),
    react(),
  ],
})

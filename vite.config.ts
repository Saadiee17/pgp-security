import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"
import { inspectAttr } from 'kimi-plugin-inspect-react'

// https://vite.dev/config/
export default defineConfig({
  base: '/',
  plugins: [inspectAttr(), react()],
  server: {
    port: 3000,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      output: {
        // Split rarely-changing third-party code into its own long-lived
        // chunks so editing page code doesn't bust the vendor cache. GSAP and
        // React are the heaviest always-loaded deps.
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router'],
          gsap: ['gsap'],
        },
      },
    },
  },
});

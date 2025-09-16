import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import Inspect from "@vite-plugin-inspect"
import 

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    Inspect()
  ],
})

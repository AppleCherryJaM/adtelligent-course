import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths'
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import svgr from "vite-plugin-svgr";
import viteCompression from "vite-plugin-compression";
import biome from "vite-plugin-biome";
import Inspect from "vite-plugin-inspect";
// import { terser } from "terser";
// import { visualizer } from "rollup-plugin-visualizer";
// import virtual from "vite-plugin-virtual";
import checker from "vite-plugin-checker";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    tsconfigPaths(),
    svgr(),
    biome({
      mode: 'check', // 'lint', 'format', or 'check'
      files: './src', // Glob pattern for files to process
      applyFixes: true, // Apply fixes for formatting and linting issues
      failOnError: true, // Fail the build if errors are found
    }),
    checker({
      typescript: true,
    }),
    viteCompression({
      algorithm: 'brotliCompress',
      ext: '.br'
    }),
    Inspect(),
  ],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000', // ваш бэкенд URL
        changeOrigin: true,
        secure: false,
      }
    }
  },
  resolve: {
    alias: {
      '@': '/src'
    }
  },
  build: {
    minify: 'terser', // Use Terser for minification
    terserOptions: {
      compress: {
        // Example: drop console.log and debugger statements
        drop_console: true,
        drop_debugger: true,
        passes: 2, // Run compression multiple times for better results
      },
      mangle: true, // Mangle variable and function names
      format: {
        comments: false, // Remove all comments from the output
        beautify: false, // Don't beautify the output (keep it minified)
      },
    },
    outDir: 'dist',
  },
})

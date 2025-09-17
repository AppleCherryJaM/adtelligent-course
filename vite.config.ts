import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths'
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import svgr from "vite-plugin-svgr";
import viteCompression from "vite-plugin-compression";
import biome from "vite-plugin-biome";
import Inspect from "vite-plugin-inspect";
import { terser } from "terser";
import { visualizer } from "rollup-plugin-visualizer";
import virtual from "vite-plugin-virtual";
import checker from "vite-plugin-checker";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    tsconfigPaths(),
    svgr(),
    // checker({
    //   typescript: true,
    //   eslint: {
    //     lintCommand: 'eslint ./src --ext .ts, .tsx'
    //   }
    // }),
    viteCompression({
      algorithm: 'brotliCompress',
      ext: '.br'
    }),
    Inspect()
  ],
})

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // GitHub Pages base: '/CyberneticMap/' when deployed or relative for portable preview
  base: process.env.GITHUB_PAGES === 'true' ? '/CyberneticMap/' : './',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false
  }
});

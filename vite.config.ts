import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  root: '.',
  base: process.env.VITE_BASE_PATH ?? '/lascallesdelasmujeres/',
  resolve: {
    alias: {
      '@': path.resolve(import.meta.dirname, './src'),
      '@components': path.resolve(import.meta.dirname, './src/components'),
      '@hooks': path.resolve(import.meta.dirname, './src/hooks'),
      '@types': path.resolve(import.meta.dirname, './src/types'),
      '@stores': path.resolve(import.meta.dirname, './src/stores'),
      '@data': path.resolve(import.meta.dirname, './src/data'),
      '@utils': path.resolve(import.meta.dirname, './src/utils'),
    },
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    sourcemap: true,
  },
  server: {
    port: 3000,
    open: true,
  },
});

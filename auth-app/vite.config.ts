import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  
  server: {
    port: 3001,
    cors: true,
    origin: 'http://localhost:3001',
  },
  
  preview: {
    port: 3001,
  },
  
  build: {
    rollupOptions: {
      input: 'src/root.component.tsx',
      output: {
        format: 'system',
        entryFileNames: 'auth-app.js',
      },
      external: ['react', 'react-dom', 'react-router-dom', 'single-spa-react'],
      preserveEntrySignatures: 'allow-extension',
    },
  },
  
  resolve: {
    dedupe: ['react', 'react-dom'],
  },
  
  base: 'http://localhost:3001/',
});
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const apiUrl = process.env.API_URL || 'http://localhost:3001';

export default defineConfig({
  plugins: [react()],
  server: {
    host: '127.0.0.1',
    port: 5174,
    strictPort: true,
    proxy: {
      '/api': {
        target: apiUrl,
        changeOrigin: true,
      },
    },
  },
});

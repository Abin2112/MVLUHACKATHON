import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  // Add this 'server' section to proxy API requests
  server: {
    proxy: {
      // Any request starting with /api will be forwarded to your backend
      '/api': {
        target: 'http://localhost:3010', // Your backend server address
        changeOrigin: true, // Recommended for avoiding CORS issues
      },
    }
  }
});

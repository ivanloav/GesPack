import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    watch: {
      usePolling: true, // 👈 Necesario en Mac con Docker
    },
    host: true,
    port: 3000
  }
});

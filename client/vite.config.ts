import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  return {
    plugins: [react()],
    server: {
      proxy: {
        '/': {
          target: 'http://127.0.0.1:8000',
          changeOrigin: true,
          secure: mode === 'production',
        },
      },
      open: true, 
    },
  };
});

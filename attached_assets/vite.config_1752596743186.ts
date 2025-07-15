import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Plugin to replace environment variables in HTML
const htmlEnvReplace = () => {
  return {
    name: 'html-env-replace',
    transformIndexHtml: {
      enforce: 'pre',
      transform(html: string, context: any) {
        return html.replace(/%VITE_(\w+)%/g, (match, key) => {
          return process.env[`VITE_${key}`] || match;
        });
      },
    },
  };
};

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), htmlEnvReplace()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          router: ['react-router-dom'],
          icons: ['lucide-react']
        }
      }
    },
    sourcemap: false,
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true
      }
    }
  },
  server: {
    port: 3000,
    host: true
  },
  preview: {
    port: 3000,
    host: true
  },
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "node:path"; // Use node: protocol
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    // Add the proxy configuration here
    proxy: {
      // Proxy requests starting with /api to the backend server
      '/api': {
        target: 'http://localhost:3001', // Your backend server address
        changeOrigin: true, // Recommended for virtual hosted sites
        // Optional: You might not need rewrite if backend routes already include /api
        // rewrite: (path) => path.replace(/^\/api/, ''), // Uncomment if backend routes don't start with /api
      },
    },
  },
  plugins: [
    react(),
    mode === 'development' &&
    componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));

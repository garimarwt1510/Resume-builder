// filename: frontend/vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Vite config: dev server proxies /api calls to the backend so the frontend
// can use relative URLs in both dev and production.
export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    port: 5173,
    proxy: {
      "/api": {
        target: process.env.VITE_API_PROXY_TARGET || "http://localhost:5000",
        changeOrigin: true,
      },
    },
  },
  preview: {
    host: true,
    port: 4173,
  },
});

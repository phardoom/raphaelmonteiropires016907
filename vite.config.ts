import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "^/v1/.*": {
        target: "https://pet-manager-api.geia.vip",
        changeOrigin: true,
        secure: true,
      },
      "^/autenticacao/.*": {
        target: "https://pet-manager-api.geia.vip",
        changeOrigin: true,
        secure: true,
      },
    },
  },
});

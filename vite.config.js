import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    watch: {
      usePolling: true,
      interval: 100,
    },
    host: "0.0.0.0", // <--- Change this line
    port: 5173, // Optional: if you're accessing from localhost or LAN
  },
});

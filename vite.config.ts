import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  root: "src",
  server: {
    port: 8600,
  },
  build: {
    outDir: "../dist",
    emptyOutDir: true,
  },
  plugins: [react()],
  optimizeDeps: {
    exclude: ["@babylonjs/havok"],
  },
});

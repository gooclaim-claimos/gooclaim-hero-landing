import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "node:path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: { "@": path.resolve(__dirname, "src") },
  },
  server: { port: 5174, strictPort: true },
  ssr: {
    // CJS packages — inline so their named exports resolve in ESM
    noExternal: ["react-helmet-async", "react-fast-compare", "invariant"],
  },
});

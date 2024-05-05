import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@enumerables": "/src/enumerables/index.tsx",
      "@screens": "/src/screens/index.tsx",
      "@components": "/src/components/index.tsx",
      "@layouts": "/src/layouts/index.tsx",
      "@api": "/src/api/index.ts",
    },
  },
});

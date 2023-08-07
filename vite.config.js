import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    base: process.env.NODE_ENV === "production" ? "/mealcraft-ui/" : "/",
    assetsDir: "assets",
  },
  plugins: [react()],
});

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: "/weather-app/", // use '' for local, or '/repo-name/' for GitHub Pages
  plugins: [react()],
});

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  base: process.ENV.GITHUB_PAGES ? "web-bingo" : "./",
  plugins: [react()],
});

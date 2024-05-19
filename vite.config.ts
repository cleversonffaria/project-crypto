import { defineConfig } from "vite";
import * as path from "path";
import react from "@vitejs/plugin-react-swc";
import svgr from "vite-plugin-svgr";

export default defineConfig({
  plugins: [svgr(), react()],
  define: {
    global: "globalThis",
  },
  resolve: {
    alias: {
      src: path.resolve("./src"),
    },
  },
});


import { defineConfig } from "vite";
export default defineConfig({
  build: {
    lib: {
      entry: "src/main.js",
      name: "TaleemPlayerApp",
      fileName: "taleem-player-app",
      formats: ["es"]
    },
    cssCodeSplit: false
  }
});

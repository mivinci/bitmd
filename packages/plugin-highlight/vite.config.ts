import { defineConfig } from "vite";
export default defineConfig({
  build: {
    lib: {
      entry: "index.ts",
      name: "bitmd_plugin_highlight",
    },
  },
});

import {defineConfig} from "vite";
export default defineConfig({
  build: {
    lib: {
      entry: "index.js",
      name: "bitmd_plugin_gfm"
    }
  }
})
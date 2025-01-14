import { defineConfig } from "vite";
import { compression } from "vite-plugin-compression2";
import { viteSingleFile } from "vite-plugin-singlefile";
import zlib from "node:zlib";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    viteSingleFile({
      useRecommendedBuildConfig: true,
      removeViteModuleLoader: true,
    }),
    compression({
      algorithm: "brotliCompress",
      compressionOptions: {
        params: {
          [zlib.constants.BROTLI_PARAM_QUALITY]: 11,
        },
      },
    }),
  ],
  build: {
    cssMinify: "lightningcss",
    minify: "terser",
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
        keep_fargs: false,
        unsafe_undefined: true,
        unsafe_math: true,
        unsafe_Function: true,
        unsafe_arrows: true,
        unsafe_methods: true,
        pure_new: true,
        passes: 5,
      },
      mangle: {
        toplevel: true,
        module: true,
      },
      ecma: 2020,
    },
  },
});

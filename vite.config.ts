import { defineConfig } from "vite";
import { compression } from "vite-plugin-compression2";
import { viteSingleFile } from "vite-plugin-singlefile";
import { createHtmlPlugin } from "vite-plugin-html";
import zlib from "node:zlib";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    viteSingleFile({
      useRecommendedBuildConfig: true,
      removeViteModuleLoader: true,
    }),
    createHtmlPlugin({
      minify: true,
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
});

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import tailwindcss from "@tailwindcss/vite";
// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  server: {
    proxy: {
      "/v1/api": {
        target: "http://localhost:3000",
        changeOrigin: true,

        // 重写路径：默认行为就是拼接，这里显式写出来更清晰
        // 这个配置意味着请求路径不会被改变
        // 例如 /v1/api/ads 会被代理到 http://localhost:3000/v1/api/ads
        rewrite: (path) => path,
      },
    },
  },
});

import { ConfigEnv, UserConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { resolve } from "path";

const root = process.cwd();

const pathResolve = (dir: string) => resolve(root, ".", dir);

// https://vitejs.dev/config/
export default ({ mode }: ConfigEnv): UserConfig => {
  return {
    resolve: {
      alias: resolveAlias,
    },
    server: {
      host: true, // 指定服务器应该监听哪个 IP 地址。 如果将此设置为 0.0.0.0 或者 true 将监听所有地址，包括局域网和公网地址。
      port: 8888,
      strictPort: true, // 设为 true 时若端口已被占用则会直接退出，而不是尝试下一个可用端口。
      // Load proxy configuration from .env
      proxy: {
        "/sts-system": {
          target: "http://localhost:8896",
          changeOrigin: true,
          ws: false,
          rewrite: (path) => path.replace("^/sts-system", "system"),
          secure: false,
        },
      },
      // 设置 server.hmr.overlay 为 false 可以禁用服务器错误遮罩层
      hmr: {
        overlay: true,
      },
    },
    plugins: plugins,
  };
};

const resolveAlias = [
  {
    find: /\/@\//,
    replacement: pathResolve("src") + "/",
  },
];

/**
 * 插件
 */
const plugins = [vue()];

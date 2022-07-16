import { ConfigEnv, UserConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { resolve } from "path";
import federation from "@originjs/vite-plugin-federation";
import { createSvgIconsPlugin } from "vite-plugin-svg-icons";

const root = process.cwd();

const pathResolve = (dir: string) => resolve(root, ".", dir);

// https://vitejs.dev/config/
export default ({ mode }: ConfigEnv): UserConfig => {
  return {
    // 项目根目录（index.html 文件所在的位置）。可以是一个绝对路径，或者一个相对于该配置文件本身的相对路径。
    root: root,
    /**
     * 开发或生产环境服务的公共基础路径。合法的值包括以下几种：
     *   -> 绝对 URL 路径名，例如 /foo/
     *   -> 完整的 URL，例如 https://foo.com/
     *   -> 空字符串或 ./（用于开发环境）
     */
    base: "/",
    resolve: {
      alias: resolveAlias,
    },
    server: {
      host: true, // 指定服务器应该监听哪个 IP 地址。 如果将此设置为 0.0.0.0 或者 true 将监听所有地址，包括局域网和公网地址。
      port: 36666,
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
const plugins = [
  vue(),
  federation({
    name: "sts-gateway",
    filename: "StsGateway.js",
    remotes: {
      "sts-parent": {
        external: "http://localhost:36100/assets/StsParent.js",
        format: "esm",
        from: "vite",
      },
    },
    shared: ["vue", "vue-router", "ant-design-vue"],
  }),
  createSvgIconsPlugin({
    // 指定需要缓存的图标文件夹
    iconDirs: [pathResolve("src/assets/svg")],
    // 指定symbolId格式
    symbolId: "icon-[dir]-[name]",
  }),
];

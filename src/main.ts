import { createApp } from "vue";
import App from "./App.vue";
import { setupRouterGuard } from "/@/router/guard";
import router from "/@/router";
import { store } from "/@/store";
// svg 图标
import "virtual:svg-icons-register";

const app = createApp(App);

// 全局加载store
app.use(store);

// 全局加载router
app.use(router);

// 设置路由守卫
setupRouterGuard(router);

app.mount("#app");

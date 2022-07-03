import { RouteLocationNormalized, Router } from "vue-router";
import { PageEnum } from "/@/enums/PageEnum";
import {
  DEFAULT_MICRO_APP,
  getMicroAppByPath,
  installMicroApp,
  isMicroApp,
  showOrHideMicroApp,
} from "/@/qiankun";

export function createMicroAppGuard(router: Router) {
  router.beforeEach((to, from, next) => {
    // console.log("to ==> " + JSON.stringify(to));
    // console.log("from ==> " + JSON.stringify(from));
    if (to.fullPath === PageEnum.DEFAULT_HOME) {
      next(DEFAULT_MICRO_APP.activeRule);
      return;
    }
    if (isMicroApp(to.fullPath)) {
      gotoMicroApp(to, next);
    }
    next();
    return;
  });

  // 页面进入之后
  router.afterEach(() => {});
}

/**
 * 跳转到子应用界面
 * @param to
 * @param next
 */
const gotoMicroApp = (to: RouteLocationNormalized, next: Function) => {
  console.log("to ==> " + JSON.stringify(to));
  const app = getMicroAppByPath(to.fullPath);
  if (!app) {
    console.log("子应用不存在，请联系管理员！");
    next();
    return;
  }
  const microApp = installMicroApp(app);
  showOrHideMicroApp({ app, microApp });
};

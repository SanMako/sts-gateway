import { App, AppConfig, MicroAppModel } from "/@/model/AppModel";
import { loadMicroApp, MicroApp } from "qiankun";
import { useMicroApp } from "/@/hooks/useMicroApp";
import { unref } from "vue";
import { MicroAppStatusEnums } from "/@/enums/AppEnums";

/**
 * TODO 从数据库获取
 * 微应用列表
 */
export const microApps: App[] = [
  {
    appId: "sts-system",
    appName: "sts-system",
    appEntry: "//localhost:36120",
    appContainer: "#sub-app-container",
    activeRule: "/sts-system",
  },
  {
    appId: "sts-file",
    appName: "sts-file",
    appEntry: "//localhost:36110",
    appContainer: "#sub-app-container",
    activeRule: "/sts-file",
  },
];

/**
 * 默认子应用
 */
export const DEFAULT_MICRO_APP = microApps[0];

export const isMicroApp = (path: string): boolean => {
  const app = microApps.find((app) => path.startsWith(app.activeRule));
  return app ? true : false;
};

export const getMicroAppByPath = (path: string): App | undefined => {
  const app = microApps.find((app) => path.startsWith(app.activeRule));
  return app;
};

const { getMicroApps, getMicroApp, addMicroApp } = useMicroApp();

/**
 * 从内存中拿，并判断状态
 * 初始化的返回ture
 * 未初始化的返回false
 * @param appName
 * @returns
 */
const microInstalled = (appName: string): boolean => {
  const installedApps: MicroAppModel[] = unref(getMicroApps);
  const installedApp = installedApps.find(
    (item) => item.app.appName === appName
  );
  return installedApp && installedApp.microApp
    ? installedApp.microApp.getStatus() === MicroAppStatusEnums.MOUNTED
    : false;
};

/**
 * 加载app
 * @param app
 * @param props
 * @param config
 * @returns
 */
export const installMicroApp = (
  app: App,
  props = {},
  config?: AppConfig
): MicroApp | undefined => {
  // 从缓存中获取
  if (microInstalled(app.appName)) {
    const microAppModel = getMicroApp(app.appName);
    return microAppModel ? microAppModel.microApp : undefined;
  }
  const microApp = loadMicroApp(
    {
      name: app.appName,
      entry: app.appEntry,
      container: app.appContainer,
      props,
    },
    {
      sandbox: config?.sandbox,
      // singular: config.singular,
      getPublicPath: config?.getPublicPath,
      getTemplate: config?.getTemplate,
      excludeAssetFilter: config?.excludeAssetFilter,
    }
  );
  addMicroApp({ app, microApp });
  return microApp;
};

/**
 * 显示或者隐藏app
 */
export const showOrHideMicroApp = (microAppModel: MicroAppModel) => {
  if (microAppModel.microApp && microInstalled(microAppModel.app.appName)) {
    microAppModel.microApp?.update!({
      routerEvent: {
        // ...routeObj,
        // type: find ? "replace" : "push", // 如果存在就是切换路由  否者就是添加
        type: "push", // 如果存在就是切换路由  否者就是添加
      },
    });
    return;
  }
};

import { Entry, MicroApp, RegistrableApp } from "qiankun";
import { MicroAppStatusEnums } from "../enums/AppEnums";

export interface App {
  appId: string;
  // 必选，微应用的名称，微应用之间必须确保唯一
  appName: string;
  // { scripts?: string[]; styles?: string[]; html?: string } - 必选，微应用的入口（详细说明同上）
  appEntry: string;
  // - 必选，微应用的容器节点的选择器或者 Element 实例。如container: '#root' 或 container: document.querySelector('#root')
  appContainer: string | HTMLElement;
  activeRule: string;
  //  可选，初始化时需要传递给微应用的数据
  props?: object;
  // 是否已加载：默认为false。
  isLoad?: boolean;
}

export interface AppConfig {
  // 可选，是否开启沙箱，默认为 true
  // 默认情况下沙箱可以确保单实例场景子应用之间的样式隔离，
  // 但是无法确保主应用跟子应用、或者多实例场景的子应用样式隔离。
  // 当配置为 { strictStyleIsolation: true } 时表示开启严格的样式隔离模式。
  // 这种模式下 qiankun 会为每个微应用的容器包裹上一个 shadow dom 节点，从而确保微应用的样式不会对全局造成影响。
  sandbox?:
    | boolean
    | { strictStyleIsolation?: boolean; experimentalStyleIsolation?: boolean };
  // 可选，是否为单实例场景，单实例指的是同一时间只会渲染一个微应用。默认为 false
  singular?: boolean | ((app: RegistrableApp<any>) => Promise<boolean>);
  // 可选，自定义的 fetch 方法
  fetch?: () => {};
  // 可选，参数是微应用的 entry 值
  getPublicPath?: (entry: Entry) => string;
  // 可选
  getTemplate?: (tpl: string) => string;
  // 可选，指定部分特殊的动态加载的微应用资源（css/js) 不被 qiankun 劫持处理
  excludeAssetFilter?: (assetUrl: string) => boolean;
}

/**
 * 微应用实例
 */
export interface MicroAppModel {
  app: App;
  microApp: MicroApp;
}

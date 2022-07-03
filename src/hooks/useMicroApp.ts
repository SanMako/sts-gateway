import { computed } from "vue";
import { MicroAppModel } from "/@/model/AppModel";
import { useUnInstalledMicroAppStore } from "/@/store/modules/MicroAppStore";

export function useMicroApp() {
  const appStore = useUnInstalledMicroAppStore();

  const getMicroApps = computed(() => appStore.getMicroApps);

  const addMicroApp = (microApp: MicroAppModel) => {
    appStore.addMicroApp(microApp);
  };
  const getMicroApp = (appName: string) => {
    return appStore.getMicroApp(appName);
  };
  const removeMicroApp = (appName: string) => {
    appStore.removeMicroApp(appName);
  };
  const clearMicroApp = () => {
    appStore.clearMicroApp();
  };

  return {
    getMicroApps,

    addMicroApp,
    getMicroApp,
    removeMicroApp,
    clearMicroApp,
  };
}

import { defineStore } from "pinia";
import { store } from "../index";
import { MicroAppModel } from "/@/model/AppModel";

interface MicroAppState {
  microApps: MicroAppModel[];
}

export const useInstalledMicroAppStore = defineStore({
  id: "micro-app-store",
  state: (): MicroAppState => ({
    microApps: [],
  }),
  getters: {
    getMicroApps(): MicroAppModel[] {
      return this.microApps;
    },
  },
  actions: {
    addMicroApp(app: MicroAppModel) {
      this.microApps.push(app);
    },
    getMicroApp(appName: string): MicroAppModel | undefined {
      return this.microApps.find((item) => item.app.appName === appName);
    },
    removeMicroApp(appName: string) {
      this.microApps.splice(
        this.microApps.findIndex((item) => item.app.appName === appName),
        1
      );
    },
    clearMicroApp() {
      this.microApps = [];
    },
  },
});

export function useUnInstalledMicroAppStore() {
  return useInstalledMicroAppStore(store);
}

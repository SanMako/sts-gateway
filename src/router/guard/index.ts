import { Router } from "vue-router";
import { createMicroAppGuard } from "./modules/microAppGuard";

export function setupRouterGuard(router: Router) {
  createMicroAppGuard(router);
}

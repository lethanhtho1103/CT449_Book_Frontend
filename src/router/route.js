import { createWebHistory, createRouter } from "vue-router";

// Layouts
import AdminLayout from "../layouts/AdminLayout/AdminLayout.vue";

// router Admin
import Admin from "../views/Admin/Admin.vue";
import LoginAdmin from "@/views/LoginAdmin/LoginAdmin.vue";
import AuthLayout from "@/layouts/AuthLayout/AuthLayout.vue";

const routes = [
  // router Admin
  {
    path: "/admin/home",
    component: Admin,
    meta: {
      layout: AdminLayout,
    },
  },
  {
    path: "/admin/login",
    component: LoginAdmin,
    meta: {
      layout: AuthLayout,
    },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});
export default router;

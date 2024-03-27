import { createWebHistory, createRouter } from "vue-router";

// Layouts
import AdminLayout from "../layouts/AdminLayout/AdminLayout.vue";

// router Admin
import Admin from "../views/Admin/Admin.vue";
import LoginAdmin from "@/views/LoginAdmin/LoginAdmin.vue";
import AuthLayout from "@/layouts/AuthLayout/AuthLayout.vue";
import RegisterAdmin from "@/views/RegisterAdmin/RegisterAdmin.vue";
import AboutAdmin from "@/views/AboutAdmin/AboutAdmin.vue";
import InfoAdmin from "@/views/InfoAdmin/InfoAdmin.vue";
import EditProfileAdmin from "@/views/EditProfileAdmin/EditProfileAdmin.vue";

const routes = [
  // router Admin
  {
    path: "/admin/login",
    component: LoginAdmin,
    meta: {
      layout: AuthLayout,
    },
  },
  {
    path: "/admin/register",
    component: RegisterAdmin,
    meta: {
      layout: AuthLayout,
    },
  },
  {
    path: "/admin/home",
    component: Admin,
    meta: {
      layout: AdminLayout,
    },
  },
  {
    path: "/admin/about",
    component: AboutAdmin,
    meta: {
      layout: AdminLayout,
    },
  },
  {
    path: "/admin/info",

    component: InfoAdmin,
    meta: {
      layout: AdminLayout,
    },
  },
  {
    path: "/admin/edit-profile",

    component: EditProfileAdmin,
    meta: {
      layout: AdminLayout,
    },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});
export default router;

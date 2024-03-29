import { createWebHistory, createRouter } from "vue-router";

// Layouts
import AdminLayout from "../layouts/AdminLayout/AdminLayout.vue";
import DefaultLayout from "@/layouts/DefaultLayout/DefaultLayout.vue";
import AuthLayout from "@/layouts/AuthLayout/AuthLayout.vue";

// router Admin
import Admin from "../views/Admin/Admin.vue";
import LoginAdmin from "@/views/LoginAdmin/LoginAdmin.vue";
import RegisterAdmin from "@/views/RegisterAdmin/RegisterAdmin.vue";
import AboutAdmin from "@/views/AboutAdmin/AboutAdmin.vue";
import InfoAdmin from "@/views/InfoAdmin/InfoAdmin.vue";
import EditProfileAdmin from "@/views/EditProfileAdmin/EditProfileAdmin.vue";
import Customer from "@/views/Customer/Customer.vue";
import HistoryAdmin from "@/views/HistoryAdmin/HistoryAdmin.vue";

//router User
import Home from "@/views/Users/Home/Home.vue";

const routes = [
  // User
  {
    path: "/",
    component: Home,
    meta: {
      layout: DefaultLayout,
    },
  },
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
    path: "/admin/history",
    component: HistoryAdmin,
    meta: {
      layout: AdminLayout,
    },
  },
  {
    path: "/admin/customer",

    component: Customer,
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

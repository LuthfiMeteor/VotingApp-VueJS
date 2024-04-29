import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/home.vue";
import login from "@/views/login.vue";
import ResetPassword from "../views/ResetPassword.vue";
import Create_Poll from "../views/create_poll.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: Home,
      meta: { requiresAuth: true },
    },
    {
      path: "/login",
      name: "login",
      component: login,
    },
    {
      path: "/ResetPassword",
      name: "ResetPassword",
      component: ResetPassword,
      meta: { requiresAuth: true },
    },
    {
      path: "/create_poll",
      name: "Create_Poll",
      component: Create_Poll,
      meta: { requiresAuth: true },
    },
  ],
});

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem("token");
  if (to.meta.requiresAuth && !token) {
    next("/login");
  } else {
    next();
  }
});

export default router;

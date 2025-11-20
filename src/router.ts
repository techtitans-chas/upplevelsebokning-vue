import { createMemoryHistory, createRouter } from "vue-router";

import Home from "./pages/Home.vue";
import Cart from "./pages/Cart.vue";

const routes = [
  { path: "/", component: Home },
  { path: "/cart", component: Cart },
];

export const router = createRouter({
  history: createMemoryHistory(),
  routes,
});

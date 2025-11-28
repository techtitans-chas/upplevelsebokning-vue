import { createWebHistory, createRouter, type RouteLocationNormalized } from "vue-router";

import Home from "./pages/Home.vue";
import Cart from "./pages/Cart.vue";
import Destination from "./pages/Destination.vue";
import Booking from "./pages/Booking.vue";
import Checkout from "./pages/Checkout.vue";
import Search from "./pages/Search.vue";

const routes = [
  { path: "/", component: Home },
  { path: "/search", component: Search },
  { path: "/cart", component: Cart },
  { path: "/checkout", component: Checkout },
  { path: "/destination/:id", component: Destination },
  { path: "/booking/:id", component: Booking },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    // always scroll to top
    return { top: 0 }
  },
});

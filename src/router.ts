import { createWebHistory, createRouter } from "vue-router";

import Home from "./pages/Home.vue";
import Cart from "./pages/Cart.vue";
import Experience from "./pages/Experience.vue";
import Booking from "./pages/Booking.vue";
import Checkout from "./pages/Checkout.vue";

const routes = [
  { path: "/", component: Home },
  { path: "/cart", component: Cart },
  { path: "/checkout", component: Checkout },
  { path: "/experience/:id", component: Experience },
  { path: "/booking/:id", component: Booking },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});

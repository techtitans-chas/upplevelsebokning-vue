import { createWebHistory, createRouter, type NavigationGuardNext } from "vue-router";

// Layouts
import DefaultLayout from "./layouts/Default.vue";
import BlankLayout from "./layouts/Blank.vue";

// Pages
import Home from "./pages/Home.vue";
import Cart from "./pages/Cart.vue";
import Destination from "./pages/Destination.vue";
import Booking from "./pages/Booking.vue";
import Article from "./pages/Article.vue";
import Checkout from "./pages/Checkout.vue";
import Search from "./pages/Search.vue";
import NotFound from "./pages/NotFound.vue";

const routes = [
  {
    path: "/",
    component: DefaultLayout,
    children: [
      { path: "/", component: Home },
      { path: "/search", component: Search },
      { path: "/cart", component: Cart },
      { path: "/checkout", component: Checkout, beforeEnter: (
        // @ts-ignore
        _to, _from, next: NavigationGuardNext) => {
        // Use dynamic import to access store within route guard
        import("@/stores/cart").then(({ useCartStore }) => {
          const cart = useCartStore();
          if (!cart.processingPayment) next({ path: "/not-found" });
          else next();
        });
      }},
      { path: "/destination/:id", component: Destination, props: true },
      { path: "/booking/:id", component: Booking, props: true },
      { path: "/article/:id", component: Article, props: true },
    ]
  },
  {
    path: "/:pathMatch(.*)*",
    component: BlankLayout,
    children: [{ path: "", name: "NotFound", component: NotFound }],
  },
];

export const router = createRouter({
  history: createWebHistory("/upplevelsebokning-vue/"),
  routes,
  scrollBehavior() {
    // always scroll to top
    return { top: 0 }
  },
});

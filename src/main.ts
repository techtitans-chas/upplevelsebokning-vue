import { createApp } from "vue";
import FloatingVue from "floating-vue";
import "./style.css";
import App from "./App.vue";
import { router } from "./router";
import "virtual:uno.css";
import "floating-vue/dist/style.css";
import { createPinia } from "pinia";

const pinia = createPinia();

createApp(App)
  .use(router)
  .use(pinia)
  .use(FloatingVue)
  .mount("#app");

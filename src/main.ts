import { createApp } from "vue";
import { createPinia } from "pinia";
import FloatingVue from "floating-vue";
import App from "./App.vue";
import { router } from "./router";
import "virtual:uno.css";
import "floating-vue/dist/style.css";
import "./style.css";

const pinia = createPinia();

createApp(App)
  .use(router)
  .use(pinia)
  .use(FloatingVue)
  .mount("#app");

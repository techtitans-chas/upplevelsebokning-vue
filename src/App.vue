<template>
  <div class="wrapper">
    <NavBar />
    <main class="content">
      <RouterView />
    </main>
    <Footer />
    <ScrollToTop />
    <ToastContainer />
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { RouterView } from "vue-router";
import {
  useAccommodationStore,
  useActivityStore,
  useDestinationStore,
  useArticleStore
} from "./stores";
import NavBar from "@/components/layout/NavBar.vue";
import Footer from "@/components/layout/Footer.vue";
import ScrollToTop from "@/components/layout/ScrollToTop.vue";
import ToastContainer from "@/components/ui/ToastContainer.vue";

const store = {
  accommodation: useAccommodationStore(),
  activity: useActivityStore(),
  destination: useDestinationStore(),
  article: useArticleStore(),
};

onMounted(() => {
  store.accommodation.load();
  store.activity.load();
  store.destination.load();
  store.article.load();
});
</script>

<style scoped>
.wrapper {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.content {
  flex: 1;
}
</style>

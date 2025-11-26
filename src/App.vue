<template>
  <div class="wrapper">
    <NavBar />
    <main class="content">
      <RouterView />
    </main>
    <Footer />
    <ScrollToTop />
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { RouterView } from "vue-router";
import {
  useAccommodationStore,
  useActivityStore,
  useDestinationStore,
} from "./stores";
import NavBar from "./components/NavBar.vue";
import Footer from "./components/Footer.vue";
import ScrollToTop from "./components/ScrollToTop.vue";

const store = {
  accommodation: useAccommodationStore(),
  activity: useActivityStore(),
  destination: useDestinationStore(),
};

onMounted(() => {
  store.accommodation.load();
  store.activity.load();
  store.destination.load();
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

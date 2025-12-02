<template>
  <div class="wrapper">
    <RouterView />
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
} from "./stores";
import ScrollToTop from "@/components/layout/ScrollToTop.vue";
import ToastContainer from "@/components/ui/ToastContainer.vue";

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

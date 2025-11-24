<template>
  <div class="wrapper">
    <NavBar />
    <main class="content">
      <RouterView />
    </main>
    <Footer />
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { RouterView } from "vue-router";
import NavBar from "./components/NavBar.vue";
import Footer from "./components/Footer.vue";
import {
  useAccommodationStore,
  useActivityStore,
  useDestinationStore,
  useTravelStore
} from "./stores";

const store = {
  accommodation: useAccommodationStore(),
  activity: useActivityStore(),
  destination: useDestinationStore(),
  travel: useTravelStore()
}

onMounted(() => {
  store.accommodation.load();
  store.activity.load();
  store.destination.load();
  store.travel.load();
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

<template>
  <div class="max-w-6xl mx-auto p-6">
    <div v-if="destination">
      <h1 font="bold" text="4xl">{{ destination.title }}</h1>
      <p v-if="destination.description">{{ destination.description }}</p>

      <Section> 
        <h1>This is a section component</h1>
        <p>Lorem ipsum</p>
      </Section> 

      <RouterLink :to="`/booking/${destination.id}`">
        <button class="bg-emerald-500 px-4 py-3">Book now</button>
      </RouterLink>

      <h2>Accommodations</h2>
    </div>
    <div v-else>
      <h1>Destination not found</h1>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useRoute } from "vue-router";
import { useDestinationStore } from "@/stores/destination";
import Section from "@/components/Section.vue";
// import { useAccommodationStore } from "@/stores/accommodation";

const route = useRoute();
const destinationStore = useDestinationStore();
// const accommodationStore = useAccommodationStore();

// const accommodation = computed(() => accommodationStore.getById(route.params.id) || { title: "Not Found" });
const destination = computed(() => {
  const id = route.params.id as string;
  return destinationStore.getById(id);
});
</script>

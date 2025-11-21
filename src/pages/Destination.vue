<template>
  <div class="max-w-6xl mx-auto p-6">
    <h1 v-if="destination.title" font="bold" text="4xl">{{ destination.title }}</h1>
    <h1 v-else>Destination not found</h1>

    <p v-if="destination.description">{{ destination.description }}</p>

    <!-- TODO: -->
    <!-- <p v-for="destination in accommodation.destinations" :key="destination.id">{{destination.extras}}</p>  -->

    <RouterLink :to="`/booking/${destination.id}`">
      <button class="bg-emerald-500 px-4 py-3">Book now</button>
    </RouterLink>

    <h2>Accommodations</h2>
    
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useRoute } from "vue-router";
import { useDestinationStore } from "@/stores/destination";
import { useAccommodationStore } from "@/stores/accommodation";

const route = useRoute();
const destinationStore = useDestinationStore();
const accommodationStore = useAccommodationStore();

const destination = computed(() => destinationStore.getById(Number(route.params.id)) || { title: "Not Found" });
const accommodation = computed(() => accommodationStore.getById(Number(route.params.id)) || { title: "Not Found" });
</script>

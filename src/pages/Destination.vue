<template>
  <!-- Destination -->
  <Section>
    <div v-if="destination">
      <div class="flex items-center gap-4">
        <h1>{{ destination.title }}</h1>
        <Badge>{{ destination.timePeriod }}</Badge>
      </div>
      <p v-if="destination.description">{{ destination.description }}</p>
      <Button to="/booking" icon="fa7-solid:arrow-right">Book Now</Button>
    </div>
    <div v-else>
      <h1>Destination not found</h1>
    </div>
  </Section>
  <!-- Accommodations -->
  <Section>
    <h2>Accommodations</h2>

    <div
      v-if="accommodations.length > 0"
      v-for="acc in accommodations"
      :key="acc.id"
    >
      {{ acc.title }}
    </div>
    <div v-else>No accommodations available.</div>
  </Section>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useRoute } from "vue-router";
import { useDestinationStore } from "@/stores/destination";
import Section from "@/components/Section.vue";
import { useAccommodationStore } from "@/stores/accommodation";
import Button from "@/components/Button.vue";
import Badge from "@/components/Badge.vue";

const route = useRoute();
const destinationStore = useDestinationStore();
const accommodationStore = useAccommodationStore();

const destination = computed(() => {
  const id = route.params.id as string;
  return destinationStore.getById(id);
});

const accommodations = computed(() => {
  const id = route.params.id as string;
  return accommodationStore.getByDestination(id);
});
</script>

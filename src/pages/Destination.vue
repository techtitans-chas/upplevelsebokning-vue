<template>
  <!-- Destination -->
  <Section
    v-if="destination"
    center
    class="min-h-[400px]"
    bg-color="bg-black/60"
    :bg-image="
      destination.coverImage
        ? destination.coverImage
        : '/images/placeholder.jpg'
    "
  >
    <div>
      <div class="flex items-center gap-4">
        <h1>{{ destination.title }}</h1>
        <Badge>{{ destination.timePeriod }}</Badge>
      </div>
      <p v-if="destination.description" class="text-white">
        {{ destination.description }}
      </p>
      <Button :to="`/booking/${destination.id}`" icon="fa7-solid:arrow-right"
        >Book Now</Button
      >
    </div>
  </Section>
  <Section v-else>
    <h1>Destination not found</h1>
  </Section>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useRoute } from "vue-router";
import { useDestinationStore } from "@/stores/destination";
import Section from "@/components/Section.vue";
import Button from "@/components/Button.vue";
import Badge from "@/components/Badge.vue";

const route = useRoute();
const destinationStore = useDestinationStore();

const destination = computed(() => {
  const id = route.params.id as string;
  return destinationStore.getById(id);
});
</script>

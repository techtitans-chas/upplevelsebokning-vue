<template>
  <div class="max-w-6xl mx-auto p-6">
    <h1 font="bold" text="4xl" class="mb-6">Search results</h1>

    <p>{{ destination }}</p>

    <div class="grid grid-cols-[1fr_1fr_1fr] gap-4 p-8">
      <div v-for="item in results" :key="item.id">
        <RouterLink
          :to="`/destination/${item.id}`"
          class="border border-1 p-4 block"
        >
          {{ item.title }}
        </RouterLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useDestinationStore } from "@/stores/destination";
import { RouterLink, useRoute } from "vue-router";

const route = useRoute();

const destinationStore = useDestinationStore();

const destination = computed(() => route.query.destination);
const term = computed(() => route.query.term);

const results = computed(() => {
  let results = destinationStore.data;
  if (destination.value)
    // TODO:
    results = results.filter((i) => i.id === destination.value);
  if (term.value)
    results = results.filter(
      (i) =>
        i.title.toLowerCase().includes(String(term.value).toLowerCase()) ||
        i.description.toLowerCase().includes(String(term.value).toLowerCase())
    );

  return results;
});
</script>

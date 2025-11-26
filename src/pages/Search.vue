<template>
  <Section>
    <h1>Search results</h1>

    <p>{{ destination }}</p>

    <div class="grid grid-cols-[1fr_1fr_1fr] gap-4">
      <DestinationCard v-for="item in results" :key="item.id" :data="item" @click="router.push(`/destination/${item.id}`)" />
    </div>
  </Section>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { RouterLink, useRoute, useRouter } from "vue-router";
import { useDestinationStore } from "@/stores/destination";
import Section from "@/components/Section.vue";
import DestinationCard from "@/components/DestinationCard.vue";

const router = useRouter();
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

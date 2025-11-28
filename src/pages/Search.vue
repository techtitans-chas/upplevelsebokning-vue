<template>
  <Section>
    <div class="flex items-end gap-4 mb-4">
      <h1 class="mb-0">{{ term ? "Search results" : "All destinations" }}</h1>
      <p v-if="term" class="text-sm text-primary-400">for <span class="text-primary-300">"{{ term }}"</span></p>
    </div>

    <div class="mb-6">
      <SearchForm />
    </div>

    <div class="grid grid-cols-[1fr_1fr_1fr] gap-4" v-if="results.length > 0">
      <DestinationCard
        v-for="item in results"
        :key="item.id"
        :data="item"
        @click="router.push(`/destination/${item.id}`)"
      />
    </div>
    <div v-else>
      No destinations found.
    </div>
  </Section>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useDestinationStore } from "@/stores/destination";
import Section from "@/components/layout/Section.vue";
import DestinationCard from "@/components/cards/DestinationCard.vue";
import SearchForm from "@/components/form/SearchForm.vue";

const router = useRouter();
const route = useRoute();

const destinationStore = useDestinationStore();

const term = computed(() => route.query.term);
const minRating = computed(() => route.query.minRating);
const minTimePeriod = computed(() => route.query.minTimePeriod);
const maxTimePeriod = computed(() => route.query.maxTimePeriod);

const results = computed(() => {
  let results = destinationStore.data;

  if (term.value)
    results = results.filter(
      (i) =>
        i.title.toLowerCase().includes(String(term.value).toLowerCase()) ||
        i.location.toLowerCase().includes(String(term.value).toLowerCase()) ||
        i.climate.toLowerCase().includes(String(term.value).toLowerCase()) ||
        i.description.toLowerCase().includes(String(term.value).toLowerCase())
    );
  
  if (typeof minRating.value === "string") {
    const minRatingNum = parseInt(minRating.value);
    results = results.filter((i) => {
      const averageRating = parseFloat(destinationStore.getAverageRating(i.id as string) || "0");
      return averageRating >= minRatingNum;
    });
  }

  if (typeof minTimePeriod.value === "string" && typeof maxTimePeriod.value === "string") {
    const minPeriod = parseInt(minTimePeriod.value);
    const maxPeriod = parseInt(maxTimePeriod.value);
    results = destinationStore.filterByTimePeriod(minPeriod, maxPeriod);
  }

  return results;
});
</script>

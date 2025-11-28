import { defineStore } from "pinia";
import { computed } from "vue";
import type { Destination } from "../types";
import { useDataLoader } from "../composables/useDataLoader";
import { useAccommodationStore } from "./accommodation";
import { useActivityStore } from "./activity";

export const useDestinationStore = defineStore("destination", () => {
  const { data, loading, error, load } = useDataLoader<Destination>(
    "/data/destinations.json"
  );

  const getById = computed(() => {
    return (id: string) => data.value.find((i) => i.id === id);
  });

  const getByTag = computed(() => {
    return (tag: string) => data.value.filter((i) => i.tags?.includes(tag));
  });

  const getAverageRating = (id: string) => {
    const dest = data.value.find((i) => i.id === id);
    const ratings = dest?.reviews.map(r => r.rating);
    if (ratings) {
      const averageRating = ratings?.reduce((acc, r) => acc + r, 0) / ratings.length;
      return averageRating.toFixed(1);
    } else return null;
  };

  const getAccommodationAmount = computed(() => {
    const accommodationStore = useAccommodationStore();
    return (id: string) => {
      const accs = accommodationStore.getByDestination(id);
      return accs.length;
    };
  });

  const getActivityAmount = computed(() => {
    const activityStore = useActivityStore();
    return (id: string) => {
      const acts = activityStore.getByDestination(id);
      return acts.length;
    };
  });

  const search = computed(() => {
    return (term: string) => {
      const q = term.toLowerCase();
      return data.value.filter((i) => i.title.toLowerCase().includes(q));
    };
  });

  const timePeriods = computed(() => {
    const periods = data.value.map(d => d.timePeriod);
    return [...new Set(periods)].sort((a, b) => a - b);
  });

  const filterByTimePeriod = (minPeriod: number, maxPeriod: number) => {
    return data.value.filter((i) => i.timePeriod >= minPeriod && i.timePeriod <= maxPeriod);
  };

  return {
    data,
    loading,
    error,
    load,
    getById,
    getByTag,
    getAverageRating,
    getAccommodationAmount,
    getActivityAmount,
    search,
    timePeriods,
    filterByTimePeriod,
  };
});

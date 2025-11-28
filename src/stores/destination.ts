import { defineStore } from "pinia";
import { computed } from "vue";
import type { Destination } from "../types";
import { useDataLoader } from "../composables/useDataLoader";

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

  const search = computed(() => {
    return (term: string) => {
      const q = term.toLowerCase();
      return data.value.filter((i) => i.title.toLowerCase().includes(q));
    };
  });

  return {
    data,
    loading,
    error,
    load,
    getById,
    getByTag,
    search,
  };
});

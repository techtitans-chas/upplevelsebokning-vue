import { defineStore } from "pinia";
import { computed } from "vue";
import type { Destination } from "../types";
import { useDataLoader } from "../composables/useDataLoader";

export const useDestinationStore = defineStore("destination", () => {
 const { data, loading, error, load } = useDataLoader<Destination>("/data/destinations.json");

  const getById = computed(() => {
    return (id: string) => data.value.find(i => i.id === id);
  });

  return {
    data,
    loading,
    error,
    load,
    getById
  }
});

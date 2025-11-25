import { defineStore } from "pinia";
import { computed } from "vue";
import { useDataLoader } from "../composables/useDataLoader";
import { useDestinationStore } from "./destination";
import type { Accommodation } from "../types";

export const useAccommodationStore = defineStore("accommodation", () => {
  const { data, loading, error, load } = useDataLoader<Accommodation>(
    "/data/accommodations.json"
  );

  const getById = computed(() => {
    return (id: string, populate: string[] = []) => {
      const item = data.value.find((i) => i.id === String(id));
      if (!item) return null;

      const enrichedItem: any = { ...item };

      if (populate.includes("destination")) {
        const destination = useDestinationStore();
        enrichedItem.destination = destination.getById(item.destinationId);
      }

      return enrichedItem;
    };
  });

  const getByDestination = computed(() => {
    return (destinationId: string) => {
      return data.value.filter((i) => i.destinationId === destinationId);
    };
  });

  return {
    data,
    loading,
    error,
    load,
    getById,
    getByDestination,
  };
});

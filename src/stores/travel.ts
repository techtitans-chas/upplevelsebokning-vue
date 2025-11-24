import { defineStore } from "pinia";
import { useAccommodationStore } from "./accommodation";
import { useDestinationStore } from "./destination";
import { computed } from "vue";
import type { Travel } from "../types";
import { useDataLoader } from "../composables/useDataLoader";

export const useTravelStore = defineStore("travel", () => {
  const { data, loading, error, load } = useDataLoader<Travel>("/data/travels.json", "travel");

  const getById = computed(() => {
    return (id: string, populate: string[] = []) => {
      const item = data.value.find(i => i.id === id);
      if (!item) return null;

      const enrichedItem: any = { ...item };

      if (populate.includes("accommodation")) {
        const accommodation = useAccommodationStore();
        enrichedItem.accommodation = accommodation.getById(item.accommodationId);
      }

      if (populate.includes("destination")) {
        const destination = useDestinationStore();
        enrichedItem.destination = destination.getById(item.destinationId);
      }

      return enrichedItem;
    }
  });

  return {
    data,
    loading,
    error,
    load,
    getById
  }
});

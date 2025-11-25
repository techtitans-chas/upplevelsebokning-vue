import { defineStore } from "pinia";
import { computed } from "vue";
import { useDestinationStore } from "./destination";
import type { Activity } from "../types";
import { useDataLoader } from "../composables/useDataLoader";

export const useActivityStore = defineStore("activity", () => {
  const { data, loading, error, load } = useDataLoader<Activity>("/data/activities.json");

  const getById = computed(() => {
    return (id: string, populate: string[] = []) => {
      const item = data.value.find(i => i.id === String(id));
      if (!item) return null;

      const enrichedItem: any = { ...item};

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

import { ref, type Ref } from "vue";
import type { Travel } from "../types";
import { useAccommodationStore } from "../stores/accommodation";

export function useDataLoader<T = any>(path: string, dataType?: "travel") {
  const data: Ref<T[]> = ref([]);
  const loading = ref(false);
  const error = ref<string | null>(null);

  async function load() {
    loading.value = true;
    error.value = null;
    try {
      const res = await fetch(path);
      if (!res.ok) throw new Error(`Failed to fetch ${path}`);
      let items = await res.json();

      // If dataType is "travel", enrich items with duration and price
      if (dataType === "travel") {
        const accommodationStore = useAccommodationStore();
        
        items = items.map((item: Travel) => {
          const enrichedItem = { ...item };

          // Calculate duration (number of nights)
          const start = new Date(item.startDate);
          const end = new Date(item.endDate);
          const duration = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
          enrichedItem.duration = duration;

          // Fetch accommodation and calculate price
          const accommodation = accommodationStore.getById(item.accommodationId);
          if (accommodation && accommodation.pricePerNight) {
            enrichedItem.price = duration * accommodation.pricePerNight;
          }

          return enrichedItem;
        });
      }

      data.value = items;
    } catch (err) {
      error.value = err instanceof Error ? err.message : String(err);
    } finally {
      loading.value = false;
    }
  }

  return { data, loading, error, load }
}

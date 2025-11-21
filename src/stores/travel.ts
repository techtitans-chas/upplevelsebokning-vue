import { defineStore } from "pinia";
import { useAccommodationStore } from "./accommodation";
import { useDestinationStore } from "./destination";

// You can name the return value of `defineStore()` anything you want,
// but it's best to use the name of the store and surround it with `use`
// and `Store` (e.g. `useUserStore`, `useCartStore`, `useProductStore`)
// the first argument is a unique id of the store across your application
export const useTravelStore = defineStore("travel", {
  state: () => ({
    items: [
      {
        id: 1,
        destinationId: 1,
        accommodationId: 1,
        startDate: "dec 1",
        endDate: "dec 3",
      },
    ]
  }),
  getters: {
    getById: (state) => (id: number, populate: string[] = []) => {
      const item = state.items.find(i => i.id === id);
      if (!item) return null;

      const enrichedItem: any = { ...item };

      if (populate.includes("accommodation")) {
        const accommodation = useAccommodationStore();
        enrichedItem.accomodation = accommodation.getById(item.accommodationId);
      }

      if (populate.includes("destination")) {
        const destination = useDestinationStore();
        enrichedItem.destination = destination.getById(item.destinationId);
      }

      return enrichedItem;
    },
  },
  actions: {

  },
});

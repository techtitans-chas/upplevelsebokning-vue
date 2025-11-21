import { defineStore } from "pinia";
import { useDestinationStore } from "./destination";

// You can name the return value of `defineStore()` anything you want,
// but it's best to use the name of the store and surround it with `use`
// and `Store` (e.g. `useUserStore`, `useCartStore`, `useProductStore`)
// the first argument is a unique id of the store across your application
export const useAccommodationStore = defineStore("accommodation", {
  state: () => ({
    items: [
      {
        id: 1,
        destinationId: 1,
        title: "Stone Age Suites & Spa",
        description: "Rooms cut out in stone",
        extras: ["Dino proof windows", "Breakfast served by mammoths"],
        beds: 2,
        pricePerNight: 5000
      },
      {
        id: 2,
        destinationId: 2,
        title: "Pharaoh's Pyramid Palace",
        description: "Pyramid-shaped rooms with mysterious hieroglyphs",
        extras: ["Complimentary sarcophagus nap service", "All-inclusive with sun-god guarantee"],
        beds: 2,
        pricePerNight: 5000
      },
    ]
  }),
  getters: {
    getById: (state) => (id: number, populate: string[] = []) => {
      const item = state.items.find(i => i.id === id);
      if (!item) return null;

      const enrichedItem: any = { ...item };

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

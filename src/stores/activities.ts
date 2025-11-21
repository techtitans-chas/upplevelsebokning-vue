import { defineStore } from "pinia";
import { useDestinationStore } from "./destination";

export const useActivityStore = defineStore("activity", {
  state: () => ({
    items: [
      {
        id: 1,
        destinationId: 1,
        title: "Temple tours",
        description: "Explore the ancient temples with a knowledgeable guide.",
        duration: "2 hours",
        groupSize: "Up to 10 people",
        ageGroup: "All ages",
        included: ["Guide", "Transportation", "Snacks"],
        requirements: ["Comfortable shoes", "18+ for wine tasting"],
        price: 50,
        rating: 4.5,
        reviews: [
          { user: "John Doe", rating: 5, comment: "Amazing stay!" },
          { user: "Jane Smith", rating: 4, comment: "Great service, but the room was small." }
        ],
        thumbnail: "src image",
      },
      {
        id: 2,
        destinationId: 1,
        title: "Wine tasting",
        ageGroup: "18+"
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

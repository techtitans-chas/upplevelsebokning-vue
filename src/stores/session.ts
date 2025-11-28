import { defineStore } from "pinia";
import { ref } from "vue";

export const useSessionStore = defineStore("session", () => {
  // Get today's date in YYYY-MM-DD format
  const today = new Date();
  const todayString = today.toISOString().split('T')[0];

  const departureDate = ref(todayString);
  const returnDate = ref(todayString);
  const minimumRating = ref<number | null>(null);

  return {
    departureDate,
    returnDate,
    minimumRating,
  };
});

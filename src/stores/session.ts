import { defineStore } from "pinia";
import { ref, computed } from "vue";

export const useSessionStore = defineStore("session", () => {
  const departureDate = ref("");
  const returnDate = ref("");

  return {
    departureDate,
    returnDate,
  };
});

import { defineStore } from "pinia";

// You can name the return value of `defineStore()` anything you want,
// but it's best to use the name of the store and surround it with `use`
// and `Store` (e.g. `useUserStore`, `useCartStore`, `useProductStore`)
// the first argument is a unique id of the store across your application
export const useExperienceStore = defineStore("experience", {
  state: () => ({
    items: [
      {
        id: 1, title: "Ancient Greece", price: 500
      },
      {
        id: 2, title: "Egypt", price: 750
      }
    ]
  }),
  getters: {
  },
  actions: {
    find(id) {
      return this.items.find(i => i.id === id);
    },
  },
});

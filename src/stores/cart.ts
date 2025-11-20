import { defineStore } from "pinia";

// You can name the return value of `defineStore()` anything you want,
// but it's best to use the name of the store and surround it with `use`
// and `Store` (e.g. `useUserStore`, `useCartStore`, `useProductStore`)
// the first argument is a unique id of the store across your application
export const useCartStore = defineStore("cart", {
  state: () => ({
    items: []
  }),
  getters: {
    totalValue: (state) => state.items.reduce((acc, item) => acc + item.price, 0),
    totalAmount: (state) => state.items.length,
  },
  actions: {
    addItem(item) {
      this.items.push(item)
    },
    removeItem(item) {
      this.items = this.items.filter(i => i.id !== item.id)
    },
    clear() {
      this.items = [];
    }
  },
});

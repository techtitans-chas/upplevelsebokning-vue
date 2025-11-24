import { defineStore } from "pinia";
import { ref, computed } from "vue";
import type { Travel } from "../types";

export const useCartStore = defineStore("cart", () => {
  const items = ref<Travel[]>([]);

  const totalValue = computed(() => items.value.reduce((acc, item) => acc + item.price, 0));
  const totalAmount = computed(() => items.value.length);

  function addItem(item: Travel) {
    items.value.push(item);
  }

  function removeItem(item: Travel) {
    items.value = items.value.filter(i => i.id !== item.id)
  }

  function clear() {
    items.value = [];
  }

  return {
    items,
    totalValue,
    totalAmount,
    addItem,
    removeItem,
    clear,
  }
});

<template>
  <div class="max-w-6xl mx-auto p-6">
    <h1 font="bold" text="4xl" class="mb-6">Cart ({{ cart.totalAmount }})</h1>
    <div v-for="item in cart.items" :key="item.id">{{ item.title }}
      <button @click="cart.removeItem(item)" class="bg-red-400 px-2 py-1 rounded-sm">Remove</button>
    </div>
    <div>Total cart value: {{ cart.totalValue }}</div>

    <button class="bg-red-300 px-4 py-3" @click="cart.clear">
      Clear cart
    </button>
    <RouterLink to="/checkout">
      <button class="bg-emerald-500 px-4 py-3" @click="pay">
        Pay for your order
      </button>
    </RouterLink>
  </div>
</template>

<script setup lang="ts">
import { useCartStore } from "@/stores/cart";
import { RouterLink, useRouter } from "vue-router";

const cart = useCartStore();
const router = useRouter();

function pay() {
  cart.clear();
  router.push("/checkout");
}
</script>

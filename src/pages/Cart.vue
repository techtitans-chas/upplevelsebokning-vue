<template>
  <h1>Cart ({{ cart.totalAmount }})</h1>
  <div v-for="item in cart.items" :key="item.id">{{ item.title }}
    <button @click="cart.addItem(item)">Add to cart</button>
    <button @click="cart.removeItem(item)">Remove</button>
  </div>
  <div>Total cart value: {{ cart.totalValue }}</div>
</template>

<script setup>
import { useCartStore } from "@/stores/cart";

const cart = useCartStore();
</script>

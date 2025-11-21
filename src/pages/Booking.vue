<template>
  <div class="max-w-6xl mx-auto p-6">
  <h1 font="bold" text="4xl" class="mb-6">Booking</h1>
  <div class="flex gap-6" text="2xl">
    <div>{{ item.title }}</div>
    <div>{{ item.price }} SEK</div>
  </div>

  <RouterLink to="/cart">
    <button class="bg-emerald-500 px-4 py-3" @click="order">Order and go to cart</button>
  </RouterLink>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useDestinationStore } from "@/stores/destination";
import { useCartStore } from "@/stores/cart";

const route = useRoute();
const router = useRouter();

const destination = useDestinationStore();
const cart = useCartStore();

const item = computed(() => destination.getById(Number(route.params.id)) || { title: "Not Found", price: 0 });

function order() {
  cart.addItem(item.value);
  router.push("/cart");
}
</script>

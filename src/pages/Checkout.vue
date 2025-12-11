<template>
  <Section class="text-center">
    <h1 font="bold" text="4xl" class="mb-6">Checkout</h1>
    <p>Thanks for your order!</p>
    <Button @click="leave">Keep browsing</Button>
  </Section>
</template>

<script setup lang="ts">
import { useCartStore } from "@/stores/cart";
import { useRouter } from "vue-router";
import { onBeforeRouteLeave } from "vue-router";
import Button from "@/components/ui/Button.vue";
import Section from "@/components/layout/Section.vue";

const cart = useCartStore();
const router = useRouter();

function leave() {
  cart.processingPayment = false;
  router.push("/");
}

onBeforeRouteLeave((_to, _from, next) => {
  cart.processingPayment = false;
  next();
});
</script>

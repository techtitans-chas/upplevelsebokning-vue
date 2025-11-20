<template>
  <h1>Booking</h1>
  {{ item.title }}: {{ item.price }}

  <RouterLink to="/cart">Order</RouterLink>
</template>

<script setup>
import { computed } from "vue";
import { useRoute } from "vue-router";
import { useExperienceStore } from "@/stores/experience";

const route = useRoute();
const experiences = useExperienceStore();

const item = computed(() => experiences.find(Number(route.params.id)) || { title: "Not Found", price: 0 });
</script>

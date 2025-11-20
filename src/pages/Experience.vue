<template>
  <div class="max-w-6xl mx-auto p-6">
    <h1 v-if="item.title" font="bold" text="4xl">{{ item.title }}</h1>
    <h1 v-else>Experience not found</h1>

    <p v-if="item.description">{{ item.description }}</p>

    <RouterLink :to="`/booking/${item.id}`">
      <button class="bg-emerald-500 px-4 py-3">Book now</button>
    </RouterLink>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useRoute } from "vue-router";
import { useExperienceStore } from "@/stores/experience";

const route = useRoute();
const experiences = useExperienceStore();

const item = computed(() => experiences.find(Number(route.params.id)) || { title: "Not Found" });
</script>

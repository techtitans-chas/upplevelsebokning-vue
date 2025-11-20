<template>
  <h1 v-if="item.title" font="bold" text="lg">{{ item.title }}</h1>
  <h1 v-else>Experience not found</h1>

  <RouterLink :to="`/booking/${item.id}`"><button>Book now</button></RouterLink>
</template>

<script setup>
import { computed } from "vue";
import { useRoute } from "vue-router";
import { useExperienceStore } from "@/stores/experience";

const route = useRoute();
const experiences = useExperienceStore();

const item = computed(() => experiences.find(Number(route.params.id)) || { title: "Not Found" });
</script>

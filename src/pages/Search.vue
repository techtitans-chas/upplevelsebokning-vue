<template>
  <div class="max-w-6xl mx-auto p-6">
    <h1 font="bold" text="4xl" class="mb-6">Search results</h1>

    <div class="grid grid-cols-[1fr_1fr_1fr] gap-4 p-8">
      <div v-for="item in destination.items" :key="item.id">
        <RouterLink :to="`/destination/${item.id}`" class="border border-1 p-4 block">
          {{ item.title }}
        </RouterLink>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useDestinationStore } from "@/stores/destination";
import { RouterLink } from "vue-router";

const destination = useDestinationStore();
</script>

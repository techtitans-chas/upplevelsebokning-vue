<template>
  <ul class="ml-4 mt-4">
  <li
    v-for="amenity in items"
    :key="amenity.title"
    class="flex items-center gap-2 text-sm text-gray-500"
  >
    <Icon :icon="amenity.icon" />
    <div>{{ amenity.title }}</div>
  </li>
</ul>
</template>

<script setup lang="ts">
import { Icon } from "@iconify/vue";
import type { Amenity } from "@/types";

defineProps<{
  items: Amenity[];
}>();
</script>

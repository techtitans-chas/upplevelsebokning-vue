<template>
  <div v-for="review in data" :key="review.user" :class="classes">
    <span class="font-semibold">
      {{ review.user }}
    </span>
    <div class="flex justify-center">
      <Icon
        icon="material-symbols:star-rounded"
        v-for="stars in review.rating"
        :key="stars"
        class="text-secondary-300 text-3xl"
      />
      <Icon
        icon="material-symbols:star-rounded"
        v-for="stars in 5 - review.rating"
        :key="stars"
        class="text-primary-700 text-3xl"
      />
    </div>
    {{ review.comment }}
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { Icon } from "@iconify/vue";
import { twMerge } from "tailwind-merge";
import type { Review } from "@/types";

const props = defineProps<{
  data: Review[];
  class?: string;
}>();

const classes = computed(() => {
  return twMerge(
    "grid grid-rows-subgrid row-span-3 text-center max-sm:not-last:mb-6",
    props.class
  );
});
</script>

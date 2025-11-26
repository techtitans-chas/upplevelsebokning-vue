<template>
  <div :class="classes">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { twMerge } from "tailwind-merge";

const props = defineProps<{
  class?: string;
}>();

const classes = twMerge(
  "bg-primary-500 rounded-full text-white font-regular flex justify-center items-center py-1 px-2 text-sm",
  props.class
);
</script>

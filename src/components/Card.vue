<template>
  <div :class="classes">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { twMerge } from "tailwind-merge";

const props = defineProps<{
  innerClass?: string,
}>();

const classes = computed(() =>
  twMerge('rounded-lg p-6 bg-white text-black', props.innerClass)
);
</script>

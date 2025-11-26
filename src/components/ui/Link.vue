<template>
  <component
    :class="classes"
    :is="to ? RouterLink : 'a'"
    :to="to"
  >
    <slot />
  </component>
</template>
<script setup lang="ts">
import { RouterLink } from "vue-router";
import { twMerge } from "tailwind-merge";

const props = defineProps<{
  to?: string;
  dark?: boolean;
}>();

const classes = twMerge(
  "link transition-all",
  props.dark ? "text-white" : "text-primary-500"
);
</script>

<style scoped>
  .link {
    font-weight: 400;
    text-decoration: underline;
    text-underline-offset: 4px;
    text-decoration-color: var(--color-primary-600);
  }
  
  .link:hover {
    color: var(--primary-500);
    text-decoration-color: var(--color-primary-300);
  }
</style>

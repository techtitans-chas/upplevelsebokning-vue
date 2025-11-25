<template>
  <component
    class="link transition-all"
    :is="to ? RouterLink : 'a'"
    :to="to"
  >
    <slot />
  </component>
</template>
<script setup lang="ts">
import { RouterLink } from "vue-router";

defineProps<{
  to?: string
}>();
</script>

<style scoped>
  .link {
    font-weight: 400;
    color: white;
    text-decoration: underline;
    text-underline-offset: 4px;
    text-decoration-color: var(--color-primary-600);
  }
  .link:hover {
    color: var(--primary-500);
    text-decoration-color: var(--color-primary-300);
  }
</style>

<template>
  <div class="flex items-center gap-1">
    <span class="text-primary-300">{{ label }} </span>
    <span class="font-semibold text-white">
      {{ value }}
    </span>
    <slot />
  </div>
</template>

<script setup lang="ts">
defineProps<{
  label?: string;
  value?: string | number;
}>();
</script>

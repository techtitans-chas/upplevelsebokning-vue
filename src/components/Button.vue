<template>
  <component
    :is="to ? RouterLink : 'button'"
    :to="to"
    class="btn flex items-center gap-3 rounded-full px-4 py-3 transition-all"
    bg="primary-500 hover:primary-400"
  >
    <Icon :icon="iconLeft" v-if="iconLeft" />
    <div class="text-white">
      <slot />
    </div>
    <Icon :icon="icon" v-if="icon" />
  </component>
</template>

<script setup lang="ts">
import { Icon } from "@iconify/vue";
import { RouterLink } from "vue-router";

defineProps<{
  to?: string
  icon?: string
  iconLeft?: string
}>();
</script>

<style scoped>
.btn {
  display: inline-flex;
}
</style>

<template>
  <div :class="wrapperClasses" class="input-wrapper" bg="white">
    <div class="flex items-center align-center text-black">
      <slot name="left" />
    </div>
    <input type="text" v-model="value" :class="inputClasses" text="black sm" />
    <div class="flex items-center align-center text-black">
      <slot name="right" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { twMerge } from "tailwind-merge";

const props = defineProps<{
  rightContent?: string
  class?: string
  inputClass?: string
}>();

const value = ref("");

const wrapperClasses = computed(() =>
  twMerge("rounded-full p-1 w-full flex", props.class)
);

const inputClasses = computed(() =>
  twMerge("w-full rounded-full py-2 px-4", props.inputClass)
);
</script>

<style scoped>
.input-wrapper {
  transition: outline 0.2s ease;
}

.input-wrapper:focus-within {
  outline: 2px solid var(--color-primary-500);
  outline-offset: 2px;
}

.input-wrapper input {
  outline: none;
}

.input-wrapper input:focus {
  outline: none;
}
</style>

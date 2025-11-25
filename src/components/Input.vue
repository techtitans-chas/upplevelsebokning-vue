<template>
  <div :class="wrapperClasses" class="input-wrapper" bg="white">
    <div class="flex items-center align-center text-black">
      <slot name="left" />
    </div>
    <input
      type="text"
      :value="modelValue"
      @input="
        $emit('update:modelValue', ($event.target as HTMLInputElement).value)
      "
      :class="inputClasses"
      :placeholder="placeholder"
      text="black sm"
    />
    <div class="flex items-center align-center text-black">
      <slot name="right" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { twMerge } from "tailwind-merge";

const props = defineProps<{
  modelValue?: string;
  placeholder?: string;
  rightContent?: string;
  class?: string;
  inputClass?: string;
}>();

defineEmits<{
  "update:modelValue": [value: string];
}>();

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

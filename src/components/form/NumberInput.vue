<template>
  <div :class="rootClasses">
    <div class="flex-1 flex flex-col items-center">
      <div
        :class="theme === 'dark' ? 'text-gray-300' : 'text-gray-500'"
        class="text-xs mb-1"
      >
        {{ label }}
      </div>
      <div class="flex items-center gap-3">
        <button
          @click="decrement"
          :disabled="modelValue <= min"
          bg="primary-100 hover:primary-200 disabled:gray-100"
          class="w-7 h-7 rounded-full disabled:cursor-not-allowed transition-colors flex items-center justify-center"
          type="button"
        >
          <Icon
            icon="fa-solid:minus"
            class="text-[.8rem]"
            :class="modelValue <= min ? 'text-gray-400' : 'text-primary-700'"
          />
        </button>

        <div class="w-5 text-center text-sm font-medium">
          {{ modelValue }}
        </div>

        <button
          @click="increment"
          :disabled="max !== undefined && modelValue >= max"
          bg="primary-100 hover:primary-200 disabled:gray-100"
          class="w-7 h-7 rounded-full disabled:cursor-not-allowed transition-colors flex items-center justify-center"
          type="button"
        >
          <Icon
            icon="fa-solid:plus"
            class="text-[.8rem]"
            :class="
              max !== undefined && modelValue >= max
                ? 'text-gray-400'
                : 'text-primary-700'
            "
          />
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { twMerge } from "tailwind-merge";
import { Icon } from "@iconify/vue";

const props = withDefaults(
  defineProps<{
    label: string;
    modelValue: number;
    min?: number;
    max?: number;
    theme?: "light" | "dark";
    class?: string;
  }>(),
  {
    min: 0,
  }
);

const rootClasses = computed(() =>
  twMerge(
    "flex gap-2 p-3 px-4 items-center rounded-sm h-full",
    props.theme === "dark" ? "text-white" : "text-gray-600",
    props.class
  )
);

const emit = defineEmits<{
  "update:modelValue": [value: number];
}>();

const increment = () => {
  if (props.max === undefined || props.modelValue < props.max) {
    emit("update:modelValue", props.modelValue + 1);
  }
};

const decrement = () => {
  if (props.modelValue > props.min) {
    emit("update:modelValue", props.modelValue - 1);
  }
};
</script>

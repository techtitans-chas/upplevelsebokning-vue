<template>
  <div
    class="flex gap-2 p-3 px-4 items-center bg-white rounded-sm color-gray-600 h-full"
  >
    <div class="flex-1 flex flex-col items-center">
      <div class="text-xs text-gray-500 mb-1">{{ label }}</div>
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
import { Icon } from "@iconify/vue";

const props = withDefaults(
  defineProps<{
    label: string;
    modelValue: number;
    min?: number;
    max?: number;
  }>(),
  {
    min: 0,
  }
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

<template>
  <div
    :class="classes"
    :style="bgImage ? `background-image: url(${bgImage})` : ''"
  >
    <div :class="bgColorClasses" />
    <div :class="innerClasses">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { twMerge } from "tailwind-merge";

const props = defineProps<{
  class?: string;
  title?: string;
  innerClass?: string;
  bgImage?: string;
  bgColor?: string;
  center?: boolean;
}>();

const classes = computed(() =>
  twMerge("relative bg-cover bg-center bg-fixed",
  props.center ? " flex flex-col items-center justify-center" : "",
  props.class)
);

const innerClasses = computed(() =>
  twMerge("relative max-w-4xl mx-auto px-4 py-14 z-20", props.innerClass)
);

const bgColorClasses = computed(() =>
  twMerge("absolute top-0 bottom-0 right-0 left-0 z-10", props.bgColor)
);
</script>

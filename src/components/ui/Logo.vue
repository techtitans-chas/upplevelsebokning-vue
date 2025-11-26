<template>
  <div :class="classes" @mouseenter="isHovered = true" @mouseleave="isHovered = false">
    <Icon icon="streamline-plump:hourglass-remix" :class="iconClasses" />
    <div class="flex flex-col items-center justify-center">
      <div :class="textClasses">Hourglass Adventures</div>
      <div class="bg-secondary-500 h-[2px] w-full scale-x-0 transition-all group-hover:scale-x-100" />
    </div>
    
  </div>
</template>

<script setup lang="ts">
import { twMerge } from "tailwind-merge";
import { Icon } from "@iconify/vue";
import { ref, computed } from "vue";

const props = defineProps<{
  class?: string;
  theme?: "light" | "dark";
  vertical?: boolean;
}>();

const isHovered = ref(false);

const classes = twMerge(
  "group flex items-center justify-center gap-[.5em] transition-all hover:scale-105",
  props.vertical ? "flex-col" : "flex-row"
);

const iconClasses = computed(() => twMerge(
  isHovered.value 
    ? "animate-[spin-180_0.6s_ease-in-out_forwards]"
    : "animate-[spin-180-reverse_0.6s_ease-in-out_forwards]",
  props.theme === "light" ? "text-secondary-500" : "text-secondary-400",
  props.vertical ? "text-[2em]": undefined
));

const textClasses = twMerge(
  "transition-all uppercase leading-relaxed font-semibold",
  props.theme === "light" ? "text-primary-500" : "text-white"
);
</script>

<template>
  <component :is="to ? RouterLink : 'button'" :to="to" :class="classes">
    <Icon :icon="iconLeft" v-if="iconLeft" />
    <div class="text-white">
      <slot />
    </div>
    <Icon :icon="icon" v-if="icon" />
  </component>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { RouterLink } from "vue-router";
import { twMerge } from "tailwind-merge";
import { Icon } from "@iconify/vue";

const props = defineProps<{
  to?: string;
  icon?: string;
  iconLeft?: string;
  class?: string;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  color?: "primary" | "secondary";
}>();

// Sizing classes
const sizeClasses = {
  xs: "text--[.7rem] px-2 py-1 gap-2",
  sm: "text-[.8rem] px-3 py-2 gap-2",
  md: "text-[.9rem] px-4 py-3",
  lg: "text-[1rem] px-5 py-4",
  xl: "text-[1.2rem] px-6 py-5",
};

// Extra padding on opposite side of icon
const iconPadding = {
  xs: { right: "pl-3", left: "pr-3" },
  sm: { right: "pl-4", left: "pr-4" },
  md: { right: "pl-5", left: "pr-5" },
  lg: { right: "pl-6", left: "pr-6" },
  xl: { right: "pl-7", left: "pr-7" },
};

const buttonColors = {
  primary: "bg-primary-500 hover:bg-primary-400 text-primary-300",
  secondary: "bg-secondary-500 hover:bg-secondary-400 text-secondary-300",
};

const classes = computed(() => {
  const size = props.size || "md";
  const padding =
    props.icon && !props.iconLeft
      ? iconPadding[size].right
      : props.iconLeft && !props.icon
      ? iconPadding[size].left
      : undefined;

  const color = props.color || "primary";

  return twMerge(
    "btn flex items-center justify-center gap-3 rounded-full transition-all font-medium leading-none uppercase",
    sizeClasses[size],
    buttonColors[color],
    padding,
    props.class
  );
});
</script>

<style scoped>
.btn {
  display: inline-flex;
  letter-spacing: 0.03em;
}
</style>

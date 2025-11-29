<template>
  <div :class="classes">
    <Icon :icon="icon" v-if="icon" :class="iconClass" />
    <slot />
  </div>
</template>

<script setup lang="ts">
import { twMerge } from "tailwind-merge";
import { Icon } from "@iconify/vue";

const props = defineProps<{
  class?: string;
  icon?: string;
  iconClass?: string;
}>();

const classes = twMerge(
  "bg-primary-500 rounded-full text-white font-regular flex justify-center items-center gap-1 leading-none py-[.2rem] px-[.5rem] text-sm",
  props.class
);
</script>

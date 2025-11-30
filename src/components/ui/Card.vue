<template>
  <div
    :class="classes"
    :style="bgImage ? `background-image:url(${bgImage})` : undefined"
  >
    <!-- Left image -->
    <div
      v-if="image && imagePosition !== 'right'"
      :class="imageClasses"
      :style="`background-image:url(${image})`"
    />
    <!-- Card content wrapper -->
    <div class="flex flex-col h-full w-full">
      <div v-if="$slots.header" :class="headerClasses">
        <slot name="header" />
      </div>
      <slot />
      <div v-if="$slots.content" :class="contentClasses">
        <slot name="content" />
      </div>
      <div v-if="$slots.footer" :class="footerClasses">
        <slot name="footer" />
      </div>
    </div>
    <!-- Right image -->
    <div
      v-if="image && imagePosition === 'right'"
      :class="imageClasses"
      :style="`background-image:url(${image})`"
    />
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { twMerge } from "tailwind-merge";

const props = defineProps<{
  class?: string;
  bgImage?: string;
  image?: string;
  imagePosition?: string;
  imageWidth?: string;
  headerClass?: string;
  contentClass?: string;
  footerClass?: string;
}>();

const classes = computed(() =>
  twMerge(
    "flex rounded-lg bg-white text-black overflow-hidden",
    props.bgImage ? "bg-cover bg-center" : undefined,
    props.class
  )
);

const headerClasses = computed(() => twMerge("p-2", props.headerClass));

const contentClasses = computed(() =>
  twMerge("p-2 flex-1 text-black", props.contentClass)
);

const footerClasses = computed(() => twMerge("p-2", props.footerClass));

const imageClasses = computed(() =>
  twMerge("bg-cover bg-center", props.imageWidth || "w-[400px]")
);
</script>

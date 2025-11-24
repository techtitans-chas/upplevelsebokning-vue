<template>
    <div>
        <div :class="classes">
            <slot /> 
        </div>

    </div>

</template>

<script setup lang="ts">
import { computed } from "vue";
import { twMerge } from "tailwind-merge";

const props = defineProps<{
    title?: string,
    innerClass?: string,
}>();

const classes = computed(() => 
  twMerge('max-w-4xl mx-auto p-4', props.innerClass)
);
</script>

<template>
  <Teleport to="body">
    <div :class="containerClasses.class" :style="containerClasses.style">
      <div :class="toastClasses">

        <!-- Content -->
        <div class="flex-1 flex flex-col gap-1">
          <div class="flex gap-1">
            <!-- Icon -->
            <div v-if="icon" class="flex-shrink-0">
              <Icon :icon="icon" class="text-lg" />
            </div>
            <div v-if="title" class="font-semibold text-sm">{{ title }}</div>
          </div>
          <div v-if="description" class="text-xs opacity-90">{{ description }}</div>
        </div>

        <!-- Close button -->
        <button v-if="closable" @click="close" class="flex-shrink-0 ml-2 hover:opacity-70 transition-opacity">
          <Icon icon="zondicons:close-outline" class="text-lg" />
        </button>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import { Icon } from "@iconify/vue";
import { twMerge } from "tailwind-merge";

type Position = "top" | "bottom";
type Alignment = "left" | "center" | "right";
type Variant = "default" | "success" | "error" | "warning" | "info";

const props = withDefaults(
  defineProps<{
    title?: string;
    description?: string;
    icon?: string;
    position?: Position;
    alignment?: Alignment;
    variant?: Variant;
    duration?: number;
    closable?: boolean;
    class?: string;
    index?: number;
  }>(),
  {
    position: "bottom",
    alignment: "center",
    variant: "default",
    duration: 3000,
    closable: true,
    index: 0,
  }
);

const emit = defineEmits<{
  close: [];
}>();

const isClosing = ref(false);

// Position classes
const positionClasses = computed(() => {
  const base = "fixed left-0 right-0 mx-auto pointer-events-none z-50";

  const alignmentMap = {
    left: "ml-4",
    center: "mx-auto",
    right: "mr-4",
  };

  const maxWidth = {
    left: "max-w-sm w-full",
    center: "max-w-sm",
    right: "max-w-sm w-full",
  };

  const baseClasses = twMerge(base, alignmentMap[props.alignment], maxWidth[props.alignment]);
  
  // Calculate position for stacking
  // Newest toast (index 0) stays at base position
  // Older toasts (higher index) are pushed away
  const basePositionValue = 16; // 1rem in pixels (from Tailwind's top-4/bottom-4)
  const stackOffset = props.index * 6; // 12px offset per older toast
  
  const positionValue = basePositionValue + stackOffset;
  
  // Calculate opacity: newest at 1, decreases by 0.15 per older toast
  const opacity = Math.max(0.4, 1 - props.index * 0.15);

  return {
    class: baseClasses,
    style: {
      [props.position]: `${positionValue}px`,
      opacity,
    },
  };
});

// Variant styles
const variantClasses = computed(() => {
  const variants: Record<Variant, string> = {
    default: "bg-white text-primary-500 border border-primary-700/30",
    success: "bg-green-100 text-green-700 border border-green-700/30",
    error: "bg-red-100 text-red-700 border border-red-700/30",
    warning: "bg-yellow-100 text-yellow-700 border border-yellow-700/30",
    info: "bg-white text-primary-500 border border-primary-700/30",
  };

  return variants[props.variant];
});

// Toast classes with animations
const toastClasses = computed(() => {
  const baseClasses = "flex items-start gap-3 p-3 rounded-sm shadow-lg pointer-events-auto";

  if (isClosing.value) {
    return twMerge(
      baseClasses,
      variantClasses.value,
      "animate-toast-exit",
      props.class
    );
  }

  const enterAnimation = props.position === "top" ? "animate-toast-enter-top" : "animate-toast-enter-bottom";

  return twMerge(
    baseClasses,
    variantClasses.value,
    enterAnimation,
    props.class
  );
});

// Container for positioning
const containerClasses = positionClasses;

const close = () => {
  isClosing.value = true;
  setTimeout(() => {
    emit("close");
  }, 300);
};

onMounted(() => {
  if (props.duration && props.duration > 0) {
    setTimeout(() => {
      close();
    }, props.duration);
  }
});

defineExpose({ close });
</script>

<style scoped>
/* Smooth transition for position and opacity changes when stacking */
div[style*="top:"],
div[style*="bottom:"] {
  transition: top 0.3s ease-out, bottom 0.3s ease-out, opacity 0.3s ease-out;
}

/* Animations for toast - slide up from bottom or down from top */
@keyframes toastEnterBottom {
  from {
    transform: translateY(25%);
    opacity: 0;
  }

  to {
    transform: translateY(0);
    opacity: 1;
  }
}

@keyframes toastEnterTop {
  from {
    transform: translateY(-25%);
    opacity: 0;
  }

  to {
    transform: translateY(0);
    opacity: 1;
  }
}

@keyframes toastExit {
  from {
    transform: translateY(0);
    opacity: 1;
  }

  to {
    transform: translateY(15%);
    opacity: 0;
  }
}

/* Use CSS variables for different positions */
.animate-toast-enter-bottom {
  animation: toastEnterBottom 0.3s ease-out forwards;
}

.animate-toast-enter-top {
  animation: toastEnterTop 0.3s ease-out forwards;
}

.animate-toast-exit {
  animation: toastExit 0.3s ease-in forwards;
}
</style>

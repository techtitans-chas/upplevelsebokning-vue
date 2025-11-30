<template>
  <Teleport to="body">
    <div
      v-if="isOpen"
      :class="{ 'modal-container-closing': isClosing }"
      class="modal-container"
    >
      <div class="modal-backdrop" @click="handleBackdropClick" />
      <div :class="dialogClasses" @click.stop class="modal-card-wrapper">
        <div class="flex justify-between p-4 pb-2">
          <div class="text-sm font-semibold pl-2">
            <span v-if="title">{{ title }}</span>
          </div>
          <button
            @click="closeDialog"
            class="dialog-close-btn transition-all hover:text-primary-500"
          >
            <Icon icon="zondicons:close-outline" />
          </button>
        </div>
        <div v-if="$slots.header">
          <slot name="header" />
        </div>
        <div
          v-if="$slots.default"
          :class="{ 'pb-6': !actions }"
          class="p-6 py-2 w-full font-regular overflow-auto flex-1"
        >
          <slot />
        </div>
        <div v-if="$slots.footer || actions" class="p-2">
          <slot name="footer" />
          <div v-if="actions" :class="actionsClasses">
            <Button
              v-for="(b, i) in actions"
              :key="b.title + i"
              @click="b.action"
              :icon="b.icon || undefined"
              :leftIcon="b.iconLeft || undefined"
              size="sm"
              :class="getActionBtnClasses(b.class || '')"
              >{{ b.title }}</Button
            >
          </div>
        </div>
      </div>
    </div>
  </Teleport>
  <div @click="openDialog" class="inline-block">
    <slot name="trigger">
      <Button>Show dialog</Button>
    </slot>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from "vue";
import { Icon } from "@iconify/vue";
import { twMerge } from "tailwind-merge";
import Button from "./Button.vue";

interface Action {
  title: string;
  icon?: string;
  iconLeft?: string;
  action?: () => void;
  class?: string;
}

const props = defineProps<{
  title?: string;
  size?: "fit" | "sm" | "md" | "lg" | "xl";
  class?: string;
  actions?: Action[];
  actionsClass?: string;
}>();

const isOpen = ref(false);
const isClosing = ref(false);

const dialogClasses = computed(() => {
  const sizes: Record<string, string> = {
    fit: "",
    sm: "w-full max-w-md max-h-md",
    md: "w-full max-w-xl max-h-xl",
    lg: "w-full max-w-2xl max-h-2xl",
    xl: "w-full max-w-3xl max-h-3xl",
  };

  return twMerge(
    "bg-white text-black rounded-sm overflow-hidden flex flex-col modal-card",
    sizes[props.size || "fit"],
    props.class
  );
});

const actionsClasses = computed(() =>
  twMerge("flex gap-2", props.actionsClass)
);

const getActionBtnClasses = (newClasses: string) =>
  twMerge("text-xs", newClasses);

const openDialog = () => {
  isOpen.value = true;
  isClosing.value = false;
  document.body.style.overflow = "hidden";
};

const closeDialog = () => {
  isClosing.value = true;
  setTimeout(() => {
    isOpen.value = false;
    document.body.style.overflow = "";
  }, 300);
};

const handleBackdropClick = () => closeDialog();

const handleEscape = (e: KeyboardEvent) => {
  if (e.key === "Escape" && isOpen.value) closeDialog();
};

onMounted(() => document.addEventListener("keydown", handleEscape));
onUnmounted(() => document.removeEventListener("keydown", handleEscape));

// Example usage of exposed closeDialog function:
// const modalRef = ref();
// const actionButtons = [
//   { title: "Cancel", action: () => modalRef.value?.closeDialog() },
// ];
defineExpose({ closeDialog });
</script>

<style scoped>
.modal-container {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 9998;
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: none;
}

.modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: var(--color-primary-900);
  opacity: 0;
  animation: fadeInBackdrop 0.3s ease-in-out forwards;
  z-index: 9998;
  pointer-events: auto;
}

.modal-container-closing .modal-backdrop {
  animation: fadeOutBackdrop 0.3s ease-in-out forwards;
}

.modal-card-wrapper {
  position: relative;
  z-index: 9999;
  pointer-events: auto;
  opacity: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  max-height: 90vh;
  animation: fadeIn 0.3s ease-in-out forwards;
}

.modal-container-closing .modal-card-wrapper {
  animation: fadeOut 0.3s ease-in-out forwards;
}

.dialog-close-btn {
  display: flex;
  justify-content: center;
  align-items: center;
  background: none;
  border: none;
  cursor: pointer;
  color: inherit;
}
</style>

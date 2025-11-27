<template>
  <Teleport to="body">
    <div>
      <Toast
        v-for="(toast, arrayIndex) in toasts"
        :key="toast.id"
        :title="toast.title"
        :description="toast.description"
        :icon="toast.icon"
        :position="toast.position"
        :alignment="toast.alignment"
        :variant="toast.variant"
        :duration="toast.duration"
        :closable="toast.closable"
        :index="toasts.length - 1 - arrayIndex"
        @close="removeToast(toast.id)"
      />
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { useToast } from "@/composables/useToast";
import Toast from "./Toast.vue";

const { toasts, remove: removeToast } = useToast();
</script>

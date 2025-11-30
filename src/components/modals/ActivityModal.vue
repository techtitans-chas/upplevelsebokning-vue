<template>
  <Modal :title="data.title">
    <template #trigger>
      <div
        class="flex items-center gap-2 hover:cursor-pointer hover:underline hover:underline-offset-2"
      >
        <div class="font-semibold">{{ data.title }}</div>
        <Icon icon="ep:info-filled" />
      </div>
    </template>
    {{ data.description }}
  </Modal>
</template>

<script setup lang="ts">
import type { Activity } from "@/types";
import Modal from "@/components/ui/Modal.vue";
import { Icon } from "@iconify/vue";

defineProps<{
  data: Activity;
}>();
</script>

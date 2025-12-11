<template>
  <Modal :title="data.title">
    <template #trigger>
      <div class="flex items-center gap-2 hover:cursor-pointer hover:underline hover:underline-offset-2">
        <div class="font-semibold">{{ data.title }}</div>
        <Icon icon="ep:info-filled" />
      </div>
    </template>

    <div class="grid sm:grid-cols-[2fr_1fr] max-w-xl gap-6">
      <div>
        <p>{{ data.description }}</p>
        <div class="flex gap-2">
          <Badge>Duration: {{ data.duration }}</Badge>
          <Badge>Group size: {{ data.groupSize }}</Badge>
          <Badge>Ages: {{ data.ageGroup }}</Badge>
        </div>

      </div>
      <div class="grid gap-2  max-sm:grid-cols-2">
        <div>
          <div class="font-bold">Requirements</div>
          <ul class="list-disc text-sm ml-4">
            <li v-for="i in data.requirements" :key="i">{{ i }}</li>
          </ul>
        </div>
        <div>
          <div class="font-bold">Included</div>
          <ul class="list-disc text-sm ml-4">
            <li v-for="i in data.included" :key="i">{{ i }}</li>
          </ul>
        </div>
      </div>
    </div>

    <hr class="border-t-1 border-gray-300 mt-8" />
    <h3 class="text-center mt-4 text-black">Reviews</h3>

    <div class="grid grid-cols-1 sm:grid-cols-2 grid-rows-[auto_auto_auto] sm:gap-x-4 sm:gap-y-2 max-w-lg mx-auto px-2">
      <ReviewList :data="data.reviews" class="text-sm" />
    </div>

  </Modal>
</template>

<script setup lang="ts">
import type { Activity } from "@/types";
import Modal from "@/components/ui/Modal.vue"
import Badge from "@/components/ui/Badge.vue";
import ReviewList from "@/components/ui/ReviewList.vue";
import { Icon } from "@iconify/vue";

defineProps<{
  data: Activity;
}>();
</script>

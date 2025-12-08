<template>
  <Modal :title="data.title" size="lg">
    <template #trigger>
      <div
        class="flex items-center gap-2 hover:cursor-pointer hover:underline hover:underline-offset-2"
      >
        <div class="font-semibold">{{ data.title }}</div>
        <Icon icon="ep:info-filled" />
      </div>
    </template>

    <div class="flex gap-4">
      <div
        class="min-w-xs bg-cover rounded-sm"
        :style="`background-image:url(${data.coverImage})`"
      />
      <div>
        <p>{{ data.description }}</p>

        <ul class="ml-4 mt-4">
          <li
            v-for="amenity in data.amenities"
            :key="amenity.title"
            class="flex items-center gap-2 text-sm text-gray-500"
          >
            <Icon :icon="amenity.icon" />
            <div>{{ amenity.title }}</div>
          </li>
        </ul>

        <div class="text-right font-semibold mt-6 text-primary-500">
          ${{ data.pricePerNight }} per night
        </div>
      </div>
    </div>

    <hr class="border-t-1 border-gray-300 mt-8" />
    <h3 class="text-center mt-4 text-black">Reviews</h3>

    <div
      class="grid grid-cols-1 sm:grid-cols-2 grid-rows-[auto_auto_auto] sm:gap-x-4 sm:gap-y-2 max-w-lg mx-auto px-2"
    >
      <ReviewList :data="data.reviews" class="text-sm" />
    </div>
  </Modal>
</template>

<script setup lang="ts">
import type { Accommodation } from "@/types";
import Modal from "@/components/ui/Modal.vue";
import ReviewList from "@/components/ui/ReviewList.vue";
import { Icon } from "@iconify/vue";

defineProps<{
  data: Accommodation;
}>();
</script>

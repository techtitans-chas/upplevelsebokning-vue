<template>
  <div v-if="destination">
    <Section class="min-h-[400px]" bg-color="bg-black/60" :bg-image="destination.coverImage
        ? destination.coverImage
        : '/images/placeholder.jpg'
      ">
      <div class="w-full">
        <div class="grid">
          <div class="flex items-center gap-4">
            <h1 class="mb-0">{{ destination.title }}</h1>
            <div class="flex flex-col items-center">
              <div class="text-xs">Time period</div>
              <Badge class="!text-[.7rem]">{{ destination.timePeriod }}</Badge>
            </div>
          </div>
          <div class="font-semibold italic text-xl mb-3">{{ destination.location }}</div>
        </div>

        <!-- Description -->
        <div class="grid gap-2 pb-6 pt-0 items-start">
          <div v-if="destination.description" class="text-white mb-2 max-w-lg">
            {{ destination.description }}
          </div>
          <div v-if="destination.climate" class="text-primary-200 w-fit">
            <Badge class="bg-primary-950" icon="tabler:sun">{{ destination.climate }}</Badge>
          </div>
          <div class="mt-6 font-semibold">Travel Tips</div>
          <ul class="pb-6 ml-8 list-disc">
            <li v-for="tip in destination.travelTips" :key="tip">{{ tip }}</li>
          </ul>
        </div>
        <!-- Button to booking page -->
        <Button :to="`/booking/${destination.id}`" icon="fa7-solid:arrow-right">
          Book your journey
        </Button>
      </div>
    </Section>
    <!-- Reviews -->
    <Section class="p-10 pt-6">
      <h2 class="text-center mb-8">Reviews</h2>

      <div class="grid grid-cols-1 sm:grid-cols-2 grid-rows-[auto_auto_auto] sm:gap-x-4 sm:gap-y-2 max-w-lg mx-auto px-2">
        <ReviewList :data="destination.reviews" />
      </div>
    </Section>
  </div>
  <Section v-else>
    <h1>Destination not found</h1>
  </Section>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useRoute } from "vue-router";
import { useDestinationStore } from "@/stores/destination";
import Section from "@/components/layout/Section.vue";
import Button from "@/components/ui/Button.vue";
import Badge from "@/components/ui/Badge.vue";
import ReviewList from "@/components/ui/ReviewList.vue";
import { Icon } from "@iconify/vue";

const route = useRoute();
const destinationStore = useDestinationStore();

const destination = computed(() => {
  const id = route.params.id as string;
  return destinationStore.getById(id);
});
</script>

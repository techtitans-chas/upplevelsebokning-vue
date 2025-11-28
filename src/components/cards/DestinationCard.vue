<template>
  <Card :bg-image="data.coverImage || '/images/placeholder-2.jpg'"
    class="relative transition-all min-h-[220px] hover:cursor-pointer border hover:border-white"
    contentClass="flex items-center justify-center"
    footerClass="z-10 flex justify-center"
    headerClass="z-20 flex justify-end">
    <div class="absolute z-10 top-0 bottom-0 left-0 right-0 bg-black/30" />

    <template #header>
      <Badge class="!text-[.7rem] bg-primary-700" icon="material-symbols:star-rounded"
        icon-class="text-secondary-300">
        {{ destinationStore.getAverageRating(data.id) }}
      </Badge>
    </template>

    <template #content>
      <div class="relative z-20 flex flex-col gap-2 items-center select-none">
        <div class="text-white font-semibold text-shadow-sm text-shadow-black/40">
          {{ data.title }}
        </div>
        <Button size="sm" icon="mingcute:arrow-right-fill">Read more</Button>
      </div>
    </template>

    <template #footer>
      <div class="flex gap-1 mt-4">
        <Badge class="!text-[.7rem] bg-primary-950" icon="mdi:bed">{{ destinationStore.getAccommodationAmount(data.id) }} hotels</Badge>
        <Badge class="!text-[.7rem] bg-primary-950" icon="bx:walk">{{ destinationStore.getActivityAmount(data.id) }} activities</Badge>
      </div>
    </template>
  </Card>
</template>

<script setup lang="ts">
import type { Destination } from "@/types";
import Card from "@/components/ui/Card.vue";
import Button from "@/components/ui/Button.vue";
import { useDestinationStore } from "@/stores";
import Badge from "../ui/Badge.vue";


defineProps<{
  data: Destination;
}>();

const destinationStore = useDestinationStore();
</script>

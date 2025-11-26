<template>
  <Card
    :bg-image="data.coverImage || '/images/placeholder-2.jpg'"
    class="relative transition-all min-h-[200px] hover:cursor-pointer border hover:border-white"
    contentClass="flex items-center justify-center"
  >
  <div class="absolute z-10 top-0 bottom-0 left-0 right-0 bg-black/30" />
    <template #content>
      <div class="relative z-20 flex flex-col gap-2 items-center select-none">
        <div class="text-white font-semibold text-shadow-sm text-shadow-black/40">
          {{ data.title }}
        </div>
        <Button size="sm" icon="mingcute:arrow-right-fill">Read more</Button>
      </div>
    </template>

    <!-- <template #footer>
      4 accomodations
    </template> -->
  </Card>
</template>

<script setup lang="ts">
import type { Destination } from "@/types";
import Card from "./Card.vue";
import Button from "./Button.vue";

defineProps<{
  data: Destination
}>();
</script>

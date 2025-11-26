<template>
  <Card :image="data.thumbnail ? data.thumbnail : '/images/placeholder.jpg'">
    <template #header>
      <div class="font-semibold">
        {{ data.title }}
      </div>
    </template>
    <template #content>
      <p>{{ data.description }}</p>
      <div class="flex justify-between items-center mt-4">
        <div class="flex justify-between items-center gap-2">
          <Badge class="bg-secondary-400"
            >{{ data.pricePerNight }}$ per night</Badge
          >
          <Badge class="text-[.7rem]" v-for="amenity in data.amenities">
            <Icon :icon="amenity.icon" />
            {{ amenity.title }}
          </Badge>
        </div>
        <div>
          <Button size="sm" @click="order">Book now</Button>
        </div>
      </div>
    </template>
  </Card>
</template>

<script setup lang="ts">
import Button from "@/components/ui/Button.vue";
import Card from "@/components/ui/Card.vue";
import type { Accommodation } from "@/types";
import Badge from "@/components/ui/Badge.vue";
import { Icon } from "@iconify/vue";

defineProps<{
  data: Accommodation;
}>();

function order() {
  cart.addItem(destination.value);
  router.push("/cart");
}
</script>

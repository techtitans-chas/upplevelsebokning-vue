<template>
  <Card :image="data.thumbnail ? data.thumbnail : '/images/placeholder.jpg'">
    <template #header>
      {{ data.title }}
    </template>
    <template #content>
      <p>{{ data.description }}</p>
      <!-- Number of People -->
      <div class="flex items-center gap-4 justify-between">
        <NumberInput
          label="Number of people"
          v-model="numberOfPeople"
          :min="1"
          :max="20"
        />
        <Button size="sm" @click="order">Book now</Button>
      </div>
    </template>
  </Card>
</template>

<script setup lang="ts">
import Card from "./Card.vue";
import Button from "./Button.vue";
import NumberInput from "./NumberInput.vue";
import type { Accommodation } from "@/types";
import { ref } from "vue";

const numberOfPeople = ref(1);

defineProps<{
  data: Accommodation;
}>();

function order() {
  cart.addItem(destination.value);
  router.push("/cart");
}
</script>

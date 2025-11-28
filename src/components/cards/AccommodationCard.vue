<template>
  <Card
    :image="data.thumbnail ? data.thumbnail : '/images/placeholder.jpg'"
    :class="isInCart ? 'opacity-50' : ''"
  >
    <template #header>
      <div class="font-semibold">
        {{ data.title }}
      </div>
    </template>
    <template #content>
      <p>{{ data.description }}</p>
      <div class="flex justify-between items-center mt-4">
        <div class="flex justify-between items-center gap-2">
          <Badge class="bg-secondary-400">{{ data.pricePerNight }}$ per night</Badge>
          <Badge class="text-[.7rem]" v-for="amenity in data.amenities" :icon="amenity.icon">
            {{ amenity.title }}
          </Badge>
        </div>
      </div>
      <div class="mt-4">
        <NumberInput
          label="Number of guests"
          v-model="numberOfGuests"
          :min="1"
        />
      </div>
      <div class="mt-4 flex justify-end">
        <Button size="sm" @click="order(data)">
          {{ isInCart ? "Selected" : "Book now" }}
        </Button>
      </div>
    </template>
  </Card>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import Button from "@/components/ui/Button.vue";
import Card from "@/components/ui/Card.vue";
import type { Accommodation } from "@/types";
import Badge from "@/components/ui/Badge.vue";
import NumberInput from "@/components/form/NumberInput.vue";
import { Icon } from "@iconify/vue";
import { useCartStore } from "@/stores/cart";
import { useDestinationStore } from "@/stores/destination";
import { useSessionStore } from "@/stores/session";

const props = defineProps<{
  data: Accommodation;
}>();

const cart = useCartStore();
const destinationStore = useDestinationStore();
const session = useSessionStore();
const numberOfGuests = ref(1);

const isInCart = computed(() => {
  const cartItem = cart.items.find(
    (item) => item.destinationId === props.data.destinationId
  );
  if (!cartItem) return false;
  return cartItem.accommodations.some(
    (ca) => ca.accommodation.id === props.data.id
  );
});

function order(acc: Accommodation) {
  if (!session.departureDate || !session.returnDate) {
    alert("Please select dates before booking");
    return;
  }

  cart.addAccommodation(acc.destinationId, acc, numberOfGuests.value, destinationStore.getById(props.data.destinationId)?.price);
  numberOfGuests.value = 1; // Reset for next booking

  // Scroll to activities section
  const activitiesSection = document.getElementById("activities-section");
  if (activitiesSection) {
    activitiesSection.scrollIntoView({ behavior: "smooth" });
  }
}
</script>

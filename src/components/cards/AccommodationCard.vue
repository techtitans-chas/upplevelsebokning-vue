<template>
  <Card
    :image="data.coverImage ? data.coverImage : '/images/placeholder.jpg'"
    imageWidth="w-[600px]"
    :class="isInCart ? 'opacity-50' : ''"
  >
    <template #header>
      <div>
        <AccommodationModal :data="data" />
      </div>
    </template>
    <template #content>
      <div class="text-sm">{{ data.description }}</div>
      <div class="flex justify-end items-center mt-2">
        <Badge class="bg-secondary-400">
          {{ data.pricePerNight }}$ per night
        </Badge>
        <NumberInput
          label="Number of guests"
          v-model="numberOfGuests"
          :min="1"
          class="pt-0"
        />
        <Button size="sm" @click="order(data)" class="mt-2">
          {{ isInCart ? "Selected" : "Book now" }}
        </Button>
      </div>
    </template>
  </Card>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import type { Accommodation } from "@/types";
import { useSessionStore } from "@/stores/session";
import { useDestinationStore } from "@/stores/destination";
import { useCartStore } from "@/stores/cart";
import Button from "@/components/ui/Button.vue";
import Card from "@/components/ui/Card.vue";
import Badge from "@/components/ui/Badge.vue";
import AccommodationModal from "@/components/modals/AccommodationModal.vue";
import NumberInput from "@/components/form/NumberInput.vue";

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

  cart.addAccommodation(
    acc.destinationId,
    acc,
    numberOfGuests.value,
    destinationStore.getById(props.data.destinationId)?.price
  );
  numberOfGuests.value = 1; // Reset for next booking

  // Scroll to activities section
  const activitiesSection = document.getElementById("activities-section");
  if (activitiesSection) {
    activitiesSection.scrollIntoView({ behavior: "smooth" });
  }
}
</script>

<template>
  <div v-if="destination">
    <Section>
      <h1 font="bold" text="4xl" class="mb-6">Booking</h1>
      <div class="flex gap-6" text="2xl">
        <div>{{ destination.title }}</div>
        <div>{{ destination.price }} SEK</div>
      </div>

      <Dropdown
        label="Date"
        placeholder="Select dates"
        v-model="dateRangeDisplay"
      >
        <template #content>
          <div class="p-4 gap-3">
            <div>
              <label class="text-xs text-gray-500 block mb-1">Start Date</label>
              <input
                type="date"
                v-model="departureDate"
                class="w-full p-2 border border-gray-300 rounded text-sm"
              />
            </div>
            <div>
              <label class="text-xs text-gray-500 block mb-1">End Date</label>
              <input
                type="date"
                v-model="returnDate"
                :min="departureDate"
                class="w-full p-2 border border-gray-300 rounded text-sm"
              />
            </div>
          </div>
        </template>
      </Dropdown>

      <RouterLink to="/cart">
        <Button @click="order"> Order and go to cart </Button>
      </RouterLink>
    </Section>

    <!-- Accommodations -->
    <Section>
      <h2>Accommodations</h2>

      <div v-if="accommodations.length > 0" class="grid gap-2">
        <AccommodationCard
          v-for="acc in accommodations"
          :key="acc.id"
          :data="acc"
        />
      </div>
      <div v-else>No accommodations available.</div>
    </Section>
  </div>
  <Section v-else>
    <h1>Destination not found</h1>
  </Section>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useDestinationStore } from "@/stores/destination";
import { useAccommodationStore } from "@/stores/accommodation";
import { useCartStore } from "@/stores/cart";
import { useSessionStore } from "@/stores/session";
import Section from "@/components/Section.vue";
import Button from "@/components/Button.vue";
import Dropdown from "@/components/Dropdown.vue";
import AccommodationCard from "@/components/AccommodationCard.vue";

const route = useRoute();
const router = useRouter();

const destinationStore = useDestinationStore();
const accommodationStore = useAccommodationStore();
const sessionStore = useSessionStore();
const cart = useCartStore();

const destination = computed(() => {
  const id = route.params.id as string;
  return destinationStore.getById(id);
});

const accommodations = computed(() => {
  const id = route.params.id as string;
  return accommodationStore.getByDestination(id);
});

const departureDate = computed({
  get: () => sessionStore.departureDate,
  set: (value) => (sessionStore.departureDate = value),
});

const returnDate = computed({
  get: () => sessionStore.returnDate,
  set: (value) => (sessionStore.returnDate = value),
});

const dateRangeDisplay = computed(() => {
  if (departureDate.value && returnDate.value)
    return `${departureDate.value} - ${returnDate.value}`;
  else if (departureDate.value) return departureDate.value;
  return "";
});

function order() {
  cart.addItem(destination.value);
  router.push("/cart");
}
</script>

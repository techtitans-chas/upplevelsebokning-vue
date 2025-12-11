<template>
  <div v-if="destination">
    <Section bg-color="bg-black/60" :bg-image="destination.coverImage
      ? destination.coverImage
      : '/images/placeholder.jpg'
    ">
      <h1><span class="text-white text-3xl">Book your trip to</span><br/>{{ destination.title }}</h1>
      
      <div class="grid gap-4 justify-start">
        <div class="bg-primary-600 inline-block text-white rounded-full px-3 py-2 text-center">
          Wormhole fee: ${{ destination.price }}
        </div>
        <DateDropdown />
      </div>

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
      <div v-else>No accommodations available for your chosen dates.</div>
    </Section>

    <!-- Activities -->
    <Section id="activities-section">
      <h2>Activities</h2>

      <div v-if="activities.length > 0" class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        <ActivityCard
          v-for="activitity in activities"
          :key="activitity.id"
          :data="activitity"
        />
      </div>
      <div v-else>No activities available for your chosen dates.</div>

      <!-- Go to Cart Button -->
      <div v-if="cart.items.length > 0" class="mt-6 flex justify-center">
        <Button to="/cart">Go to Cart</Button>
      </div>
    </Section>
  </div>
  <Section v-else>
    <h1>Destination not found</h1>
  </Section>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useDestinationStore } from "@/stores/destination";
import { useAccommodationStore } from "@/stores/accommodation";
import { useActivityStore } from "@/stores/activity";
import { useCartStore } from "@/stores/cart";
import Section from "@/components/layout/Section.vue";
import DateDropdown from "@/components/form/DateDropdown.vue";
import AccommodationCard from "@/components/cards/AccommodationCard.vue";
import ActivityCard from "@/components/cards/ActivityCard.vue";
import Button from "@/components/ui/Button.vue";

const props = defineProps<{
  id: string;
}>();

const destinationStore = useDestinationStore();
const accommodationStore = useAccommodationStore();
const activityStore = useActivityStore();
const cart = useCartStore();
// const numberOfPeople = ref(1);

const destination = computed(() => destinationStore.getById(props.id));
const accommodations = computed(() => accommodationStore.getByDestination(props.id));
const activities = computed(() => activityStore.getByDestination(props.id));
</script>

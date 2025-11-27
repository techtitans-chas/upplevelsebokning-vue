<template>
  <Section center bg-image="/images/placeholder.jpg" bg-color="bg-primary-950/70" class="bg-fixed min-h-[500px]" inner-class="w-full">
    <h1 class="leading-snug mb-6"><span class="text-white">Welcome to</span><br /> Hourglass Adventures</h1>
    <p class="text-xl mb-8 max-w-xl">Embark on extraordinary journeys through time. Explore ancient civilizations,
      witness pivotal moments in history, and experience unforgettable nights in the heart of bygone eras.</p>
    <Button color="secondary" size="lg" to="/search" icon="streamline-plump:hourglass-remix">Browse our destinations</Button>
  </Section>
  <Section class="p-6">
    <!-- <Modal title="My modal" :actions="actionButtons">
      Here's a modal!
      <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
    </Modal> -->

    <h2 class="sr-only">Search</h2>

    <SearchForm />
  </Section>
  <Section bg-image="/images/placeholder-2.jpg" bg-color="bg-primary-950/70" class="p-8">
    <h2 class="text-center">Featured destinations</h2>
    <div class="grid grid-cols-[1fr_1fr_1fr] gap-4">
      <DestinationCard v-for="item in destinations.data" :key="item.id" :data="item"
        @click="router.push(`/destination/${item.id}`)" />
    </div>
  </Section>
  <Section class="p-12 text-center">
    <h2>Step beyond the boundaries of time itself.</h2>
    <p class="mb-4">
      Hourglass Adventures offers extraordinary journeys through history,
      allowing you to experience iconic moments and immerse yourself in distant eras. Whether you dream of walking
      through ancient civilizations, witnessing pivotal historical events, or exploring the customs of a bygone age, we
      make the impossible possible. Book your time travel expedition today and spend unforgettable nights in the heart
      of history.
    </p>
  </Section>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import SearchForm from "@/components/form/SearchForm.vue";
import Section from "@/components/layout/Section.vue";
import DestinationCard from "@/components/cards/DestinationCard.vue";
import { useDestinationStore } from "@/stores/destination";
import Button from "@/components/ui/Button.vue";

const router = useRouter();

const destinations = useDestinationStore();

const actionButtons = [
  { title: "Cancel", icon: "mdi:cross", action: () => console.log("Cancel") },
  { title: "Accept", action: () => console.log("Accept") },
];
</script>

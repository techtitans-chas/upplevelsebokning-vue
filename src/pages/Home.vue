<template>
  <Section center bg-image="/images/placeholder.jpg" bg-color="bg-primary-950/70" class="bg-fixed min-h-[500px] p-8"
    inner-class="w-full">
    <div class="grid grid-cols-1 max-md:text-center md:grid-cols-[4fr_3fr] items-center justify-center">
      <div>
        <h1 class="leading-snug mb-6"><span class="text-white">Welcome to</span><br /> Hourglass Adventures</h1>
        <p class="text-xl mb-8 max-w-xl">Embark on extraordinary journeys through time. Explore ancient civilizations,
          witness pivotal moments in history, and experience unforgettable nights in the heart of bygone eras.</p>
          <Button color="secondary" size="lg" to="/search" icon="streamline-plump:hourglass-remix">Explore our
            destinations</Button>
      </div>
      <div class="max-md:order-first"><img src="/images/mascot-1.png" class="w-full mx-auto max-w-[440px]" /></div>
    </div>
  </Section>
  <Section inner-class="py-12">
    <!-- <Modal title="My modal" :actions="actionButtons">
      Here's a modal!
      <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
    </Modal> -->

    <h2 class="sr-only">Search</h2>
    <SearchForm />
  </Section>

  <!-- Featured destinations -->
  <Section bg-image="/images/placeholder-2.jpg" bg-color="bg-primary-950/70">
    <h2 class="text-center">Featured destinations</h2>
    <div class="grid grid-cols-[1fr_1fr_1fr] gap-4">
      <DestinationCard v-for="item in destinationStore.getByTag('featured')" :key="item.id" :data="item"
        @click="router.push(`/destination/${item.id}`)" />
    </div>
  </Section>

  <!-- Contact -->
  <Section class="text-center" inner-class="max-w-2xl">
    <h2>Step beyond the boundaries of time itself.</h2>
    <p class="mb-4">
      Hourglass Adventures offers extraordinary journeys through history,
      allowing you to experience iconic moments and immerse yourself in distant eras. Whether you dream of walking
      through ancient civilizations, witnessing pivotal historical events, or exploring the customs of a bygone age, we
      make the impossible possible. Book your time travel expedition today and spend unforgettable nights in the heart
      of history.
    </p>
    <Button @click="contact"
      ref="contactButton"
      :icon="loadingComms ? 'line-md:loading-twotone-loop' : 'bi:chat-fill'"
      size="lg"
      :class="`hover:cursor-pointer transition-all ${isBouncing ? 'animate-bounce' : ''}`"
    >
      Contact us
    </Button>
  </Section>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import SearchForm from "@/components/form/SearchForm.vue";
import Section from "@/components/layout/Section.vue";
import DestinationCard from "@/components/cards/DestinationCard.vue";
import { useDestinationStore } from "@/stores/destination";
import Button from "@/components/ui/Button.vue";
import { useToast } from "@/composables/useToast";

const router = useRouter();
const destinationStore = useDestinationStore();
const { error } = useToast();

const loadingComms = ref(false);
const isBouncing = ref(false);

const actionButtons = [
  { title: "Cancel", icon: "mdi:cross", action: () => console.log("Cancel") },
  { title: "Accept", action: () => console.log("Accept") },
];

const contact = () => {
  loadingComms.value = true;

  setTimeout(() => {
    loadingComms.value = false;
    isBouncing.value = true;
    setTimeout(() => isBouncing.value = false, 600);
    error("Failed to establish wormhole connection", "Please try again later.");
  }, 2000);
}
</script>

<style scoped>
@keyframes bounce {
  0%, 100% {
    transform: translateY(0);
  }
  25% {
    transform: translateY(-12px);
  }
  50% {
    transform: translateY(0);
  }
  75% {
    transform: translateY(-6px);
  }
}

.animate-bounce {
  animation: bounce 0.6s ease-in-out;
}
</style>

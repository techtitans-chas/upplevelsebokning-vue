<template>
  <Section
    bg-image="/images/placeholder.jpg"
    bg-color="bg-primary-950/70"
    class="bg-fixed"
  >
    <h1>Welcome to Hourglass Adventures!</h1>
    <p class="mb-4">
      Lorem ipsum dolor sit amet consectetur adipisicing elit. In deleniti
      voluptas, dolorum perferendis hic harum ex, inventore blanditiis
      necessitatibus fugit iusto praesentium minus optio maiores quam magni
      voluptates dignissimos repellat?
    </p>

    <h2>Search</h2>

    <SearchForm class="mb-6" />

    <h2>Featured destinations</h2>
    <div class="grid grid-cols-[1fr_1fr_1fr] gap-4">
      <DestinationCard
        v-for="item in destinations.data"
        :key="item.id"
        :data="item"
        @click="router.push(`/destination/${item.id}`)"
      />
    </div>
  </Section>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import SearchForm from "@/components/form/SearchForm.vue";
import Section from "@/components/layout/Section.vue";
import DestinationCard from "@/components/cards/DestinationCard.vue";
import { useDestinationStore } from "@/stores/destination";

const router = useRouter();

const destinations = useDestinationStore();
</script>

<style scoped>
.box {
  height: 100px;
  width: 100%;
}
</style>

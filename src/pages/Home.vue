<template>
  <Section>
    <h1>Welcome to Hourglass Adventures!</h1>
    <p class="mb-4">
      Lorem ipsum dolor sit amet consectetur adipisicing elit. In deleniti
      voluptas, dolorum perferendis hic harum ex, inventore blanditiis
      necessitatibus fugit iusto praesentium minus optio maiores quam magni
      voluptates dignissimos repellat?
    </p>

    <h2>Search</h2>

    <SearchForm class="mb-6" />

    <h2>Current offers</h2>
    <div class="grid grid-cols-[1fr_1fr_1fr] gap-4 p-8">
      <div v-for="item in destinations.data" :key="item.id">
        <RouterLink
          :to="`/destination/${item.id}`"
          class="border border-1 p-4 block"
        >
          {{ item.title }}
        </RouterLink>
      </div>
    </div>
  </Section>

  <Section>
    <Card
      image="./images/sunrise-over-matanzas-bay.jpg"
      headerClass="bg-blue-500"
    >
      <template #header> Header! </template>
      <template #content class="bg-blue-500"> This is card content. </template>
      This is not content.
      <template #footer>
        <Button>Click</Button>
      </template>
    </Card>
  </Section>
</template>

<script setup lang="ts">
import { RouterLink } from "vue-router";
import SearchForm from "@/components/SearchForm.vue";
import Section from "@/components/Section.vue";
import Card from "@/components/Card.vue";
import { useDestinationStore } from "@/stores/destination";
import Button from "@/components/Button.vue";

const destinations = useDestinationStore();
</script>

<style scoped>
.box {
  height: 100px;
  width: 100%;
}
</style>

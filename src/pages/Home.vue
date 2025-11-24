<template>
  <div class="max-w-6xl mx-auto p-6">
    <h1 font="bold" text="4xl" class="mb-6">Welcome to Hourglass Adventures!</h1>
    <p class="mb-4">Lorem ipsum dolor sit amet consectetur adipisicing elit. In deleniti voluptas, dolorum perferendis hic harum ex, inventore blanditiis necessitatibus fugit iusto praesentium minus optio maiores quam magni voluptates dignissimos repellat?</p>

    <h2 font="bold" text="3xl">Search</h2>
    <ul class="mb-4">
      <li>Destination</li>
      <li>Date</li>
      <li>People amount</li>
      <li>Age group</li>
    </ul>

    <RouterLink to="/search">
      <button class="bg-blue-400 px-4 py-3">Search</button>
    </RouterLink>

    <h2 font="bold" text="3xl">Destinations</h2>
    <div class="grid grid-cols-[1fr_1fr_1fr] gap-4 p-8">
      <div v-for="item in destinations.data" :key="item.id">
        <RouterLink :to="`/destination/${item.id}`" class="border border-1 p-4 block">
          {{ item.title }}
        </RouterLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useDestinationStore } from "@/stores/destination";
import { RouterLink } from "vue-router";

const destinations = useDestinationStore();
</script>

<style scoped>
.box {
  height: 100px;
  width: 100%;
}
</style>

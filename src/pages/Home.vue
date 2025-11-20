<template>
  <div class="max-w-6xl mx-auto p-6">
    <h1 font="bold" text="4xl" class="mb-6">Welcome to Hourglass Adventures!</h1>
    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. In deleniti voluptas, dolorum perferendis hic harum ex, inventore blanditiis necessitatibus fugit iusto praesentium minus optio maiores quam magni voluptates dignissimos repellat?</p>
    
    <div class="grid grid-cols-[1fr_1fr_1fr] gap-4 p-8">
      <div v-for="item in experiences.items" :key="item.id">
        <router-link :to="`/experience/${item.id}`" class="border border-1 p-4 block">
          {{ item.title }}
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useExperienceStore } from "@/stores/experience";

const experiences = useExperienceStore();
</script>

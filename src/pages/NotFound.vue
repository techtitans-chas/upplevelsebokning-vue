<template>
  <div class="flex flex-col items-center justify-center p-12 h-screen">
    <h1 class="text-7xl mb-2">404</h1>
    <p class="text-xl">Page not found</p>
    <Button to="/">Go back to home</Button>
  </div>
</template>
<script setup lang="ts">
import Button from "@/components/ui/Button.vue";
</script>

<template>
    <NavBar />
    <main class="content flex-1">
      <RouterView />
    </main>
    <Footer />
</template>
<script setup lang="ts">
import { RouterView } from "vue-router";
import NavBar from "@/components/layout/NavBar.vue";
import Footer from "@/components/layout/Footer.vue";
</script>

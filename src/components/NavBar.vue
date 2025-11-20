<template>
  <header>
    <nav>
      <ul class="flex gap-4 p-6">
        <li v-tooltip="'Home'" class="nav-link"><Icon icon="tabler:home-filled" /> <RouterLink to="/">Home</RouterLink></li>
        <li v-tooltip="'Cart'" class="nav-link"><Icon icon="ion:cart" /> <RouterLink to="/cart">Cart</RouterLink></li>
      </ul>
    </nav>
  </header>
</template>

<script setup>
import { Icon } from "@iconify/vue";
</script>

<style scoped>
.nav-link {
  display: flex;
  align-items: center;
  gap: .5rem;
}

.nav-link:hover {
  cursor: pointer;
}
</style>

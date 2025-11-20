<template>
  <header>
    <nav class="nav bg-sky-500">
      <div v-tooltip="'Home'" class="branding nav-link">
        <Icon icon="streamline-plump:hourglass-remix" /> <RouterLink to="/">Hourglass Adventures</RouterLink>
      </div>
      <ul class="flex gap-4">
        <li v-tooltip="'Cart'" class="nav-link">
          <Icon icon="ion:cart" /> <RouterLink to="/cart">Cart ({{ cart.totalAmount }})</RouterLink>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script setup>
import { Icon } from "@iconify/vue";
import { useCartStore } from "@/stores/cart";

const cart = useCartStore();
</script>

<style scoped>
.nav {
  display: flex;
  justify-content: space-between;
}

.branding {
  margin-right: auto;
}

.nav-link {
  display: flex;
  align-items: center;
  gap: .5rem;
  padding: 1rem 1.5rem;
}

.nav-link:hover {
  cursor: pointer;
}
</style>

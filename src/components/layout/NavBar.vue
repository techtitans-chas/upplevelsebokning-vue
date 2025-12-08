<template>
  <header>
    <nav class="nav bg-black/15 border-bottom border-1 border-black/30 solid">
      <div v-tooltip="'Home'" class="branding nav-link">
        <RouterLink to="/"><Logo /></RouterLink>
      </div>
      <ul class="flex gap-4">
        <li v-tooltip="'Cart'" class="nav-link">
          <Button to="/cart" icon-left="ion:cart" class="bg-black/40 hover:bg-transparent rounded-sm border border-sky-800/30 hover:border-sky-800/40 hover:shadow-md hover:shadow-black/50 hover:-translate-y-1">
            Cart ${{ cart.totalValue }}
          </Button>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script setup lang="ts">
import { useCartStore } from "@/stores/cart";
import Logo from "@/components/ui/Logo.vue";
import Button from "../ui/Button.vue";

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
  gap: 0.5rem;
  padding: 1rem 1.5rem;
}

.nav-link:hover {
  cursor: pointer;
}
</style>

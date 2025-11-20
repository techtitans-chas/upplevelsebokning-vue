<template>
  <header>
    <nav>
      <ul>
        <li v-tooltip="'Home'"><Icon icon="tabler:home-filled" /> <RouterLink to="/">Home</RouterLink></li>
        <li v-tooltip="'Cart'"><Icon icon="ion:cart" /> <RouterLink to="/cart">Cart</RouterLink></li>
      </ul>
    </nav>
  </header>
</template>

<script setup>
import { Icon } from "@iconify/vue";
</script>

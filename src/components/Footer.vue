<template>
  <footer class="bg-primary-800 p-6">
    <div class="flex flex-col gap-2 items-center">
      <Logo vertical />
      <p>Built by
        <Link href="https://github.com/idaohlen">Ida</Link> &
        <Link href="https://github.com/martinsodersten">Martin</Link>
        with <strong>Vue.js</strong>.
      </p>
    </div>
  </footer>
</template>

<script setup lang="ts">
import Link from "@/components/Link.vue";
import Logo from "./Logo.vue";

</script>

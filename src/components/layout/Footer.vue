<template>
  <footer class="bg-primary-800 p-6 pt-8">
    <div class="flex flex-col gap-2 items-center">
      <Logo vertical />
      <p>
        Built by <Link dark href="https://github.com/idaohlen">Ida</Link> &
        <Link dark href="https://github.com/martinsodersten">Martin</Link>
        with <strong>Vue.js</strong>.
      </p>
    </div>
  </footer>
</template>

<script setup lang="ts">
import Link from "@/components/ui/Link.vue";
import Logo from "@/components/ui/Logo.vue";
</script>

<template>
  <Button
    :class="`go-to-top ${isVisible && 'visible'}`"
    color="primary"
    @click="scrollToTop"
    v-tooltip.left="isVisible && 'Scroll to top'"
  >
    <Icon icon="tabler:arrow-big-up-filled" />
  </Button>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import Button from "@/components/ui/Button.vue";
import { Icon } from "@iconify/vue";

const isVisible = ref(false);

function scrollToTop() {
  const startPosition = window.scrollY || window.pageYOffset;
  const targetPosition = 0;
  const distance = targetPosition - startPosition;
  const duration = 400;
  let start: number | null = null;

  window.requestAnimationFrame(step);

  function step(timestamp: number) {
    if (!start) start = timestamp;
    const progress = timestamp - start;

    // Easing function - easeInOutQuad
    let percent = Math.min(progress / duration, 1);
    percent =
      percent < 0.5
        ? 2 * percent * percent
        : 1 - Math.pow(-2 * percent + 2, 2) / 2;

    window.scrollTo(0, startPosition + distance * percent);

    if (progress < duration) {
      window.requestAnimationFrame(step);
    }
  }
}

const handleScroll = () => (isVisible.value = window.scrollY > 200);

onMounted(() => {
  window.addEventListener("scroll", handleScroll);
  handleScroll();
});

onUnmounted(() => window.removeEventListener("scroll", handleScroll));
</script>

<style>
.go-to-top {
  position: fixed;
  bottom: 1rem;
  right: 1rem;
  font-size: 1.3rem !important;
  padding: 0.8rem !important;
  aspect-ratio: 1 / 1;
  border-radius: 100%;
  z-index: 100;
  opacity: 0;
  user-select: none;
}

.go-to-top.visible:hover {
  cursor: pointer;
}

.visible {
  opacity: 1;
  visibility: visible;
  transform: translateY(0);
}
</style>

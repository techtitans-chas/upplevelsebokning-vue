<template>
  <div v-if="article">
    <Section :bg-image="article.coverImage" bg-color="bg-primary-950/70">
      <Link to="/" dark class="flex items-center gap-2"><Icon icon="mingcute:arrow-left-fill" /> Go back</Link>
      <h1 v-html="article.title" />
      <p class="summary" v-html="article.summary"/>
    </Section>
    <Section>
      <div v-html="article.content" />
    </Section>
  </div>
  <Section v-else>
    <h1>Article not found</h1>
  </Section>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useArticleStore } from "@/stores/article";
import Section from "@/components/layout/Section.vue";
import Link from "@/components/ui/Link.vue";
import { Icon } from "@iconify/vue";

const articleStore = useArticleStore();

const props = defineProps<{
  id: string;
}>();

const article = computed(() => {
  return articleStore.getById(props.id);
});

</script>

<style>
  .summary {
    color: white;
    font-weight: 600;
    font-size: 1.2rem;
  }
</style>

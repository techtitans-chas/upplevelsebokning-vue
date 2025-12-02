import { defineStore } from "pinia";
import { computed } from "vue";
import { useDataLoader } from "../composables/useDataLoader";
import type { Article } from "../types";

export const useArticleStore = defineStore("article", () => {
  const { data, loading, error, load } = useDataLoader<Article>(
    "/data/articles.json"
  );

  const getById = computed(() => {
    return (id: string) => {
      return data.value.find((i) => i.id === String(id));
    };
  });

  return {
    data,
    loading,
    error,
    load,
    getById,
  };
});

import { ref, type Ref } from "vue";

export function useDataLoader<T = any>(path: string) {
  const data: Ref<T[]> = ref([]);
  const loading = ref(false);
  const error = ref<string | null>(null);

  async function load() {
    loading.value = true;
    error.value = null;
    try {
      const res = await fetch(path);
      if (!res.ok) throw new Error(`Failed to fetch ${path}`);
      let items = await res.json();

      data.value = items;
    } catch (err) {
      error.value = err instanceof Error ? err.message : String(err);
    } finally {
      loading.value = false;
    }
  }

  return { data, loading, error, load }
}

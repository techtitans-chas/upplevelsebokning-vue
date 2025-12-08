import { ref, type Ref } from "vue";

export function useDataLoader<T = any>(path: string) {
  const data: Ref<T[]> = ref([]);
  const loading = ref(false);
  const error = ref<string | null>(null);

  async function load() {
    loading.value = true;
    error.value = null;
    try {
      // Prepend base URL to handle subdirectory deployments
      const fullPath = import.meta.env.BASE_URL + path.replace(/^\//, '');
      const res = await fetch(fullPath);
      if (!res.ok) throw new Error(`Failed to fetch ${fullPath}`);
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

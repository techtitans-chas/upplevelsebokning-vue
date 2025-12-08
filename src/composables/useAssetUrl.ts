import { computed, type ComputedRef } from "vue";

export function useAssetUrl(
  path: () => string | undefined
): ComputedRef<string> {
  return computed(() => {
    const pathValue = path();
    if (!pathValue) return "";
    // If path is already absolute (http/https), return as-is
    if (pathValue.startsWith("http://") || pathValue.startsWith("https://")) {
      return pathValue;
    }
    // Prepend base URL for local assets
    return import.meta.env.BASE_URL + pathValue.replace(/^\//, "");
  });
}

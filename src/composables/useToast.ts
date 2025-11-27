import { ref, computed } from "vue";

export interface Toast {
  id: string;
  title?: string;
  description?: string;
  icon?: string;
  position?: "top" | "bottom";
  alignment?: "left" | "center" | "right";
  variant?: "default" | "success" | "error" | "warning" | "info";
  duration?: number;
  closable?: boolean;
}

const toasts = ref<Toast[]>([]);
let toastId = 0;
const MAX_TOASTS = 4;

export function useToast() {
  const show = (options: Omit<Toast, "id">) => {
    const id = String(toastId++);
    const toast: Toast = {
      ...options,
      id,
      duration: options.duration ?? 3000,
      closable: options.closable ?? true,
    };

    toasts.value.push(toast);
    
    // Remove oldest toast if we exceed max
    if (toasts.value.length > MAX_TOASTS) {
      toasts.value.shift();
    }
    
    return id;
  };

  const remove = (id: string) => {
    const index = toasts.value.findIndex((t) => t.id === id);
    if (index > -1) {
      toasts.value.splice(index, 1);
    }
  };

  const success = (title: string, description?: string) =>
    show({ title, description, variant: "success", icon: "mdi:check-circle" });

  const error = (title: string, description?: string) =>
    show({ title, description, variant: "error", icon: "mdi:alert-circle" });

  const warning = (title: string, description?: string) =>
    show({ title, description, variant: "warning", icon: "mdi:alert" });

  const info = (title: string, description?: string) =>
    show({ title, description, variant: "info", icon: "mdi:information" });

  return {
    toasts: computed(() => toasts.value),
    show,
    remove,
    success,
    error,
    warning,
    info,
  };
}

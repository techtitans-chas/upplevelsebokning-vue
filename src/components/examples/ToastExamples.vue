<template>
  <div class="space-y-4">
    <h2>Toast Component Examples</h2>

    <div class="space-y-2">
      <h3>Basic Helpers</h3>
      <div class="flex flex-wrap gap-2">
        <Button @click="() => success('Success!', 'Operation completed')" size="sm">
          Success
        </Button>
        <Button @click="() => error('Error!', 'Something went wrong')" size="sm">
          Error
        </Button>
        <Button @click="() => warning('Warning!', 'Please pay attention')" size="sm">
          Warning
        </Button>
        <Button @click="() => info('Info', 'Here is some information')" size="sm">
          Info
        </Button>
      </div>
    </div>

    <div class="space-y-2">
      <h3>Positions & Alignment</h3>
      <div class="flex flex-wrap gap-2">
        <Button @click="showTopLeft" size="sm">Top Left</Button>
        <Button @click="showTopCenter" size="sm">Top Center</Button>
        <Button @click="showTopRight" size="sm">Top Right</Button>
        <Button @click="showBottomLeft" size="sm">Bottom Left</Button>
        <Button @click="showBottomCenter" size="sm">Bottom Center</Button>
        <Button @click="showBottomRight" size="sm">Bottom Right</Button>
      </div>
    </div>

    <div class="space-y-2">
      <h3>Custom Options</h3>
      <div class="flex flex-wrap gap-2">
        <Button @click="showPersistent" size="sm">Persistent Toast</Button>
        <Button @click="showLongDuration" size="sm">5 Second Duration</Button>
        <Button @click="showCustomIcon" size="sm">Custom Icon</Button>
      </div>
    </div>

    <div class="space-y-2">
      <h3>Multiple Toasts</h3>
      <Button @click="showMultiple" size="sm">Show 3 Toasts</Button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useToast } from "@/composables/useToast";
import Button from "@/components/ui/Button.vue";

const { success, error, warning, info, show } = useToast();

// Positions and alignments
const showTopLeft = () =>
  show({
    title: "Top Left",
    description: "This toast appears at the top left",
    position: "top",
    alignment: "left",
    variant: "info",
    icon: "mdi:information",
  });

const showTopCenter = () =>
  show({
    title: "Top Center",
    description: "This toast appears at the top center",
    position: "top",
    alignment: "center",
    variant: "success",
    icon: "mdi:check-circle",
  });

const showTopRight = () =>
  show({
    title: "Top Right",
    description: "This toast appears at the top right",
    position: "top",
    alignment: "right",
    variant: "warning",
    icon: "mdi:alert",
  });

const showBottomLeft = () =>
  show({
    title: "Bottom Left",
    description: "This toast appears at the bottom left",
    position: "bottom",
    alignment: "left",
    variant: "error",
    icon: "mdi:alert-circle",
  });

const showBottomCenter = () =>
  show({
    title: "Bottom Center",
    description: "This toast appears at the bottom center (default)",
    position: "bottom",
    alignment: "center",
    variant: "default",
    icon: "mdi:bell",
  });

const showBottomRight = () =>
  show({
    title: "Bottom Right",
    description: "This toast appears at the bottom right",
    position: "bottom",
    alignment: "right",
    variant: "info",
    icon: "mdi:information",
  });

// Custom options
const showPersistent = () =>
  show({
    title: "Persistent Toast",
    description: "This toast will stay until you close it",
    duration: 0, // No auto-dismiss
    variant: "warning",
    icon: "mdi:pin",
    closable: true,
  });

const showLongDuration = () =>
  show({
    title: "5 Second Toast",
    description: "This toast will dismiss after 5 seconds",
    duration: 5000,
    variant: "info",
    icon: "mdi:timer",
  });

const showCustomIcon = () =>
  show({
    title: "Custom Icon",
    description: "Using a star icon from Iconify",
    icon: "mdi:star",
    variant: "success",
  });

// Multiple toasts
const showMultiple = () => {
  success("First Toast", "This appears first");

  setTimeout(() => {
    warning("Second Toast", "This appears after 300ms");
  }, 300);

  setTimeout(() => {
    info("Third Toast", "This appears after 600ms");
  }, 600);
};
</script>

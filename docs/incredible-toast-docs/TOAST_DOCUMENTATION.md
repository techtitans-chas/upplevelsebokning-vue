# Toast Component Documentation

## Overview

The Toast component is a flexible, animated notification system for your Vue 3 application. It supports multiple variants, positions, and alignments with smooth slide-in and fade-out animations.

## Features

- 🎨 **5 Variants**: default, success, error, warning, info
- 📍 **Position Control**: top or bottom of screen
- ↔️ **Alignment Options**: left, center, or right
- 🎭 **Smooth Animations**: Slide in from direction, slide up and fade out
- ⏱️ **Auto-dismiss**: Configurable duration (default 3 seconds)
- ❌ **Dismissible**: Optional close button
- 🎯 **Icon Support**: Iconify icons for visual context
- 📝 **Flexible Content**: Title and description fields
- 🚀 **Easy to Use**: Composable API with helper methods

## Quick Start

### 1. Basic Usage (Using useToast Composable)

```vue
<template>
  <button @click="showToast">Show Toast</button>
</template>

<script setup lang="ts">
import { useToast } from "@/composables/useToast";

const { success, error, warning, info, show } = useToast();

const showToast = () => {
  success("Success!", "Your action was completed successfully");
};
</script>
```

### 2. Direct Component Usage

```vue
<template>
  <Toast
    title="Welcome"
    description="This is a toast notification"
    icon="mdi:star"
    position="bottom"
    alignment="center"
    variant="info"
    :duration="5000"
    closable
    @close="onToastClose"
  />
</template>

<script setup lang="ts">
import Toast from "@/components/ui/Toast.vue";

const onToastClose = () => {
  console.log("Toast closed");
};
</script>
```

## useToast Composable API

### Methods

#### `show(options)`
Show a custom toast with full control over all properties.

```typescript
const id = show({
  title: "Custom Title",
  description: "Custom description",
  icon: "mdi:information",
  position: "top",
  alignment: "left",
  variant: "info",
  duration: 5000,
  closable: true,
});
```

**Returns**: Toast ID (string) for manual removal

#### `success(title, description?)`
Show a success toast (green, with check icon).

```typescript
success("Success", "Operation completed");
```

#### `error(title, description?)`
Show an error toast (red, with alert icon).

```typescript
error("Error", "Something went wrong");
```

#### `warning(title, description?)`
Show a warning toast (yellow, with warning icon).

```typescript
warning("Warning", "Please review this");
```

#### `info(title, description?)`
Show an info toast (blue, with info icon).

```typescript
info("Info", "Here is some information");
```

#### `remove(id)`
Manually remove a toast by its ID.

```typescript
const id = show({ title: "Auto-remove in 10s", duration: 10000 });
// Later...
remove(id);
```

## Component Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | string | undefined | Toast title text |
| `description` | string | undefined | Toast description text below title |
| `icon` | string | undefined | Iconify icon name (e.g., "mdi:check") |
| `position` | "top" \| "bottom" | "bottom" | Vertical position on screen |
| `alignment` | "left" \| "center" \| "right" | "center" | Horizontal alignment |
| `variant` | "default" \| "success" \| "error" \| "warning" \| "info" | "default" | Toast style variant |
| `duration` | number | 3000 | Auto-dismiss duration in ms (0 = disabled) |
| `closable` | boolean | true | Show close button |
| `class` | string | undefined | Additional Tailwind classes |

## Events

| Event | Payload | Description |
|-------|---------|-------------|
| `close` | none | Emitted when toast is dismissed or auto-dismisses |

## Variants & Colors

### default
- Background: `bg-primary-800`
- Text: `text-primary-100`
- Border: `border-primary-700`

### success
- Background: `bg-green-900`
- Text: `text-green-100`
- Border: `border-green-700`

### error
- Background: `bg-red-900`
- Text: `text-red-100`
- Border: `border-red-700`

### warning
- Background: `bg-yellow-900`
- Text: `text-yellow-100`
- Border: `border-yellow-700`

### info
- Background: `bg-blue-900`
- Text: `text-blue-100`
- Border: `border-blue-700`

## Animation Details

### Entry Animation
- **Bottom Position**: Slides up from bottom (100% → 0%) with fade in
- **Top Position**: Slides down from top (-100% → 0%) with fade in
- **Duration**: 300ms, `ease-out` timing

### Exit Animation
- **All Positions**: Slides up and fades out (0% → 100%, 1 → 0)
- **Duration**: 300ms, `ease-in` timing

## Advanced Examples

### Multiple Toasts with Different Positions

```vue
<script setup lang="ts">
import { useToast } from "@/composables/useToast";

const { show } = useToast();

const showMultiple = () => {
  show({
    title: "Top Right",
    position: "top",
    alignment: "right",
    variant: "info",
  });

  setTimeout(() => {
    show({
      title: "Bottom Left",
      position: "bottom",
      alignment: "left",
      variant: "success",
    });
  }, 500);
};
</script>
```

### Persistent Toast (No Auto-dismiss)

```typescript
show({
  title: "Important",
  description: "This toast will stay until manually closed",
  duration: 0, // Disable auto-dismiss
  closable: true,
});
```

### Form Submission Example

```vue
<script setup lang="ts">
import { useToast } from "@/composables/useToast";

const { success, error } = useToast();

const submitForm = async () => {
  try {
    await api.submitForm(data);
    success("Form Submitted", "Your form was submitted successfully");
  } catch (err) {
    error("Submission Failed", err.message);
  }
};
</script>
```

### Programmatic Control

```typescript
const { show, remove } = useToast();

const id = show({
  title: "Processing...",
  duration: 0, // Don't auto-dismiss
});

// Later...
remove(id);
show({
  title: "Complete",
  variant: "success",
});
```

## Styling

The Toast component uses Tailwind CSS and supports custom classes:

```vue
<Toast
  title="Custom Styled"
  class="text-lg font-bold"
/>
```

## Setup in App.vue

The `ToastContainer` component is already added to your `App.vue`, so toasts will appear globally. You can now use the `useToast()` composable anywhere in your application.

## Accessibility

- Close button uses keyboard navigation
- Icons are semantic (from Iconify)
- Proper color contrast in all variants
- ARIA labels on interactive elements

## Notes

- Toasts use `Teleport` to render at the body level for proper z-index management
- Multiple toasts in the same position/alignment will stack naturally
- Each toast gets a unique ID for programmatic management
- The container is responsive and works on mobile/tablet screens

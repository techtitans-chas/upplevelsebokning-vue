# Toast Component - Quick Reference

## File Structure
```
src/
├── components/
│   ├── ui/
│   │   ├── Toast.vue              # Individual toast component
│   │   └── ToastContainer.vue     # Container managing all toasts
│   └── examples/
│       └── ToastExamples.vue      # Example component with all features
├── composables/
│   └── useToast.ts                # Composable API for managing toasts
└── App.vue                        # (Updated with ToastContainer)
```

## Component Props Reference

```typescript
// Toast.vue Props
{
  title?: string;              // Toast title text
  description?: string;        // Description below title
  icon?: string;               // Iconify icon name (e.g., "mdi:check")
  position?: "top" | "bottom"; // Default: "bottom"
  alignment?: "left" | "center" | "right"; // Default: "center"
  variant?: "default" | "success" | "error" | "warning" | "info"; // Default: "default"
  duration?: number;           // Auto-dismiss ms, 0 to disable. Default: 3000
  closable?: boolean;          // Show close button. Default: true
  class?: string;              // Additional Tailwind classes
}
```

## useToast Composable API

```typescript
const { show, success, error, warning, info, remove, toasts } = useToast();

// Show custom toast
show({
  title: "Title",
  description: "Description",
  icon: "mdi:icon-name",
  position: "bottom",
  alignment: "center",
  variant: "info",
  duration: 3000,
  closable: true,
}); // Returns: toast ID (string)

// Helper methods
success("Title", "Description");      // Success variant with check icon
error("Title", "Description");        // Error variant with alert icon
warning("Title", "Description");      // Warning variant with alert icon
info("Title", "Description");         // Info variant with info icon

// Manual removal
remove("toastId");                    // Remove toast by ID

// Reactive state
toasts.value;                          // Array of all active toasts
```

## Quick Copy-Paste Examples

### Form Success/Error
```typescript
const { success, error } = useToast();

const handleSubmit = async () => {
  try {
    await api.submit(data);
    success("Done!", "Changes saved successfully");
  } catch (err) {
    error("Failed", err.message);
  }
};
```

### Position Examples
```typescript
const { show } = useToast();

// Top notifications
show({ title: "Alert", position: "top", alignment: "center" });
show({ title: "Alert", position: "top", alignment: "left" });
show({ title: "Alert", position: "top", alignment: "right" });

// Bottom notifications (default position)
show({ title: "Alert", position: "bottom", alignment: "center" });
show({ title: "Alert", position: "bottom", alignment: "left" });
show({ title: "Alert", position: "bottom", alignment: "right" });
```

### No Auto-Dismiss
```typescript
const { show, remove } = useToast();

const id = show({
  title: "Persistent",
  description: "Click close to dismiss",
  duration: 0, // Disable auto-dismiss
  closable: true,
});

// Later:
remove(id);
```

### Multiple Toasts
```typescript
const { success, warning, info } = useToast();

success("First", "Description 1");
setTimeout(() => warning("Second", "Description 2"), 300);
setTimeout(() => info("Third", "Description 3"), 600);
```

### Custom Icons
```typescript
const { show } = useToast();

show({
  title: "Download",
  icon: "mdi:download",
  variant: "info",
});

show({
  title: "Upload",
  icon: "mdi:upload",
  variant: "success",
});

show({
  title: "Database",
  icon: "mdi:database",
  variant: "warning",
});
```

## Animation Timings

| Event | Duration | Easing |
|-------|----------|--------|
| Slide in + Fade in | 300ms | ease-out |
| Slide out + Fade out | 300ms | ease-in |
| Auto-dismiss delay | 3000ms (customizable) | - |
| Close animation to removal | 300ms | - |

## Default Styles by Variant

```css
/* default */
background: var(--color-primary-800);
text: var(--color-primary-100);
border: var(--color-primary-700);

/* success */
background: #1f2937; /* green-900 */
text: #dcfce7;      /* green-100 */
border: #15803d;    /* green-700 */

/* error */
background: #7f1d1d; /* red-900 */
text: #fee2e2;      /* red-100 */
border: #991b1b;    /* red-700 */

/* warning */
background: #78350f; /* yellow-900 */
text: #fef3c7;      /* yellow-100 */
border: #b45309;    /* yellow-700 */

/* info */
background: #1e3a8a; /* blue-900 */
text: #dbeafe;      /* blue-100 */
border: #1e40af;    /* blue-700 */
```

## Positioning Examples

```
┌─────────────────────────────────┐
│                                 │
│  TL    TC          TR           │ (top, left/center/right)
│                                 │
│                                 │
│  Content Area                   │
│                                 │
│                                 │
│  BL    BC          BR           │ (bottom, left/center/right)
│                                 │
└─────────────────────────────────┘
```

## Tips & Best Practices

1. **Use helper methods for common cases** - `success()`, `error()`, etc. are faster than `show()`
2. **Keep toasts short** - Title + brief description works best
3. **Use variants intentionally** - Match the context (success for wins, error for failures)
4. **Avoid too many toasts** - Stack up to 3-4 max for clarity
5. **Let auto-dismiss work** - Default 3 seconds is usually right, extend only if needed
6. **Icons matter** - They quickly communicate the toast type
7. **Position consistently** - Choose one default position for your app's flow

## Troubleshooting

**Toast not appearing?**
- Check that `ToastContainer` is in `App.vue` ✓
- Verify `useToast()` is imported correctly
- Check browser console for errors

**Animation not smooth?**
- Ensure Tailwind CSS is properly configured
- Check CSS animations in `Toast.vue` scoped styles
- Verify no conflicting animations in `style.css`

**Multiple toasts overlapping?**
- They should stack naturally - check your positioning props
- Make sure `alignment` is consistent
- Verify z-index isn't being overridden

**TypeScript errors?**
- Import `Toast` component when using directly
- Import `useToast` when using composable
- Type definitions should auto-complete in your IDE

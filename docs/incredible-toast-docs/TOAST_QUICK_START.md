# 🎊 Your Toast System is Ready! - Quick Start

## ✨ What You Can Do RIGHT NOW

Copy any of these examples into your Vue components and they will work immediately:

---

## Example 1: Basic Success/Error (Most Common)

```vue
<template>
  <button @click="handleClick">Save Changes</button>
</template>

<script setup lang="ts">
import { useToast } from "@/composables/useToast";

const { success, error } = useToast();

const handleClick = async () => {
  try {
    // Do something
    success("Saved!", "Your changes have been saved");
  } catch (err) {
    error("Error", "Something went wrong");
  }
};
</script>
```

---

## Example 2: Different Positions

```vue
<template>
  <div class="space-y-4">
    <button @click="topLeft">Top Left</button>
    <button @click="topRight">Top Right</button>
    <button @click="bottomLeft">Bottom Left</button>
    <button @click="bottomCenter">Bottom Center (default)</button>
    <button @click="bottomRight">Bottom Right</button>
  </div>
</template>

<script setup lang="ts">
import { useToast } from "@/composables/useToast";

const { show } = useToast();

const topLeft = () => show({
  title: "Top Left",
  position: "top",
  alignment: "left",
});

const topRight = () => show({
  title: "Top Right",
  position: "top",
  alignment: "right",
});

const bottomLeft = () => show({
  title: "Bottom Left",
  position: "bottom",
  alignment: "left",
});

const bottomCenter = () => show({
  title: "Bottom Center",
  position: "bottom",
  alignment: "center",
});

const bottomRight = () => show({
  title: "Bottom Right",
  position: "bottom",
  alignment: "right",
});
</script>
```

---

## Example 3: All Variants with Icons

```vue
<template>
  <div class="space-y-4">
    <button @click="showSuccess">✓ Success</button>
    <button @click="showError">✕ Error</button>
    <button @click="showWarning">⚠ Warning</button>
    <button @click="showInfo">ℹ Info</button>
  </div>
</template>

<script setup lang="ts">
import { useToast } from "@/composables/useToast";

const { show } = useToast();

const showSuccess = () => show({
  title: "Success",
  description: "Operation completed successfully",
  variant: "success",
  icon: "mdi:check-circle",
});

const showError = () => show({
  title: "Error",
  description: "Something went wrong",
  variant: "error",
  icon: "mdi:alert-circle",
});

const showWarning = () => show({
  title: "Warning",
  description: "Please review this carefully",
  variant: "warning",
  icon: "mdi:alert",
});

const showInfo = () => show({
  title: "Information",
  description: "Here is some useful information",
  variant: "info",
  icon: "mdi:information",
});
</script>
```

---

## Example 4: Form Submission

```vue
<template>
  <form @submit.prevent="handleSubmit">
    <input v-model="formData.name" placeholder="Name" />
    <input v-model="formData.email" placeholder="Email" />
    <button type="submit">Submit</button>
  </form>
</template>

<script setup lang="ts">
import { reactive } from "vue";
import { useToast } from "@/composables/useToast";

const { success, error } = useToast();

const formData = reactive({
  name: "",
  email: "",
});

const handleSubmit = async () => {
  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    success("Form Submitted", `Thank you, ${formData.name}!`);
    
    // Reset form
    formData.name = "";
    formData.email = "";
  } catch (err) {
    error("Submission Failed", "Please try again");
  }
};
</script>
```

---

## Example 5: Persistent Toast (Manual Close Only)

```vue
<template>
  <button @click="showPersistent">Show Persistent Toast</button>
</template>

<script setup lang="ts">
import { useToast } from "@/composables/useToast";

const { show } = useToast();

const showPersistent = () => show({
  title: "Important Notice",
  description: "Click the X button to dismiss this message",
  duration: 0, // Don't auto-dismiss
  closable: true,
  variant: "warning",
  icon: "mdi:pin",
});
</script>
```

---

## Example 6: Multi-Step Process Feedback

```vue
<template>
  <button @click="processMultiStep">Process Multi-Step</button>
</template>

<script setup lang="ts">
import { useToast } from "@/composables/useToast";

const { info, success, error } = useToast();

const processMultiStep = async () => {
  try {
    // Step 1
    info("Step 1", "Starting process...");
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Step 2
    info("Step 2", "Processing data...");
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Step 3
    info("Step 3", "Finalizing...");
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Complete
    success("Complete", "All steps finished!");
  } catch (err) {
    error("Process Failed", "An error occurred");
  }
};
</script>
```

---

## Example 7: API Response Handling

```vue
<template>
  <button @click="fetchUserData">Fetch User Data</button>
</template>

<script setup lang="ts">
import { useToast } from "@/composables/useToast";

const { success, error, info } = useToast();

const fetchUserData = async () => {
  info("Loading", "Fetching user data...");
  
  try {
    // Replace with your actual API call
    const response = await fetch("https://api.example.com/user");
    const data = await response.json();
    
    success("Loaded", `Welcome, ${data.name}!`);
  } catch (err) {
    error("Failed", "Could not load user data");
  }
};
</script>
```

---

## Example 8: Delete Confirmation

```vue
<template>
  <button @click="deleteItem">Delete Item</button>
</template>

<script setup lang="ts">
import { useToast } from "@/composables/useToast";

const { show, remove, success, error } = useToast();

const deleteItem = async () => {
  const toastId = show({
    title: "Deleting...",
    description: "Please wait while we delete the item",
    duration: 0, // Don't auto-dismiss
    closable: false,
    variant: "warning",
    icon: "mdi:delete",
  });
  
  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    remove(toastId);
    success("Deleted", "Item has been deleted");
  } catch (err) {
    remove(toastId);
    error("Failed", "Could not delete item");
  }
};
</script>
```

---

## Example 9: Programmatic Toast Management

```vue
<template>
  <div class="space-y-2">
    <button @click="createToast">Create Toast</button>
    <button @click="removeLastToast">Remove Last Toast</button>
    <p>Active Toasts: {{ activeToastCount }}</p>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useToast } from "@/composables/useToast";

const { show, remove, toasts } = useToast();

const activeToastCount = computed(() => toasts.value.length);

const createToast = () => {
  show({
    title: `Toast #${toasts.value.length + 1}`,
    duration: 2000,
  });
};

const removeLastToast = () => {
  if (toasts.value.length > 0) {
    const lastToast = toasts.value[toasts.value.length - 1];
    remove(lastToast.id);
  }
};
</script>
```

---

## Example 10: Custom Styled Toast

```vue
<template>
  <button @click="showCustom">Custom Styled</button>
</template>

<script setup lang="ts">
import { useToast } from "@/composables/useToast";

const { show } = useToast();

const showCustom = () => show({
  title: "Beautiful Notification",
  description: "With custom Tailwind styling",
  class: "text-lg", // Add extra Tailwind classes
  variant: "success",
  icon: "mdi:star",
  position: "top",
  alignment: "center",
});
</script>
```

---

## 🎯 Quick Copy-Paste Rules

1. **Always import useToast**:
   ```typescript
   import { useToast } from "@/composables/useToast";
   ```

2. **Always destructure what you need**:
   ```typescript
   const { success, error, show, remove } = useToast();
   ```

3. **Call functions in event handlers**:
   ```vue
   <button @click="success('Done!')">Submit</button>
   ```

4. **Or in async functions**:
   ```typescript
   const handleSubmit = async () => {
     success("Saved!");
   };
   ```

---

## 📖 For More Information

- `TOAST_DOCUMENTATION.md` - Complete API reference
- `TOAST_QUICK_REFERENCE.md` - Copy-paste examples
- `TOAST_ARCHITECTURE.md` - How it works under the hood
- `TOAST_IMPLEMENTATION.md` - Setup overview

---

## ✅ Verification

Your system is ready to use! To test it:

1. Import the examples above into any of your pages
2. Open the dev server (already running at http://localhost:5174)
3. Click buttons and watch the toasts appear
4. Experiment with different positions and variants

**Enjoy your new toast notification system!** 🎉

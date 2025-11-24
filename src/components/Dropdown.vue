<template>
  <Dropdown ref="dropdownRef" :distance="12" class="inline-block" @show="isOpen = true" @hide="isOpen = false"
    placement="bottom-start" :autoHide="true" :autoSize="true">
    <!-- Trigger button -->
    <div
      class="h-full flex gap-2 p-3 px-4 items-start bg-white rounded-sm color-gray-600 cursor-pointer hover:bg-gray-50 transition-colors min-w-[200px]"
      :class="{ 'ring-2 ring-primary-500': isOpen }">
      <div class="flex-1">
        <div class="text-xs text-gray-500 mb-1">{{ label }}</div>
        <div class="text-sm font-medium" :class="{ 'text-gray-400': !modelValue }">
          {{ modelValue || placeholder }}
        </div>
      </div>
      <Icon icon="fa-solid:chevron-down" :class="{ 'rotate-180': isOpen }"
        class="transition-transform duration-200 text-gray-500" />
    </div>

    <!-- Dropdown content -->
    <template #popper="{ hide }">
      <div class="bg-white  min-w-[200px] max-h-[300px] overflow-auto">
        <slot name="content" :close="hide" :select="(value: string | number) => handleSelect(value, hide)" />
      </div>
    </template>
  </Dropdown>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { Dropdown } from "floating-vue";
import { Icon } from "@iconify/vue";

defineProps<{
  label: string
  modelValue?: string | number
  placeholder?: string
  autoOpen?: boolean
}>();

const emit = defineEmits<{
  "update:modelValue": [value: string | number]
}>();

const isOpen = ref(false);
const dropdownRef = ref<InstanceType<typeof Dropdown>>();

const handleSelect = (value: string | number, hide: () => void) => {
  emit("update:modelValue", value);
  hide();
};

const openDropdown = () => {
  if (dropdownRef.value) {
    dropdownRef.value.show();
  }
};

defineExpose({
  openDropdown
});
</script>

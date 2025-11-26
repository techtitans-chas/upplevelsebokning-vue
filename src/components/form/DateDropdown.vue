<template>
  <Dropdown label="Date" placeholder="Select dates" v-model="dateRangeDisplay">
    <template #content>
      <div class="p-4 gap-3">
        <div>
          <label class="text-xs text-gray-500 block mb-1">Start Date</label>
          <input
            type="date"
            v-model="departureDate"
            class="w-full p-2 border border-gray-300 rounded text-sm"
          />
        </div>
        <div>
          <label class="text-xs text-gray-500 block mb-1">End Date</label>
          <input
            type="date"
            v-model="returnDate"
            :min="departureDate"
            class="w-full p-2 border border-gray-300 rounded text-sm"
          />
        </div>
      </div>
    </template>
  </Dropdown>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useSessionStore } from "@/stores/session";
import Dropdown from "@/components/form/Dropdown.vue";

const sessionStore = useSessionStore();

const departureDate = computed({
  get: () => sessionStore.departureDate,
  set: (value) => (sessionStore.departureDate = value),
});

const returnDate = computed({
  get: () => sessionStore.returnDate,
  set: (value) => (sessionStore.returnDate = value),
});

const dateRangeDisplay = computed(() => {
  if (departureDate.value && returnDate.value)
    return `${departureDate.value} - ${returnDate.value}`;
  else if (departureDate.value) return departureDate.value;
  return "";
});
</script>

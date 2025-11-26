<template>
  <div class="flex flex-col gap-4">
    <!-- Search -->
    <Input
      placeholder="Search destinations, dates, and more"
      v-model="searchTerm"
    >
      <template #right>
        <Button
          icon="iconamoon:search-bold"
          size="sm"
          color="secondary"
          :to="query"
        >
          Search
        </Button>
      </template>
    </Input>

    <!-- Filters -->
    <div
      class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-[1fr_1fr_1fr] gap-4 w-full items-stretch"
    >
      <!-- Destination -->
      <Dropdown
        label="Destination"
        placeholder="Select a destination"
        :modelValue="selectedDestination?.title"
      >
        <template #content>
          <div class="p-2 gap-1">
            <div
              v-for="dest in destinations.data"
              :key="dest.id"
              @click="selectedDestination = dest"
              role="option"
              :aria-selected="selectedDestination?.id === dest.id"
              tabindex="0"
              @keydown.enter.prevent="selectedDestination = dest"
              @keydown.space.prevent="selectedDestination = dest"
              class="p-2 hover:bg-primary-100 cursor-pointer rounded text-sm focus:bg-primary-100 focus:outline-none"
            >
              {{ dest.title }}
            </div>
          </div>
        </template>
      </Dropdown>

      <!-- Date -->
      <Dropdown
        label="Date"
        placeholder="Select dates"
        v-model="dateRangeDisplay"
      >
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

      <!-- Age group -->
      <Dropdown
        label="Age group"
        placeholder="Select an age group"
        v-model="selectedAgeGroup"
      >
        <template #content="{ select }">
          <div class="p-2 gap-1">
            <div
              v-for="group in ageGroups"
              :key="group"
              @click="select(group)"
              role="option"
              :aria-selected="selectedAgeGroup === group"
              tabindex="0"
              @keydown.enter.prevent="select(group)"
              @keydown.space.prevent="select(group)"
              class="p-2 hover:bg-primary-100 cursor-pointer rounded text-sm focus:bg-primary-100 focus:outline-none"
            >
              {{ group }}
            </div>
          </div>
        </template>
      </Dropdown>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import Button from "@/components/Button.vue";
import Input from "@/components/Input.vue";
import Dropdown from "@/components/Dropdown.vue";
import { useDestinationStore } from "@/stores/destination";
import { useSessionStore } from "@/stores/session";

const destinations = useDestinationStore();
const sessionStore = useSessionStore();

const selectedDestination = ref<(typeof destinations.data)[number] | null>(
  null
);
const selectedAgeGroup = ref("");
const searchTerm = ref("");

const departureDate = computed({
  get: () => sessionStore.departureDate,
  set: (value) => (sessionStore.departureDate = value),
});

const returnDate = computed({
  get: () => sessionStore.returnDate,
  set: (value) => (sessionStore.returnDate = value),
});

const ageGroups = ref(["All ages", "18 and above"]);

const dateRangeDisplay = computed(() => {
  if (departureDate.value && returnDate.value)
    return `${departureDate.value} - ${returnDate.value}`;
  else if (departureDate.value) return departureDate.value;
  return "";
});

const query = computed(() => {
  const array = [];

  if (searchTerm.value) array.push(`term=${searchTerm.value}`);
  if (selectedDestination.value?.id)
    array.push(`destination=${selectedDestination.value?.id}`);

  const joinedArray = array.join("&");

  return `/search?${joinedArray}`;
  // return `/search?destination=${selectedDestination.value?.id}`;
});
</script>

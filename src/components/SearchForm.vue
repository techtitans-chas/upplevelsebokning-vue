<template>
  <div class="flex flex-col gap-4">

    <!-- Search -->
    <Input placeholder="Search destinations, dates, and more">
    <template #right>
      <Button icon="iconamoon:search-bold" size="sm" color="secondary" to="/search">
        Search
      </Button>
    </template>
    </Input>

    <!-- Filters -->
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-[1fr_1fr_1fr_auto] gap-4 w-full items-stretch">
      <!-- Destination -->
      <Dropdown label="Destination" placeholder="Select a destination" v-model="selectedDestination">
        <template #content="{ select }">
          <div class="p-2 space-y-1">
            <div 
              v-for="dest in destinations.data" 
              :key="dest.id"
              @click="select(dest.title)"
              role="option"
              :aria-selected="selectedDestination === dest.title"
              tabindex="0"
              @keydown.enter.prevent="select(dest.title)"
              @keydown.space.prevent="select(dest.title)"
              class="p-2 hover:bg-primary-100 cursor-pointer rounded text-sm focus:bg-primary-100 focus:outline-none"
            >
              {{ dest.title }}
            </div>
          </div>
        </template>
      </Dropdown>

      <!-- Date -->
      <Dropdown label="Date" placeholder="Select dates" v-model="dateRangeDisplay">
        <template #content>
          <div class="p-4 space-y-3">
            <div>
              <label class="text-xs text-gray-500 block mb-1">Start Date</label>
              <input type="date" v-model="startDate" class="w-full p-2 border border-gray-300 rounded text-sm" />
            </div>
            <div>
              <label class="text-xs text-gray-500 block mb-1">End Date</label>
              <input type="date" v-model="endDate" :min="startDate"
                class="w-full p-2 border border-gray-300 rounded text-sm" />
            </div>
          </div>
        </template>
      </Dropdown>

      <!-- Age group -->
      <Dropdown label="Age group" placeholder="Select an age group" v-model="selectedAgeGroup">
        <template #content="{ select }">
          <div class="p-2 space-y-1">
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

      <!-- Number of People -->
      <NumberInput label="Number of people" v-model="numberOfPeople" :min="1" :max="20" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import Button from "@/components/Button.vue";
import Input from "@/components/Input.vue";
import Dropdown from "@/components/Dropdown.vue";
import NumberInput from "@/components/NumberInput.vue";
import { useDestinationStore } from "@/stores/destination";

const destinations = useDestinationStore();

const selectedDestination = ref("");
const selectedAgeGroup = ref("");
const startDate = ref("");
const endDate = ref("");
const numberOfPeople = ref(1);

const ageGroups = ref([
  "All ages",
  "18 and above"
]);

const dateRangeDisplay = computed(() => {
  if (startDate.value && endDate.value) {
    return `${startDate.value} - ${endDate.value}`;
  } else if (startDate.value) {
    return startDate.value;
  }
  return "";
});
</script>

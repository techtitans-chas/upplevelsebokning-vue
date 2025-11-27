<template>
  <div class="flex flex-col gap-4">
    <!-- Search -->
    <Input placeholder="Search destinations, dates, and more" v-model="searchTerm" @keydown.enter="handleSearch">
      <template #right>
        <Button icon="iconamoon:search-bold" size="sm" color="secondary" @click="handleSearch">
          Search
        </Button>
      </template>
    </Input>

    <!-- Filters -->
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-[1fr_1fr_1fr_auto] gap-4 w-full items-stretch">
      <!-- Destination -->
      <Dropdown label="Destination" placeholder="Select a destination" :modelValue="selectedDestination?.title">
        <template #content>
          <div class="p-2 gap-1">
            <div v-for="dest in destinations.data" :key="dest.id" @click="selectedDestination = dest" role="option"
              :aria-selected="selectedDestination?.id === dest.id" tabindex="0"
              @keydown.enter.prevent="selectedDestination = dest" @keydown.space.prevent="selectedDestination = dest"
              class="p-2 hover:bg-primary-100 cursor-pointer rounded text-sm focus:bg-primary-100 focus:outline-none">
              {{ dest.title }}
            </div>
          </div>
        </template>
      </Dropdown>

      <!-- Date -->
      <DateDropdown />

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
import { useRouter } from "vue-router";
import Button from "@/components/ui/Button.vue";
import Input from "@/components/form/Input.vue";
import Dropdown from "@/components/form/Dropdown.vue";
import DateDropdown from "@/components/form/DateDropdown.vue";
import { useDestinationStore } from "@/stores/destination";

const router = useRouter();
const destinations = useDestinationStore();

const searchTerm = ref("");
const selectedDestination = ref<(typeof destinations.data)[number] | null>(null);
const selectedAgeGroup = ref("");
const ageGroups = ref(["All ages", "18 and above"]);

const query = computed(() => {
  const array = [];

  if (searchTerm.value) array.push(`term=${searchTerm.value}`);
  if (selectedDestination.value?.id)
    array.push(`destination=${selectedDestination.value?.id}`);

  const joinedArray = array.join("&");

  return `/search?${joinedArray}`;
  
});

const handleSearch = () => router.push(query.value);
</script>

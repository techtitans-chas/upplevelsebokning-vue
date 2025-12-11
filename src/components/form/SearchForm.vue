<template>
  <div class="flex flex-col gap-4">
    <!-- Search -->
    <Input placeholder="Search destinations, dates, and more" v-model="searchTerm" @keydown.enter="handleSearch">
    <template #right>
      <Button icon="iconamoon:search-bold" size="md" color="secondary" class="hover:cursor-pointer"
        @click="handleSearch">
        Search
      </Button>
    </template>
    </Input>

    <!-- Filters -->
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 w-full items-stretch">

      <!-- Date -->
      <DateDropdown />

      <!-- Time Period Range -->
      <Dropdown label="Time Period" icon="bx:hourglass" :modelValue="`${formatYear(minTimePeriod)} to ${formatYear(maxTimePeriod)}`">
        <template #content>
          <div class="flex flex-col gap-4 p-4 min-w-[300px]">
            <div class="flex flex-col gap-3">
              <div>
                <label class="text-xs text-gray-500 mb-1 block">Oldest</label>
                <input type="range" :min="0" :max="availableTimePeriods.length - 1" :value="minTimePeriodIndex"
                  @input="minTimePeriodIndex = Math.min(parseInt(($event.target as HTMLInputElement).value), maxTimePeriodIndex)"
                  class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary-500" />
              </div>
              <div>
                <label class="text-xs text-gray-500 mb-1 block">Most Recent</label>
                <input type="range" :min="0" :max="availableTimePeriods.length - 1" :value="maxTimePeriodIndex"
                  @input="maxTimePeriodIndex = Math.max(parseInt(($event.target as HTMLInputElement).value), minTimePeriodIndex)"
                  class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary-500" />
              </div>
            </div>
          </div>
        </template>
      </Dropdown>

      <!-- Rating -->
      <Dropdown label="Minimum rating" icon="lucide:star" placeholder="Select rating"
        :modelValue="selectedRating === null ? 'No filter' : selectedRating === 0 ? 'No stars' : `${selectedRating} star${selectedRating !== 1 ? 's' : ''}`">
        <template #content="{ select }">
          <div class="p-2 gap-1 flex flex-col">
            <div @click="selectedRating = null" role="option" :aria-selected="selectedRating === null" tabindex="0"
              @keydown.enter.prevent="selectedRating = null" @keydown.space.prevent="selectedRating = null"
              class="p-2 hover:bg-primary-100 cursor-pointer rounded text-sm focus:bg-primary-100 focus:outline-none">
              No filter
            </div>
            <div @click="select(0); selectedRating = 0" role="option" :aria-selected="selectedRating === 0" tabindex="0"
              @keydown.enter.prevent="select(0); selectedRating = 0"
              @keydown.space.prevent="select(0); selectedRating = 0"
              class="p-2 hover:bg-primary-100 cursor-pointer rounded text-sm focus:bg-primary-100 focus:outline-none flex items-center gap-2">
              <span class="text-xs">Below 1 star</span>
            </div>
            <div v-for="rating in [1, 2, 3, 4, 5]" :key="rating" @click="select(rating); selectedRating = rating"
              role="option" :aria-selected="selectedRating === rating" tabindex="0"
              @keydown.enter.prevent="select(rating); selectedRating = rating"
              @keydown.space.prevent="select(rating); selectedRating = rating"
              class="p-2 hover:bg-primary-100 cursor-pointer rounded text-sm focus:bg-primary-100 focus:outline-none flex items-center gap-2">
              <div class="flex gap-1">
                <Icon v-for="i in rating" :key="i" icon="material-symbols:star-rounded" class="text-yellow-400" />
                <Icon v-for="i in (5 - rating)" :key="i" icon="material-symbols:star-rounded" class="text-gray-400" />
              </div>
            </div>
          </div>
        </template>
      </Dropdown>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from "vue";
import { useRouter, useRoute } from "vue-router";
import Button from "@/components/ui/Button.vue";
import Input from "@/components/form/Input.vue";
import Dropdown from "@/components/form/Dropdown.vue";
import DateDropdown from "@/components/form/DateDropdown.vue";
import { Icon } from "@iconify/vue";
import { useDestinationStore } from "@/stores/destination";
import { useSessionStore } from "@/stores/session";

const router = useRouter();
const route = useRoute();
const destinations = useDestinationStore();
const session = useSessionStore();

const searchTerm = ref("");
const selectedRating = computed({
  get: () => session.minimumRating,
  set: (value) => { session.minimumRating = value; }
});

// Get unique time periods from destinations and sort them
const availableTimePeriods = computed(() => destinations.timePeriods);

const minTimePeriodIndex = ref(0);
const maxTimePeriodIndex = ref(0);

// Auto-initialize maxTimePeriodIndex when availableTimePeriods loads
watch(() => availableTimePeriods.value.length, (length) => {
  if (length > 0 && maxTimePeriodIndex.value === 0) {
    maxTimePeriodIndex.value = length - 1;
  }
});

const minTimePeriod = computed(() => availableTimePeriods.value[minTimePeriodIndex.value] || 0);
const maxTimePeriod = computed(() => availableTimePeriods.value[maxTimePeriodIndex.value] || 0);

const formatYear = (year: number) => {
  if (year < 0) {
    return `${Math.abs(year)} BC`;
  } else if (year === 0) {
    return "1";
  } else {
    return year;
  }
};

const query = computed(() => {
  const array = [];

  if (searchTerm.value) array.push(`term=${searchTerm.value}`);
  if (session.minimumRating !== null) array.push(`minRating=${session.minimumRating}`);

  // Always add time period to the query
  array.push(`minTimePeriod=${minTimePeriod.value}`);
  array.push(`maxTimePeriod=${maxTimePeriod.value}`);

  const joinedArray = array.join("&");

  return `/search?${joinedArray}`;
});

const handleSearch = () => router.push(query.value);

onMounted(() => {
  const termQuery = route.query.term;
  searchTerm.value = typeof termQuery === "string" ? termQuery : "";

  const ratingQuery = route.query.minRating;
  if (typeof ratingQuery === "string") {
    session.minimumRating = parseInt(ratingQuery);
  }

  // Initialize time period from query
  const minTimePeriodQuery = route.query.minTimePeriod;
  const maxTimePeriodQuery = route.query.maxTimePeriod;

  if (typeof minTimePeriodQuery === "string") {
    const minIndex = availableTimePeriods.value.findIndex(p => p === parseInt(minTimePeriodQuery));
    if (minIndex >= 0) minTimePeriodIndex.value = minIndex;
  }

  if (typeof maxTimePeriodQuery === "string") {
    const maxIndex = availableTimePeriods.value.findIndex(p => p === parseInt(maxTimePeriodQuery));
    if (maxIndex >= 0) maxTimePeriodIndex.value = maxIndex;
  } else if (!minTimePeriodQuery) {
    // Initialize max to the last index if not set
    maxTimePeriodIndex.value = availableTimePeriods.value.length - 1;
  }
});
</script>

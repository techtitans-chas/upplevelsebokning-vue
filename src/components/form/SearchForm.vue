<template>
  <div class="flex flex-col gap-4">
    <!-- Search -->
    <Input placeholder="Search destinations, dates, and more" v-model="searchTerm" @keydown.enter="handleSearch">
    <template #right>
      <Button icon="iconamoon:search-bold" size="md" color="secondary" class="hover:cursor-pointer" @click="handleSearch">
        Search
      </Button>
    </template>
    </Input>

    <!-- Filters -->
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-[1fr_auto_1fr] gap-4 w-full items-stretch">
      
      <!-- Date -->
      <DateDropdown />

      <!-- Rating -->
      <Dropdown label="Minimum rating" placeholder="Select rating" :modelValue="selectedRating === null ? 'No filter' : selectedRating === 0 ? 'No stars' : `${selectedRating} star${selectedRating !== 1 ? 's' : ''}`">
        <template #content="{ select }">
          <div class="p-2 gap-1 flex flex-col">
            <div @click="selectedRating = null" role="option"
              :aria-selected="selectedRating === null" tabindex="0"
              @keydown.enter.prevent="selectedRating = null"
              @keydown.space.prevent="selectedRating = null"
              class="p-2 hover:bg-primary-100 cursor-pointer rounded text-sm focus:bg-primary-100 focus:outline-none">
              No filter
            </div>
            <div @click="select(0); selectedRating = 0" role="option"
              :aria-selected="selectedRating === 0" tabindex="0"
              @keydown.enter.prevent="select(0); selectedRating = 0"
              @keydown.space.prevent="select(0); selectedRating = 0"
              class="p-2 hover:bg-primary-100 cursor-pointer rounded text-sm focus:bg-primary-100 focus:outline-none flex items-center gap-2">
              <span class="text-xs">Below 1 star</span>
            </div>
            <div v-for="rating in [1, 2, 3, 4, 5]" :key="rating" @click="select(rating); selectedRating = rating" role="option"
              :aria-selected="selectedRating === rating" tabindex="0"
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

      <!-- Age group -->
      <Dropdown label="Age group" placeholder="Select an age group" v-model="selectedAgeGroup">
        <template #content="{ select }">
          <div class="p-2 gap-1">
            <div v-for="group in ageGroups" :key="group" @click="select(group)" role="option"
              :aria-selected="selectedAgeGroup === group" tabindex="0" @keydown.enter.prevent="select(group)"
              @keydown.space.prevent="select(group)"
              class="p-2 hover:bg-primary-100 cursor-pointer rounded text-sm focus:bg-primary-100 focus:outline-none">
              {{ group }}
            </div>
          </div>
        </template>
      </Dropdown>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
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
const selectedAgeGroup = ref("");
const ageGroups = ref(["All ages", "18 and above"]);

const query = computed(() => {
  const array = [];

  if (searchTerm.value) array.push(`term=${searchTerm.value}`);
  if (session.minimumRating !== null) array.push(`minRating=${session.minimumRating}`);

  const joinedArray = array.join("&");

  return `/search?${joinedArray}`;
});

const handleSearch = () => router.push(query.value);

onMounted(() => {
  const termQuery = route.query.term;
  searchTerm.value = typeof termQuery === 'string' ? termQuery : '';
  
  const ratingQuery = route.query.minRating;
  if (ratingQuery) {
    const ratingStr = Array.isArray(ratingQuery) ? ratingQuery[0] : ratingQuery;
    if (ratingStr) session.minimumRating = parseInt(ratingStr);
  }
});
</script>

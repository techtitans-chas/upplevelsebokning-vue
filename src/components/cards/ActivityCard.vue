<template>
  <Card
    class="transition-all hover:-translate-y-1"
    headerClass="text-center p-4 pb-2"
    contentClass="text-center py-0 px-4"
    footerClass="pt-0 flex flex-col items-center"
  >
    <template #header>
      <div class="font-semibold">{{ data.title }}</div>
    </template>
    <template #content>
      <p class="text-sm">{{ data.description }}</p>
    </template>
    <template #footer>
      <div class="flex gap-1 justify-center mb-2">
        <Badge class="text-[.7rem] font-regular bg-secondary-500">
          {{ data.duration }}
        </Badge>
        <Badge class="text-[.7rem] font-regular bg-primary-400">
          Up to {{ data.groupSize }} people
        </Badge>
      </div>
      <Dropdown
        ref="dropdownRef"
        :distance="12"
        @show="isOpen = true"
        @hide="isOpen = false"
        placement="top"
        :autoHide="true"
      >
        <Button
          size="xs"
          class="text-base cursor-pointer normal-case hover:cursor-pointer"
          icon="uil:cart"
          v-tooltip.bottom="'Book now'"
        >
          <div class="flex items-center gap-1">
            <span>{{ data.price }}$</span>
            <span class="text-sm">/ person</span>
          </div>
        </Button>
        <template #popper="{ hide }">
          <div class="bg-white p-4 rounded-sm shadow-lg">
            <NumberInput
              label="Number of people"
              v-model="numberOfPeople"
              :min="1"
              :max="data.groupSize"
            />
            <Button
              class="w-full mt-3"
              size="sm"
              @click="
                () => {
                  order();
                  hide();
                }
              "
            >
              Book now
            </Button>
          </div>
        </template>
      </Dropdown>
    </template>
  </Card>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { Dropdown } from "floating-vue";
import Card from "@/components/ui/Card.vue";
import Button from "@/components/ui/Button.vue";
import Badge from "@/components/ui/Badge.vue";
import { Icon } from "@iconify/vue";
import NumberInput from "@/components/form/NumberInput.vue";
import type { Activity } from "@/types";

const props = defineProps<{
  data: Activity;
}>();

const numberOfPeople = ref(1);
const isOpen = ref(false);
const dropdownRef = ref<InstanceType<typeof Dropdown>>();

function order() {
  // TODO: Add logic to add item to cart and navigate
  console.log(
    `Adding ${numberOfPeople.value} people to cart for ${props.data.title}`
  );
}
</script>

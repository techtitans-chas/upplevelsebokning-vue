<template>
  <div class="max-w-6xl mx-auto p-6">
    <h1 font="bold" text="4xl" class="mb-6">Cart ({{ cart.totalAmount }})</h1>

    <div v-if="cart.items.length === 0" class="text-center py-12">
      <p class="text-gray-500 mb-4">Your cart is empty</p>
      <Button to="/">Continue shopping</Button>
    </div>

    <Section v-else>
      <!-- Destination Cart Items -->
      <Card
        v-for="destinationItem in cart.items"
        :key="destinationItem.id"
        class="mb-8 p-6 bg-gray-50 flex-col"
      >
        <!-- Destination Header -->
        <header>
          <RouterLink
            :to="`/destination/${destinationItem.destinationId}`"
            class="font-semibold color-primary-500 hover:color-primary-600"
          >
            {{ destinationStore.getById(destinationItem.destinationId)?.title }}
          </RouterLink>
        </header>

        <!-- Accommodations Section -->
        <div v-if="destinationItem.accommodations.length > 0" class="mb-6">
          <h3 class="text-lg font-semibold mb-4">Accommodations</h3>
          <div class="space-y-4">
            <Card
              v-for="cartAcc in destinationItem.accommodations"
              :key="cartAcc.accommodation.id"
              class="flex justify-between items-start p-4 border border-gray-200"
            >
              <div class="flex-1">
                <h4 class="font-semibold mb-2">
                  {{ cartAcc.accommodation.title }}
                </h4>
                <p class="text-gray-600 text-sm mb-3">
                  {{ cartAcc.accommodation.description }}
                </p>

                <div class="flex gap-4 items-center mb-3">
                  <div>
                    <span class="text-gray-600">Check-in: </span>
                    <span class="font-semibold">{{ cartAcc.startDate }}</span>
                  </div>
                  <div>
                    <span class="text-gray-600">Check-out: </span>
                    <span class="font-semibold">{{ cartAcc.endDate }}</span>
                  </div>
                  <div v-if="cartAcc.duration">
                    <span class="text-gray-600">Duration: </span>
                    <span class="font-semibold"
                      >{{ cartAcc.duration }} night(s)</span
                    >
                  </div>
                  <div>
                    <span class="text-gray-600">Guests: </span>
                    <span class="font-semibold">{{ cartAcc.guests }}</span>
                  </div>
                </div>
              </div>

              <div class="text-right ml-6">
                <div class="text-2xl font-bold text-green-600 mb-3">
                  ${{
                    (
                      cartAcc.accommodation.pricePerNight *
                      (cartAcc.duration || 1)
                    ).toFixed(2)
                  }}
                </div>
                <Button
                  @click="
                    cart.removeAccommodation(
                      destinationItem.destinationId,
                      cartAcc.accommodation.id
                    )
                  "
                  class="bg-red-400 hover:bg-red-500"
                >
                  Remove
                </Button>
              </div>
            </Card>
          </div>
        </div>

        <!-- Activities Section -->
        <div v-if="destinationItem.activities.length > 0">
          <h3 class="text-lg font-semibold mb-4">Activities</h3>
          <div class="space-y-4">
            <Card
              v-for="cartActivity in destinationItem.activities"
              :key="cartActivity.activity.id"
              class="flex justify-between items-start p-4 border border-gray-200"
            >
              <div class="flex-1">
                <h4 class="font-semibold mb-2">
                  {{ cartActivity.activity.title }}
                </h4>
                <p class="text-gray-600 text-sm mb-3">
                  {{ cartActivity.activity.description }}
                </p>

                <div class="flex gap-4 text-sm text-gray-600 mb-3">
                  <span>Duration: {{ cartActivity.activity.duration }}</span>
                  <span
                    >Group size: Up to
                    {{ cartActivity.activity.groupSize }}</span
                  >
                  <span
                    >Attendees:
                    <strong>{{ cartActivity.attendees }}</strong></span
                  >
                </div>

                <div
                  v-if="cartActivity.activity.included.length > 0"
                  class="text-sm mb-3"
                >
                  <p class="font-semibold text-gray-700 mb-1">Included:</p>
                  <ul class="list-disc list-inside text-gray-600">
                    <li
                      v-for="item in cartActivity.activity.included"
                      :key="item"
                    >
                      {{ item }}
                    </li>
                  </ul>
                </div>
              </div>

              <div class="text-right ml-6">
                <div class="text-2xl font-bold text-green-600 mb-3">
                  ${{
                    (
                      cartActivity.activity.price * cartActivity.attendees
                    ).toFixed(2)
                  }}
                </div>
                <div class="space-y-2">
                  <NumberInput
                    label="Attendees"
                    :modelValue="cartActivity.attendees"
                    @update:modelValue="
                      (val) =>
                        cart.updateActivityAttendees(
                          destinationItem.destinationId,
                          cartActivity.activity.id,
                          val
                        )
                    "
                    :min="1"
                    :max="cartActivity.activity.groupSize"
                  />
                  <Button
                    @click="
                      cart.removeActivity(
                        destinationItem.destinationId,
                        cartActivity.activity.id
                      )
                    "
                    class="w-full bg-red-400 hover:bg-red-500"
                  >
                    Remove
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </div>

        <div
          v-if="
            destinationItem.accommodations.length === 0 &&
            destinationItem.activities.length === 0
          "
          class="text-gray-500 italic"
        >
          No items for this destination
        </div>
      </Card>

      <!-- Cart Summary -->
      <div class="mt-8 border-t-2 pt-6">
        <div class="text-right mb-6">
          <div class="mb-2">
            <span class="text-lg text-gray-600">Total: </span>
            <span class="text-3xl font-bold text-green-600"
              >${{ cart.totalValue.toFixed(2) }}</span
            >
          </div>
        </div>

        <div class="flex gap-4 justify-end">
          <Button
            @click="cart.clear"
            class="secondary-400 hover:bg-red-400 cursor-pointer"
            icon="maki:cross"
            >Clear Cart</Button
          >
          <Button @click="pay" icon="mingcute:arrow-right-fill"
            >Proceed to checkout</Button
          >
        </div>
      </div>
    </Section>
  </div>
</template>

<script setup lang="ts">
import { useCartStore } from "@/stores/cart";
import { useRouter } from "vue-router";
import Button from "@/components/ui/Button.vue";
import Section from "@/components/layout/Section.vue";
import Card from "@/components/ui/Card.vue";
import Badge from "@/components/ui/Badge.vue";
import Link from "@/components/ui/Link.vue";
import NumberInput from "@/components/form/NumberInput.vue";
import { useDestinationStore } from "@/stores";

const cart = useCartStore();
const router = useRouter();

function pay() {
  cart.clear();
  router.push("/checkout");
}

const destinationStore = useDestinationStore();
</script>

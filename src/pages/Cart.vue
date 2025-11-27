<template>
  <div class="max-w-6xl mx-auto p-6">
    <h1 font="bold" text="4xl" class="mb-6">Cart ({{ cart.totalAmount }})</h1>

    <div v-if="cart.items.length === 0" class="text-center py-12">
      <p class="text-gray-500 mb-4">Your cart is empty</p>
      <RouterLink to="/">
        <button class="bg-blue-500 text-white px-4 py-2 rounded">
          Continue Shopping
        </button>
      </RouterLink>
    </div>

    <div v-else>
      <!-- Destination Cart Items -->
      <div
        v-for="destinationItem in cart.items"
        :key="destinationItem.id"
        class="mb-8 border rounded-lg p-6 bg-gray-50"
      >
        <!-- Destination Header -->
        <div class="mb-6 pb-6 border-b">
          <h2 class="text-2xl font-bold mb-4">
            Destination: {{ destinationItem.destinationId }}
          </h2>
          <button
            @click="cart.removeDestinationItem(destinationItem.destinationId)"
            class="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
          >
            Remove All
          </button>
        </div>

        <!-- Accommodations Section -->
        <div v-if="destinationItem.accommodations.length > 0" class="mb-6">
          <h3 class="text-lg font-semibold mb-4">Accommodations</h3>
          <div class="space-y-4">
            <div
              v-for="cartAcc in destinationItem.accommodations"
              :key="cartAcc.accommodation.id"
              class="flex justify-between items-start bg-white p-4 rounded border border-gray-200"
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

                <div class="flex gap-2 flex-wrap">
                  <div
                    v-for="amenity in cartAcc.accommodation.amenities"
                    :key="amenity.title"
                    class="bg-blue-100 text-blue-800 px-3 py-1 rounded text-sm"
                  >
                    {{ amenity.title }}
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
                <button
                  @click="
                    cart.removeAccommodation(
                      destinationItem.destinationId,
                      cartAcc.accommodation.id
                    )
                  "
                  class="w-full bg-red-400 text-white px-3 py-2 rounded hover:bg-red-500"
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Activities Section -->
        <div v-if="destinationItem.activities.length > 0">
          <h3 class="text-lg font-semibold mb-4">Activities</h3>
          <div class="space-y-4">
            <div
              v-for="cartActivity in destinationItem.activities"
              :key="cartActivity.activity.id"
              class="flex justify-between items-start bg-white p-4 rounded border border-gray-200"
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
                  <div class="flex gap-2">
                    <button
                      @click="
                        cart.updateActivityAttendees(
                          destinationItem.destinationId,
                          cartActivity.activity.id,
                          cartActivity.attendees - 1
                        )
                      "
                      :disabled="cartActivity.attendees <= 1"
                      class="bg-gray-300 px-3 py-1 rounded disabled:opacity-50"
                    >
                      -
                    </button>
                    <span class="px-4 py-1">{{ cartActivity.attendees }}</span>
                    <button
                      @click="
                        cart.updateActivityAttendees(
                          destinationItem.destinationId,
                          cartActivity.activity.id,
                          cartActivity.attendees + 1
                        )
                      "
                      :disabled="
                        cartActivity.attendees >=
                        cartActivity.activity.groupSize
                      "
                      class="bg-gray-300 px-3 py-1 rounded disabled:opacity-50"
                    >
                      +
                    </button>
                  </div>
                  <button
                    @click="
                      cart.removeActivity(
                        destinationItem.destinationId,
                        cartActivity.activity.id
                      )
                    "
                    class="w-full bg-red-400 text-white px-3 py-2 rounded hover:bg-red-500"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
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
      </div>

      <!-- Cart Summary -->
      <div class="mt-8 border-t-2 pt-6">
        <div class="text-right mb-6">
          <div class="mb-2">
            <span class="text-lg text-gray-600">Total Cart Value: </span>
            <span class="text-3xl font-bold text-green-600"
              >${{ cart.totalValue.toFixed(2) }}</span
            >
          </div>
        </div>

        <div class="flex gap-4 justify-end">
          <button
            class="bg-gray-400 text-white px-6 py-3 rounded hover:bg-gray-500"
            @click="cart.clear"
          >
            Clear Cart
          </button>
          <RouterLink to="/checkout">
            <button
              class="bg-emerald-500 text-white px-8 py-3 rounded hover:bg-emerald-600 font-semibold"
              @click="pay"
            >
              Proceed to Checkout
            </button>
          </RouterLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCartStore } from "@/stores/cart";
import { RouterLink, useRouter } from "vue-router";

const cart = useCartStore();
const router = useRouter();

function pay() {
  cart.clear();
  router.push("/checkout");
}
</script>

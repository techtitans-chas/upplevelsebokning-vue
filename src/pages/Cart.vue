<template>
  <div class="max-w-6xl mx-auto p-6">
    <h1 font="bold" text="4xl" class="mb-6">Cart ({{ cart.totalAmount }})</h1>

    <div v-if="cart.items.length === 0" class="text-center py-12">
      <p class="text-primary-300 mb-4">Your cart is empty</p>
      <Button to="/">Continue browsing</Button>
    </div>

    <Section v-else>
      <!-- Destination Cart Items -->
      <Card
        v-for="destinationItem in cart.items"
        :key="destinationItem.id"
        class="mb-8 p-6 bg-sky-600/6 flex-col"
      >
        <!-- Destination Header -->
        <header class="mb-4 pb-4 border-b border-primary-700 color-primary-50">
          <Link
            :to="`/destination/${destinationItem.destinationId}`"
            class="color-primary-50"
          >
            Destination:
            {{ destinationStore.getById(destinationItem.destinationId)?.title }}
          </Link>
        </header>

        <!-- Accommodations Section -->
        <div v-if="destinationItem.accommodations.length > 0" class="mb-6">
          <h3 class="text-lg font-semibold mb-4 color-primary-50">
            Accommodations
          </h3>
          <div class="space-y-4">
            <Card
              v-for="cartAcc in destinationItem.accommodations"
              :key="cartAcc.accommodation.id"
              class="flex justify-between items-start p-4 border border-sky-700/20 bg-sky-900/40"
            >
              <div class="flex-1">
                <div class="flex justify-between items-start">
                  <h4 class="font-semibold mb-2 text-white">
                    {{ cartAcc.accommodation.title }}
                  </h4>
                  <Button
                    @click="() => {
                      cart.removeAccommodation(
                        destinationItem.destinationId,
                        cartAcc.accommodation.id
                      );
                      success('Accommodation removed from cart');
                    }
                    "
                    color="primary"
                    size="sm"
                    class="cursor-pointer"
                    >Remove
                  </Button>
                </div>
                <p class="text-primary-200 text-sm mb-3">
                  {{ cartAcc.accommodation.description }}
                </p>

                <!-- Info items -->
                <div
                  class="flex gap-4 items-center text-primary-200 justify-between"
                >
                  <div class="flex gap-4">
                    <InfoItem label="Check-in" :value="cartAcc.startDate" />
                    <InfoItem label="Check-Out" :value="cartAcc.endDate" />
                    <InfoItem v-if="cartAcc.duration" label="Duration">
                      {{ cartAcc.duration }} night(s)
                    </InfoItem>
                    <InfoItem label="Guests" :value="cartAcc.guests" />
                  </div>
                  <div>
                    <InfoItem class="justify-end">
                      <span class="text-xl font-semibold text-secondary-300">
                        ${{
                          (
                            cartAcc.accommodation.pricePerNight *
                            (cartAcc.duration || 1)
                          ).toFixed(2)
                        }}
                      </span>
                    </InfoItem>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>

        <!-- Activities Section -->
        <div v-if="destinationItem.activities.length > 0">
          <h3 class="text-lg font-semibold mb-4 color-primary-50">
            Activities
          </h3>
          <div class="space-y-4">
            <Card
              v-for="cartActivity in destinationItem.activities"
              :key="cartActivity.activity.id"
              class="flex justify-between items-start p-4 border border-sky-700/20 bg-sky-900/40"
            >
              <div class="flex-1">
                <div class="flex justify-between">
                  <h4 class="font-semibold mb-2 text-white">
                    {{ cartActivity.activity.title }}
                  </h4>
                  <Button
                    @click="() => {
                      cart.removeActivity(
                        destinationItem.destinationId,
                        cartActivity.activity.id
                      );
                      success('Activity removed from cart');
                    }"
                    color="primary"
                    size="sm"
                  >
                    Remove
                  </Button>
                </div>
                <p class="text-primary-200 text-sm mb-3">
                  {{ cartActivity.activity.description }}
                </p>

                <div class="flex gap-4 text-sm text-primary-300 mb-3">
                  <InfoItem
                    label="Duration"
                    :value="cartActivity.activity.duration"
                  />
                  <InfoItem
                    label="Group size"
                    :value="`Up to ${cartActivity.activity.groupSize}`"
                    class="text-sm"
                  />
                  <InfoItem
                    label="Attendees"
                    :value="cartActivity.attendees"
                    class="text-sm"
                  />
                </div>
              </div>

              <div class="flex flex-end justify-between">
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
                  theme="dark"
                />
                <div class="text-2xl font-bold text-secondary-300 mb-3">
                  ${{
                    (
                      cartActivity.activity.price * cartActivity.attendees
                    ).toFixed(2)
                  }}
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
          class="text-primary-300 italic"
        >
          No items for this destination
        </div>
      </Card>

      <!-- Cart Summary -->
      <div class="mt-8 border-t-2 border-primary-700 pt-6">
        <div class="text-right mb-6">
          <InfoItem label="Total" class="justify-end">
            <span class="text-xl font-semibold text-secondary-300">
              ${{ cart.totalValue.toFixed(2) }}
            </span>
          </InfoItem>
        </div>

        <div class="flex gap-4 justify-end">
          <Button @click="() => {
            cart.clear();
            success('Cart was successfully cleared');
            }" color="secondary" icon="maki:cross">
            Clear Cart
          </Button>
          <Button @click="pay" icon="mingcute:arrow-right-fill">
            Proceed to checkout
          </Button>
        </div>
      </div>
    </Section>
  </div>
</template>

<script setup lang="ts">
import { useCartStore } from "@/stores/cart";
import { useRouter } from "vue-router";
import { useToast } from "@/composables/useToast";
import Button from "@/components/ui/Button.vue";
import Section from "@/components/layout/Section.vue";
import Card from "@/components/ui/Card.vue";
import Link from "@/components/ui/Link.vue";
import NumberInput from "@/components/form/NumberInput.vue";
import { useDestinationStore } from "@/stores";
import InfoItem from "@/components/ui/InfoItem.vue";

const cart = useCartStore();
const router = useRouter();
const { success } = useToast();

function pay() {
  cart.clear();
  cart.processingPayment = true;
  router.push("/checkout");
}

const destinationStore = useDestinationStore();
</script>

import { defineStore } from "pinia";
import { ref, computed } from "vue";
import type { CartItem, Activity, Accommodation } from "../types";
import { useSessionStore } from "./session";

export const useCartStore = defineStore("cart", () => {
  const items = ref<CartItem[]>([]);
  const processingPayment = ref<boolean>(false);

  const totalValue = computed(() => {
    return items.value.reduce((acc, cartItem) => {
      // Destination travel price
      const destinationPrice = cartItem.destinationPrice;

      // Sum accommodation prices
      const accommodationPrice = cartItem.accommodations.reduce(
        (sum, cartAcc) =>
          sum + cartAcc.accommodation.pricePerNight * (cartAcc.duration || 1),
        0
      );

      // Sum activity prices
      const activitiesPrice = cartItem.activities.reduce(
        (sum, cartActivity) =>
          sum + cartActivity.activity.price * cartActivity.attendees,
        0
      );

      return acc + destinationPrice + accommodationPrice + activitiesPrice;
    }, 0);
  });

  const totalAmount = computed(() => items.value.length);

  /**
   * Get or create a cart item for a destination
   */
  function getOrCreateDestinationItem(destinationId: string, destinationPrice: number = 0): CartItem {
    let cartItem = items.value.find((i) => i.destinationId === destinationId);

    if (!cartItem) {
      cartItem = {
        id: `destination-${destinationId}-${Date.now()}`,
        destinationId,
        destinationPrice,
        accommodations: [],
        activities: [],
      };
      items.value.push(cartItem);
    }

    return cartItem;
  }

  /**
   * Add an accommodation to a destination's cart item
   */
  function addAccommodation(
    destinationId: string,
    accommodation: Accommodation,
    guests: number = 1,
    destinationPrice: number = 0
  ) {
    const session = useSessionStore();
    const cartItem = getOrCreateDestinationItem(destinationId, destinationPrice);

    // Check if this accommodation is already in the cart for this destination
    const existingAccommodation = cartItem.accommodations.find(
      (ca) => ca.accommodation.id === accommodation.id
    );

    if (!existingAccommodation) {
      // Calculate duration from session dates
      const duration =
        session.departureDate && session.returnDate
          ? Math.ceil(
              Math.abs(
                new Date(session.returnDate).getTime() -
                  new Date(session.departureDate).getTime()
              ) /
                (1000 * 60 * 60 * 24)
            )
          : 1;

      cartItem.accommodations.push({
        accommodation,
        startDate: session.departureDate || "",
        endDate: session.returnDate || "",
        duration,
        guests,
      });
    }
  }

  /**
   * Remove an accommodation from a destination's cart item
   */
  function removeAccommodation(destinationId: string, accommodationId: string) {
    const cartItem = items.value.find((i) => i.destinationId === destinationId);
    if (cartItem) {
      cartItem.accommodations = cartItem.accommodations.filter(
        (ca) => ca.accommodation.id !== accommodationId
      );

      // Remove the destination item if it has no accommodations or activities
      if (
        cartItem.accommodations.length === 0 &&
        cartItem.activities.length === 0
      ) {
        removeDestinationItem(destinationId);
      }
    }
  }

  /**
   * Add an activity to a destination's cart item
   */
  function addActivity(
    destinationId: string,
    activity: Activity,
    attendees: number = 1,
    destinationPrice: number = 0
  ) {
    const cartItem = getOrCreateDestinationItem(destinationId, destinationPrice);

    // Check if this activity already exists
    const existingActivity = cartItem.activities.find(
      (a) => a.activity.id === activity.id
    );

    if (existingActivity) {
      existingActivity.attendees += attendees;
    } else {
      cartItem.activities.push({ activity, attendees });
    }
  }

  /**
   * Remove an activity from a destination's cart item
   */
  function removeActivity(destinationId: string, activityId: string) {
    const cartItem = items.value.find((i) => i.destinationId === destinationId);
    if (cartItem) {
      cartItem.activities = cartItem.activities.filter(
        (ca) => ca.activity.id !== activityId
      );

      // Remove the destination item if it has no accommodations or activities
      if (
        cartItem.accommodations.length === 0 &&
        cartItem.activities.length === 0
      ) {
        removeDestinationItem(destinationId);
      }
    }
  }

  /**
   * Update the number of attendees for an activity
   */
  function updateActivityAttendees(
    destinationId: string,
    activityId: string,
    attendees: number
  ) {
    const cartItem = items.value.find((i) => i.destinationId === destinationId);
    if (cartItem) {
      const cartActivity = cartItem.activities.find(
        (ca) => ca.activity.id === activityId
      );
      if (cartActivity && attendees > 0) {
        cartActivity.attendees = attendees;
      }
    }
  }

  /**
   * Remove a destination item (and all its accommodations and activities)
   */
  function removeDestinationItem(destinationId: string) {
    items.value = items.value.filter((i) => i.destinationId !== destinationId);
  }

  function clear() {
    items.value = [];
  }

  return {
    items,
    totalValue,
    totalAmount,
    processingPayment,
    addAccommodation,
    removeAccommodation,
    addActivity,
    removeActivity,
    updateActivityAttendees,
    removeDestinationItem,
    clear,
  };
});

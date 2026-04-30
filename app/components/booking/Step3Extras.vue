<script setup lang="ts">
import { Check } from "lucide-vue-next";
import { bookingExtras, useBookingStore } from "~/stores/booking";
import type { BookingStepErrors } from "~/utils/bookingSchemas";

defineProps<{
  errors: BookingStepErrors;
}>();

const booking = useBookingStore();

function isRecommended(extra: (typeof bookingExtras)[number]) {
  return !extra.services || extra.services.includes(booking.serviceType);
}

function isSelected(extraValue: (typeof bookingExtras)[number]["value"]) {
  return booking.extras.includes(extraValue);
}

</script>

<template>
  <div>
    <p class="text-[11px] font-semibold tracking-[0.22em] text-spark-green/55">STEP 3</p>
    <h3 class="mt-2 font-heading text-2xl font-extrabold tracking-tight text-spark-green">Add the extras.</h3>
    <p class="mt-3 text-sm leading-relaxed text-spark-green/65">
      Pick the add-ons you want. This layout keeps the list compact and easier to scan on mobile.
    </p>

    <div class="mt-6 grid gap-2.5 sm:grid-cols-2">
      <button
        v-for="extra in bookingExtras"
        :key="extra.value"
        type="button"
        class="flex min-h-[72px] w-full items-center gap-3 rounded-md border bg-white px-3 py-3 text-left transition sm:px-4"
        :class="isSelected(extra.value)
          ? 'border-spark-green bg-spark-green/[0.03] ring-2 ring-spark-green/10'
          : 'border-spark-green/10 hover:border-spark-green/25 hover:bg-spark-white'"
        @click="booking.toggleExtra(extra.value)"
      >
        <span
          class="flex h-5 w-5 shrink-0 items-center justify-center rounded border transition"
          :class="isSelected(extra.value) ? 'border-spark-green bg-spark-green text-white' : 'border-spark-green/25 bg-white text-transparent'"
          aria-hidden="true"
        >
          <Check class="h-3.5 w-3.5" />
        </span>

        <span class="min-w-0 flex-1">
          <span class="flex items-center gap-2">
            <span class="min-w-0 truncate font-heading text-sm font-extrabold text-spark-green sm:text-base">
              {{ extra.label }}
            </span>
            <!-- <span
              v-if="isRecommended(extra)"
              class="hidden rounded-sm bg-spark-gold/15 px-2 py-1 text-[10px] font-extrabold tracking-[0.12em] text-spark-green sm:inline-flex"
            >
              Recommended
            </span> -->
          </span>
          <!-- <span
            v-if="isRecommended(extra)"
            class="mt-1 block text-[11px] font-semibold text-spark-green/55 sm:hidden"
          >
            Recommended
          </span> -->
        </span>

        <span
          class="inline-flex shrink-0 items-center rounded-sm bg-spark-white px-2.5 py-1 font-heading text-sm font-extrabold text-spark-green ring-1 ring-spark-green/10"
        >
          +${{ extra.price }}
        </span>
      </button>
    </div>
  </div>
</template>

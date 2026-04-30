<script setup lang="ts">
import { useBookingStore } from "~/stores/booking";
import type { BookingStepErrors } from "~/utils/bookingSchemas";

defineProps<{
  errors: BookingStepErrors;
}>();

const booking = useBookingStore();

const bedroomOptions = [1, 2, 3, 4, 5, 6];
const bathroomOptions = [1, 2, 3, 4, 5, 6];

function setBedrooms(bedrooms: number) {
  booking.setScope({ bedrooms, bathrooms: booking.bathrooms ?? 1 });
}

function setBathrooms(bathrooms: number) {
  booking.setScope({ bedrooms: booking.bedrooms ?? 0, bathrooms });
}
</script>

<template>
  <div>
    <p class="text-[11px] font-semibold tracking-[0.22em] text-spark-green/55">STEP 2</p>
    <h3 class="mt-2 font-heading text-2xl font-extrabold tracking-tight text-spark-green">Confirm the property scope.</h3>
    <p class="mt-3 text-sm leading-relaxed text-spark-green/65">
      Choose the bedroom and bathroom count.
    </p>

    <div class="mt-4 flex flex-wrap items-center gap-2 text-sm text-spark-green/65">
      <span class="rounded-sm bg-spark-white px-3 py-1.5 ring-1 ring-spark-green/10">
        Per bedroom: +${{ booking.selectedService.bedroomRate }}
      </span>
      <span class="rounded-sm bg-spark-white px-3 py-1.5 ring-1 ring-spark-green/10">
        Per bathroom: +${{ booking.selectedService.bathroomRate }}
      </span>
    </div>

    <div class="mt-6 space-y-6">
      <div>
        <p class="text-[11px] font-semibold tracking-[0.18em] text-spark-green/60">BEDROOMS</p>
        <div class="mt-3 flex flex-wrap gap-2">
          <button
            v-for="value in bedroomOptions"
            :key="value"
            type="button"
            class="flex h-12 min-w-12 items-center justify-center rounded-md border px-4 font-heading text-sm font-extrabold transition"
            :class="booking.bedrooms === value ? 'border-spark-green bg-spark-green text-white' : 'border-spark-green/10 bg-white text-spark-green'"
            @click="setBedrooms(value)"
          >
            {{ value }}
          </button>
        </div>
        <p v-if="errors.bedrooms" class="mt-2 text-sm font-medium text-red-700">{{ errors.bedrooms }}</p>
      </div>

      <div>
        <p class="text-[11px] font-semibold tracking-[0.18em] text-spark-green/60">BATHROOMS</p>
        <div class="mt-3 flex flex-wrap gap-2">
          <button
            v-for="value in bathroomOptions"
            :key="value"
            type="button"
            class="flex h-12 min-w-12 items-center justify-center rounded-md border px-4 font-heading text-sm font-extrabold transition"
            :class="booking.bathrooms === value ? 'border-spark-green bg-spark-green text-white' : 'border-spark-green/10 bg-white text-spark-green'"
            @click="setBathrooms(value)"
          >
            {{ value }}
          </button>
        </div>
        <p v-if="errors.bathrooms" class="mt-2 text-sm font-medium text-red-700">{{ errors.bathrooms }}</p>
      </div>
    </div>
  </div>
</template>

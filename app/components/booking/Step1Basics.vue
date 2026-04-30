<script setup lang="ts">
import { Building2, Home, KeyRound, ShieldCheck } from "lucide-vue-next";
import { bookingServices, useBookingStore, type BookingServiceType } from "~/stores/booking";
import type { BookingStepErrors } from "~/utils/bookingSchemas";

defineProps<{
  errors: BookingStepErrors;
}>();

const booking = useBookingStore();
const states = ["NSW", "VIC", "QLD", "ACT", "SA", "WA", "TAS", "NT"];

function serviceIcon(serviceType: BookingServiceType) {
  if (serviceType === "end_of_lease") return KeyRound;
  if (serviceType === "office") return Building2;
  return Home;
}

function selectService(serviceType: BookingServiceType) {
  booking.setBasics({
    serviceType,
    location: booking.location,
  });
}

function updateLocation<K extends keyof typeof booking.location>(field: K, value: (typeof booking.location)[K]) {
  booking.setBasics({
    serviceType: booking.serviceType,
    location: {
      ...booking.location,
      [field]: field === "postcode" ? String(value).replace(/\D/g, "").slice(0, 4) : value,
    },
  });
}
</script>

<template>
  <div>
    <p class="text-[11px] font-semibold tracking-[0.22em] text-spark-green/55">STEP 1</p>
    <h3 class="mt-2 font-heading text-2xl font-extrabold tracking-tight text-spark-green">Choose your service.</h3>
    <p class="mt-3 text-sm leading-relaxed text-spark-green/65">
      Pick the job type and tell us where you would like us to clean.
    </p>

    <div class="mt-6 grid gap-3 sm:grid-cols-2">
      <button
        v-for="service in bookingServices"
        :key="service.value"
        type="button"
        class="flex min-h-[110px] items-start gap-4 rounded-md border bg-white p-4 text-left transition hover:-translate-y-0.5 hover:shadow-[0_16px_36px_rgba(13,17,23,0.10)]"
        :class="booking.serviceType === service.value ? 'border-spark-green ring-2 ring-spark-green/10' : 'border-spark-green/10'"
        @click="selectService(service.value)"
      >
        <span class="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-spark-green text-white">
          <component :is="serviceIcon(service.value)" class="h-5 w-5" aria-hidden="true" />
        </span>
        <span class="min-w-0">
          <span class="flex flex-wrap items-center gap-2">
            <span class="font-heading text-base font-extrabold text-spark-green">{{ service.label }}</span>
            <span
              v-if="service.value === 'end_of_lease'"
              class="inline-flex items-center gap-1 rounded-sm bg-spark-gold/15 px-2 py-1 text-[10px] font-extrabold tracking-[0.12em] text-spark-green ring-1 ring-spark-gold/35"
            >
              <ShieldCheck class="h-3.5 w-3.5 text-spark-gold" aria-hidden="true" />
              BOND BACK GUARANTEED
            </span>
          </span>
          <span class="mt-2 block text-sm text-spark-green/60">From ${{ service.base }}</span>
        </span>
      </button>
    </div>

    <div class="mt-8 border border-spark-green/10 bg-white p-5 shadow-[0_18px_45px_rgba(13,17,23,0.06)] sm:p-6">
      <div class="max-w-3xl">
        <h4 class="font-heading text-lg font-extrabold tracking-tight text-spark-green">
          Where would you like us to clean?
        </h4>
        <p class="mt-2 text-sm leading-relaxed text-spark-green/65">
          Add the property details so we can prepare the quote correctly.
        </p>
      </div>

      <div class="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <label class="block xl:col-span-2">
          <span class="text-[11px] font-semibold tracking-[0.18em] text-spark-green/60">ADDRESS</span>
          <input
            :value="booking.location.addressLine1"
            type="text"
            autocomplete="address-line1"
            placeholder="Address *"
            class="mt-2 h-12 w-full rounded-md border border-spark-green/15 bg-white px-4 text-sm text-spark-green outline-none transition focus:border-spark-green"
            :aria-invalid="Boolean(errors.addressLine1)"
            @input="updateLocation('addressLine1', ($event.target as HTMLInputElement).value)"
          />
          <span v-if="errors.addressLine1" class="mt-2 block text-sm font-medium text-red-700">{{ errors.addressLine1 }}</span>
        </label>

        <label class="block">
          <span class="text-[11px] font-semibold tracking-[0.18em] text-spark-green/60">APT/UNIT NO.</span>
          <input
            :value="booking.location.unitNumber"
            type="text"
            autocomplete="address-line2"
            placeholder="Apt/Unit No."
            class="mt-2 h-12 w-full rounded-md border border-spark-green/15 bg-white px-4 text-sm text-spark-green outline-none transition focus:border-spark-green"
            @input="updateLocation('unitNumber', ($event.target as HTMLInputElement).value)"
          />
        </label>

        <label class="block">
          <span class="text-[11px] font-semibold tracking-[0.18em] text-spark-green/60">SUBURB</span>
          <input
            :value="booking.location.suburb"
            type="text"
            autocomplete="address-level2"
            placeholder="Suburb *"
            class="mt-2 h-12 w-full rounded-md border border-spark-green/15 bg-white px-4 text-sm text-spark-green outline-none transition focus:border-spark-green"
            :aria-invalid="Boolean(errors.suburb)"
            @input="updateLocation('suburb', ($event.target as HTMLInputElement).value)"
          />
          <span v-if="errors.suburb" class="mt-2 block text-sm font-medium text-red-700">{{ errors.suburb }}</span>
        </label>

        <label class="block">
          <span class="text-[11px] font-semibold tracking-[0.18em] text-spark-green/60">POST CODE</span>
          <input
            :value="booking.location.postcode"
            type="text"
            inputmode="numeric"
            autocomplete="postal-code"
            placeholder="2150 *"
            class="mt-2 h-12 w-full rounded-md border border-spark-green/15 bg-white px-4 text-sm text-spark-green outline-none transition focus:border-spark-green"
            :aria-invalid="Boolean(errors.postcode)"
            @input="updateLocation('postcode', ($event.target as HTMLInputElement).value)"
          />
          <span v-if="errors.postcode" class="mt-2 block text-sm font-medium text-red-700">{{ errors.postcode }}</span>
        </label>

        <label class="block sm:max-w-[220px]">
          <span class="text-[11px] font-semibold tracking-[0.18em] text-spark-green/60">STATE</span>
          <select
            :value="booking.location.state"
            class="mt-2 h-12 w-full rounded-md border border-spark-green/15 bg-white px-4 text-sm text-spark-green outline-none transition focus:border-spark-green"
            :aria-invalid="Boolean(errors.state)"
            @change="updateLocation('state', ($event.target as HTMLSelectElement).value)"
          >
            <option value="">Select State *</option>
            <option v-for="state in states" :key="state" :value="state">{{ state }}</option>
          </select>
          <span v-if="errors.state" class="mt-2 block text-sm font-medium text-red-700">{{ errors.state }}</span>
        </label>
      </div>
    </div>
  </div>
</template>

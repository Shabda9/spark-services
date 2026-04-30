<script setup lang="ts">
import { computed } from "vue";
import { useBookingStore } from "~/stores/booking";
import type { BookingStepErrors } from "~/utils/bookingSchemas";

defineProps<{
  errors: BookingStepErrors;
}>();

const booking = useBookingStore();

const contact = computed({
  get: () => booking.contact,
  set: (value) => booking.setContact(value),
});

function updateContact(field: keyof typeof booking.contact, value: string) {
  booking.setContact({
    ...booking.contact,
    [field]: value,
  });
}
</script>

<template>
  <div>
    <p class="text-[11px] font-semibold tracking-[0.22em] text-spark-green/55">STEP 4</p>
    <h3 class="mt-2 font-heading text-2xl font-extrabold tracking-tight text-spark-green">Where should we send it?</h3>
    <p class="mt-3 text-sm leading-relaxed text-spark-green/65">
      We&apos;ll email your quote instantly. No spam, no pressure.
    </p>

    <div class="mt-6 grid gap-4 md:grid-cols-2">
      <label class="block">
        <span class="text-[11px] font-semibold tracking-[0.18em] text-spark-green/60">NAME</span>
        <input
          :value="contact.name"
          type="text"
          autocomplete="name"
          class="mt-2 h-12 w-full rounded-md border border-spark-green/15 bg-white px-4 text-sm text-spark-green outline-none transition focus:border-spark-green"
          @input="updateContact('name', ($event.target as HTMLInputElement).value)"
        />
        <span v-if="errors.name" class="mt-2 block text-sm font-medium text-red-700">{{ errors.name }}</span>
      </label>

      <label class="block">
        <span class="text-[11px] font-semibold tracking-[0.18em] text-spark-green/60">PHONE</span>
        <input
          :value="contact.phone"
          type="tel"
          autocomplete="tel"
          class="mt-2 h-12 w-full rounded-md border border-spark-green/15 bg-white px-4 text-sm text-spark-green outline-none transition focus:border-spark-green"
          @input="updateContact('phone', ($event.target as HTMLInputElement).value)"
        />
        <span v-if="errors.phone" class="mt-2 block text-sm font-medium text-red-700">{{ errors.phone }}</span>
      </label>

      <label class="block">
        <span class="text-[11px] font-semibold tracking-[0.18em] text-spark-green/60">EMAIL</span>
        <input
          :value="contact.email"
          type="email"
          autocomplete="email"
          class="mt-2 h-12 w-full rounded-md border border-spark-green/15 bg-white px-4 text-sm text-spark-green outline-none transition focus:border-spark-green"
          @input="updateContact('email', ($event.target as HTMLInputElement).value)"
        />
        <span v-if="errors.email" class="mt-2 block text-sm font-medium text-red-700">{{ errors.email }}</span>
      </label>

      <label class="block">
        <span class="text-[11px] font-semibold tracking-[0.18em] text-spark-green/60">PREFERRED DATE</span>
        <input
          :value="contact.date"
          type="date"
          class="mt-2 h-12 w-full rounded-md border border-spark-green/15 bg-white px-4 text-sm text-spark-green outline-none transition focus:border-spark-green"
          @input="updateContact('date', ($event.target as HTMLInputElement).value)"
        />
        <span v-if="errors.date" class="mt-2 block text-sm font-medium text-red-700">{{ errors.date }}</span>
      </label>
    </div>
  </div>
</template>

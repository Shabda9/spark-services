<script setup lang="ts">
import { ArrowRight, Sparkles } from "lucide-vue-next";
import { ref } from "vue";
import { useBookingStore, type BookingServiceType } from "~/stores/booking";

const booking = useBookingStore();

const quickService = ref<BookingServiceType>(
  booking.serviceType === "residential" || booking.serviceType === "end_of_lease"
    ? booking.serviceType
    : "end_of_lease",
);

const quickServices: Array<{ label: string; value: BookingServiceType; helper: string }> = [
  { label: "End of lease", value: "end_of_lease", helper: "From $350" },
  { label: "Residential", value: "residential", helper: "Flexible home cleans" },
];

async function startQuote() {
  booking.setBasics({
    serviceType: quickService.value,
    location: {
      ...booking.location,
    },
  });

  await navigateTo({
    path: "/booking",
    query: {
      service: quickService.value,
    },
  });
}
</script>

<template>
  <form
    class="border border-white/12 bg-white/10 p-5 text-white shadow-[0_18px_55px_rgba(0,0,0,0.24)] backdrop-blur-md sm:p-6"
    @submit.prevent="startQuote"
  >
    <div class="flex items-start justify-between gap-4">
      <div>
        <p class="text-[11px] font-semibold tracking-[0.22em] text-white/60">QUICK QUOTE</p>
        <h2 class="mt-2 font-heading text-2xl font-bold tracking-tight text-white">
          Start with a few details.
        </h2>
      </div>

      <span class="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-white/10 ring-1 ring-white/15">
        <Sparkles class="h-5 w-5 text-spark-gold" aria-hidden="true" />
      </span>
    </div>

    <p class="mt-3 text-sm leading-relaxed text-white/72">
      We&apos;ll carry these details into the full booking flow so the rest feels fast.
    </p>

    <div class="mt-5 grid gap-2 sm:grid-cols-2">
      <button
        v-for="service in quickServices"
        :key="service.value"
        type="button"
        class="rounded-md border px-3 py-3 text-left transition duration-200 ease-out"
        :class="
          quickService === service.value
            ? 'border-spark-gold/70 bg-white/18 text-white shadow-[0_10px_24px_rgba(0,0,0,0.18)] ring-1 ring-spark-gold/35'
            : 'border-white/10 bg-white/5 text-white/82 hover:border-white/35 hover:bg-white/12 hover:text-white hover:shadow-[0_10px_24px_rgba(0,0,0,0.16)]'
        "
        @click="quickService = service.value"
      >
        <span class="block font-heading text-sm font-bold tracking-[0.02em]">
          {{ service.label }}
        </span>
        <span class="mt-1 block text-xs text-white/60">{{ service.helper }}</span>
      </button>
    </div>

    <div class="mt-5 grid gap-3 sm:grid-cols-2">
      <label class="block sm:col-span-2">
        <span class="text-[11px] font-semibold tracking-[0.18em] text-white/65">POSTCODE</span>
        <input
          :value="booking.location.postcode"
          type="text"
          inputmode="numeric"
          autocomplete="postal-code"
          maxlength="4"
          required
          placeholder="2150"
          class="mt-2 h-11 w-full rounded-md border border-white/10 bg-white/6 px-4 text-sm text-white placeholder:text-white/35 shadow-[0_10px_30px_rgba(0,0,0,0.18)] backdrop-blur focus:outline-none focus-visible:ring-2 focus-visible:ring-spark-gold/70"
          @input="booking.updateLocation({ postcode: ($event.target as HTMLInputElement).value.replace(/\D/g, '').slice(0, 4) })"
        />
      </label>

      <label class="block">
        <span class="text-[11px] font-semibold tracking-[0.18em] text-white/65">NAME</span>
        <input
          :value="booking.contact.name"
          type="text"
          autocomplete="name"
          required
          placeholder="Your name"
          class="mt-2 h-11 w-full rounded-md border border-white/10 bg-white/6 px-4 text-sm text-white placeholder:text-white/35 shadow-[0_10px_30px_rgba(0,0,0,0.18)] backdrop-blur focus:outline-none focus-visible:ring-2 focus-visible:ring-spark-gold/70"
          @input="booking.updateContact({ name: ($event.target as HTMLInputElement).value })"
        />
      </label>

      <label class="block">
        <span class="text-[11px] font-semibold tracking-[0.18em] text-white/65">EMAIL</span>
        <input
          :value="booking.contact.email"
          type="email"
          autocomplete="email"
          required
          placeholder="you@example.com"
          class="mt-2 h-11 w-full rounded-md border border-white/10 bg-white/6 px-4 text-sm text-white placeholder:text-white/35 shadow-[0_10px_30px_rgba(0,0,0,0.18)] backdrop-blur focus:outline-none focus-visible:ring-2 focus-visible:ring-spark-gold/70"
          @input="booking.updateContact({ email: ($event.target as HTMLInputElement).value })"
        />
      </label>
    </div>

    <button
      type="submit"
      class="mt-5 inline-flex h-12 w-full items-center justify-center gap-2 rounded-md bg-spark-gold px-5 font-heading text-[11px] font-bold tracking-[0.16em] text-spark-dark shadow-[0_12px_28px_rgba(245,197,66,0.18)] ring-1 ring-white/10 transition hover:bg-spark-gold-light focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
    >
      START MY QUOTE
      <ArrowRight class="h-4 w-4" aria-hidden="true" />
    </button>

    <p class="mt-3 text-center text-xs leading-relaxed text-white/52">
      Need carpet steam, post-construction, or something more specific? The full booking page covers the rest.
    </p>
  </form>
</template>

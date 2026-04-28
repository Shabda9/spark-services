<script setup lang="ts">
import { BadgeCheck, Home, Leaf, MapPin, ShieldCheck } from "lucide-vue-next";

const pickup = defineModel<string>("pickup", { default: "" });
const dropoff = defineModel<string>("dropoff", { default: "" });

defineEmits<{
  continue: [];
}>();

type TrustChip = { text: string; icon: unknown };

const trustChips: TrustChip[] = [
  { text: "Fully insured team", icon: BadgeCheck },
  { text: "Public liability cover", icon: ShieldCheck },
  { text: "Responsible disposal", icon: Leaf },
];
</script>

<template>
  <div
    class="relative border border-white/[0.14] bg-white/[0.06] p-4 shadow-[0_18px_50px_rgba(0,0,0,0.28)] backdrop-blur-xl sm:p-5"
  >
    <div
      class="pointer-events-none absolute left-0 top-0 h-px w-full bg-gradient-to-r from-transparent via-spark-gold/70 to-transparent"
      aria-hidden="true"
    />

    <div
      class="flex min-h-[3rem] flex-col divide-y divide-white/[0.12] border border-white/[0.1] bg-black/25 sm:flex-row sm:divide-x sm:divide-y-0"
      role="group"
      aria-label="Move route"
    >
      <label class="flex min-w-0 flex-1 cursor-text flex-col gap-1 px-3 py-3 sm:px-4">
        <span class="flex items-center gap-1.5 text-[9px] font-semibold tracking-[0.2em] text-white/45">
          <MapPin class="h-3 w-3 shrink-0 text-spark-gold/90" aria-hidden="true" :stroke-width="2" />
          FROM
        </span>
        <span class="sr-only">Current address</span>
        <input
          v-model="pickup"
          type="text"
          autocomplete="street-address"
          placeholder="Current address"
          class="w-full border-0 border-b border-transparent bg-transparent pb-0.5 text-sm font-light leading-snug tracking-wide text-white placeholder:text-white/35 transition-colors focus:border-white/25 focus:outline-none focus:ring-0"
        />
      </label>
      <label class="flex min-w-0 flex-1 cursor-text flex-col gap-1 px-3 py-3 sm:px-4">
        <span class="flex items-center gap-1.5 text-[9px] font-semibold tracking-[0.2em] text-white/45">
          <Home class="h-3 w-3 shrink-0 text-spark-gold/90" aria-hidden="true" :stroke-width="2" />
          TO
        </span>
        <span class="sr-only">Moving to address</span>
        <input
          v-model="dropoff"
          type="text"
          autocomplete="off"
          placeholder="Destination address"
          class="w-full border-0 border-b border-transparent bg-transparent pb-0.5 text-sm font-light leading-snug tracking-wide text-white placeholder:text-white/35 transition-colors focus:border-white/25 focus:outline-none focus:ring-0"
        />
      </label>
    </div>

    <div class="mt-4 border-t border-white/[0.08] pt-4">
      <ul
        class="flex flex-col gap-2 text-[10px] font-medium leading-none text-white/65 md:flex-row md:flex-nowrap md:items-stretch md:justify-between md:gap-0 md:divide-x md:divide-white/[0.12]"
        aria-label="Trust highlights"
      >
        <li
          v-for="item in trustChips"
          :key="item.text"
          class="flex items-center gap-1.5 md:min-w-0 md:flex-1 md:justify-center md:gap-1.5 md:px-2 lg:px-2.5"
        >
          <component :is="item.icon" class="h-3 w-3 shrink-0 text-spark-gold/75 md:mt-px" aria-hidden="true" :stroke-width="2" />
          <span class="whitespace-nowrap text-white/70">{{ item.text }}</span>
        </li>
      </ul>
    </div>

    <button
      type="button"
      class="mt-4 inline-flex h-10 w-full items-center justify-center border border-white/25 bg-white/[0.08] px-4 font-heading text-[10px] font-extrabold tracking-[0.2em] text-white transition hover:border-white/40 hover:bg-white/[0.12] focus:outline-none focus-visible:ring-1 focus-visible:ring-spark-gold/80 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent sm:text-[11px]"
      @click="$emit('continue')"
    >
      CONTINUE TO QUOTE
    </button>
  </div>
</template>

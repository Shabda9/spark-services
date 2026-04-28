<script setup lang="ts">
import { CircleDot } from "lucide-vue-next";

type FleetTier = {
  id: string;
  title: string;
  recommendedFor: string;
  pricePerHour: number;
  specs: string[];
  imageUrl: string;
  imageAlt: string;
  popular?: boolean;
};

const fleetTiers: FleetTier[] = [
  {
    id: "small_van",
    title: "Small van",
    recommendedFor: "Studio apartments and light loads",
    pricePerHour: 85,
    specs: [
      "Load capacity: 5–8 cubic metres",
      "Access: Fits in standard underground parking",
    ],
    imageUrl: "https://images.pexels.com/photos/7464689/pexels-photo-7464689.jpeg",
    imageAlt: "Compact vehicle interior suited to smaller removals",
  },
  {
    id: "medium_truck",
    title: "Medium truck",
    recommendedFor: "Most apartments and typical household moves",
    pricePerHour: 125,
    specs: [
      "Load capacity: 18–22 cubic metres",
      "Features: Hydraulic tailgate lift included",
    ],
    imageUrl: "https://images.pexels.com/photos/15378707/pexels-photo-15378707.jpeg",
    imageAlt: "Medium removals truck on a city street",
    popular: true,
  },
  {
    id: "large_truck",
    title: "Large truck",
    recommendedFor: "Full homes and bulky furniture volumes",
    pricePerHour: 165,
    specs: [
      "Load capacity: 40+ cubic metres",
      "Crew: 3+ handlers recommended",
    ],
    imageUrl: "https://images.pexels.com/photos/12418935/pexels-photo-12418935.jpeg",
    imageAlt: "Large removals truck on the road",
  },
];

</script>

<template>
  <section
    class="border-t border-spark-green/[0.06] bg-[#E8F6EE]/90 px-6 py-12 lg:px-10 lg:py-16"
    aria-labelledby="fleet-pricing-heading"
  >
    <div class="mx-auto max-w-7xl">
      <div class="mx-auto max-w-3xl text-center">
        <p class="text-[11px] font-semibold tracking-[0.26em] text-spark-green/55">FLEET &amp; RATES</p>
        <h2 id="fleet-pricing-heading" class="mt-3 font-heading text-3xl font-extrabold tracking-tight text-spark-green sm:text-4xl">
          Transparent fleet pricing
        </h2>
        <p class="mt-4 text-base leading-relaxed text-spark-green/70 sm:text-lg">
          Choose the capacity that matches your move. All hourly rates include two professional handlers unless noted.
        </p>
      </div>

      <div class="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-5 lg:gap-8">
        <button
          v-for="tier in fleetTiers"
          :key="tier.id"
          type="button"
          class="group relative flex w-full flex-col overflow-hidden rounded-md border bg-white text-left shadow-[0_14px_40px_rgba(13,17,23,0.08)] transition-[box-shadow,border-color,outline-color] duration-300 ease-out focus:outline-none focus-visible:ring-2 focus-visible:ring-spark-gold/80 focus-visible:ring-offset-2 focus-visible:ring-offset-[#E8F6EE]"
          :class="
            tier.popular
              ? 'border-spark-green shadow-[0_22px_55px_rgba(13,17,23,0.14)] ring-2 ring-spark-green/90'
              : 'border-spark-green/10 hover:border-spark-green/35 hover:shadow-[0_20px_48px_rgba(13,17,23,0.12)]'
          "
          :aria-label="`${tier.title}. From ${tier.pricePerHour} dollars per hour.`"
        >
          <span
            v-if="tier.popular"
            class="absolute right-4 top-4 z-10 rounded-sm bg-spark-green px-2.5 py-1 font-heading text-[10px] font-extrabold tracking-[0.14em] text-white shadow-sm"
          >
            MOST POPULAR
          </span>

          <div class="relative aspect-[16/10] w-full overflow-hidden bg-spark-green/5">
            <img
              :src="tier.imageUrl"
              :alt="tier.imageAlt"
              class="h-full w-full object-cover transition duration-500 ease-out group-hover:scale-[1.03]"
              loading="lazy"
              decoding="async"
            />
            <div
              class="pointer-events-none absolute inset-0 bg-gradient-to-t from-spark-dark/25 via-transparent to-transparent"
              aria-hidden="true"
            />
          </div>

          <div class="flex flex-1 flex-col p-6 sm:p-7">
            <h3 class="font-heading text-xl font-extrabold tracking-tight text-spark-green sm:text-2xl">
              {{ tier.title }}
            </h3>
            <p class="mt-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-spark-green/50">
              Recommended for: {{ tier.recommendedFor }}
            </p>
            <p class="mt-5 font-heading text-2xl font-extrabold tracking-tight text-spark-green sm:text-3xl">
              From ${{ tier.pricePerHour }}
              <span class="text-lg font-semibold text-spark-green/65">/ hour</span>
            </p>
            <ul class="mt-6 space-y-3 text-sm leading-snug text-spark-green/72">
              <li v-for="(line, idx) in tier.specs" :key="idx" class="flex gap-2.5">
                <CircleDot
                  class="mt-0.5 h-4 w-4 shrink-0 text-spark-green/40"
                  :stroke-width="2"
                  aria-hidden="true"
                />
                <span>{{ line }}</span>
              </li>
            </ul>
          </div>
        </button>
      </div>

      <p class="mx-auto mt-10 max-w-2xl text-center text-sm leading-relaxed text-spark-green/60">
        Figures are indicative starting rates; final quotes depend on distance, access, and scheduling. Mention your preferred vehicle size when you enquire.
      </p>
    </div>
  </section>
</template>

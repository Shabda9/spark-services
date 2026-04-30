<script setup lang="ts">
import { CheckCircle2 } from "lucide-vue-next";

type Bundle = {
  title: string;
  description: string;
  features: string[];
};

const bundles: Bundle[] = [
  {
    title: "Move-In Clean & Relocation",
    description:
      "A seamless transition to your new home. Includes professional packing, transport, and deep sanitation of your new premises.",
    features: ["Professional 2‑Man Removals", "Deep End‑of‑Lease Cleaning"],
  },
  {
    title: "Garden Refresh & Exterior Clean",
    description:
      "Complete curb appeal restoration. High‑pressure washing for driveways combined with expert landscaping.",
    features: ["Lawn Care & Pruning", "Pressure Pipe/Path Cleaning"],
  },
  {
    title: "Full Estate Reset",
    description:
      "The ultimate property overhaul. Total interior cleaning, debris removal, and garden revitalisation.",
    features: ["Whole House Deep Clean", "Green & Hard Waste Removal"],
  },
];
</script>

<template>
  <section class="mx-auto max-w-7xl px-6 py-8 lg:px-10 lg:py-8">
    <div class="mx-auto max-w-3xl text-center">
      <p class="text-[11px] font-semibold tracking-[0.26em] text-spark-green/60">CURATED PACKAGES</p>
      <h2 class="mt-3 font-heading text-3xl font-extrabold tracking-tight text-spark-green sm:text-4xl">
        Value Bundles
      </h2>
      <p class="mt-4 text-base leading-relaxed text-spark-green/70 sm:text-lg">
        Optimise your property maintenance with our integrated service bundles designed for efficiency and savings.
      </p>
    </div>

    <div class="mt-12 grid gap-7 lg:grid-cols-3">
      <article
        v-for="bundle in bundles"
        :key="bundle.title"
        class="group relative flex flex-col overflow-hidden border border-spark-green/10 bg-white shadow-[0_18px_45px_rgba(13,17,23,0.08)] transition hover:-translate-y-0.5 hover:shadow-[0_22px_60px_rgba(13,17,23,0.12)]"
      >
        <div class="p-7 sm:p-8">
          <span
            class="inline-flex items-center rounded-full bg-spark-green/10 px-3 py-1 text-[11px] font-bold tracking-[0.18em] text-spark-green"
          >
            BUNDLE &amp; SAVE
          </span>

          <h3 class="mt-4 font-heading text-xl font-extrabold tracking-tight text-spark-green">
            {{ bundle.title }}
          </h3>
          <p class="mt-3 text-sm leading-relaxed text-spark-green/70">
            {{ bundle.description }}
          </p>

          <ul class="mt-6 space-y-3">
            <li v-for="feature in bundle.features" :key="feature" class="flex items-start gap-3">
              <CheckCircle2 class="mt-0.5 h-5 w-5 text-spark-green/70" aria-hidden="true" />
              <span class="text-sm font-medium text-spark-green/80">{{ feature }}</span>
            </li>
          </ul>
        </div>

        <div class="mt-auto border-t border-spark-green/10 bg-spark-white/40 p-6 sm:p-7">
          <NuxtLink
            to="/booking"
            class="inline-flex h-11 w-full items-center justify-center rounded-md border border-spark-green/20 bg-white px-6 font-heading text-[11px] font-extrabold tracking-[0.18em] text-spark-green transition hover:border-spark-green/30 hover:bg-spark-green hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-spark-gold/70 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
            aria-label="Select bundle"
          >
            SELECT BUNDLE
          </NuxtLink>
        </div>
      </article>
    </div>
  </section>
</template>


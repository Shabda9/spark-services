<script setup lang="ts">
import {
  ArrowRight,
  Leaf,
  Sprout,
  Trees,
  Scissors,
  Trash2,
  Ruler,
  Droplets,
  Shovel,
} from "lucide-vue-next";

type GardeningService = {
  id: string;
  title: string;
  description: string;
  startingFrom: number;
  icon: unknown;
  badge?: string;
  imageUrl?: string;
  bullets?: string[];
  accent?: "gold" | "green" | "dark";
};

const quoteLink = "#gardening-contact";
const fallbackImageUrl = "https://images.pexels.com/photos/18137544/pexels-photo-18137544.jpeg";

const services: GardeningService[] = [
  {
    id: "maintenance",
    title: "Garden maintenance",
    description: "Regular mowing, edging, and tidy-ups to keep your garden looking sharp week to week.",
    startingFrom: 120,
    icon: Leaf,
    imageUrl: "https://images.pexels.com/photos/32759035/pexels-photo-32759035.jpeg",
    accent: "green",
  },
  {
    id: "landscaping",
    title: "Landscaping refresh",
    description: "Beds, edging, planting, and practical upgrades that lift kerb appeal and usability.",
    startingFrom: 390,
    icon: Sprout,
    badge: "POPULAR",
    bullets: ["Garden beds & mulch", "Edging & clean lines", "Planting & pruning"],
    accent: "dark",
  },
  {
    id: "turfing",
    title: "Turfing & lawn repair",
    description: "New turf installs and patch repairs for a greener, more even finish.",
    startingFrom: 650,
    icon: Scissors,
    accent: "gold",
  },
  {
    id: "tree_care",
    title: "Hedges & tree care",
    description: "Trimming, shaping, and safe tidy-ups with access and clearances in mind.",
    startingFrom: 220,
    icon: Trees,
    accent: "green",
  },
  {
    id: "green_waste",
    title: "Green waste removal",
    description: "We clean up after the job and take the green waste with us.",
    startingFrom: 90,
    icon: Trash2,
    accent: "gold",
  },
  {
    id: "weeding",
    title: "Weeding & garden beds",
    description: "Detail work for pathways, beds, and hard-to-reach areas finished clean and tidy.",
    startingFrom: 140,
    icon: Shovel,
    accent: "dark",
  },
  {
    id: "pressure_clean",
    title: "Outdoor tidy & washdown",
    description: "Quick refresh for patios, paths, and outdoor areas to lift presentation.",
    startingFrom: 160,
    icon: Droplets,
    accent: "green",
  },
  {
    id: "edging",
    title: "Edging & lines",
    description: "Crisp edges for lawns and borders small detail, big impact.",
    startingFrom: 80,
    icon: Ruler,
    accent: "gold",
  },
];

const featured = services[0]!;
const highlight = services[1]!;
const tiles = services.slice(2);
</script>

<template>
  <section class="mx-auto max-w-7xl px-6 py-10 lg:px-10 lg:py-12" aria-label="Gardening services">
    <div class="mx-auto max-w-3xl text-center">
      <p class="text-[11px] font-semibold tracking-[0.26em] text-spark-green/60">GARDENING SERVICES</p>
      <h2 class="mt-3 font-heading text-3xl font-extrabold tracking-tight text-spark-green sm:text-4xl">
        Garden care that shows.
      </h2>
      <p class="mt-4 text-base leading-relaxed text-spark-green/70 sm:text-lg">
        Choose the service you need then we’ll confirm scope, access, and timing with clear inclusions.
      </p>
    </div>

    <div class="mt-10 grid gap-6 lg:grid-cols-12 lg:items-stretch">
      <article
        class="group relative overflow-hidden border border-spark-green/10 bg-white shadow-[0_18px_45px_rgba(13,17,23,0.10)] transition hover:-translate-y-0.5 hover:shadow-[0_22px_60px_rgba(13,17,23,0.14)] lg:col-span-7"
      >
        <div class="relative h-[220px] w-full overflow-hidden sm:h-[260px]">
          <img
            :src="featured.imageUrl ?? fallbackImageUrl"
            :alt="featured.title"
            class="h-full w-full object-cover transition duration-500 group-hover:scale-[1.02]"
            loading="lazy"
            decoding="async"
          />
          <div class="absolute inset-0 bg-gradient-to-t from-spark-dark/35 via-transparent to-transparent" aria-hidden="true" />
        </div>

        <div class="p-6 sm:p-8">
          <div class="flex items-start justify-between gap-6">
            <div class="min-w-0">
              <h3 class="font-heading text-2xl font-extrabold tracking-tight text-spark-green">
                {{ featured.title }}
              </h3>
              <p class="mt-3 text-sm leading-relaxed text-spark-green/70 sm:text-base">
                {{ featured.description }}
              </p>
            </div>

            <div class="text-right">
              <p class="text-[11px] font-semibold tracking-[0.18em] text-spark-green/55">STARTING FROM</p>
              <p class="mt-1 font-heading text-3xl font-extrabold tracking-tight text-spark-green">
                ${{ featured.startingFrom }}
              </p>
            </div>
          </div>

          <div class="mt-7 flex justify-end border-t border-spark-green/10 pt-6">
            <NuxtLink
              :to="quoteLink"
              class="group inline-flex items-center gap-2 font-heading text-[11px] font-extrabold tracking-[0.16em] text-spark-green underline-offset-4 transition hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-spark-gold/70 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
              :aria-label="`Enquire about ${featured.title}`"
            >
              ENQUIRE
              <ArrowRight
                class="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5"
                :stroke-width="1.75"
                aria-hidden="true"
              />
            </NuxtLink>
          </div>
        </div>
      </article>

      <article
        class="relative overflow-hidden border border-white/10 bg-spark-green shadow-[0_18px_45px_rgba(13,17,23,0.14)] lg:col-span-5"
      >
        <div class="absolute inset-0 bg-[radial-gradient(800px_360px_at_40%_10%,rgba(245,197,66,0.18)_0%,rgba(245,197,66,0.0)_65%)]" aria-hidden="true" />
        <div class="relative p-6 sm:p-8">
          <div class="flex items-start justify-between gap-4">
            <div class="flex items-start gap-3">
              <span class="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center" aria-hidden="true">
                <component :is="highlight.icon" class="h-5 w-5 text-white/85" :stroke-width="1.5" aria-hidden="true" />
              </span>
              <div>
                <p v-if="highlight.badge" class="text-[11px] font-semibold tracking-[0.20em] text-white/70">
                  {{ highlight.badge }}
                </p>
                <h3 class="mt-1 font-heading text-2xl font-extrabold tracking-tight text-white">
                  {{ highlight.title }}
                </h3>
              </div>
            </div>
          </div>

          <p class="mt-4 text-sm leading-relaxed text-white/75">
            {{ highlight.description }}
          </p>

          <ul v-if="highlight.bullets?.length" class="mt-6 space-y-3">
            <li v-for="bullet in highlight.bullets" :key="bullet" class="flex items-start gap-3">
              <span class="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-spark-gold" aria-hidden="true" />
              <span class="text-sm font-medium text-white/85">{{ bullet }}</span>
            </li>
          </ul>

          <div class="mt-7 flex items-end justify-between gap-5">
            <div>
              <p class="text-[11px] font-semibold tracking-[0.18em] text-white/65">STARTING FROM</p>
              <p class="mt-1 font-heading text-3xl font-extrabold tracking-tight text-white">
                ${{ highlight.startingFrom }}
              </p>
            </div>
          </div>

          <NuxtLink
            :to="quoteLink"
            class="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-white/90 transition hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:ring-offset-2 focus-visible:ring-offset-spark-green"
            aria-label="Get a quote for gardening services"
          >
            See inclusions &amp; timings
            <ArrowRight class="h-4 w-4" :stroke-width="1.5" aria-hidden="true" />
          </NuxtLink>
        </div>
      </article>
    </div>

    <div class="mt-6 grid gap-5 sm:grid-cols-2 lg:mt-7 lg:grid-cols-3" aria-label="Additional gardening services">
      <article
        v-for="service in tiles"
        :key="service.id"
        class="group relative overflow-hidden border border-spark-green/10 bg-white p-6 shadow-[0_14px_35px_rgba(13,17,23,0.08)] transition hover:-translate-y-0.5 hover:shadow-[0_18px_45px_rgba(13,17,23,0.12)]"
      >
        <span
          class="absolute left-0 top-0 h-full w-1 bg-spark-gold/70"
          :class="[
            service.accent === 'green' ? 'bg-spark-green/70' : '',
            service.accent === 'dark' ? 'bg-spark-dark/70' : '',
          ]"
          aria-hidden="true"
        />

        <div class="flex items-start gap-3">
          <span class="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center pt-2" aria-hidden="true">
            <component :is="service.icon" class="h-4 w-4 text-spark-green/70" :stroke-width="1.5" aria-hidden="true" />
          </span>
          <div class="min-w-0 flex-1">
            <h3 class="font-heading text-lg font-extrabold tracking-tight text-spark-green">
              {{ service.title }}
            </h3>
            <p class="mt-2 text-sm leading-relaxed text-spark-green/70">
              {{ service.description }}
            </p>
          </div>
        </div>

        <div class="mt-6 flex items-center justify-between gap-4 border-t border-spark-green/10 pt-5">
          <div class="inline-flex items-center gap-2">
            <span class="text-[10px] font-semibold tracking-[0.18em] text-spark-green/55">FROM</span>
            <span class="inline-flex items-center rounded-sm bg-spark-white px-2.5 py-1 font-heading text-sm font-extrabold text-spark-green ring-1 ring-spark-green/10">
              ${{ service.startingFrom }}
            </span>
          </div>

          <NuxtLink
            :to="quoteLink"
            class="group inline-flex items-center gap-2 font-heading text-[11px] font-extrabold tracking-[0.16em] text-spark-green underline-offset-4 transition hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-spark-gold/70 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
            :aria-label="`Enquire about ${service.title}`"
          >
            ENQUIRE
            <ArrowRight
              class="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5"
              :stroke-width="1.75"
              aria-hidden="true"
            />
          </NuxtLink>
        </div>
      </article>
    </div>
  </section>
</template>


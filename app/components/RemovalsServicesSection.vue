<script setup lang="ts">
import { ArrowRight, Boxes, Building2, Container, Home, MapPin, PackageOpen, Truck } from "lucide-vue-next";

type RemovalsService = {
  id: string;
  title: string;
  description: string;
  startingFrom: number;
  icon: unknown;
  imageUrl?: string;
};

const quoteHref = "#removals-contact";
const fallbackImageUrl = "https://images.pexels.com/photos/30169297/pexels-photo-30169297.jpeg";

const residential: RemovalsService = {
  id: "residential",
  title: "Residential moves",
  description:
    "Home relocations with careful packing, loading, and placement—whether you are moving across town or into a new neighbourhood.",
  startingFrom: 450,
  icon: Home,
  imageUrl: "https://images.pexels.com/photos/271816/pexels-photo-271816.jpeg",
};

const commercial: RemovalsService = {
  id: "commercial",
  title: "Commercial moves",
  description:
    "Office and workplace moves with minimal downtime: coordinated timing, labelled cartons, and furniture handled with care.",
  startingFrom: 890,
  icon: Building2,
};

const interstate: RemovalsService = {
  id: "interstate",
  title: "Interstate moves",
  description:
    "Long-distance logistics with clear schedules and updates along the route so you know when your goods are on the move.",
  startingFrom: 2200,
  icon: MapPin,
  imageUrl: "https://images.pexels.com/photos/93398/pexels-photo-93398.jpeg",
};

/** Shorter copy keeps the paired column cards balanced next to container / packing. */
const localMetro: RemovalsService = {
  id: "local_metro",
  title: "Local & metro moves",
  description: "Same-city and regional relocations with flexible timing and crew sized to your access and volume.",
  startingFrom: 290,
  icon: Truck,
};

const container: RemovalsService = {
  id: "container",
  title: "Load & unload containers",
  description: "Container stuffing and unloading with equipment and crew sized to your site and access.",
  startingFrom: 320,
  icon: Container,
};

const packing: RemovalsService = {
  id: "packing",
  title: "Wrapping and packing services",
  description: "Materials, wrapping, and boxing for fragile items, artwork, and everyday goods before move day.",
  startingFrom: 180,
  icon: PackageOpen,
};

const ctaBullets = [
  "Clear scope, fixed quote",
  "No surprise add-ons",
  "Fast, careful moving crew",
  "Flexible local or interstate",
  "Packing, materials, storage",
];
</script>

<template>
  <section class="bg-[#F0FFF4]/80 px-6 py-10 lg:px-10 lg:py-12" aria-label="Removals services">
    <div class="mx-auto max-w-7xl">
      <div class="mx-auto max-w-3xl text-center">
        <p class="text-[11px] font-semibold tracking-[0.26em] text-spark-green/60">REMOVALS SERVICES</p>
        <h2 class="mt-3 font-heading text-3xl font-extrabold tracking-tight text-spark-green sm:text-4xl">
          What we can move for you.
        </h2>
        <p class="mt-4 text-base leading-relaxed text-spark-green/70 sm:text-lg">
          Transparent starting prices—tell us your route and inventory and we will firm up a fixed quote.
        </p>
      </div>

      <div
        class="mt-10 grid auto-rows-auto grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-12 lg:grid-rows-[minmax(0,1fr)_minmax(0,1fr)_auto]"
      >
        <!-- Residential: large left -->
        <article
          class="group relative overflow-hidden border border-spark-green/10 bg-white shadow-[0_18px_45px_rgba(13,17,23,0.10)] transition hover:-translate-y-0.5 hover:shadow-[0_22px_60px_rgba(13,17,23,0.14)] sm:col-span-2 lg:col-span-7 lg:row-span-2 lg:row-start-1 lg:rounded-md"
        >
          <div class="relative h-[200px] w-full overflow-hidden sm:h-[240px] lg:h-[min(280px,32vh)]">
            <img
              :src="residential.imageUrl ?? fallbackImageUrl"
              :alt="`Photo for ${residential.title}`"
              class="h-full w-full object-cover transition duration-500 group-hover:scale-[1.02] lg:rounded-t-md"
              loading="lazy"
              decoding="async"
            />
            <div
              class="absolute inset-0 bg-gradient-to-t from-spark-dark/35 via-transparent to-transparent lg:rounded-t-md"
              aria-hidden="true"
            />
            <component
              :is="residential.icon"
              class="absolute right-5 top-5 h-6 w-6 text-white drop-shadow sm:h-7 sm:w-7"
              :stroke-width="1.5"
              aria-hidden="true"
            />
          </div>
          <div class="p-6 sm:p-8">
            <div class="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
              <div class="min-w-0">
                <h3 class="font-heading text-2xl font-extrabold tracking-tight text-spark-green">
                  {{ residential.title }}
                </h3>
                <p class="mt-3 text-sm leading-relaxed text-spark-green/70 sm:text-base">
                  {{ residential.description }}
                </p>
              </div>
              <div class="shrink-0 text-left sm:text-right">
                <p class="text-[11px] font-semibold tracking-[0.18em] text-spark-green/55">STARTING FROM</p>
                <p class="mt-1 font-heading text-3xl font-extrabold tracking-tight text-spark-green">
                  ${{ residential.startingFrom }}
                </p>
              </div>
            </div>
            <div class="mt-7 flex justify-end border-t border-spark-green/10 pt-6">
              <NuxtLink
                :to="quoteHref"
                class="font-heading text-[11px] font-extrabold tracking-[0.16em] text-spark-green underline-offset-4 transition hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-spark-gold/70 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
                :aria-label="`Enquire about ${residential.title}`"
              >
                ENQUIRE
              </NuxtLink>
            </div>
          </div>
        </article>

        <!-- Commercial: dark panel -->
        <article
          class="relative overflow-hidden border border-white/10 bg-spark-green shadow-[0_18px_45px_rgba(13,17,23,0.14)] sm:col-span-1 lg:col-span-5 lg:row-span-2 lg:row-start-1 lg:rounded-md"
        >
          <div
            class="absolute inset-0 bg-[radial-gradient(800px_360px_at_40%_10%,rgba(245,197,66,0.14)_0%,rgba(245,197,66,0.0)_65%)]"
            aria-hidden="true"
          />
          <div class="relative flex h-full min-h-[280px] flex-col p-6 sm:p-8 lg:min-h-0">
            <div class="flex items-start gap-3">
              <component
                :is="commercial.icon"
                class="mt-0.5 h-5 w-5 shrink-0 text-white/85"
                :stroke-width="1.5"
                aria-hidden="true"
              />
              <h3 class="font-heading text-2xl font-extrabold tracking-tight text-white">
                {{ commercial.title }}
              </h3>
            </div>
            <p class="mt-4 flex-1 text-sm leading-relaxed text-white/75">
              {{ commercial.description }}
            </p>
            <div class="mt-8 flex flex-col gap-6 border-t border-white/10 pt-6 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p class="text-[11px] font-semibold tracking-[0.18em] text-white/65">STARTING FROM</p>
                <p class="mt-1 font-heading text-3xl font-extrabold tracking-tight text-white">
                  ${{ commercial.startingFrom }}
                </p>
              </div>
              <NuxtLink
                :to="quoteHref"
                class="shrink-0 font-heading text-[11px] font-extrabold tracking-[0.16em] text-white/90 underline-offset-4 transition hover:text-white hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-spark-green"
                :aria-label="`Enquire about ${commercial.title}`"
              >
                ENQUIRE
              </NuxtLink>
            </div>
            <NuxtLink
              :to="quoteHref"
              class="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-white/90 transition hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:ring-offset-2 focus-visible:ring-offset-spark-green"
              aria-label="View logistics plan — contact us"
            >
              View logistics plan
              <ArrowRight class="h-4 w-4" :stroke-width="1.5" aria-hidden="true" />
            </NuxtLink>
          </div>
        </article>

        <!-- Left column: interstate (compact) + local moves — balances height vs centre stack -->
        <div
          class="flex flex-col gap-5 sm:col-span-2 sm:grid sm:grid-cols-2 sm:gap-5 lg:col-span-5 lg:col-start-1 lg:row-start-3 lg:flex lg:flex-col"
        >
          <article
            class="group flex flex-col overflow-hidden border border-spark-green/10 bg-white shadow-[0_14px_35px_rgba(13,17,23,0.08)] transition hover:-translate-y-0.5 hover:shadow-[0_18px_45px_rgba(13,17,23,0.12)] sm:col-span-1 lg:rounded-md"
          >
            <div class="relative h-24 w-full shrink-0 overflow-hidden sm:h-28">
              <img
                :src="interstate.imageUrl ?? fallbackImageUrl"
                :alt="`Photo for ${interstate.title}`"
                class="h-full w-full object-cover transition duration-500 group-hover:scale-[1.02] lg:rounded-t-md"
                loading="lazy"
                decoding="async"
              />
              <div
                class="absolute inset-0 bg-gradient-to-r from-spark-dark/20 to-transparent lg:rounded-t-md"
                aria-hidden="true"
              />
            </div>
            <div class="flex flex-1 flex-col p-5 sm:p-6">
              <div class="flex items-start gap-3">
                <component
                  :is="interstate.icon"
                  class="mt-0.5 h-5 w-5 shrink-0 text-spark-green/70"
                  :stroke-width="1.5"
                  aria-hidden="true"
                />
                <div class="min-w-0">
                  <h3 class="font-heading text-lg font-extrabold tracking-tight text-spark-green sm:text-xl">
                    {{ interstate.title }}
                  </h3>
                  <p class="mt-2 text-sm leading-relaxed text-spark-green/70">
                    {{ interstate.description }}
                  </p>
                </div>
              </div>
              <div class="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-spark-green/10 pt-4">
                <div>
                  <p class="text-[10px] font-semibold tracking-[0.18em] text-spark-green/55">FROM</p>
                  <p class="mt-0.5 font-heading text-2xl font-extrabold text-spark-green">${{ interstate.startingFrom }}</p>
                </div>
                <NuxtLink
                  :to="quoteHref"
                  class="font-heading text-[11px] font-extrabold tracking-[0.16em] text-spark-green underline-offset-4 transition hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-spark-gold/70 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
                  :aria-label="`Enquire about ${interstate.title}`"
                >
                  ENQUIRE
                </NuxtLink>
              </div>
            </div>
          </article>

          <article
            class="flex flex-1 flex-col border border-spark-green/10 bg-white p-5 shadow-[0_12px_30px_rgba(13,17,23,0.08)] sm:col-span-1 lg:rounded-md"
          >
            <component
              :is="localMetro.icon"
              class="h-5 w-5 text-spark-green/75"
              :stroke-width="1.5"
              aria-hidden="true"
            />
            <h3 class="mt-3 font-heading text-lg font-extrabold tracking-tight text-spark-green">
              {{ localMetro.title }}
            </h3>
            <p class="mt-2 flex-1 text-sm leading-relaxed text-spark-green/70">
              {{ localMetro.description }}
            </p>
            <div class="mt-5 flex items-center justify-between gap-3 border-t border-spark-green/10 pt-4">
              <span
                class="inline-flex items-center rounded-sm bg-spark-white px-2.5 py-1 font-heading text-sm font-extrabold text-spark-green ring-1 ring-spark-green/10"
              >
                ${{ localMetro.startingFrom }}
              </span>
              <NuxtLink
                :to="quoteHref"
                class="font-heading text-[11px] font-extrabold tracking-[0.16em] text-spark-green underline-offset-4 transition hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-spark-gold/70 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
                :aria-label="`Enquire about ${localMetro.title}`"
              >
                ENQUIRE
              </NuxtLink>
            </div>
          </article>
        </div>

        <!-- Center stack: container + packing -->
        <div class="flex flex-col gap-5 sm:col-span-2 sm:flex-row lg:col-span-2 lg:col-start-6 lg:row-start-3 lg:flex-col">
          <article
            class="flex flex-1 flex-col border border-spark-green/10 bg-[#E8F8EE] p-5 shadow-[0_12px_30px_rgba(13,17,23,0.06)] lg:rounded-md"
          >
            <component
              :is="container.icon"
              class="h-5 w-5 text-spark-green/75"
              :stroke-width="1.5"
              aria-hidden="true"
            />
            <h3 class="mt-3 font-heading text-lg font-extrabold tracking-tight text-spark-green">
              {{ container.title }}
            </h3>
            <p class="mt-2 flex-1 text-sm leading-relaxed text-spark-green/70">
              {{ container.description }}
            </p>
            <div class="mt-5 flex items-center justify-between gap-3 border-t border-spark-green/15 pt-4">
              <span
                class="inline-flex items-center rounded-sm bg-white/90 px-2.5 py-1 font-heading text-sm font-extrabold text-spark-green ring-1 ring-spark-green/10"
              >
                ${{ container.startingFrom }}
              </span>
              <NuxtLink
                :to="quoteHref"
                class="font-heading text-[11px] font-extrabold tracking-[0.16em] text-spark-green underline-offset-4 transition hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-spark-gold/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[#E8F8EE]"
                :aria-label="`Enquire about ${container.title}`"
              >
                ENQUIRE
              </NuxtLink>
            </div>
          </article>
          <article
            class="flex flex-1 flex-col border border-spark-green/10 bg-white p-5 shadow-[0_12px_30px_rgba(13,17,23,0.08)] lg:rounded-md"
          >
            <component
              :is="packing.icon"
              class="h-5 w-5 text-spark-green/75"
              :stroke-width="1.5"
              aria-hidden="true"
            />
            <h3 class="mt-3 font-heading text-lg font-extrabold tracking-tight text-spark-green">
              {{ packing.title }}
            </h3>
            <p class="mt-2 flex-1 text-sm leading-relaxed text-spark-green/70">
              {{ packing.description }}
            </p>
            <div class="mt-5 flex items-center justify-between gap-3 border-t border-spark-green/10 pt-4">
              <span
                class="inline-flex items-center rounded-sm bg-spark-white px-2.5 py-1 font-heading text-sm font-extrabold text-spark-green ring-1 ring-spark-green/10"
              >
                ${{ packing.startingFrom }}
              </span>
              <NuxtLink
                :to="quoteHref"
                class="font-heading text-[11px] font-extrabold tracking-[0.16em] text-spark-green underline-offset-4 transition hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-spark-gold/70 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
                :aria-label="`Enquire about ${packing.title}`"
              >
                ENQUIRE
              </NuxtLink>
            </div>
          </article>
        </div>

        <!-- Trust / CTA -->
        <article
          class="relative overflow-hidden border border-white/10 bg-spark-dark shadow-[0_18px_45px_rgba(13,17,23,0.18)] sm:col-span-2 lg:col-span-5 lg:col-start-8 lg:row-start-3 lg:rounded-md"
        >
          <div
            class="pointer-events-none absolute inset-0 bg-[radial-gradient(700px_420px_at_100%_100%,rgba(200,150,62,0.10)_0%,transparent_62%)]"
            aria-hidden="true"
          />
          <Boxes
            class="pointer-events-none absolute -bottom-6 -right-4 h-40 w-40 text-white/[0.06]"
            :stroke-width="1"
            aria-hidden="true"
          />
          <div class="relative flex h-full flex-col p-6 sm:p-8">
            <div>
              <p class="text-[11px] font-semibold tracking-[0.26em] text-white/55">WHY WE’RE DIFFERENT</p>
              <h3 class="mt-3 font-heading text-xl font-extrabold tracking-tight text-white sm:text-2xl">
                Fixed quotes &amp; clear scope
              </h3>
              <p class="mt-3 text-sm leading-relaxed text-white/70">
                No mystery surcharges for the work we agree up front—change requests are quoted before we proceed.
              </p>
            </div>

            <div class="mt-5 grid gap-4 sm:grid-cols-2">
              <div class="rounded-md border border-white/10 bg-white/[0.03] p-4">
                <p class="text-[11px] font-extrabold tracking-[0.18em] text-white/80">WRITTEN SCOPE</p>
                <p class="mt-2 text-sm leading-snug text-white/70">You’ll receive inclusions before move day.</p>
              </div>
              <div class="rounded-md border border-white/10 bg-white/[0.03] p-4">
                <p class="text-[11px] font-extrabold tracking-[0.18em] text-white/80">UPFRONT CHANGES</p>
                <p class="mt-2 text-sm leading-snug text-white/70">Any adjustments are agreed in writing.</p>
              </div>
            </div>

            <div class="mt-5 border-t border-white/10 pt-5">
              <p class="text-[11px] font-semibold tracking-[0.22em] text-white/55">WHAT YOU GET</p>
              <ul class="mt-3 space-y-2.5">
                <li v-for="b in ctaBullets" :key="b" class="flex items-start gap-3">
                  <span class="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-spark-gold" aria-hidden="true" />
                  <span class="text-sm font-medium text-white/85">{{ b }}</span>
                </li>
              </ul>
            </div>

            <div class="mt-7">
              <NuxtLink
                :to="quoteHref"
                class="group inline-flex items-center gap-2 font-heading text-[11px] font-extrabold tracking-[0.18em] text-spark-gold transition hover:text-spark-gold-light focus:outline-none focus-visible:ring-2 focus-visible:ring-spark-gold/70 focus-visible:ring-offset-2 focus-visible:ring-offset-spark-dark"
              >
                GET IN TOUCH
                <ArrowRight
                  class="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5"
                  :stroke-width="1.5"
                  aria-hidden="true"
                />
              </NuxtLink>
            </div>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

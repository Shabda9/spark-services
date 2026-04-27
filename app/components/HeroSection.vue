<script setup lang="ts">
import heroImageUrl from "~/assets/images/spark-services-hero.png";
</script>

<template>
  <section id="home" class="relative">
    <div class="relative h-[78vh] min-h-[640px] w-full overflow-hidden">
      <img
        :src="heroImageUrl"
        alt=""
        class="absolute inset-0 h-full w-full object-cover"
        loading="eager"
        decoding="async"
      />
      <div class="absolute inset-0 bg-spark-dark/65" aria-hidden="true" />
      <div
        class="absolute inset-0"
        style="
          background: radial-gradient(
            1200px 520px at 18% 36%,
            rgba(13, 17, 23, 0.55) 0%,
            rgba(13, 17, 23, 0.08) 58%,
            rgba(13, 17, 23, 0.0) 100%
          );
        "
        aria-hidden="true"
      />

      <div
        class="relative mx-auto flex h-full max-w-7xl items-start px-6 pb-12 pt-0 sm:items-end sm:pt-28 lg:px-10 lg:pb-16"
        style="padding-top: calc(72px + 2.5rem + env(safe-area-inset-top));"
      >
        <div class="max-w-4xl">
          <div class="flex items-center gap-3 text-white/70">
            <span class="h-px w-10 bg-white/25" aria-hidden="true" />
            <p class="text-[13px] font-medium tracking-[0.14em]">
              Professional maintenance across Australia.
            </p>
          </div>
          <h1
            class="mt-5 font-heading text-5xl font-extrabold leading-[0.95] tracking-tight text-white sm:text-6xl lg:text-7xl"
          >
            Everything you need.
            <span class="block text-white/90">Cleaned, moved,</span>
            <span class="block text-white/90">and cared for.</span>
          </h1>

          <p class="mt-6 max-w-xl text-base leading-relaxed text-white/75 sm:text-lg">
            Spark Services delivers Cleaning, Removals, and Gardening with clear communication and
            professional care across Sydney.
          </p>

          <div class="mt-10 flex w-full flex-wrap items-stretch gap-3 sm:flex-nowrap sm:items-center">
            <div
              class="inline-flex overflow-hidden rounded-md border border-white/15 bg-white/5 shadow-[0_10px_30px_rgba(0,0,0,0.22)] backdrop-blur"
              role="group"
              aria-label="Service selection"
            >
              <NuxtLink
                to="/cleaning"
                class="inline-flex h-11 items-center justify-center bg-white px-7 font-heading text-[11px] font-bold tracking-[0.18em] text-spark-dark transition hover:bg-white/90"
                aria-label="Cleaning service"
              >
                CLEANING
              </NuxtLink>
              <span class="w-px bg-white/12" aria-hidden="true" />
              <NuxtLink
                to="/#services"
                class="inline-flex h-11 items-center justify-center px-7 font-heading text-[11px] font-bold tracking-[0.18em] text-white/80 transition hover:bg-white/10 hover:text-white"
                aria-label="Removals service"
              >
                REMOVALS
              </NuxtLink>
              <span class="w-px bg-white/12" aria-hidden="true" />
              <NuxtLink
                to="/#services"
                class="inline-flex h-11 items-center justify-center px-7 font-heading text-[11px] font-bold tracking-[0.18em] text-white/80 transition hover:bg-white/10 hover:text-white"
                aria-label="Gardening service"
              >
                GARDENING
              </NuxtLink>
            </div>

            <NuxtLink
              to="/#quote"
              class="inline-flex h-11 items-center justify-center rounded-md bg-spark-gold px-6 font-heading text-[11px] font-extrabold tracking-[0.18em] text-spark-dark shadow-[0_12px_28px_rgba(245,197,66,0.18)] ring-1 ring-white/10 transition hover:bg-spark-gold-light"
              aria-label="Get a quote"
            >
              GET A QUOTE
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>


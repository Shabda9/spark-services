<script setup lang="ts">
const primaryImageUrl = "https://images.pexels.com/photos/3806932/pexels-photo-3806932.jpeg";
const secondaryImageUrl = "https://images.pexels.com/photos/4503273/pexels-photo-4503273.jpeg";
</script>

<template>
  <section id="about" class="relative overflow-hidden bg-spark-white">
    <div class="absolute inset-0 bg-[radial-gradient(900px_420px_at_20%_0%,rgba(245,197,66,0.18)_0%,rgba(245,197,66,0.0)_65%)]" aria-hidden="true" />
    <div class="relative mx-auto max-w-7xl px-6 pb-14 pt-16 lg:px-10 lg:pb-20" style="padding-top: calc(72px + 4rem + env(safe-area-inset-top));">
      <div class="grid items-center gap-10 lg:grid-cols-12 lg:gap-14">
        <div class="lg:col-span-6">
          <p class="text-[11px] font-semibold tracking-[0.26em] text-spark-green/65">
            ABOUT SPARK SERVICES
          </p>
          <h1 class="mt-4 font-heading text-4xl font-extrabold leading-[1.02] tracking-tight text-spark-green sm:text-5xl">
            Reliable help for the work you don’t have time for.
          </h1>
          <p class="mt-5 max-w-xl text-base leading-relaxed text-spark-green/80 sm:text-lg">
            We’re a small team focused on clear communication, tidy finishes, and turning up when we say we will. From regular upkeep to
            one-off jobs, we keep it simple and we keep you informed.
          </p>
        </div>

        <div class="lg:col-span-6">
          <div class="relative mx-auto max-w-xl">
            <div class="aspect-[4/3] overflow-hidden rounded-3xl border border-spark-green/10 bg-spark-green/5 shadow-[0_28px_70px_rgba(13,17,23,0.12)]">
              <img :src="primaryImageUrl" alt="" class="h-full w-full object-cover" loading="eager" decoding="async" />
            </div>
            <div
              class="absolute -bottom-10 -left-4 hidden w-[56%] overflow-hidden rounded-3xl border border-spark-green/10 bg-spark-white shadow-[0_22px_60px_rgba(13,17,23,0.10)] sm:block"
            >
              <div class="aspect-[4/3]">
                <img :src="secondaryImageUrl" alt="" class="h-full w-full object-cover" loading="lazy" decoding="async" />
              </div>
            </div>
            <div class="pointer-events-none absolute inset-0 rounded-3xl ring-1 ring-inset ring-white/40" aria-hidden="true" />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>


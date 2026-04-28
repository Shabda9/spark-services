<script setup lang="ts">
type Step = {
  number: string;
  title: string;
  description: string;
};

const eyebrow = "OUR PROCESS";
const title = "How it works";
const subtitle = "A simple, reliable flow from quote to completion with clear communication at every step.";

const steps: Step[] = [
  {
    number: "01",
    title: "Request a quote",
    description: "Tell us what you need and where. We’ll reply with transparent pricing and inclusions.",
  },
  {
    number: "02",
    title: "Book your slot",
    description: "Choose a time that suits you. We confirm the booking and share next steps.",
  },
  {
    number: "03",
    title: "We handle it",
    description: "Our insured, police-checked team arrives on time and leaves your place spotless.",
  },
];
</script>

<template>
  <section id="how-it-works" class="mx-auto max-w-7xl px-6 py-8 lg:px-10 lg:py-8">
    <div class="mx-auto max-w-3xl text-center">
      <p class="text-[11px] font-semibold tracking-[0.26em] text-spark-green/60">
        {{ eyebrow }}
      </p>
      <h2 class="mt-3 font-heading text-3xl font-extrabold tracking-tight text-spark-green sm:text-4xl">
        {{ title }}
      </h2>
      <p class="mt-4 text-base leading-relaxed text-spark-green/70 sm:text-lg">
        {{ subtitle }}
      </p>
    </div>

    <div class="relative mt-12">
      <!-- Desktop connector curve -->
      <svg
        class="pointer-events-none absolute left-0 right-0 top-10 hidden h-24 w-full md:block"
        viewBox="0 0 1200 120"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path
          d="M140 70 C 320 10, 480 120, 600 60 S 880 10, 1060 60"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-dasharray="6 10"
          class="text-spark-gold/40"
        />
      </svg>

      <div class="grid gap-8 md:grid-cols-3 md:gap-10">
        <div
          v-for="(step, i) in steps"
          :key="step.number"
          class="relative"
          v-motion
          :initial="{ opacity: 0, y: 16 }"
          :enter="{ opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut', delay: i * 0.08 } }"
        >
          <!-- Mobile vertical connector -->
          <span
            v-if="i < steps.length - 1"
            class="absolute left-[40px] top-[84px] hidden h-[calc(100%-84px)] border-l border-dashed border-spark-gold/40 sm:block md:hidden"
            aria-hidden="true"
          />

          <div class="flex items-start gap-6 md:flex-col md:items-center md:gap-5">
            <div
              class="relative flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-spark-green shadow-[0_18px_45px_rgba(13,17,23,0.10)] md:h-24 md:w-24"
            >
              <span class="font-heading text-2xl font-extrabold tracking-tight text-spark-gold md:text-3xl">
                {{ step.number }}
              </span>
            </div>

            <div class="min-w-0 md:text-center">
              <h3 class="font-heading text-lg font-extrabold tracking-tight text-spark-green sm:text-xl">
                {{ step.title }}
              </h3>
              <p class="mt-2 text-sm leading-relaxed text-spark-green/70 sm:text-base">
                {{ step.description }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="mt-10 flex justify-center">
      <NuxtLink
        to="/#quote"
        class="inline-flex h-11 items-center justify-center rounded-md bg-spark-gold px-6 font-heading text-[11px] font-extrabold tracking-[0.18em] text-spark-dark shadow-[0_12px_28px_rgba(245,197,66,0.18)] ring-1 ring-white/10 transition hover:bg-spark-gold-light focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-spark-white"
        aria-label="Get a quote"
      >
        GET A QUOTE
      </NuxtLink>
    </div>
  </section>
</template>


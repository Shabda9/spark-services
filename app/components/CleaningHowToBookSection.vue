<script setup lang="ts">
import { CalendarDays, CheckCircle2, MousePointerClick, Sparkles } from "lucide-vue-next";

type Step = {
  step: string;
  title: string;
  description: string;
  icon: unknown;
};

const steps: Step[] = [
  {
    step: "STEP 01",
    title: "Pick a service",
    description: "Choose what you need in 30 seconds.",
    icon: MousePointerClick,
  },
  {
    step: "STEP 02",
    title: "Choose a time",
    description: "Tell us the day and any notes.",
    icon: CalendarDays,
  },
  {
    step: "STEP 03",
    title: "We clean",
    description: "We arrive, work, and update you.",
    icon: Sparkles,
  },
  {
    step: "STEP 04",
    title: "Enjoy",
    description: "Walk into a fresh, spotless space.",
    icon: CheckCircle2,
  },
];
</script>

<template>
  <section class="mx-auto max-w-7xl px-6 py-8 lg:px-10 lg:py-9" aria-label="How to book cleaning">
    <div class="mx-auto max-w-3xl text-center">
      <p class="text-[11px] font-semibold tracking-[0.26em] text-spark-green/60">HOW IT WORKS</p>
      <h2 class="mt-3 font-heading text-3xl font-extrabold tracking-tight text-spark-green sm:text-4xl">
        Book in 4 easy steps.
      </h2>
      <p class="mt-4 text-base leading-relaxed text-spark-green/70 sm:text-lg">Quick, clear, and kind of satisfying.</p>
    </div>

    <div class="mt-8 overflow-hidden border border-spark-green/10 bg-white shadow-[0_14px_35px_rgba(13,17,23,0.08)]">
      <div class="grid place-items-center">
        <div class="p-6 text-center md:p-7">
          <p class="font-heading text-[11px] font-extrabold tracking-[0.18em] text-spark-green">
            PICK → BOOK → CLEAN
          </p>
          <p class="mt-2 text-sm text-spark-green/70">A simple process that takes a minute.</p>
        </div>
      </div>

      <div class="border-t border-spark-green/10">
        <ol class="grid md:grid-cols-4">
          <li
            v-for="(item, idx) in steps"
            :key="item.step"
            class="relative p-6 md:p-7"
            :class="idx === 0 ? '' : 'border-t border-spark-green/10 md:border-t-0 md:border-l'"
          >
            <div class="flex items-start gap-3">
              <component
                :is="item.icon"
                class="mt-0.5 h-4 w-4 text-spark-green/70"
                :stroke-width="1.5"
                aria-hidden="true"
              />
              <div class="min-w-0">
                <p class="text-[10px] font-semibold tracking-[0.18em] text-spark-green/55">{{ item.step }}</p>
                <p class="mt-2 font-heading text-base font-extrabold tracking-tight text-spark-green">
                  {{ item.title }}
                </p>
                <p class="mt-1 text-sm leading-relaxed text-spark-green/70">
                  {{ item.description }}
                </p>
              </div>
            </div>
          </li>
        </ol>
      </div>
    </div>
  </section>
</template>


<script setup lang="ts">
import { ArrowRight } from "lucide-vue-next";

withDefaults(
  defineProps<{
    eyebrow?: string;
    title: string;
    description?: string;
    buttonLabel: string;
    to: string | Record<string, unknown>;
    ariaLabel?: string;
  }>(),
  {
    eyebrow: "",
    description: "",
    ariaLabel: "",
  },
);
</script>

<template>
  <div
    class="mt-8 border border-spark-green/10 bg-spark-green p-6 text-white shadow-[0_18px_45px_rgba(13,17,23,0.12)] sm:flex sm:items-center sm:justify-between sm:gap-6"
  >
    <div class="min-w-0">
      <p v-if="eyebrow" class="text-[11px] font-semibold tracking-[0.22em] text-white/60">
        {{ eyebrow }}
      </p>
      <h3 class="mt-2 font-heading text-2xl font-extrabold tracking-tight text-white">
        {{ title }}
      </h3>
      <p v-if="description" class="mt-2 max-w-2xl text-sm leading-relaxed text-white/70">
        {{ description }}
      </p>
    </div>

    <NuxtLink
      :to="to"
      class="mt-5 inline-flex h-11 w-full items-center justify-center gap-2 rounded-md bg-spark-gold px-5 font-heading text-[11px] font-extrabold tracking-[0.16em] text-spark-dark transition hover:bg-spark-gold-light focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70 sm:mt-0 sm:w-auto"
      :aria-label="ariaLabel || buttonLabel"
    >
      {{ buttonLabel }}
      <ArrowRight class="h-4 w-4" aria-hidden="true" />
    </NuxtLink>
  </div>
</template>

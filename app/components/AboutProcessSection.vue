<script setup lang="ts">
type StepItem = { title: string; description: string };

const steps: StepItem[] = [
  {
    title: "Tell us what you need",
    description: "Share a few details and we’ll confirm scope, access, and timing.",
  },
  {
    title: "We confirm the plan",
    description: "You’ll get a clear response with what’s included and what’s not.",
  },
  {
    title: "We show up and deliver",
    description: "We arrive as scheduled, work efficiently, and communicate as we go.",
  },
  {
    title: "Tidy finish + handover",
    description: "We clean up, double-check the result, and make sure you’re happy before we wrap up.",
  },
];
</script>

<template>
  <section class="bg-spark-white py-14">
    <div class="mx-auto max-w-7xl px-6 lg:px-10">
      <div class="mx-auto max-w-3xl text-center">
        <p class="text-[11px] font-semibold tracking-[0.26em] text-spark-green/65">
          HOW WE WORK
        </p>
        <h2 class="mt-3 font-heading text-3xl font-extrabold tracking-tight text-spark-green sm:text-4xl">
          Simple steps. Clear outcomes.
        </h2>
        <p class="mt-4 text-base leading-relaxed text-spark-green/80 sm:text-lg">
          A predictable process so you know what’s happening at every stage.
        </p>
      </div>

      <div class="mx-auto mt-10 grid max-w-5xl gap-4 md:grid-cols-2">
        <div
          v-for="(step, idx) in steps"
          :key="step.title"
          class="rounded-2xl border border-spark-green/10 bg-white p-6 shadow-[0_22px_60px_rgba(13,17,23,0.06)]"
        >
          <p class="text-[11px] font-semibold tracking-[0.26em] text-spark-green/55">
            STEP {{ String(idx + 1).padStart(2, '0') }}
          </p>
          <h3 class="mt-3 font-heading text-lg font-extrabold tracking-tight text-spark-green">
            {{ step.title }}
          </h3>
          <p class="mt-2 text-sm leading-relaxed text-spark-green/75">
            {{ step.description }}
          </p>
        </div>
      </div>
    </div>
  </section>
</template>


<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from "vue";

type StatItem = { value: string; label: string; note?: string };

const stats: StatItem[] = [
  { value: "1,200+", label: "Jobs completed", note: "Across home, strata, and commercial work." },
  { value: "< 24 hours", label: "Typical response", note: "Weekdays (business hours)." },
  { value: "65%+", label: "Repeat customers", note: "Ongoing maintenance and regular bookings." },
  { value: "Sydney-wide", label: "Service coverage", note: "Sydney metro and surrounds." },
];

const sectionEl = ref<HTMLElement | null>(null);
const hasAnimated = ref(false);

const jobsValue = ref(0);
const responseHoursValue = ref(0);
const repeatCustomersValue = ref(0);

const prefersReducedMotion =
  typeof window !== "undefined" &&
  typeof window.matchMedia === "function" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

let observer: IntersectionObserver | null = null;
let raf = 0;

function easeOutCubic(t: number) {
  return 1 - Math.pow(1 - t, 3);
}

function animateNumber(options: { from: number; to: number; durationMs: number; onUpdate: (v: number) => void }) {
  const start = performance.now();
  const { from, to, durationMs, onUpdate } = options;

  function tick(now: number) {
    const elapsed = now - start;
    const t = Math.min(1, elapsed / durationMs);
    const eased = easeOutCubic(t);
    const value = from + (to - from) * eased;
    onUpdate(value);
    if (t < 1) raf = requestAnimationFrame(tick);
  }

  raf = requestAnimationFrame(tick);
}

function startAnimation() {
  if (hasAnimated.value) return;
  hasAnimated.value = true;

  const jobsTarget = 1200;
  const responseTarget = 24;
  const repeatTarget = 65;

  if (prefersReducedMotion) {
    jobsValue.value = jobsTarget;
    responseHoursValue.value = responseTarget;
    repeatCustomersValue.value = repeatTarget;
    return;
  }

  animateNumber({
    from: 0,
    to: jobsTarget,
    durationMs: 1200,
    onUpdate: (v) => (jobsValue.value = Math.round(v)),
  });

  animateNumber({
    from: 0,
    to: responseTarget,
    durationMs: 900,
    onUpdate: (v) => (responseHoursValue.value = Math.round(v)),
  });

  animateNumber({
    from: 0,
    to: repeatTarget,
    durationMs: 1000,
    onUpdate: (v) => (repeatCustomersValue.value = Math.round(v)),
  });
}

onMounted(() => {
  if (!sectionEl.value) return;

  if (typeof IntersectionObserver === "undefined") {
    startAnimation();
    return;
  }

  observer = new IntersectionObserver(
    (entries) => {
      const entry = entries[0];
      if (!entry) return;
      if (entry.isIntersecting) {
        startAnimation();
        observer?.disconnect();
        observer = null;
      }
    },
    { threshold: 0.25 }
  );

  observer.observe(sectionEl.value);
});

onBeforeUnmount(() => {
  observer?.disconnect();
  observer = null;
  cancelAnimationFrame(raf);
});
</script>

<template>
  <section ref="sectionEl" class="relative bg-spark-dark py-14">
    <div class="absolute inset-0 bg-[radial-gradient(900px_380px_at_70%_0%,rgba(245,197,66,0.14)_0%,rgba(245,197,66,0.0)_65%)]" aria-hidden="true" />
    <div class="relative mx-auto max-w-7xl px-6 lg:px-10">
      <div class="mx-auto max-w-3xl text-center">
        <p class="text-[11px] font-semibold tracking-[0.26em] text-white/65">
          AT A GLANCE
        </p>
        <h2 class="mt-3 font-heading text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
          Numbers that back up the work.
        </h2>
      </div>

      <div class="mx-auto mt-10 grid max-w-5xl gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div class="rounded-2xl border border-white/10 bg-white/5 p-6 shadow-[0_18px_55px_rgba(0,0,0,0.18)] backdrop-blur-md">
          <p class="font-heading text-3xl font-extrabold tracking-tight text-white">
            {{ new Intl.NumberFormat("en-AU").format(jobsValue) }}+
          </p>
          <p class="mt-2 text-sm font-semibold tracking-wide text-white/85">
            Jobs completed
          </p>
          <p class="mt-2 text-sm leading-relaxed text-white/65">
            Across home, strata, and commercial work.
          </p>
        </div>

        <div class="rounded-2xl border border-white/10 bg-white/5 p-6 shadow-[0_18px_55px_rgba(0,0,0,0.18)] backdrop-blur-md">
          <p class="font-heading text-3xl font-extrabold tracking-tight text-white">
            &lt; {{ responseHoursValue }} hours
          </p>
          <p class="mt-2 text-sm font-semibold tracking-wide text-white/85">
            Typical response
          </p>
          <p class="mt-2 text-sm leading-relaxed text-white/65">
            Weekdays (business hours).
          </p>
        </div>

        <div class="rounded-2xl border border-white/10 bg-white/5 p-6 shadow-[0_18px_55px_rgba(0,0,0,0.18)] backdrop-blur-md">
          <p class="font-heading text-3xl font-extrabold tracking-tight text-white">
            {{ repeatCustomersValue }}%+
          </p>
          <p class="mt-2 text-sm font-semibold tracking-wide text-white/85">
            Repeat customers
          </p>
          <p class="mt-2 text-sm leading-relaxed text-white/65">
            Ongoing maintenance and regular bookings.
          </p>
        </div>

        <div class="rounded-2xl border border-white/10 bg-white/5 p-6 shadow-[0_18px_55px_rgba(0,0,0,0.18)] backdrop-blur-md">
          <p class="font-heading text-3xl font-extrabold tracking-tight text-white">
            Sydney-wide
          </p>
          <p class="mt-2 text-sm font-semibold tracking-wide text-white/85">
            Service coverage
          </p>
          <p class="mt-2 text-sm leading-relaxed text-white/65">
            Sydney metro and surrounds.
          </p>
        </div>
      </div>
    </div>
  </section>
</template>


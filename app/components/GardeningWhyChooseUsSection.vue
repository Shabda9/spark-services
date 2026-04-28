<script setup lang="ts">

type Reason = {
  id: string;
  title: string;
  description: string;
  position: "left_top" | "left_mid" | "left_bottom" | "right_top" | "right_mid" | "right_bottom";
};

const imageUrl = "https://images.pexels.com/photos/34100159/pexels-photo-34100159.jpeg";

const reasons: Reason[] = [
  {
    id: "client_focused",
    title: "Client-focused care",
    description: "We tailor each visit to your garden and your goals not a one-size checklist.",
    position: "left_top",
  },
  {
    id: "reliable",
    title: "Reliable scheduling",
    description: "Clear timing, clear scope, and updates if anything needs adjusting.",
    position: "left_mid",
  },
  {
    id: "detail",
    title: "Attention to detail",
    description: "Edges neat, beds tidy, and clean-up done properly before we leave.",
    position: "left_bottom",
  },
  {
    id: "materials",
    title: "Quality materials",
    description: "Mulch, plants, and inputs chosen for longevity and a clean finish.",
    position: "right_top",
  },
  {
    id: "trusted",
    title: "Trusted crews",
    description: "Professional, respectful teams for homes, strata, and small commercial.",
    position: "right_mid",
  },
  {
    id: "safe",
    title: "Safe & insured",
    description: "We work with care around pathways, access, and property constraints.",
    position: "right_bottom",
  },
];

function panelClass(pos: Reason["position"]) {
  const base =
    "rounded-md border border-spark-green/10 bg-white px-5 py-4 shadow-[0_10px_26px_rgba(13,17,23,0.06)]";

  const desktop = {
    left_top: "lg:absolute lg:w-[280px]",
    left_mid: "lg:absolute lg:w-[280px]",
    left_bottom: "lg:absolute lg:w-[280px]",
    right_top: "lg:absolute lg:w-[280px]",
    right_mid: "lg:absolute lg:w-[280px]",
    right_bottom: "lg:absolute lg:w-[280px]",
  }[pos];

  return `${base} ${desktop}`;
}

function panelStyle(pos: Reason["position"]) {
  const byPos: Record<Reason["position"], { x: number; y: number }> = {
    left_top: { x: -240, y: -160 },
    left_mid: { x: -290, y: 0 },
    left_bottom: { x: -240, y: 160 },
    right_top: { x: 240, y: -160 },
    right_mid: { x: 290, y: 0 },
    right_bottom: { x: 240, y: 160 },
  };

  const { x, y } = byPos[pos];
  return {
    left: "50%",
    top: "50%",
    transform: `translate(-50%, -50%) translate(${x}px, ${y}px)`,
  };
}
</script>

<template>
  <section class="bg-[#F0FFF4]/55 px-6 py-12 lg:px-10 lg:py-14" aria-label="Why choose us">
    <div class="mx-auto max-w-7xl">
      <div class="mx-auto max-w-3xl text-center">
        <p class="text-[11px] font-semibold tracking-[0.26em] text-spark-green/60">ADVANTAGES</p>
        <h2 class="mt-3 font-heading text-3xl font-extrabold tracking-tight text-spark-green sm:text-4xl">
          Why choose us?
        </h2>
        <p class="mt-4 text-base leading-relaxed text-spark-green/70 sm:text-lg">
          A simple, reliable process done with care, clear communication, and a clean finish.
        </p>
      </div>

      <div class="mt-10">
        <!-- Mobile / tablet: stacked -->
        <div class="grid gap-5 lg:hidden">
          <div class="mx-auto w-full max-w-md rounded-md border border-spark-green/10 bg-white p-6 shadow-[0_18px_45px_rgba(13,17,23,0.10)]">
            <div class="mx-auto h-40 w-40 overflow-hidden rounded-full ring-8 ring-[#DDF5E4]">
              <img :src="imageUrl" alt="" class="h-full w-full object-cover" loading="lazy" decoding="async" />
            </div>
            <p class="mt-5 text-center text-sm leading-relaxed text-spark-green/70">
              Everything connects back to the same outcome: a garden that looks great and stays easy to manage.
            </p>
          </div>

          <article
            v-for="reason in reasons"
            :key="reason.id"
            class="rounded-md border border-spark-green/10 bg-white px-5 py-4 shadow-[0_10px_26px_rgba(13,17,23,0.06)]"
          >
            <h3 class="font-heading text-lg font-extrabold tracking-tight text-spark-green">
              {{ reason.title }}
            </h3>
            <p class="mt-2 text-sm leading-relaxed text-spark-green/70">
              {{ reason.description }}
            </p>
          </article>
        </div>

        <!-- Desktop: radial layout -->
        <div class="relative hidden lg:block">
          <div class="relative mx-auto h-[520px] max-w-6xl">
            <!-- center image -->
            <div class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
              <div class="relative">
                <div class="h-56 w-56 overflow-hidden rounded-full ring-8 ring-[#DDF5E4] shadow-[0_22px_65px_rgba(13,17,23,0.12)]">
                  <img :src="imageUrl" alt="" class="h-full w-full object-cover" loading="lazy" decoding="async" />
                </div>
                <div class="pointer-events-none absolute inset-0 rounded-full ring-1 ring-spark-green/10" aria-hidden="true" />
              </div>
            </div>

            <!-- reason panels -->
            <article
              v-for="reason in reasons"
              :key="reason.id"
              :class="panelClass(reason.position)"
              :style="panelStyle(reason.position)"
            >
              <h3 class="font-heading text-lg font-extrabold tracking-tight text-spark-green">
                {{ reason.title }}
              </h3>
              <p class="mt-2 text-sm leading-relaxed text-spark-green/70">
                {{ reason.description }}
              </p>
            </article>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>


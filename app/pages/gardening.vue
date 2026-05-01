<script setup lang="ts">
import { Leaf, Scissors, Trash2 } from "lucide-vue-next";

const heroImageUrl = "https://images.pexels.com/photos/18137544/pexels-photo-18137544.jpeg";

const bookingEmail = "hello@sparkservices.com.au";
const bookingMailto = `mailto:${bookingEmail}?subject=${encodeURIComponent("Gardening booking request")}`;

type HeroHighlight = {
  title: string;
  description: string;
  icon: unknown;
};

const highlights: HeroHighlight[] = [
  {
    title: "Lawn mowing & edging",
    description: "Crisp lines, tidy finish, and consistent care for your property.",
    icon: Leaf,
  },
  {
    title: "Hedge trimming & pruning",
    description: "Neater shapes, healthier growth, and safer clearances.",
    icon: Scissors,
  },
  {
    title: "Green waste removal",
    description: "We clean up after the job and take the green waste with us.",
    icon: Trash2,
  },
];

</script>

<template>
  <main class="bg-spark-white font-body text-spark-green">
    <section id="gardening" class="relative">
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
              1100px 520px at 18% 38%,
              rgba(13, 17, 23, 0.58) 0%,
              rgba(13, 17, 23, 0.1) 56%,
              rgba(13, 17, 23, 0) 100%
            );
          "
          aria-hidden="true"
        />

        <div
          class="relative mx-auto flex h-full max-w-7xl items-start px-6 pb-12 pt-0 sm:items-end sm:pt-28 lg:px-10 lg:pb-16"
          style="padding-top: calc(72px + 2.5rem + env(safe-area-inset-top));"
        >
          <div class="w-full max-w-3xl">
            <h1 class="mt-5 font-heading text-4xl font-extrabold leading-[0.95] tracking-tight text-white sm:text-6xl lg:text-7xl">
              Expert Care
              <span class="block text-white/90">for</span>
              <span class="block text-white/90">every garden.</span>
            </h1>

            <p class="mt-6 max-w-xl text-base leading-relaxed text-white/75 sm:text-lg">
              Reliable garden care for homes and strata mowing, hedging, tidy-ups and green waste removal, with clear communication from
              start to finish.
            </p>

            <div class="mt-10 flex flex-wrap items-center gap-3">
              <a
                :href="bookingMailto"
                class="inline-flex h-11 items-center justify-center rounded-md bg-spark-gold px-6 font-heading text-[11px] font-extrabold tracking-[0.18em] text-spark-dark shadow-[0_12px_28px_rgba(245,197,66,0.18)] ring-1 ring-white/10 transition hover:bg-spark-gold-light focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-spark-white"
                aria-label="Book gardening"
              >
                BOOK GARDENING
              </a>
            </div>

            <div class="mt-10 space-y-4 lg:hidden">
              <div
                v-for="item in highlights"
                :key="item.title"
                class="flex items-center gap-3 rounded-xl border border-white/10 bg-white/10 p-4 shadow-[0_18px_55px_rgba(0,0,0,0.18)] backdrop-blur-md"
              >
                <component :is="item.icon" class="h-4 w-4 shrink-0 text-white/80" aria-hidden="true" />
                <div class="min-w-0">
                  <h3 class="font-heading text-base font-semibold tracking-tight text-white/95 sm:text-lg">
                    {{ item.title }}
                  </h3>
                  <p class="mt-1 text-sm leading-relaxed text-white/75">
                    {{ item.description }}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div class="hidden w-full self-center justify-end lg:flex">
            <div class="w-full max-w-[520px] space-y-5">
              <div
                v-for="item in highlights"
                :key="item.title"
                class="flex items-center gap-3 rounded-xl border border-white/10 bg-white/10 p-4 shadow-[0_18px_55px_rgba(0,0,0,0.18)] backdrop-blur-md"
              >
                <component :is="item.icon" class="h-4 w-4 shrink-0 text-white/80" aria-hidden="true" />
                <div class="min-w-0">
                  <h3 class="font-heading text-lg font-semibold tracking-tight text-white/95">
                    {{ item.title }}
                  </h3>
                  <p class="mt-1 text-sm leading-relaxed text-white/75">
                    {{ item.description }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <GardeningServicesSection />

    <GardeningWhyChooseUsSection />


    <ContactUsSection
      id="gardening-contact"
      title="Contact us"
      tagline="LET'S SPARK A CONVERSATION"
      subtitle="Share a few details and we’ll get back to you."
    />
  </main>
</template>


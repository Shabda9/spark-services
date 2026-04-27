<script setup lang="ts">
import { Building, Home as HomeIcon } from "lucide-vue-next";

const heroImageUrl = "https://images.pexels.com/photos/6195277/pexels-photo-6195277.jpeg";

const bookingEmail = "hello@sparkservices.com.au";
const bookingMailto = `mailto:${bookingEmail}?subject=${encodeURIComponent("Cleaning booking request")}`;

type HeroHighlight = {
  title: string;
  description: string;
  icon: unknown;
};

const highlights: HeroHighlight[] = [
  {
    title: "Commercial Cleaning",
    description: "Reliable cleaning for offices, retail, and shared spaces with consistent checklists.",
    icon: Building,
  },
  {
    title: "Residential Cleaning",
    description: "From regular home cleans to end-of-lease detail work — tailored to your place.",
    icon: HomeIcon,
  },
];
</script>

<template>
  <main class="bg-spark-white font-body text-spark-green">
    <section id="cleaning" class="relative">
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
              rgba(13, 17, 23, 0.10) 56%,
              rgba(13, 17, 23, 0.0) 100%
            );
          "
          aria-hidden="true"
        />

        <div
          class="relative mx-auto flex h-full max-w-7xl items-start px-6 pb-12 pt-0 sm:items-end sm:pt-28 lg:px-10 lg:pb-16"
          style="padding-top: calc(72px + 2.5rem + env(safe-area-inset-top));"
        >
          <div class="w-full max-w-3xl">

            <h1
              class="mt-5 font-heading text-4xl font-extrabold leading-[0.95] tracking-tight text-white sm:text-6xl lg:text-7xl"
            >
              Cleaning done right.
              <span class="block text-white/90">Homes, offices,</span>
              <span class="block text-white/90">and strata.</span>
            </h1>

            <p class="mt-6 max-w-xl text-base leading-relaxed text-white/75 sm:text-lg">
              Choose the service you need and we’ll take care of the rest with clear communication and attention to
              detail.
            </p>

            <div class="mt-10 flex flex-wrap items-center gap-3">
              <a
                :href="bookingMailto"
                class="inline-flex h-11 items-center justify-center rounded-md bg-spark-gold px-6 font-heading text-[11px] font-extrabold tracking-[0.18em] text-spark-dark shadow-[0_12px_28px_rgba(245,197,66,0.18)] ring-1 ring-white/10 transition hover:bg-spark-gold-light focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-spark-white"
                aria-label="Book cleaning"
              >
                BOOK CLEANING
              </a>
            </div>

            <div class="mt-10 space-y-4 lg:hidden">
              <div
                v-for="item in highlights"
                :key="item.title"
                class="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/10 p-5 shadow-[0_18px_55px_rgba(0,0,0,0.18)] backdrop-blur-md"
              >
                <div class="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/10 ring-1 ring-white/15">
                  <component :is="item.icon" class="h-5 w-5 text-white/90" aria-hidden="true" />
                </div>
                <div class="min-w-0">
                  <h3 class="font-heading text-lg font-semibold tracking-tight text-white/95 sm:text-xl">
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
                class="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/10 p-5 shadow-[0_18px_55px_rgba(0,0,0,0.18)] backdrop-blur-md"
              >
                <div class="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/10 ring-1 ring-white/15">
                  <component :is="item.icon" class="h-5 w-5 text-white/90" aria-hidden="true" />
                </div>
                <div class="min-w-0">
                  <h3 class="font-heading text-xl font-semibold tracking-tight text-white/95">
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
    <CleaningServicesSection />
    <CleaningHowToBookSection />
    <ContactUsSection
      id="cleaning-contact"
      title="Contact us"
      tagline="LET'S SPARK A CONVERSATION"
      subtitle="Share a few details and we’ll get back to you."
      :mailto-to="bookingEmail"
      subject-prefix="Cleaning enquiry"
      default-service="cleaning"
    />
  </main>
</template>


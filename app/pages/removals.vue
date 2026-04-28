<script setup lang="ts">
const heroImageUrl = "https://images.pexels.com/photos/30169297/pexels-photo-30169297.jpeg";

const bookingEmail = "hello@sparkservices.com.au";
const bookingMailto = `mailto:${bookingEmail}?subject=${encodeURIComponent("Removals booking request")}`;

const heroPickup = ref("");
const heroDropoff = ref("");
const contactPrefillMessage = ref("");

function buildRoutePrefillMessage() {
  const from = heroPickup.value.trim();
  const to = heroDropoff.value.trim();
  return `Moving from: ${from || "(not provided)"}\nMoving to: ${to || "(not provided)"}`;
}

function onHeroRouteContinue() {
  contactPrefillMessage.value = buildRoutePrefillMessage();
  nextTick(() => {
    document.getElementById("removals-contact")?.scrollIntoView({ behavior: "smooth", block: "start" });
  });
}
</script>

<template>
  <main class="bg-spark-white font-body text-spark-green">
    <section id="removals" class="relative">
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
              Removals.
              <span class="block text-white/90">Clear planning,</span>
              <span class="block text-white/90">careful handling.</span>
            </h1>

            <p class="mt-6 max-w-xl text-base leading-relaxed text-white/75 sm:text-lg">
              Starting prices and services are outlined below. Book or use the form and we’ll confirm timing and scope with you.
            </p>

            <div class="mt-10 flex flex-wrap items-center gap-3">
              <a
                :href="bookingMailto"
                class="inline-flex h-11 items-center justify-center rounded-md bg-spark-gold px-6 font-heading text-[11px] font-extrabold tracking-[0.18em] text-spark-dark shadow-[0_12px_28px_rgba(245,197,66,0.18)] ring-1 ring-white/10 transition hover:bg-spark-gold-light focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-spark-white"
                aria-label="Book removals"
              >
                BOOK REMOVALS
              </a>
            </div>

            <div class="mt-10 lg:hidden">
              <RemovalsHeroRouteCard
                v-model:pickup="heroPickup"
                v-model:dropoff="heroDropoff"
                @continue="onHeroRouteContinue"
              />
            </div>
          </div>

          <div class="hidden w-full self-center justify-end lg:flex">
            <div class="w-full max-w-[520px]">
              <RemovalsHeroRouteCard
                v-model:pickup="heroPickup"
                v-model:dropoff="heroDropoff"
                @continue="onHeroRouteContinue"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
    <RemovalsServicesSection />
    <RemovalsFleetPricingSection />
    <ContactUsSection
      id="removals-contact"
      title="Contact us"
      tagline="LET'S SPARK A CONVERSATION"
      subtitle="Share a few details and we’ll get back to you."
      :mailto-to="bookingEmail"
      subject-prefix="Removals enquiry"
      default-service="removals"
      :prefill-message="contactPrefillMessage"
    />
  </main>
</template>

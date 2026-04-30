<script setup lang="ts">
import {
  Building2,
  Home,
  KeyRound,
} from "lucide-vue-next";
import { useBookingStore, type BookingExtra, type BookingServiceType } from "~/stores/booking";

type CleaningServiceId =
  | BookingServiceType
  | "deep_clean"
  | "windows"
  | "carpet"
  | "post_construction_detail"
  | "strata_common_areas";

type CleaningService = {
  id: CleaningServiceId;
  title: string;
  description: string;
  startingFrom: number;
  icon: unknown;
  badge?: string;
  imageUrl?: string;
  bullets?: string[];
  variant?: "light" | "dark";
  accent?: "gold" | "green" | "dark";
};

const fallbackImageUrl = "https://images.pexels.com/photos/6195277/pexels-photo-6195277.jpeg";
const bookingStore = useBookingStore();
const props = withDefaults(
  defineProps<{
    showBookingCta?: boolean;
    serviceSet?: "all" | "home";
  }>(),
  {
    showBookingCta: false,
    serviceSet: "all",
  },
);

const services: CleaningService[] = [
  {
    id: "residential",
    title: "Residential Cleaning",
    description:
      "Routine cleans tailored to your home kitchens, bathrooms, bedrooms, and living areas with meticulous care.",
    startingFrom: 120,
    icon: Home,
    imageUrl: "https://images.pexels.com/photos/6195121/pexels-photo-6195121.jpeg",
    accent: "gold",
  },
  {
    id: "office",
    title: "Office & Commercial",
    description: "Consistent, checklist-based cleaning for workplaces, retail, clinics, and shared spaces.",
    startingFrom: 250,
    icon: Building2,
    accent: "green",
  },
  {
    id: "end_of_lease",
    title: "End of Lease",
    description: "Move-out cleaning with detailed inclusions to help support a smooth inspection and handover.",
    startingFrom: 350,
    icon: KeyRound,
    badge: "POPULAR",
    bullets: ["Bond-back focused inclusions", "Inspection-ready detail work", "Easy extras in booking flow"],
    accent: "gold",
  },
];

const displayedServices = computed(() => {
  if (props.serviceSet === "home") {
    return services.filter((service) => service.id === "residential" || service.id === "end_of_lease");
  }

  return services;
});

const featured = computed(() => displayedServices.value[0]!);
const highlight = computed(() => displayedServices.value[displayedServices.value.length - 1]!);
const tiles = computed(() => displayedServices.value.slice(1, -1));

function bookingSelection(serviceId: CleaningServiceId): { serviceType: BookingServiceType; extra?: BookingExtra } {
  if (serviceId === "deep_clean") return { serviceType: "residential", extra: "deep_clean" };
  if (serviceId === "windows") return { serviceType: "residential", extra: "windows" };
  if (serviceId === "carpet") return { serviceType: "residential", extra: "carpet" };
  if (serviceId === "post_construction_detail") return { serviceType: "residential", extra: "post_construction_detail" };
  if (serviceId === "strata_common_areas") return { serviceType: "office", extra: "strata_common_areas" };
  return { serviceType: serviceId };
}

function quoteTo(serviceId: CleaningServiceId) {
  const selection = bookingSelection(serviceId);
  return {
    path: "/booking",
    query: selection.extra ? { service: selection.serviceType, extra: selection.extra } : { service: selection.serviceType },
  };
}

function quoteAnchorTo() {
  return {
    path: "/cleaning",
  };
}

function captureIntent(serviceId: CleaningServiceId) {
  const selection = bookingSelection(serviceId);

  bookingStore.setBasics({
    serviceType: selection.serviceType,
    location: bookingStore.location,
  });

  if (selection.extra && !bookingStore.extras.includes(selection.extra)) {
    bookingStore.toggleExtra(selection.extra);
  }
}
</script>

<template>
  <section class="mx-auto max-w-7xl px-6 py-10 lg:px-10 lg:py-12" aria-label="Cleaning services">
    <div class="mx-auto max-w-3xl text-center">
      <p class="text-[11px] font-semibold tracking-[0.26em] text-spark-green/60">CLEANING SERVICES</p>
      <h2 class="mt-3 font-heading text-3xl font-extrabold tracking-tight text-spark-green sm:text-4xl">
        Choose the clean that fits.
      </h2>
      <p class="mt-4 text-base leading-relaxed text-spark-green/70 sm:text-lg">
        Transparent starting prices and clear inclusions pick what you need and we’ll tailor the details.
      </p>
    </div>

    <div class="mt-10 grid gap-6 lg:grid-cols-12 lg:items-stretch">
      <article
        class="group relative overflow-hidden border border-spark-green/10 bg-white shadow-[0_18px_45px_rgba(13,17,23,0.10)] transition hover:-translate-y-0.5 hover:shadow-[0_22px_60px_rgba(13,17,23,0.14)] lg:col-span-7"
      >
        <div class="relative h-[220px] w-full overflow-hidden sm:h-[260px]">
          <img
            :src="featured.imageUrl ?? fallbackImageUrl"
            :alt="featured.title"
            class="h-full w-full object-cover transition duration-500 group-hover:scale-[1.02]"
            loading="lazy"
            decoding="async"
          />
          <div class="absolute inset-0 bg-gradient-to-t from-spark-dark/35 via-transparent to-transparent" aria-hidden="true" />
        </div>

        <div class="p-6 sm:p-8">
          <div class="flex items-start justify-between gap-6">
            <div class="min-w-0">
              <h3 class="font-heading text-2xl font-extrabold tracking-tight text-spark-green">
                {{ featured.title }}
              </h3>
              <p class="mt-3 text-sm leading-relaxed text-spark-green/70 sm:text-base">
                {{ featured.description }}
              </p>
            </div>

            <div class="text-right">
              <p class="text-[11px] font-semibold tracking-[0.18em] text-spark-green/55">STARTING FROM</p>
              <p class="mt-1 font-heading text-3xl font-extrabold tracking-tight text-spark-green">
                ${{ featured.startingFrom }}
              </p>
            </div>
          </div>

          <div class="mt-7 flex flex-wrap items-center justify-between gap-3">
            <NuxtLink
              :to="quoteTo(featured.id)"
              class="inline-flex h-11 items-center justify-center rounded-md border border-spark-green/20 bg-white px-6 font-heading text-[11px] font-extrabold tracking-[0.18em] text-spark-green transition hover:border-spark-green/30 hover:bg-spark-green hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-spark-gold/70 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
              :aria-label="`Get a quote for ${featured.title}`"
              @click="captureIntent(featured.id)"
            >
              GET QUOTE
            </NuxtLink>
          </div>
        </div>
      </article>

      <article
        class="relative overflow-hidden border border-white/10 bg-spark-green shadow-[0_18px_45px_rgba(13,17,23,0.14)] lg:col-span-5"
      >
        <div class="absolute inset-0 bg-[radial-gradient(800px_360px_at_40%_10%,rgba(245,197,66,0.18)_0%,rgba(245,197,66,0.0)_65%)]" aria-hidden="true" />
        <div class="relative p-6 sm:p-8">
          <div class="flex items-start justify-between gap-4">
            <div class="flex items-center gap-3">
              <component
                :is="highlight.icon"
                class="h-5 w-5 text-white/85"
                :stroke-width="1.5"
                aria-hidden="true"
              />
              <div>
                <p v-if="highlight.badge" class="text-[11px] font-semibold tracking-[0.20em] text-white/70">
                  {{ highlight.badge }}
                </p>
                <h3 class="mt-1 font-heading text-2xl font-extrabold tracking-tight text-white">
                  {{ highlight.title }}
                </h3>
              </div>
            </div>
          </div>

          <p class="mt-4 text-sm leading-relaxed text-white/75">
            {{ highlight.description }}
          </p>

          <ul v-if="highlight.bullets?.length" class="mt-6 space-y-3">
            <li v-for="bullet in highlight.bullets" :key="bullet" class="flex items-start gap-3">
              <span class="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-spark-gold" aria-hidden="true" />
              <span class="text-sm font-medium text-white/85">{{ bullet }}</span>
            </li>
          </ul>

          <div class="mt-7 flex items-end justify-between gap-5">
            <div>
              <p class="text-[11px] font-semibold tracking-[0.18em] text-white/65">STARTING FROM</p>
              <p class="mt-1 font-heading text-3xl font-extrabold tracking-tight text-white">
                ${{ highlight.startingFrom }}
              </p>
            </div>
            <NuxtLink
              :to="quoteTo(highlight.id)"
              class="inline-flex h-11 items-center justify-center rounded-md bg-white px-6 font-heading text-[11px] font-extrabold tracking-[0.18em] text-spark-green transition hover:bg-white/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-spark-green"
              :aria-label="`Get a quote for ${highlight.title}`"
              @click="captureIntent(highlight.id)"
            >
              GET QUOTE
            </NuxtLink>
          </div>
        </div>
      </article>
    </div>

    <div v-if="tiles.length" class="mt-6 grid gap-5 sm:grid-cols-2 lg:mt-7 lg:grid-cols-3">
      <article
        v-for="service in tiles"
        :key="service.id"
        class="group relative overflow-hidden border border-spark-green/10 bg-white p-6 shadow-[0_14px_35px_rgba(13,17,23,0.08)] transition hover:-translate-y-0.5 hover:shadow-[0_18px_45px_rgba(13,17,23,0.12)]"
      >
        <span
          class="absolute left-0 top-0 h-full w-1 bg-spark-gold/70"
          :class="[
            service.accent === 'green' ? 'bg-spark-green/70' : '',
            service.accent === 'dark' ? 'bg-spark-dark/70' : '',
          ]"
          aria-hidden="true"
        />

        <div class="flex items-start gap-3">
          <component
            :is="service.icon"
            class="mt-0.5 h-4 w-4 text-spark-green/70"
            :stroke-width="1.5"
            aria-hidden="true"
          />
          <div class="min-w-0 flex-1">
            <h3 class="font-heading text-lg font-extrabold tracking-tight text-spark-green">
              {{ service.title }}
            </h3>
            <p class="mt-2 text-sm leading-relaxed text-spark-green/70">
              {{ service.description }}
            </p>
          </div>
        </div>

        <div class="mt-6 flex items-center justify-between gap-4 border-t border-spark-green/10 pt-5">
          <div class="inline-flex items-center gap-2">
            <span class="text-[10px] font-semibold tracking-[0.18em] text-spark-green/55">FROM</span>
            <span
              class="inline-flex items-center rounded-sm bg-spark-white px-2.5 py-1 font-heading text-sm font-extrabold text-spark-green ring-1 ring-spark-green/10"
            >
              ${{ service.startingFrom }}
            </span>
          </div>

          <NuxtLink
            :to="quoteTo(service.id)"
            class="inline-flex h-10 items-center justify-center border border-spark-green/20 bg-white px-4 font-heading text-[11px] font-extrabold tracking-[0.18em] text-spark-green transition hover:border-spark-green/30 hover:bg-spark-green hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-spark-gold/70 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
            :aria-label="`Get a quote for ${service.title}`"
            @click="captureIntent(service.id)"
          >
            GET QUOTE
          </NuxtLink>
        </div>
      </article>
    </div>

    <SectionCtaBand
      v-if="props.showBookingCta"
      eyebrow="NOT SURE WHAT FITS?"
      title="Click view all services for all remaining services."
      description="Build a quote from the full booking flow and choose the cleaning option that matches your property."
      button-label="VIEW ALL SERVICES"
      :to="quoteAnchorTo()"
      aria-label="View all remaining services in the booking flow"
    />
  </section>
</template>


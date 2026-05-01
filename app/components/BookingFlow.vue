<script setup lang="ts">
import { computed, onMounted, ref, watch } from "vue";
import { Check, ChevronLeft, ChevronRight, Mail } from "lucide-vue-next";
import Step1Basics from "~/components/booking/Step1Basics.vue";
import Step2Scope from "~/components/booking/Step2Scope.vue";
import Step3Extras from "~/components/booking/Step3Extras.vue";
import Step4Contact from "~/components/booking/Step4Contact.vue";
import { bookingExtras, bookingServices, useBookingStore, type BookingExtra, type BookingServiceType } from "~/stores/booking";
import {
  basicsSchema,
  contactSchema,
  extrasSchema,
  scopeSchema,
  type BookingStepErrors,
} from "~/utils/bookingSchemas";

const booking = useBookingStore();
const route = useRoute();

const currentStep = ref(1);
const errors = ref<BookingStepErrors>({});
const isSubmitting = ref(false);
const submitError = ref("");
const quoteNumber = ref("");

const steps = [
  { number: 1, label: "Service" },
  { number: 2, label: "Place" },
  { number: 3, label: "Extras" },
  { number: 4, label: "Contact" },
] as const;

const activeStepComponent = computed(() => {
  if (currentStep.value === 1) return Step1Basics;
  if (currentStep.value === 2) return Step2Scope;
  if (currentStep.value === 3) return Step3Extras;
  return Step4Contact;
});

const selectedServiceLabel = computed(() => booking.selectedService.label);
const hasScope = computed(() => booking.bedrooms !== null && booking.bathrooms !== null);
const displayedEstimate = computed(() => {
  const service = booking.selectedService;

  if (currentStep.value === 1 || !hasScope.value) {
    return service.base;
  }

  const scopeEstimate = service.base + booking.bedrooms! * service.bedroomRate + booking.bathrooms! * service.bathroomRate;

  if (currentStep.value === 2) {
    return scopeEstimate;
  }

  return scopeEstimate + booking.selectedExtras.reduce((total, extra) => total + extra.price, 0);
});
const scopeSummary = computed(() => {
  if (!hasScope.value || currentStep.value === 1) return "Not selected";
  return `${booking.bedrooms} bed / ${booking.bathrooms} bath`;
});
const extrasSummary = computed(() => {
  if (currentStep.value < 3) return "Not selected";
  return `${booking.selectedExtras.length} selected`;
});

function zodErrors(error: { issues: Array<{ path: PropertyKey[]; message: string }> }) {
  return error.issues.reduce<BookingStepErrors>((result, issue) => {
    const key = String(issue.path[0] ?? "form");
    result[key] = issue.message;
    return result;
  }, {});
}

function validateCurrentStep() {
  const result =
    currentStep.value === 1
      ? basicsSchema.safeParse({ serviceType: booking.serviceType, ...booking.location })
      : currentStep.value === 2
        ? scopeSchema.safeParse({ bedrooms: booking.bedrooms, bathrooms: booking.bathrooms })
        : currentStep.value === 3
          ? extrasSchema.safeParse({ extras: booking.extras })
          : contactSchema.safeParse(booking.contact);

  if (result.success) {
    errors.value = {};
    return true;
  }

  errors.value = zodErrors(result.error);
  return false;
}

function nextStep() {
  if (!validateCurrentStep()) return;
  currentStep.value = Math.min(4, currentStep.value + 1);
}

function previousStep() {
  errors.value = {};
  currentStep.value = Math.max(1, currentStep.value - 1);
}

async function submitBooking() {
  if (!validateCurrentStep()) return;
  if (!scopeSchema.safeParse({ bedrooms: booking.bedrooms, bathrooms: booking.bathrooms }).success) {
    currentStep.value = 2;
    errors.value = { bedrooms: "Choose bedrooms.", bathrooms: "Choose bathrooms." };
    return;
  }

  isSubmitting.value = true;
  submitError.value = "";

  try {
    const response = await $fetch<{ success: true; emailSent: true; estimate: number }>("/api/booking", {
      method: "POST",
      body: {
        serviceType: booking.serviceType,
        addressLine1: booking.location.addressLine1,
        unitNumber: booking.location.unitNumber,
        suburb: booking.location.suburb,
        state: booking.location.state,
        postcode: booking.location.postcode,
        bedrooms: booking.bedrooms!,
        bathrooms: booking.bathrooms!,
        extras: booking.extras,
        contact: booking.contact,
      },
    });

    quoteNumber.value = response.emailSent ? "Your quote request" : "";
  } catch {
    submitError.value = "We could not prepare the quote just now. Please try again.";
  } finally {
    isSubmitting.value = false;
  }
}

function seedFromRoute() {
  const service = route.query.service;
  const extra = route.query.extra;

  if (typeof service === "string" && bookingServices.some((item) => item.value === service)) {
    booking.setBasics({
      serviceType: service as BookingServiceType,
      location: booking.location,
    });
  }

  if (typeof extra === "string" && bookingExtras.some((item) => item.value === extra) && !booking.extras.includes(extra as BookingExtra)) {
    booking.toggleExtra(extra as BookingExtra);
  }
}

onMounted(() => {
  booking.calculateEstimate();
  seedFromRoute();
});

watch(() => route.query.service, seedFromRoute);
</script>

<template>
  <section id="quote" class="bg-white px-6 py-14 lg:px-10 lg:py-16" aria-label="Booking flow">
    <div class="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-start">
      <div class="min-w-0">
        <div class="max-w-3xl">
          <p class="text-[11px] font-semibold tracking-[0.26em] text-spark-green/60">BOOKING QUOTE</p>
          <h2 class="mt-3 font-heading text-3xl font-extrabold tracking-tight text-spark-green sm:text-4xl">
            Build your clean in a few taps.
          </h2>
          <p class="mt-4 text-base leading-relaxed text-spark-green/70">
            Choose the service, confirm the scope, add essentials, then get your quote by email.
          </p>
        </div>

        <div class="mt-8 flex gap-2 overflow-x-auto pb-2" aria-label="Booking progress">
          <button
            v-for="step in steps"
            :key="step.number"
            type="button"
            class="flex min-w-[132px] items-center gap-2 rounded-md border px-3 py-2 text-left transition"
            :class="step.number <= currentStep ? 'border-spark-green bg-spark-green text-white' : 'border-spark-green/10 bg-spark-white text-spark-green/65'"
            @click="currentStep = step.number"
          >
            <span class="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white/15 font-heading text-xs font-extrabold">
              <Check v-if="step.number < currentStep" class="h-3.5 w-3.5" aria-hidden="true" />
              <span v-else>{{ step.number }}</span>
            </span>
            <span class="font-heading text-xs font-extrabold tracking-[0.12em]">{{ step.label }}</span>
          </button>
        </div>

        <div class="mt-6 border border-spark-green/10 bg-spark-white p-5 shadow-[0_18px_45px_rgba(13,17,23,0.08)] sm:p-7">
          <div v-if="quoteNumber" class="py-10 text-center">
            <div class="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-spark-green text-white">
              <Mail class="h-6 w-6" aria-hidden="true" />
            </div>
            <h3 class="mt-5 font-heading text-2xl font-extrabold text-spark-green">Quote sent.</h3>
            <p class="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-spark-green/70">
              {{ quoteNumber }} has been prepared for {{ booking.contact.email }}.
            </p>
          </div>

          <template v-else>
            <component :is="activeStepComponent" :errors="errors" />

            <p v-if="submitError" class="mt-5 text-sm font-medium text-red-700">{{ submitError }}</p>

            <div class="mt-8 flex items-center justify-between gap-3 border-t border-spark-green/10 pt-5">
              <button
                type="button"
                class="inline-flex h-11 items-center justify-center gap-2 rounded-md border border-spark-green/15 bg-white px-4 font-heading text-[11px] font-extrabold tracking-[0.14em] text-spark-green transition hover:bg-spark-green hover:text-white disabled:opacity-40"
                :disabled="currentStep === 1"
                @click="previousStep"
              >
                <ChevronLeft class="h-4 w-4" aria-hidden="true" /> BACK
              </button>

              <button
                v-if="currentStep < 4"
                type="button"
                class="inline-flex h-11 items-center justify-center gap-2 rounded-md bg-spark-green px-5 font-heading text-[11px] font-extrabold tracking-[0.14em] text-white transition hover:bg-spark-green-light"
                @click="nextStep"
              >
                NEXT <ChevronRight class="h-4 w-4" aria-hidden="true" />
              </button>

              <button
                v-else
                type="button"
                class="inline-flex h-11 items-center justify-center rounded-md bg-spark-gold px-5 font-heading text-[11px] font-extrabold tracking-[0.14em] text-spark-dark transition hover:bg-spark-gold-light disabled:cursor-wait disabled:opacity-70"
                :disabled="isSubmitting"
                @click="submitBooking"
              >
                {{ isSubmitting ? "SENDING..." : "GET MY QUOTE" }}
              </button>
            </div>
          </template>
        </div>
      </div>

      <aside class="border border-spark-green/10 bg-spark-green p-6 text-white shadow-[0_18px_45px_rgba(13,17,23,0.14)] lg:sticky lg:top-24">
        <p class="text-[11px] font-semibold tracking-[0.22em] text-white/60">LIVE ESTIMATE</p>
        <h3 class="mt-3 font-heading text-2xl font-extrabold tracking-tight">{{ selectedServiceLabel }}</h3>
        <div class="mt-6 border-t border-white/10 pt-5">
          <p class="text-sm text-white/65">Estimated total</p>
          <p class="mt-1 font-heading text-5xl font-extrabold tracking-tight">${{ displayedEstimate }}</p>
          <p class="mt-3 text-xs leading-relaxed text-white/55">
            Final pricing is confirmed after access, property condition, and parking are reviewed.
          </p>
        </div>
        <dl class="mt-6 space-y-3 text-sm">
          <div class="flex justify-between gap-4">
            <dt class="text-white/60">Postcode</dt>
            <dd class="font-semibold">{{ booking.location.postcode || "-" }}</dd>
          </div>
          <div class="flex justify-between gap-4">
            <dt class="text-white/60">Scope</dt>
            <dd class="font-semibold">{{ scopeSummary }}</dd>
          </div>
          <div class="flex justify-between gap-4">
            <dt class="text-white/60">Extras</dt>
            <dd class="text-right font-semibold">{{ extrasSummary }}</dd>
          </div>
        </dl>
      </aside>
    </div>
  </section>
</template>

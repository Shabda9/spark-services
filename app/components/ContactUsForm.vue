<script setup lang="ts">
import { CheckCircle2, ChevronDown, Loader2, Send } from "lucide-vue-next";
import { computed, reactive, ref } from "vue";
import { useBookingStore, type BookingServiceType } from "~/stores/booking";

type ContactServiceType = BookingServiceType | "general_cleaning";
type ContactErrors = Partial<Record<"name" | "email" | "message" | "form", string>>;

const booking = useBookingStore();
const isSubmitting = ref(false);
const didSubmit = ref(false);
const errors = ref<ContactErrors>({});

const form = reactive({
  name: "",
  email: "",
  phone: "",
  message: "",
  serviceType: "" as ContactServiceType | "",
});

const serviceOptions: Array<{
  value: ContactServiceType;
  label: string;
  price?: string;
}> = [
  { value: "general_cleaning", label: "General cleaning enquiry" },
  { value: "residential", label: "Residential Cleaning", price: "From $120" },
  { value: "office", label: "Office & Commercial", price: "From $250" },
  { value: "end_of_lease", label: "End of Lease Cleaning", price: "From $350" },
];

const selectedCleaningService = computed(() => {
  return serviceOptions.find((service) => service.value === form.serviceType && service.value !== "general_cleaning") ?? null;
});

const isGeneralEnquiry = computed(() => !form.serviceType || form.serviceType === "general_cleaning");

function validateGeneralEnquiry() {
  const nextErrors: ContactErrors = {};

  if (form.name.trim().length < 2) {
    nextErrors.name = "Enter your name.";
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
    nextErrors.email = "Enter a valid email address.";
  }

  if (form.message.trim().length < 10) {
    nextErrors.message = "Tell us a little more about what you need.";
  }

  errors.value = nextErrors;
  return Object.keys(nextErrors).length === 0;
}

async function submitEnquiry() {
  if (!validateGeneralEnquiry()) return;

  isSubmitting.value = true;
  errors.value = {};

  try {
    await $fetch<{ success: true; emailSent: true }>("/api/contact", {
      method: "POST",
      body: {
        name: form.name,
        email: form.email,
        phone: form.phone,
        message: form.message,
        serviceType: "general_cleaning",
      },
    });

    didSubmit.value = true;
  } catch {
    errors.value = {
      form: "We could not send your enquiry just now. Please try again.",
    };
  } finally {
    isSubmitting.value = false;
  }
}

async function continueToBooking() {
  if (!selectedCleaningService.value) return;

  const serviceType = selectedCleaningService.value.value as BookingServiceType;

  booking.setBasics({
    serviceType,
    location: booking.location,
  });
  booking.updateContact({
    name: form.name,
    email: form.email,
    phone: form.phone,
  });

  await navigateTo({
    path: "/booking",
    query: {
      service: serviceType,
    },
  });
}
</script>

<template>
  <div class="space-y-6" aria-label="Contact us">
    <div
      v-if="didSubmit"
      class="border border-spark-gold/30 bg-spark-gold/10 p-5 text-white shadow-[0_18px_45px_rgba(0,0,0,0.18)]"
    >
      <div class="flex items-start gap-4">
        <span class="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-spark-gold text-spark-dark">
          <CheckCircle2 class="h-5 w-5" aria-hidden="true" />
        </span>
        <div>
          <h3 class="font-heading text-xl font-extrabold tracking-tight">Message sent.</h3>
          <p class="mt-2 text-sm leading-relaxed text-white/70">
            Thanks, {{ form.name }}. We have your enquiry and will get back to you shortly.
          </p>
        </div>
      </div>
    </div>

    <form v-else class="space-y-6" @submit.prevent="submitEnquiry">
      <section>
        <div>
          <p class="text-[11px] font-semibold tracking-[0.22em] text-white/55">CLEANING SERVICE</p>
          <h3 class="mt-2 font-heading text-xl font-extrabold tracking-tight text-white">
            What can we help with?
          </h3>
        </div>

        <label class="mt-4 block">
          <span class="sr-only">Select enquiry type or cleaning service</span>
          <span class="relative block">
            <select
              v-model="form.serviceType"
              class="h-12 w-full appearance-none rounded-md border border-white/10 bg-spark-dark/80 px-4 pr-11 font-heading text-sm font-extrabold tracking-tight text-white shadow-[0_10px_30px_rgba(0,0,0,0.18)] outline-none transition hover:border-white/20 focus:border-spark-gold/60 focus:ring-2 focus:ring-spark-gold/30"
              :class="form.serviceType ? 'text-white' : 'text-white/45'"
            >
              <!-- <option value="" disabled>Select a service or enquiry type</option> -->
              <option value="" disabled selected hidden>
                Select a service or enquiry type
              </option>
              <option
                v-for="service in serviceOptions"
                :key="service.value"
                :value="service.value"
                class="bg-spark-dark text-white"
              >
                {{ service.price ? `${service.label} - ${service.price}` : service.label }}
              </option>
            </select>
            <ChevronDown
              class="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white/55"
              aria-hidden="true"
            />
          </span>
        </label>

        <div
          v-if="selectedCleaningService"
          class="mt-4 overflow-hidden rounded-md border border-spark-gold/30 bg-spark-gold/10 shadow-[0_18px_45px_rgba(0,0,0,0.18)]"
        >
          <div class="flex flex-col gap-4 p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5">
            <div class="min-w-0">
              <p class="font-heading text-base font-extrabold tracking-tight text-white">
                Ready to build your quote?
              </p>
              <p class="mt-1 text-sm leading-relaxed text-white/68">
                Continue with {{ selectedCleaningService.label }} and we’ll carry your contact details into booking.
              </p>
            </div>
            <button
              type="button"
              class="inline-flex h-11 shrink-0 items-center justify-center rounded-md bg-spark-gold px-5 font-heading text-[11px] font-extrabold tracking-[0.16em] text-spark-dark shadow-[0_12px_28px_rgba(245,197,66,0.18)] transition hover:bg-spark-gold-light focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
              @click="continueToBooking"
            >
              CONTINUE TO BOOKING
            </button>
          </div>
        </div>
      </section>

      <section class="grid gap-4 md:grid-cols-2">
        <label class="block">
          <span class="text-[11px] font-semibold tracking-[0.18em] text-white/70">FULL NAME</span>
          <input
            v-model="form.name"
            type="text"
            autocomplete="name"
            placeholder="John Smith"
            class="mt-2 h-11 w-full rounded-md border border-white/10 bg-white/5 px-4 text-sm text-white/90 placeholder:text-white/35 shadow-[0_10px_30px_rgba(0,0,0,0.18)] backdrop-blur focus:outline-none focus-visible:ring-2 focus-visible:ring-spark-gold/70"
            :aria-invalid="Boolean(errors.name)"
          />
          <span v-if="errors.name" class="mt-2 block text-sm font-medium text-spark-gold">{{ errors.name }}</span>
        </label>

        <label class="block">
          <span class="text-[11px] font-semibold tracking-[0.18em] text-white/70">EMAIL ADDRESS</span>
          <input
            v-model="form.email"
            type="email"
            autocomplete="email"
            placeholder="john@example.com"
            class="mt-2 h-11 w-full rounded-md border border-white/10 bg-white/5 px-4 text-sm text-white/90 placeholder:text-white/35 shadow-[0_10px_30px_rgba(0,0,0,0.18)] backdrop-blur focus:outline-none focus-visible:ring-2 focus-visible:ring-spark-gold/70"
            :aria-invalid="Boolean(errors.email)"
          />
          <span v-if="errors.email" class="mt-2 block text-sm font-medium text-spark-gold">{{ errors.email }}</span>
        </label>

        <label class="block md:col-span-2">
          <span class="text-[11px] font-semibold tracking-[0.18em] text-white/70">PHONE NUMBER</span>
          <input
            v-model="form.phone"
            type="tel"
            autocomplete="tel"
            placeholder="+61 400 000 000"
            class="mt-2 h-11 w-full rounded-md border border-white/10 bg-white/5 px-4 text-sm text-white/90 placeholder:text-white/35 shadow-[0_10px_30px_rgba(0,0,0,0.18)] backdrop-blur focus:outline-none focus-visible:ring-2 focus-visible:ring-spark-gold/70"
            :aria-invalid="Boolean(errors.message)"
            />
            <span v-if="errors.email" class="mt-2 block text-sm font-medium text-spark-gold">{{ errors.email }}</span>
        </label>

        <label v-if="isGeneralEnquiry" class="block md:col-span-2">
          <span class="text-[11px] font-semibold tracking-[0.18em] text-white/70">YOUR MESSAGE</span>
          <textarea
            v-model="form.message"
            rows="5"
            placeholder="Tell us what you need..."
            class="mt-2 w-full resize-none rounded-md border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/90 placeholder:text-white/35 shadow-[0_10px_30px_rgba(0,0,0,0.18)] backdrop-blur focus:outline-none focus-visible:ring-2 focus-visible:ring-spark-gold/70"
            :aria-invalid="Boolean(errors.message)"
          />
          <span v-if="errors.message" class="mt-2 block text-sm font-medium text-spark-gold">{{ errors.message }}</span>
        </label>
      </section>

      <p v-if="errors.form" class="text-sm font-medium text-spark-gold">{{ errors.form }}</p>

      <button
        v-if="isGeneralEnquiry"
        type="submit"
        class="inline-flex h-12 w-full items-center justify-center gap-2 rounded-md bg-spark-gold px-6 font-heading text-[11px] font-extrabold tracking-[0.18em] text-spark-dark shadow-[0_12px_28px_rgba(245,197,66,0.16)] ring-1 ring-white/10 transition hover:bg-spark-gold-light focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-spark-dark disabled:cursor-wait disabled:opacity-70"
        :disabled="isSubmitting"
      >
        <Loader2 v-if="isSubmitting" class="h-4 w-4 animate-spin" aria-hidden="true" />
        <Send v-else class="h-4 w-4" aria-hidden="true" />
        {{ isSubmitting ? "SENDING..." : "SEND MESSAGE" }}
      </button>

      <p v-if="!form.serviceType" class="text-center text-xs text-white/55">
        Send a general message now, or choose a cleaning service above to continue to booking.
      </p>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ChevronDown } from "lucide-vue-next";
import { useBookingStore } from "~/stores/booking";

type ServiceOption = { label: string; value: string };

const props = withDefaults(
  defineProps<{
    mailtoTo?: string;
    subjectPrefix?: string;
    services?: ServiceOption[];
    defaultService?: string;
    prefillMessage?: string;
  }>(),
  {
    mailtoTo: "hello@sparkservices.com.au",
    subjectPrefix: "Spark Services enquiry",
    services: () => [
      { label: "General enquiry", value: "general" },
      { label: "Cleaning", value: "cleaning" },
      { label: "Removals", value: "removals" },
      { label: "Gardening", value: "gardening" },
    ],
    defaultService: "general",
    prefillMessage: "",
  },
);

const booking = useBookingStore();
const states = ["NSW", "VIC", "QLD", "ACT", "SA", "WA", "TAS", "NT"];

function applyRoutesPrefillBlock(block: string) {
  const stripped = booking.inquiry.message.replace(/^Moving from:[^\n]*\nMoving to:[^\n]*(\n\n)?/m, "").trim();
  booking.updateInquiry({
    message: stripped ? `${block}\n\n${stripped}` : block,
  });
}

watch(
  () => props.prefillMessage,
  (value) => {
    const trimmed = typeof value === "string" ? value.trim() : "";
    if (!trimmed) return;
    applyRoutesPrefillBlock(trimmed);
  },
);

const isServiceOpen = ref(false);
const serviceActiveIndex = ref(-1);
const serviceButtonRef = ref<HTMLButtonElement | null>(null);
const serviceMenuRef = ref<HTMLDivElement | null>(null);

const selectedServiceLabel = computed(() => {
  return props.services.find((opt) => opt.value === booking.inquiry.service)?.label ?? "Select a service";
});

watch(
  () => [props.defaultService, props.services] as const,
  ([defaultService, services]) => {
    const current = booking.inquiry.service;
    const isValid = services.some((opt) => opt.value === current);

    if (!current || !isValid) {
      booking.updateInquiry({ service: defaultService });
    }
  },
  { immediate: true },
);

function openServiceMenu() {
  isServiceOpen.value = true;
  const selectedIdx = props.services.findIndex((opt) => opt.value === booking.inquiry.service);
  serviceActiveIndex.value = selectedIdx >= 0 ? selectedIdx : 0;
  nextTick(() => {
    serviceMenuRef.value?.focus();
  });
}

function closeServiceMenu({ returnFocus = true }: { returnFocus?: boolean } = {}) {
  isServiceOpen.value = false;
  serviceActiveIndex.value = -1;
  if (returnFocus) nextTick(() => serviceButtonRef.value?.focus());
}

function setService(value: string) {
  booking.updateInquiry({ service: value });
  closeServiceMenu();
}

function onServiceButtonKeydown(event: KeyboardEvent) {
  if (event.key === "ArrowDown" || event.key === "Enter" || event.key === " ") {
    event.preventDefault();
    if (!isServiceOpen.value) openServiceMenu();
  }
}

function onServiceMenuKeydown(event: KeyboardEvent) {
  if (!isServiceOpen.value) return;

  if (event.key === "Escape") {
    event.preventDefault();
    closeServiceMenu();
    return;
  }

  if (event.key === "ArrowDown") {
    event.preventDefault();
    serviceActiveIndex.value = Math.min(props.services.length - 1, serviceActiveIndex.value + 1);
    return;
  }

  if (event.key === "ArrowUp") {
    event.preventDefault();
    serviceActiveIndex.value = Math.max(0, serviceActiveIndex.value - 1);
    return;
  }

  if (event.key === "Home") {
    event.preventDefault();
    serviceActiveIndex.value = 0;
    return;
  }

  if (event.key === "End") {
    event.preventDefault();
    serviceActiveIndex.value = props.services.length - 1;
    return;
  }

  if (event.key === "Enter" || event.key === " ") {
    event.preventDefault();
    const option = props.services[serviceActiveIndex.value];
    if (option) setService(option.value);
  }
}

function onGlobalPointerDown(event: MouseEvent | PointerEvent) {
  if (!isServiceOpen.value) return;
  const target = event.target as Node | null;
  if (!target) return;
  if (serviceButtonRef.value?.contains(target)) return;
  if (serviceMenuRef.value?.contains(target)) return;
  closeServiceMenu({ returnFocus: false });
}

onMounted(() => {
  window.addEventListener("pointerdown", onGlobalPointerDown, { capture: true });
});

onBeforeUnmount(() => {
  window.removeEventListener("pointerdown", onGlobalPointerDown, { capture: true } as AddEventListenerOptions);
});

function buildMailtoUrl() {
  const serviceLabel = props.services.find((opt) => opt.value === booking.inquiry.service)?.label ?? "";
  const locationSummary = [
    booking.location.addressLine1 || null,
    booking.location.unitNumber ? `Unit ${booking.location.unitNumber}` : null,
    booking.location.suburb || null,
    booking.location.state || null,
    booking.location.postcode || null,
  ].filter(Boolean).join(", ");

  const subjectParts = [props.subjectPrefix, serviceLabel || null, booking.location.suburb || null].filter(Boolean) as string[];
  const subject = subjectParts.join(" · ");

  const lines = [
    `Full name: ${booking.contact.name || "-"}`,
    `Email: ${booking.contact.email || "-"}`,
    `Phone: ${booking.contact.phone || "-"}`,
    `Service: ${serviceLabel || "-"}`,
    `Address: ${locationSummary || "-"}`,
    `Preferred date: ${booking.contact.date || "-"}`,
    "",
    "Message:",
    booking.inquiry.message || "-",
  ];

  const params = new URLSearchParams({
    subject,
    body: lines.join("\n"),
  });

  return `mailto:${props.mailtoTo}?${params.toString()}`;
}

function onSubmit() {
  const url = buildMailtoUrl();
  window.location.href = url;
}
</script>

<template>
  <form class="space-y-5" @submit.prevent="onSubmit" aria-label="Contact us">
    <div class="grid gap-4 md:grid-cols-2">
      <label class="block">
        <span class="text-[11px] font-semibold tracking-[0.18em] text-white/70">FULL NAME</span>
        <input
          :value="booking.contact.name"
          type="text"
          autocomplete="name"
          placeholder="John Smith"
          class="mt-2 h-11 w-full rounded-md border border-white/10 bg-white/5 px-4 text-sm text-white/90 placeholder:text-white/35 shadow-[0_10px_30px_rgba(0,0,0,0.18)] backdrop-blur focus:outline-none focus-visible:ring-2 focus-visible:ring-spark-gold/70"
          @input="booking.updateContact({ name: ($event.target as HTMLInputElement).value })"
        />
      </label>

      <label class="block">
        <span class="text-[11px] font-semibold tracking-[0.18em] text-white/70">EMAIL ADDRESS</span>
        <input
          :value="booking.contact.email"
          type="email"
          autocomplete="email"
          placeholder="john@example.com"
          class="mt-2 h-11 w-full rounded-md border border-white/10 bg-white/5 px-4 text-sm text-white/90 placeholder:text-white/35 shadow-[0_10px_30px_rgba(0,0,0,0.18)] backdrop-blur focus:outline-none focus-visible:ring-2 focus-visible:ring-spark-gold/70"
          @input="booking.updateContact({ email: ($event.target as HTMLInputElement).value })"
        />
      </label>
    </div>

    <div class="grid gap-4 md:grid-cols-2">
      <label class="block">
        <span class="text-[11px] font-semibold tracking-[0.18em] text-white/70">PHONE NUMBER</span>
        <input
          :value="booking.contact.phone"
          type="tel"
          autocomplete="tel"
          placeholder="+61 400 000 000"
          class="mt-2 h-11 w-full rounded-md border border-white/10 bg-white/5 px-4 text-sm text-white/90 placeholder:text-white/35 shadow-[0_10px_30px_rgba(0,0,0,0.18)] backdrop-blur focus:outline-none focus-visible:ring-2 focus-visible:ring-spark-gold/70"
          @input="booking.updateContact({ phone: ($event.target as HTMLInputElement).value })"
        />
      </label>

      <label class="block">
        <span class="text-[11px] font-semibold tracking-[0.18em] text-white/70">SERVICE TYPE</span>
        <div class="relative mt-2">
          <button
            ref="serviceButtonRef"
            type="button"
            class="flex h-11 w-full items-center justify-between gap-3 rounded-md border border-white/10 bg-white/5 px-4 text-left text-sm text-white/90 shadow-[0_10px_30px_rgba(0,0,0,0.18)] backdrop-blur transition hover:border-white/15 hover:bg-white/7 focus:outline-none focus-visible:ring-2 focus-visible:ring-spark-gold/70"
            aria-haspopup="listbox"
            :aria-expanded="isServiceOpen"
            @click="isServiceOpen ? closeServiceMenu() : openServiceMenu()"
            @keydown="onServiceButtonKeydown"
          >
            <span class="min-w-0 truncate">
              {{ selectedServiceLabel }}
            </span>
            <ChevronDown
              class="h-4 w-4 shrink-0 text-white/55 transition"
              :class="isServiceOpen ? 'rotate-180' : ''"
              aria-hidden="true"
              :stroke-width="2"
            />
          </button>

          <transition
            enter-active-class="transition duration-120 ease-out"
            enter-from-class="opacity-0 translate-y-1 scale-[0.99]"
            enter-to-class="opacity-100 translate-y-0 scale-100"
            leave-active-class="transition duration-100 ease-in"
            leave-from-class="opacity-100 translate-y-0 scale-100"
            leave-to-class="opacity-0 translate-y-1 scale-[0.99]"
          >
            <div
              v-if="isServiceOpen"
              ref="serviceMenuRef"
              class="absolute z-30 mt-2 w-full overflow-hidden rounded-md border border-white/10 bg-spark-dark/95 shadow-[0_18px_55px_rgba(0,0,0,0.30)] ring-1 ring-white/10 backdrop-blur-md focus:outline-none"
              role="listbox"
              tabindex="-1"
              @keydown="onServiceMenuKeydown"
            >
              <ul class="max-h-64 overflow-auto py-1">
                <li v-for="(opt, idx) in props.services" :key="opt.value">
                  <button
                    type="button"
                    class="flex w-full items-center justify-between gap-3 px-4 py-2.5 text-left text-sm transition focus:outline-none"
                    :class="[
                      idx === serviceActiveIndex ? 'bg-white/10 text-white' : 'text-white/80 hover:bg-white/5 hover:text-white',
                      opt.value === booking.inquiry.service ? 'font-semibold' : 'font-medium',
                    ]"
                    role="option"
                    :aria-selected="opt.value === booking.inquiry.service"
                    @mouseenter="serviceActiveIndex = idx"
                    @click="setService(opt.value)"
                  >
                    <span class="min-w-0 truncate">{{ opt.label }}</span>
                    <span
                      v-if="opt.value === booking.inquiry.service"
                      class="h-1.5 w-1.5 shrink-0 rounded-full bg-spark-gold"
                      aria-hidden="true"
                    />
                  </button>
                </li>
              </ul>
            </div>
          </transition>
        </div>
      </label>
    </div>

    <div class="grid gap-4 md:grid-cols-2">
      <label class="block md:col-span-2">
        <span class="text-[11px] font-semibold tracking-[0.18em] text-white/70">ADDRESS</span>
        <input
          :value="booking.location.addressLine1"
          type="text"
          autocomplete="address-line1"
          placeholder="12 Example Street"
          class="mt-2 h-11 w-full rounded-md border border-white/10 bg-white/5 px-4 text-sm text-white/90 placeholder:text-white/35 shadow-[0_10px_30px_rgba(0,0,0,0.18)] backdrop-blur focus:outline-none focus-visible:ring-2 focus-visible:ring-spark-gold/70"
          @input="booking.updateLocation({ addressLine1: ($event.target as HTMLInputElement).value })"
        />
      </label>

      <label class="block">
        <span class="text-[11px] font-semibold tracking-[0.18em] text-white/70">APT/UNIT NO.</span>
        <input
          :value="booking.location.unitNumber"
          type="text"
          autocomplete="address-line2"
          placeholder="Unit 5"
          class="mt-2 h-11 w-full rounded-md border border-white/10 bg-white/5 px-4 text-sm text-white/90 placeholder:text-white/35 shadow-[0_10px_30px_rgba(0,0,0,0.18)] backdrop-blur focus:outline-none focus-visible:ring-2 focus-visible:ring-spark-gold/70"
          @input="booking.updateLocation({ unitNumber: ($event.target as HTMLInputElement).value })"
        />
      </label>

      <label class="block">
        <span class="text-[11px] font-semibold tracking-[0.18em] text-white/70">SUBURB</span>
        <input
          :value="booking.location.suburb"
          type="text"
          autocomplete="address-level2"
          placeholder="Parramatta"
          class="mt-2 h-11 w-full rounded-md border border-white/10 bg-white/5 px-4 text-sm text-white/90 placeholder:text-white/35 shadow-[0_10px_30px_rgba(0,0,0,0.18)] backdrop-blur focus:outline-none focus-visible:ring-2 focus-visible:ring-spark-gold/70"
          @input="booking.updateLocation({ suburb: ($event.target as HTMLInputElement).value })"
        />
      </label>

      <label class="block">
        <span class="text-[11px] font-semibold tracking-[0.18em] text-white/70">POSTCODE</span>
        <input
          :value="booking.location.postcode"
          type="text"
          inputmode="numeric"
          autocomplete="postal-code"
          placeholder="2150"
          class="mt-2 h-11 w-full rounded-md border border-white/10 bg-white/5 px-4 text-sm text-white/90 placeholder:text-white/35 shadow-[0_10px_30px_rgba(0,0,0,0.18)] backdrop-blur focus:outline-none focus-visible:ring-2 focus-visible:ring-spark-gold/70"
          @input="booking.updateLocation({ postcode: ($event.target as HTMLInputElement).value.replace(/\D/g, '').slice(0, 4) })"
        />
      </label>

      <label class="block">
        <span class="text-[11px] font-semibold tracking-[0.18em] text-white/70">STATE</span>
        <select
          :value="booking.location.state"
          class="mt-2 h-11 w-full rounded-md border border-white/10 bg-white/5 px-4 text-sm text-white/90 shadow-[0_10px_30px_rgba(0,0,0,0.18)] backdrop-blur focus:outline-none focus-visible:ring-2 focus-visible:ring-spark-gold/70"
          @change="booking.updateLocation({ state: ($event.target as HTMLSelectElement).value })"
        >
          <option value="">Select state</option>
          <option v-for="state in states" :key="state" :value="state">{{ state }}</option>
        </select>
      </label>

      <label class="block">
        <span class="text-[11px] font-semibold tracking-[0.18em] text-white/70">PREFERRED DATE</span>
        <input
          :value="booking.contact.date"
          type="date"
          class="mt-2 h-11 w-full rounded-md border border-white/10 bg-white/5 px-4 text-sm text-white/90 shadow-[0_10px_30px_rgba(0,0,0,0.18)] backdrop-blur focus:outline-none focus-visible:ring-2 focus-visible:ring-spark-gold/70"
          @input="booking.updateContact({ date: ($event.target as HTMLInputElement).value })"
        />
      </label>
    </div>

    <label class="block">
      <span class="text-[11px] font-semibold tracking-[0.18em] text-white/70">YOUR MESSAGE</span>
      <textarea
        :value="booking.inquiry.message"
        rows="5"
        placeholder="Tell us what you need (optional)..."
        class="mt-2 w-full resize-none rounded-md border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/90 placeholder:text-white/35 shadow-[0_10px_30px_rgba(0,0,0,0.18)] backdrop-blur focus:outline-none focus-visible:ring-2 focus-visible:ring-spark-gold/70"
        @input="booking.updateInquiry({ message: ($event.target as HTMLTextAreaElement).value })"
      />
    </label>

    <div class="pt-2">
      <button
        type="submit"
        class="inline-flex h-12 w-full items-center justify-center rounded-md bg-spark-gold px-6 font-heading text-[11px] font-extrabold tracking-[0.18em] text-spark-dark shadow-[0_12px_28px_rgba(245,197,66,0.16)] ring-1 ring-white/10 transition hover:bg-spark-gold-light focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-spark-dark"
      >
        SEND MESSAGE
      </button>

      <p class="mt-3 text-center text-xs text-white/55">Our team usually responds within 2 business hours.</p>
    </div>
  </form>
</template>

<script setup lang="ts">
import { ChevronDown } from "lucide-vue-next";

type ServiceOption = { label: string; value: string };

const props = withDefaults(
  defineProps<{
    mailtoTo?: string;
    subjectPrefix?: string;
    services?: ServiceOption[];
    defaultService?: string;
    /** When set (e.g. from removals hero), merged into the message field for mailto body */
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
  }
);

const form = reactive({
  fullName: "",
  email: "",
  phone: "",
  service: props.defaultService,
  suburb: "",
  preferredDateTime: "",
  message: "",
});

function applyRoutesPrefillBlock(block: string) {
  const stripped = form.message.replace(/^Moving from:[^\n]*\nMoving to:[^\n]*(\n\n)?/m, "").trim();
  form.message = stripped ? `${block}\n\n${stripped}` : block;
}

watch(
  () => props.prefillMessage,
  (v) => {
    const trimmed = typeof v === "string" ? v.trim() : "";
    if (!trimmed) return;
    applyRoutesPrefillBlock(trimmed);
  }
);

const isServiceOpen = ref(false);
const serviceActiveIndex = ref(-1);
const serviceButtonRef = ref<HTMLButtonElement | null>(null);
const serviceMenuRef = ref<HTMLDivElement | null>(null);

const selectedServiceLabel = computed(() => {
  return props.services.find((opt) => opt.value === form.service)?.label ?? "Select a service";
});

function openServiceMenu() {
  isServiceOpen.value = true;
  const selectedIdx = props.services.findIndex((opt) => opt.value === form.service);
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
  form.service = value;
  closeServiceMenu();
}

function onServiceButtonKeydown(e: KeyboardEvent) {
  if (e.key === "ArrowDown" || e.key === "Enter" || e.key === " ") {
    e.preventDefault();
    if (!isServiceOpen.value) openServiceMenu();
  }
}

function onServiceMenuKeydown(e: KeyboardEvent) {
  if (!isServiceOpen.value) return;

  if (e.key === "Escape") {
    e.preventDefault();
    closeServiceMenu();
    return;
  }

  if (e.key === "ArrowDown") {
    e.preventDefault();
    serviceActiveIndex.value = Math.min(props.services.length - 1, serviceActiveIndex.value + 1);
    return;
  }

  if (e.key === "ArrowUp") {
    e.preventDefault();
    serviceActiveIndex.value = Math.max(0, serviceActiveIndex.value - 1);
    return;
  }

  if (e.key === "Home") {
    e.preventDefault();
    serviceActiveIndex.value = 0;
    return;
  }

  if (e.key === "End") {
    e.preventDefault();
    serviceActiveIndex.value = props.services.length - 1;
    return;
  }

  if (e.key === "Enter" || e.key === " ") {
    e.preventDefault();
    const opt = props.services[serviceActiveIndex.value];
    if (opt) setService(opt.value);
  }
}

function onGlobalPointerDown(e: MouseEvent | PointerEvent) {
  if (!isServiceOpen.value) return;
  const target = e.target as Node | null;
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
  const serviceLabel = props.services.find((opt) => opt.value === form.service)?.label ?? "";

  const subjectParts = [props.subjectPrefix, serviceLabel || null, form.suburb || null].filter(Boolean) as string[];
  const subject = subjectParts.join(" · ");

  const lines = [
    `Full name: ${form.fullName || "-"}`,
    `Email: ${form.email || "-"}`,
    `Phone: ${form.phone || "-"}`,
    `Service: ${serviceLabel || "-"}`,
    `Suburb / postcode: ${form.suburb || "-"}`,
    `Preferred date/time: ${form.preferredDateTime || "-"}`,
    "",
    "Message:",
    form.message || "-",
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
          v-model="form.fullName"
          type="text"
          autocomplete="name"
          placeholder="John Smith"
          class="mt-2 h-11 w-full rounded-md border border-white/10 bg-white/5 px-4 text-sm text-white/90 placeholder:text-white/35 shadow-[0_10px_30px_rgba(0,0,0,0.18)] backdrop-blur focus:outline-none focus-visible:ring-2 focus-visible:ring-spark-gold/70"
        />
      </label>

      <label class="block">
        <span class="text-[11px] font-semibold tracking-[0.18em] text-white/70">EMAIL ADDRESS</span>
        <input
          v-model="form.email"
          type="email"
          autocomplete="email"
          placeholder="john@example.com"
          class="mt-2 h-11 w-full rounded-md border border-white/10 bg-white/5 px-4 text-sm text-white/90 placeholder:text-white/35 shadow-[0_10px_30px_rgba(0,0,0,0.18)] backdrop-blur focus:outline-none focus-visible:ring-2 focus-visible:ring-spark-gold/70"
        />
      </label>
    </div>

    <div class="grid gap-4 md:grid-cols-2">
      <label class="block">
        <span class="text-[11px] font-semibold tracking-[0.18em] text-white/70">PHONE NUMBER</span>
        <input
          v-model="form.phone"
          type="tel"
          autocomplete="tel"
          placeholder="+61 400 000 000"
          class="mt-2 h-11 w-full rounded-md border border-white/10 bg-white/5 px-4 text-sm text-white/90 placeholder:text-white/35 shadow-[0_10px_30px_rgba(0,0,0,0.18)] backdrop-blur focus:outline-none focus-visible:ring-2 focus-visible:ring-spark-gold/70"
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
                      opt.value === form.service ? 'font-semibold' : 'font-medium',
                    ]"
                    role="option"
                    :aria-selected="opt.value === form.service"
                    @mouseenter="serviceActiveIndex = idx"
                    @click="setService(opt.value)"
                  >
                    <span class="min-w-0 truncate">{{ opt.label }}</span>
                    <span
                      v-if="opt.value === form.service"
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
      <label class="block">
        <span class="text-[11px] font-semibold tracking-[0.18em] text-white/70">SUBURB / POSTCODE</span>
        <input
          v-model="form.suburb"
          type="text"
          autocomplete="postal-code"
          placeholder="Sydney 2000"
          class="mt-2 h-11 w-full rounded-md border border-white/10 bg-white/5 px-4 text-sm text-white/90 placeholder:text-white/35 shadow-[0_10px_30px_rgba(0,0,0,0.18)] backdrop-blur focus:outline-none focus-visible:ring-2 focus-visible:ring-spark-gold/70"
        />
      </label>

      <label class="block">
        <span class="text-[11px] font-semibold tracking-[0.18em] text-white/70">PREFERRED DATE/TIME</span>
        <input
          v-model="form.preferredDateTime"
          type="text"
          inputmode="text"
          placeholder="e.g. Fri morning"
          class="mt-2 h-11 w-full rounded-md border border-white/10 bg-white/5 px-4 text-sm text-white/90 placeholder:text-white/35 shadow-[0_10px_30px_rgba(0,0,0,0.18)] backdrop-blur focus:outline-none focus-visible:ring-2 focus-visible:ring-spark-gold/70"
        />
      </label>
    </div>

    <label class="block">
      <span class="text-[11px] font-semibold tracking-[0.18em] text-white/70">YOUR MESSAGE</span>
      <textarea
        v-model="form.message"
        rows="5"
        placeholder="Tell us what you need (optional)…"
        class="mt-2 w-full resize-none rounded-md border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/90 placeholder:text-white/35 shadow-[0_10px_30px_rgba(0,0,0,0.18)] backdrop-blur focus:outline-none focus-visible:ring-2 focus-visible:ring-spark-gold/70"
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

